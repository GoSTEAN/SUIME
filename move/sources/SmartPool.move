module Ox1::talent_hub {
    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use sui::clock::{Self, Clock};
    use std::vector;
    use std::string::String;

    // ========== Error Codes ==========
    const ENOT_OWNER: u64 = 1;
    const EALREADY_SETTLED: u64 = 2;
    const ETOO_EARLY: u64 = 3;
    const ENO_PARTICIPANTS: u64 = 4;
    const EPOOL_NOT_SETTLED: u64 = 5;
    const ENO_CLAIM_AVAILABLE: u64 = 6;
    const EINVALID_SCORE: u64 = 7;
    const EMISMATCH_LENGTH: u64 = 8;

    // ========== Structs ==========

    /// Winner with their score (1-10 scale)
    struct Winner has copy, drop, store {
        participant: address,
        score: u64,
    }

    /// Individual claim record for a participant
    struct Claim has copy, drop, store {
        participant: address,
        amount: u64,
        claimed: bool,
    }

    /// Main Pool object - represents a project/bounty
    struct Pool has key, store {
        id: UID,
        owner: address,
        title: String,
        description: String,
        deadline: u64,
        grace_period_ms: u64,  // 3 days in milliseconds (259200000)
        balance: Balance<SUI>,
        total_deposited: u64,
        submissions: vector<address>,
        winners: vector<Winner>,
        settled: bool,
        claims: vector<Claim>,
        created_at: u64,
    }

    /// User Profile - tracks individual stats
    struct Profile has key, store {
        id: UID,
        owner: address,
        pools_created: u64,
        participated: u64,
        bounties_won: u64,
        bounties_lost: u64,
        total_points: u64,
        skills: vector<String>,
    }

    /// Global Vault Stats - tracks platform-wide metrics
    struct VaultStats has key {
        id: UID,
        total_pools: u64,
        total_deposited: u64,
        total_distributed: u64,
    }

    /// Capability for admin operations
    struct AdminCap has key, store {
        id: UID,
    }

    // ========== Init Function ==========
    
    fun init(ctx: &mut TxContext) {
        // Create and transfer admin capability to deployer
        transfer::transfer(
            AdminCap { id: object::new(ctx) },
            tx_context::sender(ctx)
        );

        // Create global vault stats
        transfer::share_object(
            VaultStats {
                id: object::new(ctx),
                total_pools: 0,
                total_deposited: 0,
                total_distributed: 0,
            }
        );
    }

    // ========== Helper Functions ==========

    fun vec_contains(vec: &vector<address>, addr: address): bool {
        let len = vector::length(vec);
        let mut i = 0;
        while (i < len) {
            if (*vector::borrow(vec, i) == addr) {
                return true
            };
            i = i + 1;
        };
        false
    }

    fun push_unique(vec: &mut vector<address>, addr: address) {
        if (!vec_contains(vec, addr)) {
            vector::push_back(vec, addr);
        }
    }

    fun is_winner(winners: &vector<Winner>, addr: address): bool {
        let len = vector::length(winners);
        let mut i = 0;
        while (i < len) {
            let w = vector::borrow(winners, i);
            if (w.participant == addr) {
                return true
            };
            i = i + 1;
        };
        false
    }

    // ========== Public Entry Functions ==========

    /// 1. Create a new pool/project
    public entry fun create_pool(
        title: String,
        description: String,
        deadline: u64,
        payment: Coin<SUI>,
        vault: &mut VaultStats,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let amount = coin::value(&payment);
        let balance = coin::into_balance(payment);

        // Create the pool
        let pool = Pool {
            id: object::new(ctx),
            owner: sender,
            title,
            description,
            deadline,
            grace_period_ms: 259200000, // 3 days in milliseconds
            balance,
            total_deposited: amount,
            submissions: vector::empty(),
            winners: vector::empty(),
            settled: false,
            claims: vector::empty(),
            created_at: clock::timestamp_ms(clock),
        };

        // Update vault stats
        vault.total_pools = vault.total_pools + 1;
        vault.total_deposited = vault.total_deposited + amount;

        // Share the pool object so anyone can interact
        transfer::share_object(pool);
    }

    /// Create user profile
    public entry fun create_profile(
        skills: vector<String>,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let profile = Profile {
            id: object::new(ctx),
            owner: sender,
            pools_created: 0,
            participated: 0,
            bounties_won: 0,
            bounties_lost: 0,
            total_points: 0,
            skills,
        };
        transfer::share_object(profile);
    }

    /// Submit work to a pool (participate)
    public entry fun submit_work(
        pool: &mut Pool,
        profile: &mut Profile,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        assert!(profile.owner == sender, ENOT_OWNER);
        
        push_unique(&mut pool.submissions, sender);
        profile.participated = profile.participated + 1;
    }

    /// 2. Owner selects winners with scores (1-10)
    /// Pass parallel vectors: winner_addresses and winner_scores
    public entry fun select_winners(
        pool: &mut Pool,
        winner_addresses: vector<address>,
        winner_scores: vector<u64>,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        assert!(pool.owner == sender, ENOT_OWNER);
        assert!(!pool.settled, EALREADY_SETTLED);

        let len = vector::length(&winner_addresses);
        assert!(len == vector::length(&winner_scores), EMISMATCH_LENGTH);

        // Clear existing winners and build new list
        pool.winners = vector::empty();

        let mut i = 0;
        while (i < len) {
            let addr = *vector::borrow(&winner_addresses, i);
            let score = *vector::borrow(&winner_scores, i);
            
            // Validate score is between 1-10
            assert!(score >= 1 && score <= 10, EINVALID_SCORE);
            
            vector::push_back(&mut pool.winners, Winner {
                participant: addr,
                score,
            });
            
            i = i + 1;
        };
    }

    /// 3. Owner distributes funds manually (after selecting winners)
    public entry fun distribute_funds_by_owner(
        pool: &mut Pool,
        vault: &mut VaultStats,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let now = clock::timestamp_ms(clock);
        
        assert!(pool.owner == sender, ENOT_OWNER);
        assert!(now >= pool.deadline, ETOO_EARLY);
        assert!(!pool.settled, EALREADY_SETTLED);

        let winners_len = vector::length(&pool.winners);
        assert!(winners_len > 0, ENO_PARTICIPANTS);

        distribute_to_winners(pool, vault);
    }

    /// 4. Auto-distribute after grace period (if no winners selected)
    public entry fun auto_distribute_after_grace(
        pool: &mut Pool,
        vault: &mut VaultStats,
        clock: &Clock,
        _ctx: &mut TxContext
    ) {
        let now = clock::timestamp_ms(clock);
        let grace_deadline = pool.deadline + pool.grace_period_ms;
        
        assert!(now >= grace_deadline, ETOO_EARLY);
        assert!(!pool.settled, EALREADY_SETTLED);

        let winners_len = vector::length(&pool.winners);
        
        if (winners_len == 0) {
            // No winners selected - distribute equally to all participants
            distribute_equally(pool, vault);
        } else {
            // Winners were selected but owner didn't distribute - distribute to winners
            distribute_to_winners(pool, vault);
        }
    }

    /// Claim your funds from a settled pool
    public entry fun claim_funds(
        pool: &mut Pool,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        assert!(pool.settled, EPOOL_NOT_SETTLED);

        let len = vector::length(&pool.claims);
        let mut i = 0;
        let mut found = false;
        
        while (i < len) {
            let claim = vector::borrow_mut(&mut pool.claims, i);
            if (claim.participant == sender && !claim.claimed && claim.amount > 0) {
                let claim_coin = coin::take(&mut pool.balance, claim.amount, ctx);
                transfer::public_transfer(claim_coin, sender);
                claim.claimed = true;
                found = true;
                break
            };
            i = i + 1;
        };

        assert!(found, ENO_CLAIM_AVAILABLE);
    }

    /// Update user skills
    public entry fun update_skills(
        profile: &mut Profile,
        skills: vector<String>,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        assert!(profile.owner == sender, ENOT_OWNER);
        profile.skills = skills;
    }

    // ========== Internal Distribution Functions ==========

    fun distribute_to_winners(
        pool: &mut Pool,
        vault: &mut VaultStats,
    ) {
        let winners_len = vector::length(&pool.winners);
        let mut total_score = 0u64;

        // Calculate total score
        let mut i = 0;
        while (i < winners_len) {
            let w = vector::borrow(&pool.winners, i);
            total_score = total_score + w.score;
            i = i + 1;
        };

        // Distribute proportionally based on scores
        let mut j = 0;
        let mut distributed = 0u64;
        
        while (j < winners_len) {
            let w = vector::borrow(&pool.winners, j);
            let share = (pool.total_deposited * w.score) / total_score;
            distributed = distributed + share;
            
            vector::push_back(&mut pool.claims, Claim {
                participant: w.participant,
                amount: share,
                claimed: false,
            });

            j = j + 1;
        };

        // Handle remainder (dust) - send to owner
        let remainder = pool.total_deposited - distributed;
        if (remainder > 0) {
            vector::push_back(&mut pool.claims, Claim {
                participant: pool.owner,
                amount: remainder,
                claimed: false,
            });
        };

        vault.total_distributed = vault.total_distributed + distributed;
        pool.settled = true;
    }

    fun distribute_equally(
        pool: &mut Pool,
        vault: &mut VaultStats,
    ) {
        let participants_len = vector::length(&pool.submissions);
        assert!(participants_len > 0, ENO_PARTICIPANTS);

        let share = pool.total_deposited / participants_len;
        let mut distributed = 0u64;

        let mut i = 0;
        while (i < participants_len) {
            let participant = *vector::borrow(&pool.submissions, i);
            distributed = distributed + share;
            
            vector::push_back(&mut pool.claims, Claim {
                participant,
                amount: share,
                claimed: false,
            });

            i = i + 1;
        };

        // Send remainder to owner
        let remainder = pool.total_deposited - distributed;
        if (remainder > 0) {
            vector::push_back(&mut pool.claims, Claim {
                participant: pool.owner,
                amount: remainder,
                claimed: false,
            });
        };

        vault.total_distributed = vault.total_distributed + distributed;
        pool.settled = true;
    }

    // ========== View Functions ==========

    /// 5. Get total amount in SUIME vault
    public fun get_vault_total(vault: &VaultStats): u64 {
        vault.total_deposited
    }

    /// 6. Get amount for a specific pool
    public fun get_pool_amount(pool: &Pool): u64 {
        pool.total_deposited
    }

    /// 7. Get user profile stats
    public fun get_profile_stats(profile: &Profile): (u64, u64, u64, u64, u64) {
        (
            profile.pools_created,
            profile.participated,
            profile.bounties_won,
            profile.bounties_lost,
            profile.total_points
        )
    }

    /// Get pool info
    public fun get_pool_info(pool: &Pool): (address, u64, u64, bool, u64) {
        (
            pool.owner,
            pool.deadline,
            pool.total_deposited,
            pool.settled,
            vector::length(&pool.submissions)
        )
    }

    /// Get vault stats
    public fun get_vault_stats(vault: &VaultStats): (u64, u64, u64) {
        (vault.total_pools, vault.total_deposited, vault.total_distributed)
    }

    /// Get pool winners
    public fun get_pool_winners(pool: &Pool): vector<Winner> {
        pool.winners
    }

    /// Get pool submissions
    public fun get_pool_submissions(pool: &Pool): vector<address> {
        pool.submissions
    }

    /// Check if pool is settled
    public fun is_pool_settled(pool: &Pool): bool {
        pool.settled
    }

    // ========== Test Helper ==========
    
    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        init(ctx);
    }
}
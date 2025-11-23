# SuiME Frontend (Demo)

This is a minimal demo frontend for the SuiME idea. It demonstrates the requested flows locally with no on-chain integration yet.

Features

- Connect Wallet (demo/mock)
- Upload a project (requires title, description, pool, distribution date)
- Submit a project (lighter-weight submission flow)
- Contribute to a project (mock contribution, stored locally)

How to run

1. cd into the frontend folder

```bash
cd frontend
npm install
npm run dev
```

2. Open http://localhost:5173 (Vite default)

Notes on integrating a real Sui wallet

- This scaffold uses a mock `Connect Wallet` button that produces a fake address for demo purposes.
- To integrate a real Sui wallet, use the Wallet Standard/adapter for Sui wallets or the `@mysten/sui.js` libraries and a Sui wallet provider.
- Replace the `connect()` implementation in `src/components/WalletConnect.tsx` with wallet detection + connect flow. Example steps:
  1. Detect window.sui or the Wallet Standard provider.
  2. Request connect and get the active address.
  3. Use the provider + `@mysten/sui.js` to sign and submit transactions when contributing or creating on-chain records.

On-chain flow suggestions

- When uploading a project you may want to create an on-chain registry entry (a Move object or transaction) that contains the project metadata and the pool address.
- For contributions: present the pool address and call a transfer transaction to that address using the connected wallet.

Next steps I can take for you

- Integrate a Sui wallet adapter and demonstrate a real testnet transfer (requires testnet config and wallet).
- Add a backend to index projects and persist them on a server.
- Add simple reputation/reward handling with Move contracts (requires Move contract code).

If you want, I can now:

1. Integrate a Sui wallet provider (detect & connect to a wallet) and wire up a demo transaction flow, or
2. Add server-side storage + API, or
3. Create a community-facing pitch deck or grant proposal (text or PDF).

Tell me which next step you want and I will implement it.

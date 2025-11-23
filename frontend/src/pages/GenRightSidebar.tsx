import React from 'react'

const rightInner = `
  <!-- Builders Spotlight -->
  <section class="rounded-xl bg-neutral-900/60 ring-1 ring-white/10 p-4">
    <div class="flex items-center justify-between">
      <h4 class="text-sm font-semibold tracking-tight">Top builders</h4>
      <a href="#builders" data-route="builders" class="text-xs text-neutral-400 hover:text-neutral-200 transition">View all</a>
    </div>
    <div class="mt-3 space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&amp;w=240&amp;auto=format&amp;fit=crop" alt="Builder" class="h-8 w-8 rounded-md object-cover ring-1 ring-white/10">
          <div>
            <p class="text-sm font-medium">Ava T.</p>
            <p class="text-xs text-neutral-400">Move • Indexing • Rust</p>
          </div>
        </div>
        <button class="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Follow</button>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&amp;w=240&amp;auto=format&amp;fit=crop" alt="Builder" class="h-8 w-8 rounded-md object-cover ring-1 ring-white/10">
          <div>
            <p class="text-sm font-medium">Noah B.</p>
            <p class="text-xs text-neutral-400">TypeScript • Frontend</p>
          </div>
        </div>
        <button class="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Follow</button>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&amp;w=240&amp;auto=format&amp;fit=crop" alt="Builder" class="h-8 w-8 rounded-md object-cover ring-1 ring-white/10">
          <div>
            <p class="text-sm font-medium">Kai R.</p>
            <p class="text-xs text-neutral-400">Smart Contracts • Audits</p>
          </div>
        </div>
        <button class="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Follow</button>
      </div>
    </div>
  </section>

  <!-- Safety -->
  <section class="rounded-xl bg-neutral-900/60 ring-1 ring-white/10 p-4">
    <div class="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
        <path d="M9 12l2 2 4-4"></path>
      </svg>
      <h4 class="text-sm font-semibold tracking-tight">Smart pool guarantees</h4>
    </div>
    <ul class="mt-2 space-y-2 text-sm text-neutral-300">
      <li class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 6 9 17l-5-5"></path></svg>
        Funds locked in escrow at creation
      </li>
      <li class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 6 9 17l-5-5"></path></svg>
        Auto-disburse on deadline if no winner picked
      </li>
      <li class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 6 9 17l-5-5"></path></svg>
        Transparent scoring and selection window
      </li>
    </ul>
  </section>

  <!-- Recent activity -->
  <section class="rounded-xl bg-neutral-900/60 ring-1 ring-white/10 p-4">
    <div class="flex items-center justify-between">
      <h4 class="text-sm font-semibold tracking-tight">Recent activity</h4>
      <a class="text-xs text-neutral-400 hover:text-neutral-200 transition" href="#">See all</a>
    </div>
    <div class="mt-3 space-y-3">
      <div class="flex items-center gap-3">
        <div class="h-8 w-8 rounded-md bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10v6a5 5 0 0 1-10 0z"></path><path d="M5 9a3 3 0 0 1-3-3V5h3"></path><path d="M19 9a3 3 0 0 0 3-3V5h-3"></path>
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-sm">Pool disbursed 2,000 SUI to <span class="text-neutral-200">sam.dev</span></p>
          <p class="text-xs text-neutral-500">Analytics Dashboard • 2h ago</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="h-8 w-8 rounded-md bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 5v14"></path><path d="M5 12h14"></path>
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-sm">New bounty created: <span class="text-neutral-200">Wallet SDK Starters</span></p>
          <p class="text-xs text-neutral-500">1d ago • 1,200 SUI</p>
        </div>
      </div>
    </div>
  </section>
`;

export default function GenRightSidebar() {
  // Keep this sidebar hidden by default and only show on lg screens
  return <aside className="hidden lg:block lg:col-span-3 space-y-6" dangerouslySetInnerHTML={{ __html: rightInner }} />
}

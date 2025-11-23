import React from 'react'

const bountiesHtml = `
<div id="center-bounties" class="hidden space-y-6">
  <div class="flex items-center justify-between">
    <h2 class="text-lg font-semibold tracking-tight">All bounties</h2>
    <label for="create-pool" class="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 transition text-sm font-semibold tracking-tight">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
      New bounty
    </label>
  </div>

  <article class="rounded-xl bg-neutral-900/60 ring-1 ring-white/10 hover:ring-white/20 transition p-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-xs px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20">Bounty pool</span>
          <span class="text-[11px] text-neutral-400">by Osmium Labs</span>
        </div>
        <h3 class="mt-1 text-base sm:text-lg font-semibold tracking-tight">On-chain Analytics Dashboard for Sui DEX Aggregation</h3>
        <p class="mt-1 text-sm text-neutral-400">Real-time swaps, TVL, per-pool analytics, wallet segmentation, and alerts.</p>
      </div>
      <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&amp;w=400&amp;auto=format&amp;fit=crop" alt="Project cover" class="hidden sm:block h-14 w-20 rounded-lg object-cover ring-1 ring-white/10">
    </div>
  </article>
</div>
`;

export default function GenBounties() {
  return <div dangerouslySetInnerHTML={{ __html: bountiesHtml }} />
}

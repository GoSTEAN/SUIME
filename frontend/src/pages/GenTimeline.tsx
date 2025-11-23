import React from 'react'

const timelineHtml = `
<div id="center-timeline" class="space-y-6 hidden">
  <!-- Hero / Announcement -->
  <div class="rounded-2xl bg-gradient-to-br from-neutral-900/70 via-neutral-900/60 to-neutral-900/40 ring-1 ring-white/10 p-6">
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight">A social talent hub for real Sui builders</h1>
        <p class="mt-1 text-neutral-400 text-sm sm:text-base">Founders fund smart pools. Builders ship. Funds auto-disburse if no winner is picked by deadline.</p>
      </div>
      <div class="flex items-center gap-2">
        <label for="create-pool" class="cursor-pointer inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 transition text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 4.1 8.1 10a6 6 0 0 0-1.6 3L6 16l3-0.5a6 6 0 0 0 3-1.6L17.9 8A8 8 0 0 0 14 4.1z"></path>
            <path d="M15 9l-6 6"></path>
            <path d="M5 19a3 3 0 0 1 3-3"></path>
            <path d="M15 7h.01"></path>
          </svg>
          <span class="text-md font-semibold tracking-tight">Create Smart Pool</span>
        </label>
        <a href="#builders" data-route="builders" class="inline-flex items-center gap-2 px-3 py-2 rounded-md text-neutral-200 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 21a8 8 0 1 0-16 0"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span class="text-sm font-medium">Personalize feed</span>
        </a>
      </div>
    </div>
    <div class="mt-4 p-3 rounded-lg bg-amber-500/10 text-amber-300 ring-1 ring-amber-400/20 flex items-start gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
        <path d="M9 12l2 2 4-4"></path>
      </svg>
      <p class="text-sm">Escrowed pools: funds are locked at creation and will automatically disburse to the top submission if the founder does not select a winner by the deadline.</p>
    </div>
  </div>

  <!-- Timeline: Skill-matched projects -->
  <div class="flex items-center justify-between">
    <h2 class="text-lg font-semibold tracking-tight">Matched to your skills</h2>
    <button class="text-xs text-neutral-400 hover:text-neutral-200 transition flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M3 6h18"></path><path d="M7 12h10"></path><path d="M10 18h4"></path>
      </svg>
      Refine
    </button>
  </div>

  <!-- Sample project card -->
  <article class="rounded-xl bg-neutral-900/60 ring-1 ring-white/10 hover:ring-white/20 transition p-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-xs px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20">Bounty pool</span>
          <span class="text-[11px] text-neutral-400">by Osmium Labs</span>
        </div>
        <h3 class="mt-1 text-base sm:text-lg font-semibold tracking-tight">On-chain Analytics Dashboard for Sui DEX Aggregation</h3>
        <p class="mt-1 text-sm text-neutral-400">Ship a dashboard with real-time swaps, TVL, and per-pool analytics. Include wallet segmentation and alerting.</p>
      </div>
      <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&amp;w=400&amp;auto=format&amp;fit=crop" alt="Project cover" class="hidden sm:block h-14 w-20 rounded-lg object-cover ring-1 ring-white/10">
    </div>
  </article>

  <!-- Additional project cards to match original density -->
  <article class="rounded-xl bg-neutral-900/60 ring-1 ring-white/10 hover:ring-white/20 transition p-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-xs px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20">Grant</span>
          <span class="text-[11px] text-neutral-400">by Nova Labs</span>
        </div>
        <h3 class="mt-1 text-base sm:text-lg font-semibold tracking-tight">Sui Wallet SDK: Starter Kits and Patterns</h3>
        <p class="mt-1 text-sm text-neutral-400">Build a secure wallet integration starter with examples, dev tools, and testing harnesses for builders.</p>
      </div>
      <img src="https://images.unsplash.com/photo-1526378724599-3b6e8f7f3d1a?q=80&amp;w=400&amp;auto=format&amp;fit=crop" alt="Project cover" class="hidden sm:block h-14 w-20 rounded-lg object-cover ring-1 ring-white/10">
    </div>
  </article>

  <article class="rounded-xl bg-neutral-900/60 ring-1 ring-white/10 hover:ring-white/20 transition p-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-xs px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/20">Bounty</span>
          <span class="text-[11px] text-neutral-400">by Aurora Collective</span>
        </div>
        <h3 class="mt-1 text-base sm:text-lg font-semibold tracking-tight">On-chain Indexer for Marketplace Events</h3>
        <p class="mt-1 text-sm text-neutral-400">Create a performant indexing service for marketplace events, with example dashboards and filters for analytics.</p>
      </div>
      <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&amp;w=400&amp;auto=format&amp;fit=crop" alt="Project cover" class="hidden sm:block h-14 w-20 rounded-lg object-cover ring-1 ring-white/10">
    </div>
  </article>
</div>
`;

export default function GenTimeline() {
  return <div dangerouslySetInnerHTML={{ __html: timelineHtml }} />
}

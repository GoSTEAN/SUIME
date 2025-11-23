import React from 'react'

const landingHtml = `
<!-- Landing View -->
<section id="view-landing" class="relative overflow-hidden">
  <div class="absolute inset-0 pointer-events-none opacity-[0.15]">
    <div class="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-500 blur-3xl"></div>
    <div class="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-500 blur-3xl"></div>
  </div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
    <div class="max-w-3xl">
      <p class="text-xs sm:text-sm text-indigo-300 ring-1 ring-indigo-400/20 inline-flex px-2 py-1 rounded-md bg-indigo-500/10">Beta</p>
      <h1 class="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight">The social talent hub for real Sui builders</h1>
      <p class="mt-3 text-neutral-400 text-base sm:text-lg">Launch escrowed bounty pools, attract top builders, and auto-disburse funds if no winner is selected by deadline. Transparent, fair, and fast.</p>
      <div class="mt-6 flex items-center gap-2">
        <a href="#timeline" data-route="timeline" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-indigo-500 hover:bg-indigo-400 transition text-sm font-semibold tracking-tight">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 4.1 8.1 10a6 6 0 0 0-1.6 3L6 16l3-.5a6 6 0 0 0 3-1.6L17.9 8A8 8 0 0 0 14 4.1z"></path><path d="M15 9l-6 6"></path><path d="M5 19a3 3 0 0 1 3-3"></path><path d="M15 7h.01"></path></svg>
          Get started
        </a>
        <label for="create-pool" class="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-white/5 text-neutral-200 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
          Create pool
        </label>
      </div>
    </div>

    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="p-5 rounded-xl bg-neutral-900/60 ring-1 ring-white/10">
        <div class="h-9 w-9 rounded-md bg-emerald-500/15 ring-1 ring-emerald-400/20 flex items-center justify-center text-emerald-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="M9 12l2 2 4-4"></path></svg>
        </div>
        <h3 class="mt-3 text-base font-semibold tracking-tight">Escrowed pools</h3>
        <p class="mt-1 text-sm text-neutral-400">Funds lock on creation and follow transparent selection rules.</p>
      </div>
      <div class="p-5 rounded-xl bg-neutral-900/60 ring-1 ring-white/10">
        <div class="h-9 w-9 rounded-md bg-indigo-500/15 ring-1 ring-indigo-400/20 flex items-center justify-center text-indigo-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18"></path><path d="M7 12h10"></path><path d="M10 18h4"></path></svg>
        </div>
        <h3 class="mt-3 text-base font-semibold tracking-tight">Skill matching</h3>
        <p class="mt-1 text-sm text-neutral-400">Your feed adapts to your stack and past work.</p>
      </div>
      <div class="p-5 rounded-xl bg-neutral-900/60 ring-1 ring-white/10">
        <div class="h-9 w-9 rounded-md bg-amber-500/15 ring-1 ring-amber-400/20 flex items-center justify-center text-amber-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
        </div>
        <h3 class="mt-3 text-base font-semibold tracking-tight">Auto-disburse</h3>
        <p class="mt-1 text-sm text-neutral-400">If no winner is picked, top submissions get paid on deadline.</p>
      </div>
    </div>

    <div class="mt-12 rounded-2xl bg-gradient-to-br from-neutral-900/70 via-neutral-900/60 to-neutral-900/40 ring-1 ring-white/10 p-6">
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 class="text-xl sm:text-2xl font-semibold tracking-tight">What’s inside</h2>
          <p class="mt-1 text-neutral-400 text-sm sm:text-base">Bounties, grants, and jobs — all in one place for the Sui ecosystem.</p>
        </div>
        <a href="#bounties" data-route="bounties" class="inline-flex items-center gap-2 px-3 py-2 rounded-md text-neutral-200 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition text-sm">
          Explore bounties
        </a>
      </div>
      <div class="mt-4 p-3 rounded-lg bg-white/5 ring-1 ring-white/10 text-neutral-300 text-sm">
        Trusted by founders and builders across the ecosystem.
      </div>
    </div>
  </div>
</section>
`;

export default function GenLanding() {
  return <div dangerouslySetInnerHTML={{ __html: landingHtml }} />
}

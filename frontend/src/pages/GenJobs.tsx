import React from 'react'

const jobsHtml = `
<div id="center-jobs" class="hidden space-y-6">
  <div class="flex items-center justify-between">
    <h2 class="text-lg font-semibold tracking-tight">Open roles</h2>
    <a href="#landing" data-route="landing" class="text-xs text-neutral-400 hover:text-neutral-200 transition flex items-center gap-1 text-white bg-white/5 ring-white/20">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18"></path><path d="M7 12h10"></path><path d="M10 18h4"></path></svg>
      Learn about pools
    </a>
  </div>

  <article class="rounded-xl bg-neutral-900/60 ring-1 ring-white/10 hover:ring-white/20 transition p-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-xs px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/20">Job</span>
          <span class="text-[11px] text-neutral-400">by Zephyr Protocol</span>
        </div>
        <h3 class="mt-1 text-base sm:text-lg font-semibold tracking-tight">Senior Move Engineer</h3>
        <p class="mt-1 text-sm text-neutral-400">Design, implement, and audit on-chain modules powering next-gen payments.</p>
      </div>
      <img src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&amp;w=400&amp;auto=format&amp;fit=crop" alt="Job cover" class="hidden sm:block h-14 w-20 rounded-lg object-cover ring-1 ring-white/10">
    </div>
  </article>
</div>
`;

export default function GenJobs() {
  return <div dangerouslySetInnerHTML={{ __html: jobsHtml }} />
}

import React from 'react'

const leftInner = `
  <!-- Profile Summary -->
  <section class="rounded-xl bg-neutral-900/60 ring-1 ring-white/10 overflow-hidden">
    <div class="relative h-20 bg-gradient-to-r from-indigo-600/40 via-blue-500/30 to-cyan-500/30"></div>
    <div class="p-4 -mt-8 flex items-end gap-3">
      <img src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&amp;w=240&amp;auto=format&amp;fit=crop" alt="Avatar" class="h-14 w-14 rounded-lg object-cover ring-2 ring-white/20">
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <h3 class="text-base font-semibold tracking-tight">You</h3>
          <span class="text-xs px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">Builder</span>
        </div>
        <p class="text-sm text-neutral-400 line-clamp-1">Match projects to your skills to personalize your timeline.</p>
      </div>
    </div>
    <div class="px-4 pb-4">
      <div class="flex flex-wrap gap-1.5">
        <span class="text-xs px-2 py-1 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10">Move</span>
        <span class="text-xs px-2 py-1 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10">TypeScript</span>
        <span class="text-xs px-2 py-1 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10">Smart Contracts</span>
        <span class="text-xs px-2 py-1 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10">UI</span>
      </div>
      <div class="mt-4 flex items-center justify-between">
        <button class="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Edit skills</button>
        <div class="text-xs text-neutral-400">Profile 70%</div>
      </div>
    </div>
  </section>

  <!-- Filters -->
  <section class="rounded-xl bg-neutral-900/60 ring-1 ring-white/10 p-4 space-y-3">
    <div class="flex items-center justify-between">
      <h4 class="text-sm font-semibold tracking-tight">Filters</h4>
      <button class="text-xs text-neutral-400 hover:text-neutral-200 transition flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 4H7"></path><path d="M7 20h14"></path><path d="M17 4v4"></path><path d="M7 16v4"></path><path d="M3 10h14"></path><path d="M3 10v4"></path>
        </svg>
        Reset
      </button>
    </div>
    <div>
      <p class="text-xs text-neutral-400 mb-2">Skills</p>
      <div class="flex flex-wrap gap-2">
        <button class="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Move</button>
        <button class="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Rust</button>
        <button class="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">TypeScript</button>
        <button class="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Full-Stack</button>
        <button class="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">UI</button>
        <button class="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Infra</button>
      </div>
    </div>
    <div class="border-t border-white/10 pt-3">
      <p class="text-xs text-neutral-400 mb-2">Pool size</p>
      <div class="flex items-center gap-2">
        <button class="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Under 500 SUI</button>
        <button class="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">500–2k SUI</button>
        <button class="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">2k+ SUI</button>
      </div>
    </div>
    <div class="border-t border-white/10 pt-3">
      <p class="text-xs text-neutral-400 mb-2">Status</p>
      <div class="flex items-center gap-2">
        <button class="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Open</button>
        <button class="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Closing soon</button>
        <button class="text-xs px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Closed</button>
      </div>
    </div>
  </section>

  <!-- Stats -->
  <section class="rounded-xl bg-neutral-900/60 ring-1 ring-white/10 p-4 space-y-3">
    <h4 class="text-sm font-semibold tracking-tight">Ecosystem</h4>
    <div class="grid grid-cols-3 gap-2">
      <div class="p-3 rounded-lg bg-white/5 ring-1 ring-white/10">
        <p class="text-[10px] text-neutral-400">Active bounties</p>
        <p class="text-lg font-semibold tracking-tight">128</p>
      </div>
      <div class="p-3 rounded-lg bg-white/5 ring-1 ring-white/10">
        <p class="text-[10px] text-neutral-400">Total in pools</p>
        <p class="text-lg font-semibold tracking-tight">94k SUI</p>
      </div>
      <div class="p-3 rounded-lg bg-white/5 ring-1 ring-white/10">
        <p class="text-[10px] text-neutral-400">Builders</p>
        <p class="text-lg font-semibold tracking-tight">3,420</p>
      </div>
    </div>
  </section>
`;

export default function GenLeftSidebar() {
  return <aside className="hidden lg:block lg:col-span-3 space-y-6" dangerouslySetInnerHTML={{ __html: leftInner }} />
}

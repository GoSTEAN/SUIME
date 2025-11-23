import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'
import GenHeader from './GenHeader'
import GenLanding from './GenLanding'
import GenLeftSidebar from './GenLeftSidebar'
import GenRightSidebar from './GenRightSidebar'
import GenTimeline from './GenTimeline'
import GenBounties from './GenBounties'
import GenBuilders from './GenBuilders'
import GenJobs from './GenJobs'
import CreateSmartPool, { PoolData } from './CreateSmartPool'
// useEffect and useState are imported above

// remaining page HTML (app layout, sidebars, views, modals, footer)
const restHtml = `
  <!-- App Layout -->
  <main id="app-main" class="hidden max-w-6xl mx-auto px-2 sm:px-4 lg:px-9 py-8 lg:grid lg:grid-cols-12 gap-4">
      <!-- Left Sidebar -->
      <aside class="hidden lg:block lg:col-span-3 space-y-6">
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
      </aside>

      <!-- Center Column: Views -->
      <section class="lg:col-span-6 space-y-6">
        <!-- TIMELINE VIEW -->
        <div id="center-timeline" class="space-y-6 hidden">
          <!-- Hero / Announcement -->
          <div class="rounded-2xl bg-gradient-to-br from-neutral-900/70 via-neutral-900/60 to-neutral-900/40 ring-1 ring-white/10 p-6">
            <div class="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight">A social talent hub for real Sui builders</h1>
                <p class="mt-1 text-neutral-400 text-sm sm:text-base">Founders fund smart pools. Builders ship. Funds auto-disburse if no winner is picked by deadline.</p>
              </div>
              <div class="flex items-center gap-2">
                <label htmlFor="create-pool" class="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M14 4.1 8.1 10a6 6 0 0 0-1.6 3L6 16l3-0.5a6 6 0 0 0 3-1.6L17.9 8A8 8 0 0 0 14 4.1z"></path>
                    <path d="M15 9l-6 6"></path>
                    <path d="M5 19a3 3 0 0 1 3-3"></path>
                    <path d="M15 7h.01"></path>
                  </svg>
                  <span class="text-sm font-semibold tracking-tight">Create Smart Pool</span>
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
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
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

          <!-- Project Card 1 -->
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
            <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M8 6h8a4 4 0 0 1 0 8H8a4 4 0 1 1 0-8Z"></path>
                  <path d="M9 20h7a4 4 0 0 0 0-8H8"></path>
                </svg>
                <span class="text-neutral-300">Pool 5,000 SUI</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                  <path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path>
                </svg>
                <span class="text-neutral-300">Deadline Nov 30, 2025</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10v6a5 5 0 0 1-10 0z"></path><path d="M5 9a3 3 0 0 1-3-3V5h3"></path><path d="M19 9a3 3 0 0 0 3-3V5h-3"></path>
                </svg>
                <span class="text-neutral-300">Auto-disburse if no winner</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span class="text-neutral-300">23 submissions</span>
              </div>
            </div>
            <div class="mt-3 flex flex-wrap gap-2">
              <span class="text-xs px-2 py-1 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10">Move</span>
              <span class="text-xs px-2 py-1 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10">TypeScript</span>
              <span class="text-xs px-2 py-1 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10">Data Viz</span>
              <span class="text-xs px-2 py-1 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10">Indexing</span>
            </div>
            <div class="mt-4 flex items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&amp;w=240&amp;auto=format&amp;fit=crop" alt="Founder" class="h-7 w-7 rounded-md object-cover ring-1 ring-white/10">
                <span class="text-xs text-neutral-400">Osmium Labs • Verified</span>
              </div>
              <div class="flex items-center gap-2">
                <button class="px-3 py-2 rounded-md text-sm bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Details</button>
                <button class="px-3 py-2 rounded-md text-sm bg-indigo-500 text-white hover:bg-indigo-400 transition">Submit work</button>
              </div>
            </div>
          </article>

          <!-- Project Card 2 -->
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
            <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M8 6h8a4 4 0 0 1 0 8H8a4 4 0 1 1 0-8Z"></path>
                  <path d="M9 20h7a4 4 0 0 0 0-8H8"></path>
                </svg>
                <span class="text-neutral-300">Pool 1,200 SUI</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                  <path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path>
                </svg>
                <span class="text-neutral-300">Deadline Dec 10, 2025</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10v6a5 5 0 0 1-10 0z"></path>
                </svg>
                <span class="text-neutral-300">Auto-disburse if no winner</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                </svg>
                <span class="text-neutral-300">8 submissions</span>
              </div>
            </div>
            <div class="mt-3 flex flex-wrap gap-2">
              <span class="text-xs px-2 py-1 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10">TypeScript</span>
              <span class="text-xs px-2 py-1 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10">Wallet SDK</span>
              <span class="text-xs px-2 py-1 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10">Integration</span>
            </div>
            <div class="mt-4 flex items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <img src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&amp;w=240&amp;auto=format&amp;fit=crop" alt="Founder" class="h-7 w-7 rounded-md object-cover ring-1 ring-white/10">
                <span class="text-xs text-neutral-400">Nova Labs • Verified</span>
              </div>
              <div class="flex items-center gap-2">
                <button class="px-3 py-2 rounded-md text-sm bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Details</button>
                <button class="px-3 py-2 rounded-md text-sm bg-indigo-500 text-white hover:bg-indigo-400 transition">Submit work</button>
              </div>
            </div>
          </article>

          <!-- Project Card 3 -->
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
            <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M8 6h8a4 4 0 0 1 0 8H8a4 4 0 1 1 0-8Z"></path>
                  <path d="M9 20h7a4 4 0 0 0 0-8H8"></path>
                </svg>
                <span class="text-neutral-300">Pool 2,800 SUI</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                  <path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path>
                </svg>
                <span class="text-neutral-300">Deadline Jan 5, 2026</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10v6a5 5 0 0 1-10 0z"></path>
                </svg>
                <span class="text-neutral-300">Auto-disburse if no winner</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                </svg>
                <span class="text-neutral-300">15 submissions</span>
              </div>
            </div>
            <div class="mt-3 flex flex-wrap gap-2">
              <span class="text-xs px-2 py-1 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10">Indexing</span>
              <span class="text-xs px-2 py-1 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10">Rust</span>
              <span class="text-xs px-2 py-1 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10">Data</span>
            </div>
            <div class="mt-4 flex items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <img src="https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&amp;w=240&amp;auto=format&amp;fit=crop" alt="Founder" class="h-7 w-7 rounded-md object-cover ring-1 ring-white/10">
                <span class="text-xs text-neutral-400">Aurora Collective</span>
              </div>
              <div class="flex items-center gap-2">
                <button class="px-3 py-2 rounded-md text-sm bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Details</button>
                <button class="px-3 py-2 rounded-md text-sm bg-indigo-500 text-white hover:bg-indigo-400 transition">Submit work</button>
              </div>
            </div>
          </article>

          <!-- BOUNTIES VIEW -->
          <div id="center-bounties" class="hidden space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold tracking-tight">All bounties</h2>
              <label for="create-pool" class="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 transition text-sm font-semibold tracking-tight">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                New bounty
              </label>
            </div>

            <!-- Reuse the bounty/grant cards (sample) -->
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
              <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div class="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 6h8a4 4 0 0 1 0 8H8a4 4 0 1 1 0-8Z"></path><path d="M9 20h7a4 4 0 0 0 0-8H8"></path></svg>
                  <span class="text-neutral-300">Pool 5,000 SUI</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path></svg>
                  <span class="text-neutral-300">Deadline Nov 30, 2025</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10v6a5 5 0 0 1-10 0z"></path><path d="M5 9a3 3 0 0 1-3-3V5h3"></path><path d="M19 9a3 3 0 0 0 3-3V5h-3"></path></svg>
                  <span class="text-neutral-300">Auto-disburse if no winner</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  <span class="text-neutral-300">23 submissions</span>
                </div>
              </div>
              <div class="mt-4 flex items-center justify-between gap-3">
                <div class="flex items-center gap-2">
                  <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&amp;w=240&amp;auto=format&amp;fit=crop" alt="Founder" class="h-7 w-7 rounded-md object-cover ring-1 ring-white/10">
                  <span class="text-xs text-neutral-400">Osmium Labs • Verified</span>
                </div>
                <div class="flex items-center gap-2">
                  <button class="px-3 py-2 rounded-md text-sm bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Details</button>
                  <button class="px-3 py-2 rounded-md text-sm bg-indigo-500 text-white hover:bg-indigo-400 transition">Submit work</button>
                </div>
              </div>
            </article>

            <div class="flex justify-center">
              <button class="px-3 py-2 rounded-md text-sm bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Load more</button>
            </div>
          </div>

          <!-- JOBS VIEW -->
          <div id="center-jobs" class="hidden space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold tracking-tight">Open roles</h2>
              <a href="#landing" data-route="landing" class="text-xs text-neutral-400 hover:text-neutral-200 transition flex items-center gap-1 text-white bg-white/5 ring-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18"></path><path d="M7 12h10"></path><path d="M10 18h4"></path></svg>
                Learn about pools
              </a>
            </div>

            <!-- Sample job card -->
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
              <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div class="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-sky-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path></svg>
                  <span class="text-neutral-300">Full-time</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.4 13.6 11 4H4v7l9.4 9.4a2 2 0 0 0 2.8 0l4.2-4.2a2 2 0 0 0 0-2.8z"></path><path d="M7 7h.01"></path></svg>
                  <span class="text-neutral-300">Remote • Competitive</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  <span class="text-neutral-300">42 applicants</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path></svg>
                  <span class="text-neutral-300">Posted 2d ago</span>
                </div>
              </div>
            </article>
          </div>

          <!-- BUILDERS VIEW (placeholder) -->
          <div id="center-builders" class="hidden">
            <div class="rounded-xl bg-neutral-900/60 ring-1 ring-white/10 p-6">
              <h3 class="text-base font-semibold tracking-tight">Builders</h3>
              <p class="mt-1 text-sm text-neutral-400">Coming soon — discover and follow top builders in the ecosystem.</p>
            </div>
          </div>
        </div>
      </section>

  <!-- Right Sidebar -->
  <aside class="hidden lg:block lg:col-span-3 space-y-6">
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
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
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
      </aside>
    
    <!-- Modals controlled by checkboxes - we keep inputs so labels with htmlFor still work -->
    <input id="create-pool" type="checkbox" class="peer/create sr-only">
    <input id="edit-profile" type="checkbox" class="peer/profile sr-only">

    <!-- Mobile bottom nav (simplified) -->
    <nav class="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-neutral-950/80 backdrop-blur border-t border-white/10">
      <div class="max-w-7xl mx-auto px-6 py-2 grid grid-cols-4 gap-2">
        <a href="#timeline" data-route="timeline" class="flex flex-col items-center gap-1 py-1 text-neutral-300 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m3 9 9-7 9 7"></path><path d="M9 22V12h6v10"></path><path d="M3 10v12h6"></path><path d="M21 10v12h-6"></path></svg>
          <span class="text-[11px]">Timeline</span>
        </a>
        <a href="#bounties" data-route="bounties" class="flex flex-col items-center gap-1 hover:text-white text-neutral-300 pt-1 pb-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 21h8" class=""></path><path d="M12 17v4"></path><path d="M7 4h10v6a5 5 0 0 1-10 0z"></path><path d="M5 9a3 3 0 0 1-3-3V5h3" class=""></path><path d="M19 9a3 3 0 0 0 3-3V5h-3"></path></svg>
          <span class="text-[11px]">Bounties</span>
        </a>
        <a href="#jobs" data-route="jobs" class="flex flex-col items-center gap-1 py-1 text-neutral-300 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path></svg>
          <span class="text-[11px]">Jobs</span>
        </a>
        <label htmlFor="create-pool" class="cursor-pointer flex flex-col items-center gap-1 py-1 text-indigo-300 hover:text-indigo-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
          <span class="text-[11px]">New</span>
        </label>
      </div>
    </nav>

    <!-- Footer (simplified) -->
    <footer class="mt-12 border-t border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="h-6 w-6 rounded-md bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center ring-1 ring-white/20">
            <span class="text-[10px] font-semibold tracking-tight">S</span>
          </div>
          <span class="text-sm text-neutral-400">SUIME • Build the future on Sui</span>
        </div>
        <div class="flex items-center gap-4 text-xs text-neutral-500">
          <a href="#" class="hover:text-neutral-300 transition">Docs</a>
          <a href="#" class="hover:text-neutral-300 transition">Safety</a>
          <a href="#" class="hover:text-neutral-300 transition">Terms</a>
          <a href="#" class="hover:text-neutral-300 transition">Privacy</a>
        </div>
      </div>
    </footer>
`;

export default function GeneratedPage() {
  const [route, setRoute] = useState('landing');

  useEffect(() => {
    // Re-implement the small hash router from the original HTML
    const routes = new Set(['landing', 'timeline', 'bounties', 'jobs', 'builders']);

    function setActive(route: string) {
      const landing = document.getElementById('view-landing');
      const appMain = document.getElementById('app-main');
      if (landing && appMain) {
        const isLanding = route === 'landing';
        landing.classList.toggle('hidden', !isLanding);
        appMain.classList.toggle('hidden', isLanding);
      }
      ['timeline', 'bounties', 'jobs', 'builders'].forEach(r => {
        const el = document.getElementById('center-' + r);
        if (el) el.classList.toggle('hidden', route !== r);
      });
      document.querySelectorAll('[data-route]').forEach(el => {
        const isActive = el.getAttribute('data-route') === route;
        el.classList.toggle('text-white', isActive);
        el.classList.toggle('bg-white/5', isActive);
        el.classList.toggle('ring-white/20', isActive);
      });
      const titles: Record<string, string> = {
        landing: 'SUIME — Social Talent Hub for Sui Builders',
        timeline: 'Timeline — SUIME',
        bounties: 'Bounties — SUIME',
        jobs: 'Jobs — SUIME',
        builders: 'Builders — SUIME',
      };
      document.title = titles[route] || 'SUIME';
    }

    function router() {
      let r = (location.hash || '').replace('#', '') || 'landing';
      if (!routes.has(r)) r = 'landing';
      setActive(r);
      // keep React state in sync so we can conditionally render sidebars
      setRoute(r);
    }

    window.addEventListener('hashchange', router);
    // Run on mount
    router();

    return () => {
      window.removeEventListener('hashchange', router);
    };
  }, []);

  // No extra React modal syncing needed: we'll render the original checkbox-controlled
  // modal markup below so labels in the header toggle the native HTML modals.

  const footerAndModals = `
    <!-- Modals controlled by checkboxes -->
    <input id="create-pool" type="checkbox" class="peer/create sr-only">
    <div class="fixed inset-0 z-[60] hidden peer-checked/create:block">
      <label for="create-pool" class="absolute inset-0 bg-black/60"></label>
      <div class="absolute inset-0 flex items-center justify-center p-4">
        <div id="create-pool-react-root" class="w-full max-w-2xl"></div>
      </div>
    </div>

    <input id="edit-profile" type="checkbox" class="peer/profile sr-only">
    <div class="fixed inset-0 z-[60] hidden peer-checked/profile:block">
      <label for="edit-profile" class="absolute inset-0 bg-black/60"></label>
      <div class="absolute inset-0 flex items-center justify-center p-4">
        <div class="w-full max-w-xl rounded-2xl bg-neutral-950 ring-1 ring-white/10 shadow-xl">
          <div class="p-5 border-b border-white/10 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 3v3"></path><path d="M19.4 7.3l-2.1 2.1"></path><path d="M21 12h-3"></path><path d="M19.4 16.7l-2.1-2.1"></path><path d="M12 21v-3"></path><path d="M6.7 19.4l2.1-2.1"></path><path d="M3 12h3"></path><path d="M6.7 4.6l2.1 2.1"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <h3 class="text-lg font-semibold tracking-tight">Update Profile</h3>
            </div>
            <label for="edit-profile" class="p-2 rounded-md hover:bg-white/5 ring-1 ring-white/10 hover:ring-white/20 cursor-pointer transition" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M18 6 6 18"></path><path d="M6 6l12 12"></path>
              </svg>
            </label>
          </div>
          <div class="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-sm text-neutral-300">Display name</label>
                <input type="text" placeholder="Your name" class="mt-1 w-full bg-neutral-900 border border-white/10 rounded-md px-3 py-2 text-sm placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-white/20 transition">
              </div>
              <div>
                <label class="text-sm text-neutral-300">Role</label>
                <select class="mt-1 w-full bg-neutral-900 border border-white/10 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-white/20 transition">
                  <option>Builder</option>
                  <option>Founder</option>
                  <option>Reviewer</option>
                </select>
              </div>
            </div>
            <div>
              <label class="text-sm text-neutral-300">Bio</label>
              <textarea rows="3" placeholder="Short intro and what you love to build..." class="mt-1 w-full bg-neutral-900 border border-white/10 rounded-md px-3 py-2 text-sm placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-white/20 transition"></textarea>
            </div>
            <div>
              <label class="text-sm text-neutral-300">Your skills</label>
              <div class="mt-2 flex flex-wrap gap-2">
                <input id="ps-move" type="checkbox" class="peer sr-only">
                <label for="ps-move" class="cursor-pointer text-xs px-2.5 py-1.5 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 peer-checked:bg-emerald-500/20 peer-checked:text-emerald-200 peer-checked:ring-emerald-400/30 transition">Move</label>
                <input id="ps-rust" type="checkbox" class="peer sr-only">
                <label for="ps-rust" class="cursor-pointer text-xs px-2.5 py-1.5 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 peer-checked:bg-emerald-500/20 peer-checked:text-emerald-200 peer-checked:ring-emerald-400/30 transition">Rust</label>
                <input id="ps-ts" type="checkbox" class="peer sr-only">
                <label for="ps-ts" class="cursor-pointer text-xs px-2.5 py-1.5 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 peer-checked:bg-emerald-500/20 peer-checked:text-emerald-200 peer-checked:ring-emerald-400/30 transition">TypeScript</label>
                <input id="ps-react" type="checkbox" class="peer sr-only">
                <label for="ps-react" class="cursor-pointer text-xs px-2.5 py-1.5 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 peer-checked:bg-emerald-500/20 peer-checked:text-emerald-200 peer-checked:ring-emerald-400/30 transition">React</label>
                <input id="ps-ui" type="checkbox" class="peer sr-only">
                <label for="ps-ui" class="cursor-pointer text-xs px-2.5 py-1.5 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 peer-checked:bg-emerald-500/20 peer-checked:text-emerald-200 peer-checked:ring-emerald-400/30 transition">UI/UX</label>
                <input id="ps-index" type="checkbox" class="peer sr-only">
                <label for="ps-index" class="cursor-pointer text-xs px-2.5 py-1.5 rounded-md bg-white/5 text-neutral-300 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 peer-checked:bg-emerald-500/20 peer-checked:text-emerald-200 peer-checked:ring-emerald-400/30 transition">Indexing</label>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-sm text-neutral-300">Website</label>
                <input type="url" placeholder="https://your-site.xyz" class="mt-1 w-full bg-neutral-900 border border-white/10 rounded-md px-3 py-2 text-sm placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-white/20 transition">
              </div>
              <div>
                <label class="text-sm text-neutral-300">GitHub</label>
                <input type="url" placeholder="https://github.com/you" class="mt-1 w-full bg-neutral-900 border border-white/10 rounded-md px-3 py-2 text-sm placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-white/20 transition">
              </div>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-xs text-neutral-500">Your timeline will prioritize projects that match selected skills.</p>
              <label for="edit-profile" class="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 text-neutral-200 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">
                <span class="text-sm font-semibold tracking-tight">Save</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile bottom nav (simplified) -->
    <nav class="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-neutral-950/80 backdrop-blur border-t border-white/10">
      <div class="max-w-7xl mx-auto px-6 py-2 grid grid-cols-4 gap-2">
        <a href="#timeline" data-route="timeline" class="flex flex-col items-center gap-1 py-1 text-neutral-300 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m3 9 9-7 9 7"></path><path d="M9 22V12h6v10"></path><path d="M3 10v12h6"></path><path d="M21 10v12h-6"></path></svg>
          <span class="text-[11px]">Timeline</span>
        </a>
        <a href="#bounties" data-route="bounties" class="flex flex-col items-center gap-1 hover:text-white text-neutral-300 pt-1 pb-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 21h8" class=""></path><path d="M12 17v4"></path><path d="M7 4h10v6a5 5 0 0 1-10 0z"></path><path d="M5 9a3 3 0 0 1-3-3V5h3" class=""></path><path d="M19 9a3 3 0 0 0 3-3V5h-3"></path></svg>
          <span class="text-[11px]">Bounties</span>
        </a>
        <a href="#jobs" data-route="jobs" class="flex flex-col items-center gap-1 py-1 text-neutral-300 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path></svg>
          <span class="text-[11px]">Jobs</span>
        </a>
        <label for="create-pool" class="cursor-pointer flex flex-col items-center gap-1 py-1 text-indigo-300 hover:text-indigo-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
          <span class="text-[11px]">New</span>
        </label>
      </div>
    </nav>

    <!-- Footer (simplified) -->
    <footer class="mt-12 border-t border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="h-6 w-6 rounded-md bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center ring-1 ring-white/20">
            <span class="text-[10px] font-semibold tracking-tight">S</span>
          </div>
          <span class="text-sm text-neutral-400">SUIME • Build the future on Sui</span>
        </div>
        <div class="flex items-center gap-4 text-xs text-neutral-500">
          <a href="#" class="hover:text-neutral-300 transition">Docs</a>
          <a href="#" class="hover:text-neutral-300 transition">Safety</a>
          <a href="#" class="hover:text-neutral-300 transition">Terms</a>
          <a href="#" class="hover:text-neutral-300 transition">Privacy</a>
        </div>
      </div>
    </footer>
`;

  // Helper: append a created pool card into the timeline view and navigate there
  function appendPoolCard(data: PoolData) {
    try {
      const container = document.getElementById('center-timeline');
      if (!container) return;

      const title = escapeHtml(data.name || 'New pool');
      const desc = escapeHtml(data.description || '');
      const amount = data.targetAmount ? `${Number(data.targetAmount).toLocaleString()} ${data.token || 'SUI'}` : '—';
      const html = `
      <article class="rounded-xl bg-neutral-900/60 ring-1 ring-white/10 hover:ring-white/20 transition p-5">
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20">Pool</span>
              <span class="text-[11px] text-neutral-400">by You</span>
            </div>
            <h3 class="mt-1 text-base sm:text-lg font-semibold tracking-tight">${title}</h3>
            <p class="mt-1 text-sm text-neutral-400">${desc}</p>
          </div>
          <div class="flex flex-col items-end gap-2">
            <div class="text-sm text-neutral-300">${amount}</div>
            <div class="flex items-center gap-2">
              <button class="px-3 py-2 rounded-md text-sm bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">Details</button>
              <button class="px-3 py-2 rounded-md text-sm bg-indigo-500 text-white hover:bg-indigo-400 transition">Submit work</button>
            </div>
          </div>
        </div>
      </article>
      `;

      // insert at top of timeline list
      container.insertAdjacentHTML('afterbegin', html);

      // close the modal (uncheck the controlling checkbox)
      const checkbox = document.getElementById('create-pool') as HTMLInputElement | null;
      if (checkbox) checkbox.checked = false;

      // navigate to timeline view
      try { location.hash = '#timeline'; } catch (e) { /* ignore */ }
    } catch (e) {
      // silent
      console.error('appendPoolCard error', e);
    }
  }

  // mount the CreateSmartPool React component inside the modal root so the form is functional
  useEffect(() => {
    const el = document.getElementById('create-pool-react-root');
    if (!el) return;
    const root = ReactDOM.createRoot(el);
    root.render(<CreateSmartPool onCreate={(d: PoolData) => appendPoolCard(d)} className="p-5 bg-neutral-950 rounded-2xl" />);
    return () => root.unmount();
  }, []);

  // small helper to avoid HTML injection in the inserted markup
  function escapeHtml(s?: string) {
    if (!s) return '';
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  return (
  // Keep original body classes so colors/typography match the static HTML
  // Ensure the app background fills the full viewport like the original page
  <div className="min-h-screen w-full bg-neutral-950 text-neutral-100 antialiased selection:bg-indigo-500/30 font-[Inter]">
      <GenHeader />
      <GenLanding />

  <main id="app-main" className="hidden w-full px-9 py-8 lg:grid lg:grid-cols-12 gap-4">
        {route !== 'landing' && <GenLeftSidebar />}

        <section className={` ${route === 'landing' ? 'lg:col-span-12' : 'lg:col-span-6'}`}>
          <div className="mx-auto max-w-6xl px-2 sm:px-4 lg:px-6 space-y-6">
            <GenTimeline />
            <GenBounties />
            <GenJobs />
            <GenBuilders />
          </div>
        </section>

        {route !== 'landing' && <GenRightSidebar />}
      </main>

      <div dangerouslySetInnerHTML={{ __html: footerAndModals }} />
    </div>
  );
}

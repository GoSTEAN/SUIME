import React from 'react'
import ConnectWallet from '../components/ConnectWallet'

export default function GenHeader() {
  return (
    <header className="sticky top-0 left-0 w-full z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 bg-neutral-950 border-b border-white/10">
      <div className="w-full h-16 flex items-center justify-between px-9">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          <a href="#landing" className="flex items-center gap-2 group text-white bg-white/5 ring-white/20" data-route="landing">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center ring-1 ring-white/20 shadow-sm">
              <span className="text-xs font-semibold tracking-tight">S</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">SUIME</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            <a href="#timeline" data-route="timeline" className="px-3 py-2 text-sm text-neutral-300 hover:text-white rounded-md hover:bg-white/5 transition-colors">Timeline</a>
            <a href="#bounties" data-route="bounties" className="px-3 py-2 text-sm text-neutral-300 hover:text-white rounded-md hover:bg-white/5 transition-colors">Bounties</a>
            <a href="#jobs" data-route="jobs" className="px-3 py-2 text-sm text-neutral-300 hover:text-white rounded-md hover:bg-white/5 transition-colors">Jobs</a>
            <a href="#builders" data-route="builders" className="px-3 py-2 text-sm text-neutral-300 hover:text-white rounded-md hover:bg-white/5 transition-colors">Builders</a>
          </nav>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6">
          <label className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </span>
            <input type="text" placeholder="Search projects, skills, builders..." className="w-full bg-neutral-900/70 border border-white/10 rounded-md pl-9 pr-3 py-2 text-sm placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-white/20 transition" />
          </label>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <label htmlFor="create-pool" className="hidden sm:inline-flex cursor-pointer items-center gap-2 px-3 py-2 rounded-md bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/15 hover:text-indigo-200 ring-1 ring-indigo-400/20 hover:ring-indigo-400/30 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            <span className="text-sm font-medium">New Pool</span>
          </label>
          <button className="p-2 rounded-md hover:bg-white/5 ring-1 ring-white/10 hover:ring-white/20 transition" aria-label="Notifications">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.7 1.7 0 0 0 3.4 0" />
            </svg>
          </button>
          <label htmlFor="edit-profile" className="cursor-pointer px-3 py-2 rounded-md bg-white/5 text-neutral-200 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition">
            <span className="text-sm font-medium">Update Profile</span>
          </label>

          {/* Connect Wallet component */}
          <ConnectWallet />
        </div>
      </div>
    </header>
  )
}

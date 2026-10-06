"use client";

import {
Bell,
Search,
ChevronDown,
User,
} from "lucide-react";

export default function Navbar() {
return (
<header className="sticky top-0 z-30 h-20 border-b border-slate-800 bg-slate-900 text-white shadow-sm">
<div className="flex h-full items-center justify-between px-6">

    {/* Left */}
    <div>
      <h2 className="text-lg font-semibold">
        Dashboard
      </h2>

      {/* <p className="text-xs text-slate-400">
        Welcome back, Admin
      </p> */}
    </div>

    {/* Center - Search */}
    <div className="hidden w-full max-w-md md:block">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>
    </div>

    {/* Right */}
    <div className="flex items-center gap-4">
      
      {/* Notification */}
      <button
        type="button"
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 transition hover:bg-slate-800 hover:text-white"
      >
        <Bell size={20} />

        {/* Notification dot */}
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-slate-900" />
      </button>

      {/* Divider */}
      <div className="h-8 w-px bg-slate-700" />

      {/* Profile */}
      <button
        type="button"
        className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-800"
      >
        {/* Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white">
          <User size={18} />
        </div>

        {/* User Info */}
        <div className="hidden text-left sm:block">
          <p className="text-sm font-medium text-white">
            Admin
          </p>

          <p className="text-xs text-slate-400">
            Administrator
          </p>
        </div>

        <ChevronDown
          size={16}
          className="text-slate-400"
        />
      </button>
    </div>
  </div>
</header>


);
}
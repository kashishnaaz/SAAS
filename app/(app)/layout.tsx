"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon, MenuIcon, LayoutDashboardIcon,
  Share2Icon, UploadIcon, FilmIcon, Star,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Upload Video" },
];

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-[#06030f] text-[#EDE9FE]">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle"
        checked={sidebarOpen} onChange={() => setSidebarOpen(!sidebarOpen)} />

      <div className="drawer-content flex flex-col">
        {/* NAVBAR */}
        <header className="w-full bg-[#06030f]/90 backdrop-blur-md border-b border-[#7C3AED]/15 sticky top-0 z-30">
          <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label htmlFor="sidebar-drawer" className="btn btn-ghost lg:hidden text-[#A78BFA]">
                <MenuIcon className="h-5 w-5" />
              </label>
              <div onClick={() => router.push("/")}
                className="flex items-center gap-2 cursor-pointer group">
                <Star className="w-4 h-4 fill-[#A78BFA] text-[#A78BFA] group-hover:fill-[#C084FC] transition-colors" />
                <span className="text-base font-black tracking-widest uppercase text-[#A78BFA] group-hover:text-[#C084FC] transition-colors">
                  Cloudinary Showcase
                </span>
              </div>
            </div>

            {user && (
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full ring-2 ring-[#7C3AED]/50 ring-offset-1 ring-offset-[#06030f]">
                    <img src={user.imageUrl} alt="avatar" />
                  </div>
                </div>
                <span className="text-sm text-[#EDE9FE]/50 truncate max-w-[140px] hidden sm:block">
                  {user.username || user.emailAddresses[0].emailAddress}
                </span>
                <button onClick={async () => await signOut()}
                  className="p-2 rounded-full border border-[#7C3AED]/20 hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/10 transition-all text-[#A78BFA]">
                  <LogOutIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side z-40">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <aside className="bg-[#06030f] border-r border-[#7C3AED]/15 w-60 h-full flex flex-col">

          {/* Header */}
          <div className="flex flex-col items-center justify-center py-8 border-b border-[#7C3AED]/15">
            <div className="w-11 h-11 rounded-xl bg-[#7C3AED]/15 border border-[#7C3AED]/30 flex items-center justify-center mb-2.5">
              <FilmIcon className="w-5 h-5 text-[#A78BFA]" />
            </div>
            <h2 className="text-xs font-black tracking-[0.25em] uppercase text-[#A78BFA]">Dashboard</h2>
          </div>

          {/* Menu */}
          <ul className="p-4 w-full flex-grow space-y-1.5 mt-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm
                      ${isActive
                        ? "bg-[#7C3AED] text-white font-bold shadow-lg shadow-[#7C3AED]/25"
                        : "text-[#EDE9FE]/45 hover:text-[#A78BFA] hover:bg-[#7C3AED]/10"
                      }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#7C3AED]/60"}`} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Sign Out */}
          {user && (
            <div className="p-4 border-t border-[#7C3AED]/15">
              <button onClick={async () => await signOut()}
                className="w-full border border-[#7C3AED]/25 hover:bg-[#7C3AED]/10 text-[#A78BFA] py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all">
                <LogOutIcon className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
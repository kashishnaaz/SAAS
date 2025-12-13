"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
} from "lucide-react";

/* Sidebar Items */
const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Upload Video" },
];

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => router.push("/");
  const handleSignOut = async () => await signOut();

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-[#080f01] text-[#E8F6E9]">
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* MAIN CONTENT AREA */}
      <div className="drawer-content flex flex-col">

        {/* 🌿 NAVBAR - Emerald Dark */}
        <header className="w-full bg-[#050b01] border-b border-[#255F38]/40 shadow-md">
          <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            {/* Mobile Toggle + Logo */}
            <div className="flex items-center space-x-4">
              <label
                htmlFor="sidebar-drawer"
                className="btn btn-ghost lg:hidden text-[#E8F6E9] hover:text-emerald-300"
              >
                <MenuIcon className="h-6 w-6" />
              </label>

              <div
                onClick={handleLogoClick}
                className="text-2xl font-extrabold bg-gradient-to-r from-[#4ADF83] to-[#7AFFB2] bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
              >
                Cloudinary Showcase
              </div>
            </div>

            {/* User */}
            {user && (
              <div className="flex items-center space-x-4">
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full ring-2 ring-[#4ADF83] ring-offset-2 ring-offset-[#18230F]">
                    <img src={user.imageUrl} />
                  </div>
                </div>
                <span className="text-sm font-medium text-[#D6F5DD] truncate max-w-[120px] md:max-w-[180px]">
                  {user.username || user.emailAddresses[0].emailAddress}
                </span>

                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-full bg-[#255F38]/40 hover:bg-[#255F38]/70 transition-all text-[#D6F5DD]"
                >
                  <LogOutIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>

      {/* 🧊 SIDEBAR - Pure Emerald */}
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>

        <aside className="bg-[#050c00] border-r border-[#255F38]/40 w-64 h-full flex flex-col shadow-xl">
          
          {/* Sidebar Header */}
          <div className="flex items-center justify-center py-6 border-b border-[#255F38]/40">
            <div className="flex flex-col items-center">
              <ImageIcon className="w-10 h-10 text-[#7AFFB2] mb-1" />
              <h2 className="text-lg font-semibold tracking-wide text-[#A5EEC4]">
                Dashboard
              </h2>
            </div>
          </div>

          {/* Sidebar Menu */}
          <ul className="menu p-4 w-full text-sm flex-grow space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 
                      ${
                        isActive
                          ? "bg-[#255F38] text-[#E8F6E9] shadow-md shadow-[#255F38]/40"
                          : "hover:bg-[#27391C] text-[#BEEBCC]"
                      }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        isActive ? "text-[#E8F6E9]" : "text-[#7AFFB2]"
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Sign Out */}
          {user && (
            <div className="p-4 border-t border-[#255F38]/40">
              <button
                onClick={handleSignOut}
                className="w-full bg-[#255F38] hover:bg-[#2F7548] text-white py-2 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all"
              >
                <LogOutIcon className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

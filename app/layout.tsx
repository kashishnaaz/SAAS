import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VidStream – Explore & Download Videos",
  description: "Discover, upload & optimize videos with a rich dark-emerald cinematic UI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased 
                      bg-[#18230F] text-[#E8F6E9]`}
        >
          {/* 🌿 NAVBAR */}
          <header className="
            w-full 
            h-16 
            bg-[#18230F]/90 
            border-b border-[#255F38]/30 
            shadow-lg shadow-black/30 
            backdrop-blur-md 
            flex justify-between items-center 
            px-6
          ">
            {/* Logo */}
            <h1 className="text-2xl font-bold tracking-wide 
                   bg-gradient-to-r from-[#A9E6BF] to-[#255F38] 
                   bg-clip-text text-transparent">
              Cloudinary Showcase
            </h1>

            {/* Auth buttons */}
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton>
                  <button className="px-5 py-2 rounded-full bg-[#255F38] text-white font-semibold hover:bg-[#2F7545] transition">
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton>
                  <button className="px-5 py-2 rounded-full bg-[#A9E6BF] text-black font-semibold hover:bg-[#8CDFA5] transition">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton appearance={{
                  elements: {
                    userButtonAvatarBox: "ring-2 ring-[#A9E6BF]",
                  }
                }} />
              </SignedIn>
            </div>
          </header>

          {/* 🌿 MAIN CONTENT */}
          <main className="min-h-screen px-4 md:px-8 py-6 bg-[#18230F]">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}

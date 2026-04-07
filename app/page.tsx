"use client";

import { motion } from "framer-motion";
import {
  ArrowRight, Upload, Share2, Film, Zap, Eye,
  Sparkles, Star, ChevronRight, Shield, Download, ImageIcon
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Film className="w-6 h-6" />,
    title: "Smart Video Compression",
    desc: "Cut file sizes by up to 89% — no quality loss, no hassle. Built for web and social.",
  },
  {
    icon: <ImageIcon className="w-6 h-6" />,
    title: "Social Image Generator",
    desc: "Turn any image into platform-perfect crops for Instagram, Twitter, Facebook and more.",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Instant Preview",
    desc: "Hover over any video to catch a 15-second glimpse before you commit to downloading.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    desc: "Cloud-powered processing means your results are ready in seconds, not minutes.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Private",
    desc: "Every upload is protected behind Clerk authentication — your content, only yours.",
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "One-Click Download",
    desc: "Grab the original or compressed version anytime, straight from your library.",
  },
];

const steps = [
  { num: "01", title: "Upload Your Content", desc: "Drop in a video (up to 70MB) or an image. Add a title and description to keep things organised." },
  { num: "02", title: "Compress or Create", desc: "Let our cloud engine shrink your video — or generate social-ready image crops in any format." },
  { num: "03", title: "Download & Share", desc: "Preview your result, download it instantly, or publish it straight to your social channels." },
];

const stats = [
  { value: "89%", label: "Avg Compression" },
  { value: "70MB", label: "Max Upload" },
  { value: "5+", label: "Social Formats" },
  { value: "100%", label: "Secure" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#06030f] text-[#EDE9FE] overflow-x-hidden">

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed top-[-10%] left-[30%] w-[600px] h-[600px] rounded-full bg-[#7C3AED]/12 blur-[160px] z-0" />
      <div className="pointer-events-none fixed top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#4C1D95]/15 blur-[140px] z-0" />
      <div className="pointer-events-none fixed bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full bg-[#6D28D9]/10 blur-[120px] z-0" />

      {/* ══ NAVBAR ══ */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-5 border-b border-[#7C3AED]/15 bg-[#06030f]/80 backdrop-blur-md sticky top-0">
        <motion.div
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center">
            <Star className="w-4 h-4 fill-[#A78BFA] text-[#A78BFA]" />
          </div>
          <span className="text-lg font-black tracking-widest uppercase text-[#A78BFA]">
            Cloudinary Showcase
          </span>
        </motion.div>
        <motion.div
          className="flex gap-3 items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/sign-in"
            className="px-5 py-2 rounded-full text-sm border border-[#A78BFA] text-[#EDE9FE]/80 hover:text-[#A78BFA] hover:border-[#A78BFA] transition-all">
            Sign In
          </Link>
          <Link href="/sign-up"
            className="px-5 py-2.5 rounded-full bg-[#7C3AED] text-white text-sm font-bold hover:bg-[#6D28D9] transition-all shadow-lg shadow-[#7C3AED]/30">
            Start Now →
          </Link>
        </motion.div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-20">

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-[#7C3AED]/15 border border-[#7C3AED]/30 px-5 py-2 rounded-full text-xs text-[#A78BFA] tracking-[0.15em] uppercase mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles size={12} className="text-[#C084FC]" /> Videos · Images · Social — All in One
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-5xl sm:text-7xl font-black leading-[1.05] mb-6 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="text-white">Compress, Create</span>
          <br />
          <span style={{
            background: "linear-gradient(110deg, #C084FC 0%, #A78BFA 40%, #7C3AED 70%, #C084FC 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200%",
          }}>
            & Share with Confidence
          </span>
        </motion.h1>

        <motion.p
          className="text-[#EDE9FE]/45 text-lg max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Shrink videos by up to 89%. Craft social-ready images for every platform.
          One powerful workspace — upload, optimise, and publish in under 60 seconds.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/video-upload"
            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#7C3AED] text-white font-bold hover:bg-[#6D28D9] transition-all shadow-xl shadow-[#7C3AED]/30 text-sm">
            <Upload size={16} /> Upload & Compress
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/home"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#7C3AED]/30 text-[#A78BFA] hover:bg-[#7C3AED]/10 transition-all text-sm">
            See It in Action <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center py-6 rounded-2xl 
           bg-[#7C3AED]/8 border border-[#7C3AED]/15 backdrop-blur-sm

           hover:bg-[#7C3AED]/15 
          hover:border-[#7C3AED]/40
          hover:shadow-[0_0_25px_rgba(124,58,237,0.35)]
          hover:-translate-y-2

transition-all duration-300 ease-out cursor-pointer">
              <span className="text-3xl font-black bg-gradient-to-b from-[#C084FC] to-[#7C3AED] bg-clip-text text-transparent">{s.value}</span>
              <span className="text-[10px] text-[#EDE9FE]/30 mt-1.5 tracking-widest uppercase text-center">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="px-6 py-24">

<h2 className="text-3xl font-bold mb-10 text-2xl text-center text-white">
  Everything You Need to Create & Share
</h2>
  <div className="max-w-5xl mx-auto space-y-20">

```
{features.map((f, i) => (
  <div
    key={i}
    className={`flex flex-col md:flex-row items-center gap-10 
    ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
  >

    {/* ICON BOX */}
    <div className="w-24 h-24 rounded-3xl bg-[#7C3AED]/15 
      flex items-center justify-center text-[#A78BFA]
      shadow-lg shadow-[#7C3AED]/20">

      {f.icon}
    </div>

    {/* TEXT */}
    <div className="max-w-md text-center md:text-left">
      <h3 className="text-2xl font-bold mb-3 text-white">
        {f.title}
      </h3>

      <p className="text-[#EDE9FE]/50 text-sm leading-relaxed">
        {f.desc}
      </p>
    </div>

  </div>
))}
```

  </div>
</section>


      {/* ══ HOW IT WORKS ══ */}
      <section className="px-6 py-24">
        <h2 className="text-3xl font-bold mb-10 text-center text-white">
  Get Started in 3 Simple Steps
</h2>
  <div className="max-w-3xl mx-auto relative">

```
{/* vertical line */}
<div className="absolute left-4 top-0 bottom-0 w-[2px] bg-[#7C3AED]/30"></div>

<div className="space-y-12">

  {steps.map((s, i) => (
    <div key={i} className="flex items-start gap-6">

      {/* circle */}
      <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center text-xs font-bold">
        {s.num}
      </div>

      {/* content */}
      <div>
        <h3 className="text-lg font-bold text-white mb-1">
          {s.title}
        </h3>
        <p className="text-sm text-[#EDE9FE]/50">
          {s.desc}
        </p>
      </div>

    </div>
  ))}

</div>
```

  </div>
</section>


      {/* ══ CTA BANNER ══ */}
      <section className="relative z-10 px-6 py-20">
        <motion.div
          className="max-w-4xl mx-auto text-center rounded-3xl border border-[#7C3AED]/25 overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #0d0520 0%, #130830 50%, #0d0520 100%)" }}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Inner glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#7C3AED]/20 blur-[80px]" />

          <div className="relative z-10 p-16">
            <div className="w-14 h-14 rounded-2xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center mx-auto mb-6">
              <Upload className="w-6 h-6 text-[#A78BFA]" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Your content deserves
              <br />
              <span style={{
                background: "linear-gradient(90deg, #C084FC, #A78BFA, #C084FC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>to look its best.</span>
            </h2>
            <p className="text-[#EDE9FE]/40 mb-8 text-sm">
              No credit card needed. Upload, compress, and share in under 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-[#7C3AED] text-white font-black hover:bg-[#6D28D9] transition-all shadow-2xl shadow-[#7C3AED]/35 text-sm">
                Upload My First Video <ArrowRight size={16} />
              </Link>
              <Link href="/sign-in"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full border border-[#7C3AED]/30 text-[#A78BFA] hover:bg-[#7C3AED]/10 transition-all text-sm">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="relative z-10 px-8 py-8 border-t border-[#7C3AED]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 fill-[#A78BFA] text-[#A78BFA]" />
          <span className="text-[#A78BFA] font-black tracking-widest text-sm uppercase">Cloudinary Showcase</span>
        </div>
        <div className="flex gap-6 text-xs text-[#EDE9FE]/25">
          <Link href="/home" className="hover:text-[#A78BFA] transition-colors">Library</Link>
          <Link href="/video-upload" className="hover:text-[#A78BFA] transition-colors">Upload</Link>
          <Link href="/social-share" className="hover:text-[#A78BFA] transition-colors">Social Creator</Link>
        </div>
        <span className="text-[#EDE9FE]/20 text-xs">© 2026 — Crafted with precision</span>
      </footer>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Upload, Image, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#081001] text-[#E8F5E9]">

      {/* ===================== HERO ===================== */}
      <section className="relative px-6 py-28 sm:py-36 overflow-hidden">

        {/* DARK EMERALD BLOBS */}
        <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#255F38]/20 rounded-full blur-[200px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-[#27391C]/30 rounded-full blur-[220px] -z-10" />

        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-[#27391C]/60 backdrop-blur-md px-4 py-2 rounded-full text-sm border border-[#255F38]/30 shadow">
            <Sparkles className="text-[#A9E6BF]" size={16} />
            Ultra Dark Emerald Studio
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl font-extrabold mt-6 leading-tight text-[#A9E6BF]">
            Optimize, Compress &  
            <span className="text-[#255F38]"> Manage Videos </span>
            — Seamlessly
          </h1>

          <p className="mt-6 text-lg text-[#B6D8C3]/80 max-w-2xl mx-auto">
            Speed up your workflow with fast uploads, smart compression and easy downloads.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/video-upload"
              className="h-12 px-8 rounded-full bg-[#255F38] text-[#E8F5E9] font-medium shadow-lg hover:bg-[#1C4D2E] transition-all flex items-center gap-2 justify-center"
            >
              <Upload size={18} /> Upload Video
            </Link>

            <Link
              href="/home"
              className="h-12 px-8 rounded-full border border-[#A9E6BF]/30 text-[#A9E6BF] font-medium hover:bg-[#255F38]/10 transition-all flex items-center gap-2 justify-center"
            >
              Explore Library <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        {/* ===== CENTERPIECE: DARK EMERALD ORBIT ===== */}
        <motion.div
          className="mx-auto mt-24 relative w-full max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="relative flex justify-center items-center">
            
            {/* Outer Ring */}
            <motion.div
              className="w-80 h-80 rounded-full border-[14px] border-[#27391C]/50 shadow-[0_0_40px_#27391C77]"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
            />

            {/* Middle Ring */}
            <motion.div
              className="absolute w-52 h-52 rounded-full border-[10px] border-[#255F38]/40"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            />

            {/* Energy Core */}
            <motion.div
              className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#255F38] to-[#18230F] shadow-[0_0_50px_#255F3899]"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
          </div>
        </motion.div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section className="px-6 py-20 bg-[#0e1c07] text-[#E8F5E9]">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl font-bold text-[#A9E6BF]">Dark. Clean. Powerful.</h2>
          <p className="text-[#A9E6BF]/70 mt-3 mb-12">
            A futuristic studio interface built for creators.
          </p>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 text-left">
            {[
              {
                icon: <PlayCircle className="w-10 h-10 text-[#A9E6BF]" />,
                title: "Cinematic Compression",
                desc: "Dark-mode magic preserving smooth clarity.",
              },
              {
                icon: <Image className="w-10 h-10 text-[#A9E6BF]" />,
                title: "Emerald Social Covers",
                desc: "Generate posters inspired by deep forest tones.",
              },
              {
                icon: <Upload className="w-10 h-10 text-[#A9E6BF]" />,
                title: "Smooth Drag & Drop",
                desc: "Upload with seamless dark UI transitions.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-xl bg-[#18230F] border border-[#255F38]/20 shadow hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                {f.icon}
                <h3 className="mt-4 font-semibold text-xl text-[#A9E6BF]">{f.title}</h3>
                <p className="text-[#A9E6BF]/70 text-sm mt-2">{f.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="px-6 py-10 text-center text-[#A9E6BF]/70 bg-[#18230F]">
        © 2025 Emerald Studio — Crafted in deep darkness.
      </footer>

    </div>
  );
}

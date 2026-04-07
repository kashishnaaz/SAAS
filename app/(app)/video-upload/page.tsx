"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UploadCloud, Loader2, Film } from "lucide-react";

export default function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const MAX_FILE_SIZE = 70 * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) { alert("⚠️ File size exceeds 70MB limit."); return; }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());
    try {
      await axios.post("/api/video-upload", formData);
      router.push("/home");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to upload video. Try again.");
    } finally { setIsUploading(false); }
  };

  return (
    <motion.div className="min-h-[80vh] flex flex-col items-center justify-center py-14 px-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

      <motion.div className="text-center mb-10"
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center gap-2 bg-[#7C3AED]/15 border border-[#7C3AED]/25 px-4 py-1.5 rounded-full text-xs text-[#A78BFA] tracking-widest uppercase mb-5">
          <Film size={12} /> Upload Studio
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white">
          Upload Your{" "}
          <span style={{
            background: "linear-gradient(90deg, #C084FC, #A78BFA)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Video</span>
        </h1>
        <p className="text-[#EDE9FE]/35 mt-2 text-sm">Max 70MB • Auto-compressed by Cloudinary</p>
      </motion.div>

      <motion.div
        className="w-full max-w-xl bg-white/[0.02] border border-[#7C3AED]/15 rounded-2xl shadow-xl backdrop-blur-md p-8 space-y-5"
        initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-1.5 text-xs font-semibold text-[#A78BFA] uppercase tracking-widest">Video Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#7C3AED]/6 border border-[#7C3AED]/20 text-[#EDE9FE] placeholder-[#EDE9FE]/20 focus:outline-none focus:border-[#A78BFA]/50 transition-all text-sm"
              placeholder="Enter video title..." required />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold text-[#A78BFA] uppercase tracking-widest">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#7C3AED]/6 border border-[#7C3AED]/20 text-[#EDE9FE] placeholder-[#EDE9FE]/20 focus:outline-none focus:border-[#A78BFA]/50 transition-all text-sm resize-none"
              placeholder="Short description..." rows={3} />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold text-[#A78BFA] uppercase tracking-widest">Select Video</label>
            <div className="w-full px-4 py-3 rounded-xl bg-[#7C3AED]/6 border border-[#7C3AED]/20 border-dashed">
              <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full text-[#EDE9FE]/50 text-sm file:mr-3 file:px-3 file:py-1 file:rounded-lg file:border-0 file:bg-[#7C3AED]/25 file:text-[#A78BFA] file:text-xs file:font-semibold cursor-pointer"
                required />
            </div>
            {file && (
              <p className="text-xs text-[#A78BFA]/70 mt-1.5">
                ✓ {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <motion.button type="submit" disabled={isUploading} whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-white font-black bg-[#7C3AED] hover:bg-[#6D28D9] transition-all shadow-lg shadow-[#7C3AED]/25 disabled:opacity-40 text-sm">
            {isUploading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
              : <><UploadCloud className="w-4 h-4" /> Upload Video</>}
          </motion.button>

          {isUploading && (
            <div className="text-center">
              <div className="w-full h-0.5 bg-[#7C3AED]/15 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-[#7C3AED] to-[#C084FC] rounded-full"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} />
              </div>
              <p className="text-xs text-[#EDE9FE]/25 mt-2">Please wait... this may take a moment ⏳</p>
            </div>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}
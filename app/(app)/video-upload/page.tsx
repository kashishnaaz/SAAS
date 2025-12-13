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
  const MAX_FILE_SIZE = 70 * 1024 * 1024; // 70 MB

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("⚠️ File size exceeds 70MB limit.");
      return;
    }

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
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center py-14 px-6 bg-[#060d00] text-[#E8F6E9]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold mb-8 text-center tracking-wide bg-gradient-to-r from-[#A9E6BF] to-[#255F38] bg-clip-text text-transparent"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Film className="w-9 h-9 inline mr-3 text-[#255F38]" />
        Upload Your Video
      </motion.h1>

      {/* Upload Card */}
      <motion.div
        className="w-full max-w-2xl bg-[#27391C]/60 border border-[#255F38]/40 rounded-2xl shadow-xl shadow-black/50 backdrop-blur-xl p-8 space-y-6"
        initial={{ scale: 0.94 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#A9E6BF]">
              Video Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full input bg-[#18230F] border border-[#255F38]/40 text-[#E8F6E9] focus:border-[#A9E6BF] rounded-lg"
              placeholder="Enter video title..."
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#A9E6BF]">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full textarea bg-[#18230F] border border-[#255F38]/40 text-[#E8F6E9] focus:border-[#A9E6BF] rounded-lg"
              placeholder="Enter a short description..."
              rows={3}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#A9E6BF]">
              Select Video File
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full file-input bg-[#18230F] border border-[#255F38]/40 text-[#E8F6E9]"
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isUploading}
            whileTap={{ scale: 0.96 }}
            className="w-full py-3 rounded-lg flex items-center justify-center gap-2 text-white font-semibold bg-[#255F38] hover:bg-[#1d4a2e] transition-all shadow-lg shadow-black/50 disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <UploadCloud className="w-5 h-5" />
                Upload Video
              </>
            )}
          </motion.button>

          {/* Progress */}
          {isUploading && (
            <div className="mt-3">
              <progress className="progress w-full bg-[#18230F] progress-success"></progress>
              <p className="text-sm text-center text-[#A9E6BF] mt-2">
                Please wait... uploading your video ⏳
              </p>
            </div>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}


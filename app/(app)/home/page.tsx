"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Video } from "@prisma/client";
import VideoCard from "@/components/VideoCard";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, Film } from "lucide-react";
import { useUser } from "@clerk/nextjs";

function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const hasReloaded = sessionStorage.getItem("hasReloadedAfterAuth");
      if (!hasReloaded) {
        sessionStorage.setItem("hasReloadedAfterAuth", "true");
        window.location.reload();
      }
    }
  }, [isLoaded, isSignedIn]);

  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get("/api/videos");
      if (Array.isArray(response.data)) setVideos(response.data);
      else throw new Error("Unexpected response format");
    } catch (error) {
      console.error(error);
      setError("Unable to fetch videos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && isSignedIn) fetchVideos();
    else if (isLoaded && !isSignedIn) setLoading(false);
  }, [fetchVideos, isLoaded, isSignedIn]);

  const handleDownload = useCallback((url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title}.mp4`);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  }, []);

  if (loading || !isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-[#A78BFA]">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-lg font-semibold text-[#EDE9FE]/50">Loading your videos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-red-400">
        <AlertCircle className="w-14 h-14 mb-4" />
        <p className="text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-[#EDE9FE]/30">
        <div className="w-20 h-20 rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center mb-6">
          <Film className="w-10 h-10 text-[#7C3AED]/50" />
        </div>
        <p className="text-xl text-white font-bold">No videos yet</p>
        <p className="text-sm text-[#EDE9FE]/30 mt-2">Upload your first video to get started 🎬</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <p className="text-[#A78BFA] text-xs tracking-[0.2em] uppercase mb-1">Your Collection</p>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Film className="w-7 h-7 text-[#7C3AED]" />
            Video Library
          </h1>
        </div>
        <div className="mt-3 sm:mt-0 px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-sm text-[#A78BFA]">
          {videos.length} video{videos.length !== 1 && "s"}
        </div>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        initial="hidden" animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {videos.map((video) => (
          <motion.div key={video.id}
            variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}>
            <VideoCard video={video} onDownload={handleDownload} onDelete={handleDelete} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Home;
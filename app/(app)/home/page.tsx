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

  // -------------------------- THEMED UI --------------------------

  // Loading
  if (loading || !isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#18230F] text-[#A9E6BF]">
        <Loader2 className="w-14 h-14 animate-spin mb-4 text-[#255F38]" />
        <p className="text-xl font-semibold">Loading your videos...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#18230F] text-red-400">
        <AlertCircle className="w-16 h-16 mb-4" />
        <p className="text-xl font-semibold">{error}</p>
      </div>
    );
  }

  // Empty
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#354b22] text-[#A9E6BF]">
        <Film className="w-20 h-20 mb-6 text-[#255F38]/70" />
        <p className="text-xl">No videos uploaded yet.</p>
        <p className="text-[#A9E6BF]/60 mt-2">Upload your first video to get started 🎥</p>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-[#040900] text-[#EAF7F0] px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-4xl font-extrabold flex items-center gap-3 text-[#A9E6BF] tracking-wide">
          <Film className="w-9 h-9 text-[#255F38]" />
          Your Video Library
        </h1>

        <p className="text-[#A9E6BF]/70 mt-3 sm:mt-0 text-lg">
          {videos.length} video{videos.length > 1 && "s"} available
        </p>
      </div>

      {/* GRID */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {videos.map((video) => (
          <motion.div
            key={video.id}
            variants={{
              hidden: { opacity: 0, y: 35 },
              visible: { opacity: 1, y: 0 },
            }}
            className="hover:scale-[1.03] transition-transform duration-300"
          >
            <VideoCard video={video} onDownload={handleDownload} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Home;


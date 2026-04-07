"use client";

import React, { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";
import { Upload, Download, Palette, Loader2 } from "lucide-react";

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};

type SocialFormat = keyof typeof socialFormats;

export default function SocialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (uploadedImage) setIsTransforming(true);
  }, [selectedFormat, uploadedImage]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/image-upload", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Failed to upload image");
      const data = await response.json();
      setUploadedImage(data.publicId);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image 😢");
    } finally { setIsUploading(false); }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;
    fetch(imageRef.current.src)
      .then((r) => r.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <motion.div
      className="min-h-[80vh] flex flex-col items-center py-10 px-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

      {/* Title */}
      <motion.div className="text-center mb-10"
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center gap-2 bg-[#7C3AED]/15 border border-[#7C3AED]/25 px-4 py-1.5 rounded-full text-xs text-[#A78BFA] tracking-widest uppercase mb-5">
          <Palette size={12} /> Social Creator
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white">
          Social Media{" "}
          <span style={{
            background: "linear-gradient(90deg, #C084FC, #A78BFA)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Image Builder</span>
        </h1>
        <p className="text-[#EDE9FE]/35 mt-2 text-sm">Generate perfectly sized images for every platform</p>
      </motion.div>

      {/* Card */}
      <motion.div
        className="bg-white/[0.02] border border-[#7C3AED]/15 rounded-2xl backdrop-blur-xl shadow-xl w-full max-w-3xl p-6 space-y-6"
        initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>

        {/* Upload */}
        <div>
          <h2 className="text-sm font-bold text-[#A78BFA] uppercase tracking-widest mb-3 flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload an Image
          </h2>
          <div className="w-full px-4 py-3 rounded-xl bg-[#7C3AED]/6 border border-[#7C3AED]/20 border-dashed">
            <input type="file" onChange={handleFileUpload}
              className="w-full text-[#EDE9FE]/50 text-sm file:mr-3 file:px-3 file:py-1 file:rounded-lg file:border-0 file:bg-[#7C3AED]/25 file:text-[#A78BFA] file:text-xs file:font-semibold cursor-pointer" />
          </div>
          {isUploading && (
            <div className="mt-3 w-full h-0.5 bg-[#7C3AED]/15 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-[#7C3AED] to-[#C084FC]"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} />
            </div>
          )}
        </div>

        {/* Transform */}
        {uploadedImage && (
          <motion.div className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

            {/* Format select */}
            <div>
              <h2 className="text-sm font-bold text-[#A78BFA] uppercase tracking-widest mb-3">Select Format</h2>
              <select
                className="w-full px-4 py-3 rounded-xl bg-[#7C3AED]/6 border border-[#7C3AED]/20 text-[#EDE9FE] focus:outline-none focus:border-[#A78BFA]/50 transition-all text-sm"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as SocialFormat)}>
                {Object.keys(socialFormats).map((f) => (
                  <option key={f} value={f} className="bg-[#0d0520]">{f}</option>
                ))}
              </select>
            </div>

            {/* Preview */}
            <div>
              <h3 className="text-sm font-bold text-[#A78BFA] uppercase tracking-widest mb-3">Preview</h3>
              <div className="relative flex justify-center items-center rounded-xl overflow-hidden border border-[#7C3AED]/20 p-3 bg-[#7C3AED]/4">
                {isTransforming && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#06030f]/70 backdrop-blur-sm z-10">
                    <Loader2 className="w-8 h-8 animate-spin text-[#A78BFA]" />
                  </div>
                )}
                <CldImage
                  width={socialFormats[selectedFormat].width}
                  height={socialFormats[selectedFormat].height}
                  src={uploadedImage}
                  crop="fill"
                  aspectRatio={socialFormats[selectedFormat].aspectRatio}
                  gravity="auto"
                  ref={imageRef}
                  onLoad={() => setIsTransforming(false)}
                  className="rounded-lg shadow-lg"
                  alt="Transformed image" />
              </div>
            </div>

            {/* Download */}
            <div className="flex justify-end">
              <button onClick={handleDownload}
                className="px-6 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center gap-2 text-sm font-bold shadow-md shadow-[#7C3AED]/25 transition-all">
                <Download className="w-4 h-4" />
                Download for {selectedFormat}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
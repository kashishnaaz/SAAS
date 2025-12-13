"use client";

import React, { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";
import { Upload, Download, Palette } from "lucide-react";

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
  const [selectedFormat, setSelectedFormat] =
    useState<SocialFormat>("Instagram Square (1:1)");
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
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");
      const data = await response.json();
      setUploadedImage(data.publicId);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image 😢");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((response) => response.blob())
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
      className="min-h-screen bg-[#040900] text-[#E8F6E9] flex flex-col items-center py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-center mb-6 tracking-wide bg-gradient-to-r from-[#A9E6BF] to-[#255F38] bg-clip-text text-transparent"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Palette className="w-8 h-8 inline mr-3 text-[#255F38]" />
        Social Media Image Builder
      </motion.h1>

      {/* Card Container */}
      <motion.div
        className="bg-[#27391C]/50 border border-[#255F38]/40 rounded-2xl backdrop-blur-xl shadow-xl shadow-[#000]/40 w-full max-w-3xl p-6 space-y-6"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Upload Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-[#A9E6BF]">
            <Upload className="w-5 h-5 text-[#255F38]" /> Upload an Image
          </h2>
          <input
            type="file"
            onChange={handleFileUpload}
            className="file-input w-full border border-[#255F38]/40 bg-[#18230F] text-[#A9E6BF]"
          />

          {isUploading && (
            <div className="mt-4">
              <progress className="progress w-full bg-[#18230F] progress-success"></progress>
            </div>
          )}
        </div>

        {/* Transformation Section */}
        {uploadedImage && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Format Selection */}
            <div>
              <h2 className="text-xl font-semibold mb-3 text-[#A9E6BF]">Select Format</h2>
              <select
                className="select w-full border border-[#255F38]/40 bg-[#18230F] text-[#A9E6BF]"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as SocialFormat)}
              >
                {Object.keys(socialFormats).map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Preview */}
            <div>
              <h3 className="text-lg font-medium mb-2 text-[#A9E6BF]">Preview</h3>
              <div className="relative flex justify-center items-center rounded-xl overflow-hidden border border-[#255F38]/30 p-3 bg-[#18230F]/70 shadow-inner shadow-[#000]/50">
                {isTransforming && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#18230F]/70 backdrop-blur-sm z-10">
                    <span className="loading loading-spinner loading-lg text-[#A9E6BF]"></span>
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
                  className="rounded-lg shadow-lg shadow-[#000]/50 hover:scale-[1.02] transition-transform"
                  alt="Transformed image"
                />
              </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-end">
              <button
                className="px-6 py-2 rounded-lg bg-[#255F38] hover:bg-[#1d4a2e] text-white flex items-center gap-2 shadow-md shadow-[#000]/60 transition-all"
                onClick={handleDownload}
              >
                <Download className="w-5 h-5" />
                Download for {selectedFormat}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

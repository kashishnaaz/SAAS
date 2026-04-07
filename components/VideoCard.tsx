"use client";

import React, { useState, useCallback } from "react";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import { Download, Clock, FileDown, FileUp, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { filesize } from "filesize";
import { Video } from "@prisma/client";

dayjs.extend(relativeTime);

interface VideoCardProps {
  video: Video;
  onDownload: (url: string, title: string) => void;
  onDelete: (id: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getThumbnailUrl = useCallback((publicId: string) =>
    getCldImageUrl({ src: publicId, width: 400, height: 225, crop: "fill", gravity: "auto", format: "jpg", quality: "auto", assetType: "video" }), []);

  const getFullVideoUrl = useCallback((publicId: string) =>
    getCldVideoUrl({ src: publicId, width: 1920, height: 1080 }), []);

  const getPreviewVideoUrl = useCallback((publicId: string) =>
    getCldVideoUrl({ src: publicId, width: 400, height: 225, rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"] }), []);

  const formatSize = useCallback((size: number) => filesize(size), []);
  const formatDuration = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, []);

  const compressionPercentage = Math.round(
    (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
  );

  const handleDelete = async () => {
    if (!confirm("Delete this video?")) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/videos/${video.id}`, { method: "DELETE" });
      if (res.ok) onDelete(video.id);
      else alert("Failed to delete video.");
    } catch { alert("Error deleting video."); }
    finally { setIsDeleting(false); }
  };

  return (
    <div
      className="group rounded-2xl overflow-hidden bg-white/[0.02] border border-[#7C3AED]/12 hover:border-[#A78BFA]/35 shadow-lg hover:shadow-[#7C3AED]/15 transition-all duration-400"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <figure className="aspect-video relative overflow-hidden bg-[#0d0520]">
        {isHovered ? (
          previewError ? (
            <div className="w-full h-full flex items-center justify-center text-[#EDE9FE]/20 text-sm">Preview unavailable</div>
          ) : (
            <video src={getPreviewVideoUrl(video.publicId)} autoPlay muted loop
              className="w-full h-full object-cover scale-105 transition-transform duration-500"
              onError={() => setPreviewError(true)} />
          )
        ) : (
          <img src={getThumbnailUrl(video.publicId)} alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06030f]/70 via-transparent to-transparent" />
        <div className="absolute bottom-2 right-2 bg-[#06030f]/70 backdrop-blur-md border border-[#7C3AED]/20 px-2 py-1 rounded-lg text-xs text-[#A78BFA] flex items-center gap-1">
          <Clock size={11} />
          {formatDuration(video.duration)}
        </div>
      </figure>

      {/* Body */}
      <div className="p-4 space-y-3">
        <h2 className="text-base font-bold text-white line-clamp-1">{video.title}</h2>
        <p className="text-xs text-[#EDE9FE]/35 line-clamp-2">{video.description || "No description."}</p>
        <p className="text-[10px] text-[#EDE9FE]/20 uppercase tracking-widest">{dayjs(video.createdAt).fromNow()}</p>

        {/* Size info */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 bg-[#7C3AED]/6 rounded-xl px-3 py-2.5 border border-[#7C3AED]/10">
            <FileUp size={13} className="text-[#7C3AED]/60" />
            <div>
              <div className="text-[10px] text-[#EDE9FE]/30 uppercase tracking-wide">Original</div>
              <div className="text-xs text-[#EDE9FE]/60 font-medium">{formatSize(Number(video.originalSize))}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#7C3AED]/6 rounded-xl px-3 py-2.5 border border-[#7C3AED]/10">
            <FileDown size={13} className="text-[#A78BFA]" />
            <div>
              <div className="text-[10px] text-[#EDE9FE]/30 uppercase tracking-wide">Compressed</div>
              <div className="text-xs text-[#A78BFA] font-medium">{formatSize(Number(video.compressedSize))}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-[#7C3AED]/10">
          <span className="text-xs text-[#EDE9FE]/30">
            Saved <span className="text-[#A78BFA] font-bold">{compressionPercentage}%</span>
          </span>
          <div className="flex gap-2">
            <button onClick={handleDelete} disabled={isDeleting}
              className="p-2 rounded-lg border border-red-500/15 text-red-400/50 hover:text-red-400 hover:border-red-400/35 hover:bg-red-500/8 transition-all disabled:opacity-30">
              <Trash2 size={13} />
            </button>
            <button onClick={() => onDownload(getFullVideoUrl(video.publicId), video.title)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7C3AED] text-white text-xs font-bold hover:bg-[#6D28D9] transition-all shadow-md shadow-[#7C3AED]/25">
              <Download size={12} /> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
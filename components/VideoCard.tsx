import React, { useState, useEffect, useCallback } from "react";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import { Download, Clock, FileDown, FileUp } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { filesize } from "filesize";
import { Video } from "@prisma/client";

dayjs.extend(relativeTime);

interface VideoCardProps {
  video: Video;
  onDownload: (url: string, title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const getThumbnailUrl = useCallback((publicId: string) => {
    return getCldImageUrl({
      src: publicId,
      width: 400,
      height: 225,
      crop: "fill",
      gravity: "auto",
      format: "jpg",
      quality: "auto",
      assetType: "video",
    });
  }, []);

  const getFullVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 1920,
      height: 1080,
    });
  }, []);

  const getPreviewVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 400,
      height: 225,
      rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"],
    });
  }, []);

  const formatSize = useCallback((size: number) => filesize(size), []);
  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  const compressionPercentage = Math.round(
    (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
  );

  useEffect(() => setPreviewError(false), [isHovered]);
  const handlePreviewError = () => setPreviewError(true);

  return (
    <div
      className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-500/50 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Thumbnail / Preview */}
      <figure className="aspect-video relative overflow-hidden">
        {isHovered ? (
          previewError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-300">
              <p>Preview not available</p>
            </div>
          ) : (
            <video
              src={getPreviewVideoUrl(video.publicId)}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover transition-transform duration-500 scale-105"
              onError={handlePreviewError}
            />
          )
        ) : (
          <img
            src={getThumbnailUrl(video.publicId)}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        )}

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs text-gray-200 flex items-center shadow-md">
          <Clock size={14} className="mr-1 text-cyan-400" />
          {formatDuration(video.duration)}
        </div>
      </figure>

      {/* Card Body */}
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-semibold text-white line-clamp-1">
          {video.title}
        </h2>
        <p className="text-sm text-gray-400 line-clamp-2">
          {video.description || "No description available."}
        </p>

        <p className="text-xs text-gray-500">
          Uploaded <span className="text-cyan-400">{dayjs(video.createdAt).fromNow()}</span>
        </p>

        {/* File Size Info */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-300 mt-2">
          <div className="flex items-center space-x-2">
            <FileUp size={16} className="text-blue-400" />
            <div>
              <div className="text-xs font-semibold">Original</div>
              <div className="text-xs">{formatSize(Number(video.originalSize))}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FileDown size={16} className="text-cyan-400" />
            <div>
              <div className="text-xs font-semibold">Compressed</div>
              <div className="text-xs">{formatSize(Number(video.compressedSize))}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-white/10">
          <span className="text-sm text-gray-400">
            Compression:{" "}
            <span className="text-cyan-400 font-semibold">
              {compressionPercentage}%
            </span>
          </span>
          <button
            onClick={() =>
              onDownload(getFullVideoUrl(video.publicId), video.title)
            }
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-1 hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-md hover:shadow-cyan-500/40"
          >
            <Download size={14} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

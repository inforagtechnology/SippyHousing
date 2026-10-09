import { useEffect, useMemo, useState } from "react";
import { Play, X } from "lucide-react";
import { getVideoLabel, parseVideoUrl } from "@/lib/video";

/**
 * Video tiles that sit INSIDE the photo gallery grid, looking like the photos
 * (same square size). Clicking a tile opens a popup – exactly like clicking a photo –
 * and the video plays there. Nothing redirects to YouTube / Instagram.
 */
export const VideoGridItems = ({ links }: { links: string[] }) => {
  const videos = useMemo(() => (links || []).filter(Boolean).map(parseVideoUrl), [links]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIndex(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  if (videos.length === 0) return null;
  const cur = openIndex !== null ? videos[openIndex] : null;
  const isInstagram = cur?.provider === "instagram";

  return (
    <>
      {videos.map((v, i) => (
        <button
          key={`${v.url}-${i}`}
          type="button"
          onClick={() => setOpenIndex(i)}
          aria-label={`Play video ${i + 1}`}
          className="relative aspect-square overflow-hidden rounded-lg bg-gray-900 group"
        >
          {v.thumbnail && (
            <img src={v.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" loading="lazy" />
          )}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white/90 group-hover:bg-white rounded-full p-4 shadow-lg">
              <Play className="h-7 w-7 text-sippy-charcoal fill-current" />
            </span>
          </span>
          <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
            {getVideoLabel(v.provider)}
          </span>
        </button>
      ))}

      {cur && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close video"
            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className={`w-full ${isInstagram ? "max-w-[420px]" : "max-w-4xl"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {cur.embedUrl && cur.provider === "file" ? (
              <video key={cur.url} src={cur.embedUrl} controls autoPlay playsInline className="w-full aspect-video bg-black rounded-lg" />
            ) : cur.embedUrl ? (
              <iframe
                key={cur.url}
                src={cur.embedUrl}
                title={`${getVideoLabel(cur.provider)} video`}
                className={`w-full rounded-lg bg-black ${isInstagram ? "h-[75vh]" : "aspect-video"}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <div className="bg-black text-white rounded-lg aspect-video flex flex-col items-center justify-center gap-2 p-6 text-center">
                <p className="text-sm opacity-80">This video link can't be played inside the page.</p>
                <a href={cur.url} target="_blank" rel="noopener noreferrer" className="text-sippy-gold underline">Open video</a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoGridItems;

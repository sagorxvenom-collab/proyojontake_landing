import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Youtube, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

function VideoModal({
  videos,
  startIdx,
  onClose,
}: {
  videos: { id: string; title: string; sub: string; category: string; catColor: string }[];
  startIdx: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);
  const video = videos[idx];

  const prev = useCallback(() => setIdx(i => (i - 1 + videos.length) % videos.length), [videos.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % videos.length), [videos.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 12 }}
          transition={{ type: "spring", stiffness: 340, damping: 28 }}
          className="w-full max-w-4xl flex flex-col gap-0 rounded-2xl overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Top bar */}
          <div className="bg-gray-950 flex items-center justify-between px-4 py-3 gap-4">
            <div className="min-w-0 flex-1">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${video.catColor} inline-block mb-1`}>
                {video.category}
              </span>
              <p className="text-white font-semibold text-sm truncate">{video.title}</p>
              <p className="text-white/50 text-xs">{video.sub}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                title="YouTube এ দেখুন"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-red-500/80 text-white/70 hover:text-white transition-colors"
                aria-label="বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Video iframe */}
          <div className="relative aspect-video bg-black">
            <iframe
              key={video.id + idx}
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="w-full h-full absolute inset-0"
            />

            {/* Prev / Next arrows */}
            {videos.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                  aria-label="আগের ভিডিও"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                  aria-label="পরের ভিডিও"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {videos.length > 1 && (
            <div className="bg-gray-900 px-4 py-3 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-white/20">
              {videos.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`shrink-0 relative rounded-lg overflow-hidden w-24 aspect-video transition-all ${
                    i === idx
                      ? "ring-2 ring-secondary scale-105"
                      : "opacity-60 hover:opacity-90"
                  }`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                    alt={v.title}
                    className="w-full h-full object-cover"
                  />
                  {i === idx && (
                    <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Videos() {
  const { content } = useSiteContent();
  const videos = content.videos;
  const [modalIdx, setModalIdx] = useState<number | null>(null);

  if (!videos.length) return null;

  return (
    <section id="videos" className="py-10 md:py-14 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Class Videos</p>
            <h3 className="text-xl md:text-2xl font-bold text-foreground">ক্লাস ভিডিও সমূহ</h3>
          </div>
          <a
            href={content.contact.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl transition-colors text-xs shadow"
          >
            <Youtube className="w-4 h-4" />
            YouTube চ্যানেল
          </a>
        </div>

        {/* Video grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {videos.map((v, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              onClick={() => setModalIdx(idx)}
              className="group relative rounded-2xl overflow-hidden bg-black shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-left w-full"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <img
                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 transition-colors duration-300" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-white transition-all duration-300">
                    <Play className="w-5 h-5 text-primary fill-primary ml-0.5" />
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-2 left-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${v.catColor}`}>
                    {v.category}
                  </span>
                </div>

                {/* YouTube badge */}
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  <Youtube className="w-2.5 h-2.5 text-red-500" />
                  YT
                </div>
              </div>

              {/* Info */}
              <div className="bg-gray-950 px-3 py-2.5">
                <p className="text-white text-xs font-semibold leading-snug line-clamp-2">{v.title}</p>
                <p className="text-white/50 text-[10px] mt-0.5">{v.sub}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Hint text */}
        <p className="text-center text-xs text-muted-foreground mt-4 font-bangla">
          যেকোনো ভিডিওতে ক্লিক করুন — popup এ চলবে
        </p>
      </div>

      {/* Modal */}
      {modalIdx !== null && (
        <VideoModal
          videos={videos}
          startIdx={modalIdx}
          onClose={() => setModalIdx(null)}
        />
      )}
    </section>
  );
}

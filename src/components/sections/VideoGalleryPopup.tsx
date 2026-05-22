import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Youtube, ChevronLeft, ChevronRight, ExternalLink, Tv2 } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

const SESSION_KEY = "proyojontake_video_popup_seen";

export function VideoGalleryPopup() {
  const { content } = useSiteContent();
  const videos = content.videos;
  const [open, setOpen] = useState(false);
  const [playIdx, setPlayIdx] = useState<number | null>(null);

  /* Auto-open once per session */
  useEffect(() => {
    if (!videos.length) return;
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 1800);
    return () => clearTimeout(t);
  }, [videos.length]);

  const close = useCallback(() => {
    setOpen(false);
    setPlayIdx(null);
    document.body.style.overflow = "";
  }, []);

  const prevVideo = useCallback(() =>
    setPlayIdx(i => i !== null ? (i - 1 + videos.length) % videos.length : 0),
    [videos.length]);
  const nextVideo = useCallback(() =>
    setPlayIdx(i => i !== null ? (i + 1) % videos.length : 0),
    [videos.length]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (playIdx !== null && e.key === "ArrowLeft") prevVideo();
      if (playIdx !== null && e.key === "ArrowRight") nextVideo();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, playIdx, prevVideo, nextVideo]);

  if (!videos.length) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="vg-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
          style={{ background: "rgba(5,10,24,0.88)", backdropFilter: "blur(10px)" }}
          onClick={close}
        >
          <motion.div
            key="vg-panel"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={e => e.stopPropagation()}
          >

            {/* ── Header ── */}
            <div className="bg-gray-950 flex items-center justify-between px-5 py-3.5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-600/20 flex items-center justify-center">
                  <Tv2 className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base leading-none">ক্লাস ভিডিও সমূহ</h3>
                  <p className="text-white/40 text-xs mt-0.5">{videos.length}টি ভিডিও • Class Videos</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={content.contact.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5" /> YouTube চ্যানেল
                </a>
                <button
                  onClick={close}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Player view (when a video is selected) ── */}
            <AnimatePresence mode="wait">
              {playIdx !== null ? (
                <motion.div
                  key="player"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col bg-black flex-1 overflow-hidden"
                >
                  {/* iframe */}
                  <div className="relative" style={{ aspectRatio: "16/9" }}>
                    <iframe
                      key={videos[playIdx].id + playIdx}
                      src={`https://www.youtube.com/embed/${videos[playIdx].id}?autoplay=1&rel=0&modestbranding=1`}
                      title={videos[playIdx].title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      className="w-full h-full absolute inset-0"
                    />
                    {/* Prev / Next */}
                    <button onClick={prevVideo} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextVideo} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Video info + back */}
                  <div className="bg-gray-950 px-5 py-3 flex items-center justify-between gap-3 shrink-0">
                    <div className="min-w-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1 ${videos[playIdx].catColor}`}>{videos[playIdx].category}</span>
                      <p className="text-white font-semibold text-sm truncate">{videos[playIdx].title}</p>
                      <p className="text-white/45 text-xs">{videos[playIdx].sub}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a href={`https://www.youtube.com/watch?v=${videos[playIdx].id}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button onClick={() => setPlayIdx(null)} className="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl transition-colors">
                        ← সব ভিডিও
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail strip */}
                  <div className="bg-gray-900 px-4 py-2.5 flex gap-2 overflow-x-auto shrink-0">
                    {videos.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setPlayIdx(i)}
                        className={`shrink-0 relative rounded-lg overflow-hidden transition-all ${i === playIdx ? "ring-2 ring-secondary scale-105 opacity-100" : "opacity-55 hover:opacity-80"}`}
                        style={{ width: 80, aspectRatio: "16/9" }}
                      >
                        <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" />
                        {i === playIdx && (
                          <div className="absolute inset-0 bg-secondary/25 flex items-center justify-center">
                            <Play className="w-3 h-3 text-white fill-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* ── Grid view ── */
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gray-900 overflow-y-auto flex-1 p-4"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {videos.map((v, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        onClick={() => setPlayIdx(i)}
                        className="group relative rounded-xl overflow-hidden bg-black shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-left w-full"
                      >
                        {/* Thumbnail */}
                        <div className="relative" style={{ aspectRatio: "16/9" }}>
                          <img
                            src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                            alt={v.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                          {/* Play circle */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                              <Play className="w-4 h-4 text-red-600 fill-red-600 ml-0.5" />
                            </div>
                          </div>
                          {/* Category */}
                          <div className="absolute top-1.5 left-1.5">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${v.catColor}`}>{v.category}</span>
                          </div>
                          {/* YT badge */}
                          <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                            <Youtube className="w-2.5 h-2.5 text-red-500" />
                          </div>
                        </div>
                        {/* Info */}
                        <div className="bg-gray-950 px-2.5 py-2">
                          <p className="text-white text-xs font-semibold leading-snug line-clamp-2">{v.title}</p>
                          <p className="text-white/40 text-[10px] mt-0.5">{v.sub}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <p className="text-center text-white/35 text-xs mt-4 font-bangla">
                    যেকোনো ভিডিওতে ক্লিক করুন — সরাসরি এখানেই চলবে
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

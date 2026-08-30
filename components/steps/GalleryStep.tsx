"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { config } from "@/config";

interface GalleryItem {
  type: "photo" | "video";
  src: string;
}

interface GalleryStepProps {
  onComplete: () => void;
}

export default function GalleryStep({ onComplete }: GalleryStepProps) {
  const items: GalleryItem[] = [
    ...config.gallery.photos.map((src) => ({ type: "photo" as const, src })),
    ...config.gallery.videos.map((src) => ({ type: "video" as const, src })),
  ];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const featuredVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isAutoplay || items.length === 0) return;

    autoplayRef.current = setInterval(() => {
      setCurrentSlideIndex((current) => (current + 1) % items.length);
    }, 5000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isAutoplay, items.length]);

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 px-4 py-8"
      >
        <div className="text-center">
          <p className="mb-6 text-lg text-gray-300">Add photos and videos to /public/memories/</p>
          <button
            type="button"
            onClick={onComplete}
            className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-4 font-bold text-white shadow-lg shadow-pink-500/30 transition hover:scale-105"
          >
            Continue →
          </button>
        </div>
      </motion.div>
    );
  }

  const currentItem = items[currentSlideIndex];
  const goToPrevious = () => {
    setCurrentSlideIndex((current) => (current - 1 + items.length) % items.length);
    setIsAutoplay(false);
  };
  const goToNext = () => {
    setCurrentSlideIndex((current) => (current + 1) % items.length);
    setIsAutoplay(false);
  };
  const enableVideoAudio = (video: HTMLVideoElement) => {
    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1;
  };
  const enableFeaturedVideoSound = () => {
    const video = featuredVideoRef.current;
    if (!video) return;

    enableVideoAudio(video);
    void video.play().catch(() => {
      // The visible video controls remain available if the browser blocks playback.
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950/95 via-purple-950/90 to-slate-900/95 px-4 py-10 sm:py-14"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center sm:mb-10"
        >
          <p className="mb-3 inline-flex rounded-full border border-pink-300/30 bg-pink-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-pink-200">
            Our story in moments
          </p>
          <h1 className="font-romantic text-4xl text-white sm:text-5xl md:text-6xl">Our Beautiful Memories</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            Every photo holds a little piece of our favourite story.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55 }}
          className="relative rounded-[2rem] bg-gradient-to-br from-pink-300/60 via-purple-300/30 to-rose-300/60 p-px shadow-2xl shadow-pink-950/40"
        >
          <div className="overflow-hidden rounded-[calc(2rem-1px)] bg-slate-950/75 p-2 backdrop-blur-xl sm:p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.65rem] bg-slate-800 sm:aspect-[16/9]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideIndex}
                  initial={{ opacity: 0, scale: 1.035 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 cursor-zoom-in"
                  onClick={() => setSelectedIndex(currentSlideIndex)}
                >
                  {currentItem.type === "photo" ? (
                    <img
                      src={currentItem.src}
                      alt={`Memory ${currentSlideIndex + 1}`}
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.src = "/placeholder.jpg";
                      }}
                    />
                  ) : (
                    <video
                      ref={featuredVideoRef}
                      src={currentItem.src}
                      className="h-full w-full object-cover"
                      controls
                      playsInline
                      onClick={(event) => event.stopPropagation()}
                      onLoadedMetadata={(event) => enableVideoAudio(event.currentTarget)}
                      onPlay={(event) => enableVideoAudio(event.currentTarget)}
                      onError={(event) => {
                        event.currentTarget.poster = "/placeholder.jpg";
                      }}
                    />
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-200">
                    {currentItem.type === "photo" ? "Photo memory" : "Video memory"}
                  </p>
                  <p className="mt-1 text-lg font-semibold sm:text-2xl">A moment to keep forever</p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Previous memory"
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-slate-950/55 px-3 py-2 text-xl text-white backdrop-blur-md transition hover:scale-105 hover:bg-pink-500 sm:left-5"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next memory"
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-slate-950/55 px-3 py-2 text-xl text-white backdrop-blur-md transition hover:scale-105 hover:bg-pink-500 sm:right-5"
              >
                →
              </button>
              {currentItem.type === "video" && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    enableFeaturedVideoSound();
                  }}
                  className="absolute right-3 top-3 z-20 rounded-full border border-white/30 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-pink-500 sm:right-5 sm:top-5"
                >
                  🔊 Enable sound
                </button>
              )}
            </div>

            <div className="flex gap-1.5 px-2 pb-1 pt-3 sm:gap-2 sm:px-3">
              {items.map((item, index) => (
                <button
                  key={`${item.src}-${index}`}
                  type="button"
                  aria-label={`Show memory ${index + 1}`}
                  onClick={() => {
                    setCurrentSlideIndex(index);
                    setIsAutoplay(false);
                  }}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${index === currentSlideIndex ? "bg-pink-400 shadow-[0_0_12px_rgba(244,114,182,0.85)]" : "bg-white/20 hover:bg-white/45"}`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6"
        >
          {items.map((item, index) => (
            <button
              key={`${item.src}-thumbnail-${index}`}
              type="button"
              onClick={() => {
                setCurrentSlideIndex(index);
                setIsAutoplay(false);
              }}
              className={`group relative aspect-square overflow-hidden rounded-2xl border transition-all duration-300 ${index === currentSlideIndex ? "scale-[1.03] border-pink-300 ring-2 ring-pink-400/50" : "border-white/10 opacity-70 hover:-translate-y-1 hover:border-pink-300/70 hover:opacity-100"}`}
            >
              {item.type === "photo" ? (
                <img
                  src={item.src}
                  alt={`Memory thumbnail ${index + 1}`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  onError={(event) => {
                    event.currentTarget.src = "/placeholder.jpg";
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-700 to-pink-600 text-2xl text-white">▶</div>
              )}
            </button>
          ))}
        </motion.section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setIsAutoplay((playing) => !playing)}
            className={`rounded-full border px-6 py-3 text-sm font-semibold transition ${isAutoplay ? "border-pink-300 bg-pink-500 text-white shadow-lg shadow-pink-500/30" : "border-white/15 bg-white/10 text-slate-100 hover:border-pink-300/60 hover:bg-white/15"}`}
          >
            {isAutoplay ? "Pause slideshow" : "Play slideshow"}
          </button>
          <button
            type="button"
            onClick={onComplete}
            className="rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 px-7 py-3 font-bold text-white shadow-lg shadow-pink-500/30 transition hover:scale-[1.03] hover:shadow-pink-500/50"
          >
            Continue to your wishes →
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl"
            >
              {items[selectedIndex].type === "photo" ? (
                <img src={items[selectedIndex].src} alt="Full-size memory" className="max-h-[90vh] w-full object-contain" />
              ) : (
                <video
                  src={items[selectedIndex].src}
                  controls
                  playsInline
                  onLoadedMetadata={(event) => enableVideoAudio(event.currentTarget)}
                  onPlay={(event) => enableVideoAudio(event.currentTarget)}
                  className="max-h-[90vh] w-full"
                />
              )}
              <button
                type="button"
                aria-label="Close full-size memory"
                onClick={() => setSelectedIndex(null)}
                className="absolute right-4 top-4 rounded-full border border-white/20 bg-slate-950/70 px-3 py-1.5 text-lg text-white backdrop-blur-md transition hover:bg-pink-500"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

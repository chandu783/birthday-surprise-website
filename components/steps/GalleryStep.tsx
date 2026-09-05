
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/config";
import { fadeInUp } from "@/lib/animations";

interface GalleryStepProps {
  onComplete: () => void;
}

type GalleryItem =
  | {
      type: "photo";
      src: string;
      index: number;
    }
  | {
      type: "video";
      src: string;
      index: number;
    };

const captions = [
  "Beautiful You ♡",
  "My Favorite Girl ♡",
  "So Precious ♡",
  "A Beautiful Memory ♡",
  "You Make Me Smile ♡",
  "My Happiness ♡",
  "Simply Beautiful ♡",
  "Forever Special ♡",
  "The Birthday Girl ♡",
  "My Heart ♡",
];

const sparklePositions = [
  { left: "5%", top: "12%", size: 5, delay: 0 },
  { left: "12%", top: "34%", size: 3, delay: 0.7 },
  { left: "20%", top: "8%", size: 4, delay: 1.2 },
  { left: "29%", top: "22%", size: 3, delay: 0.4 },
  { left: "39%", top: "9%", size: 5, delay: 1.7 },
  { left: "49%", top: "18%", size: 3, delay: 0.9 },
  { left: "61%", top: "7%", size: 4, delay: 1.5 },
  { left: "72%", top: "26%", size: 5, delay: 0.2 },
  { left: "82%", top: "12%", size: 3, delay: 1.1 },
  { left: "92%", top: "32%", size: 5, delay: 0.5 },
  { left: "8%", top: "67%", size: 4, delay: 1.8 },
  { left: "18%", top: "83%", size: 3, delay: 0.3 },
  { left: "31%", top: "72%", size: 5, delay: 1.4 },
  { left: "46%", top: "88%", size: 3, delay: 0.8 },
  { left: "57%", top: "76%", size: 4, delay: 1.9 },
  { left: "69%", top: "91%", size: 3, delay: 0.6 },
  { left: "81%", top: "70%", size: 5, delay: 1.3 },
  { left: "94%", top: "84%", size: 4, delay: 0.1 },
];

const hearts = [
  { left: "7%", top: "22%", delay: 0 },
  { left: "91%", top: "19%", delay: 1.2 },
  { left: "4%", top: "76%", delay: 2 },
  { left: "95%", top: "67%", delay: 0.8 },
  { left: "24%", top: "92%", delay: 1.7 },
  { left: "76%", top: "8%", delay: 0.5 },
];

export default function GalleryStep({ onComplete }: GalleryStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [videoSound, setVideoSound] = useState(true);

  /*
   * Combine photos + videos into ONE gallery.
   */
  const galleryItems = useMemo<GalleryItem[]>(() => {
    const photos = Array.isArray(config.gallery.photos)
      ? config.gallery.photos
      : [];

    const videos = Array.isArray(config.gallery.videos)
      ? config.gallery.videos
      : [];

    return [
      ...photos.map((src: string, index: number) => ({
        type: "photo" as const,
        src,
        index,
      })),
      ...videos.map((src: string, index: number) => ({
        type: "video" as const,
        src,
        index,
      })),
    ];
  }, []);

  const currentItem = galleryItems[currentIndex];

  /*
   * Move to next memory.
   */
  const nextMemory = () => {
    if (galleryItems.length === 0) return;

    setCurrentIndex((prev) =>
      prev === galleryItems.length - 1 ? 0 : prev + 1
    );
  };

  /*
   * Move to previous memory.
   */
  const previousMemory = () => {
    if (galleryItems.length === 0) return;

    setCurrentIndex((prev) =>
      prev === 0 ? galleryItems.length - 1 : prev - 1
    );
  };

  /*
   * Keyboard navigation.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextMemory();
      }

      if (event.key === "ArrowLeft") {
        previousMemory();
      }

      if (event.key === "Escape") {
        setFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [galleryItems.length]);

  /*
   * Fullscreen selected media.
   */
  const openFullscreen = () => {
    setFullscreen(true);
  };

  if (galleryItems.length === 0) {
    return (
      <motion.main
        {...fadeInUp}
        className="min-h-screen flex items-center justify-center bg-[#fdf7f4] px-6"
      >
        <div className="text-center">
          <h1 className="font-romantic text-5xl text-[#b86b78]">
            Her Beautiful Moments
          </h1>

          <p className="mt-4 text-[#725b61]">
            Add some beautiful memories to your gallery.
          </p>

          <button
            onClick={onComplete}
            className="mt-8 rounded-full bg-[#d97988] px-8 py-3 font-semibold text-white shadow-lg"
          >
            Continue →
          </button>
        </div>
      </motion.main>
    );
  }

  return (
    <motion.main
      {...fadeInUp}
      className="relative min-h-screen overflow-hidden bg-[#fbf5f1] px-4 py-7 text-[#4a3438] sm:px-6 lg:px-10"
    >
      {/* =========================================================
          SIMPLE BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft pink light */}
        <motion.div
          className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Soft cream light */}
        <motion.div
          className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl"
          animate={{
            x: [0, -35, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =====================================================
            SPARKLES
        ===================================================== */}

        {sparklePositions.map((sparkle, index) => (
          <motion.span
            key={`sparkle-${index}`}
            className="absolute rounded-full bg-white shadow-[0_0_12px_4px_rgba(244,114,182,0.35)]"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              width: sparkle.size,
              height: sparkle.size,
            }}
            animate={{
              opacity: [0.15, 1, 0.2],
              scale: [0.7, 1.5, 0.7],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* =====================================================
            FLOATING HEARTS
        ===================================================== */}

        {hearts.map((heart, index) => (
          <motion.span
            key={`heart-${index}`}
            className="absolute text-pink-300/70"
            style={{
              left: heart.left,
              top: heart.top,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.25, 0.85, 0.25],
              scale: [0.8, 1.1, 0.8],
              rotate: [-8, 8, -8],
            }}
            transition={{
              duration: 4.5,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ♡
          </motion.span>
        ))}
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <section className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Header */}

        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-7 text-center sm:mb-10"
        >
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#b98770] sm:text-xs">
            A Little Birthday Surprise
          </p>

          <h1 className="font-romantic text-5xl leading-none text-[#c96f82] sm:text-6xl md:text-7xl">
            Her Beautiful Moments
          </h1>

          <p className="mx-auto mt-3 max-w-xl font-serif text-sm italic text-[#80696e] sm:text-base">
            Every memory of you is my favorite.
          </p>

          <div className="mx-auto mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[#d99a9f]/60" />
            <span className="text-xl text-[#d97988]">♡</span>
            <span className="h-px w-16 bg-[#d99a9f]/60" />
          </div>
        </motion.header>

        {/* =========================================================
            MAIN COLLAGE
        ========================================================= */}

        <div className="relative mx-auto max-w-6xl">
          {/* Left card */}

          {galleryItems.length > 1 && (
            <motion.button
              type="button"
              onClick={previousMemory}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="absolute left-0 top-1/2 z-30 hidden -translate-x-2/3 -translate-y-1/2 rounded-full border border-[#e7a6ad] bg-white/90 p-4 text-2xl text-[#c96f82] shadow-lg backdrop-blur-sm md:block"
              aria-label="Previous memory"
            >
              ←
            </motion.button>
          )}

          {/* Right card */}

          {galleryItems.length > 1 && (
            <motion.button
              type="button"
              onClick={nextMemory}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="absolute right-0 top-1/2 z-30 hidden translate-x-2/3 -translate-y-1/2 rounded-full border border-[#e7a6ad] bg-white/90 p-4 text-2xl text-[#c96f82] shadow-lg backdrop-blur-sm md:block"
              aria-label="Next memory"
            >
              →
            </motion.button>
          )}

          {/* Main Polaroid */}

          <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentItem.type}-${currentItem.src}`}
                initial={{
                  opacity: 0,
                  scale: 0.94,
                  rotate: -1,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative mx-auto w-full max-w-2xl"
              >
                {/* Pink glow */}

                <div className="absolute -inset-4 rounded-[2rem] bg-pink-300/20 blur-2xl" />

                {/* Polaroid */}

                <div className="relative rotate-[-0.5deg] rounded-sm bg-[#fffdfa] p-3 pb-7 shadow-[0_18px_50px_rgba(92,55,60,0.20)] sm:p-4 sm:pb-9">
                  {/* Tape */}

                  <div className="absolute -top-3 left-1/2 z-20 h-8 w-28 -translate-x-1/2 rotate-[-2deg] bg-pink-200/75 shadow-sm" />

                  {/* =================================================
                      FIXED MEDIA AREA
                      
                      Portrait images are now displayed completely.
                      No face/body cropping.
                  ================================================= */}

                  <div className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-[#eadfd9] sm:min-h-[560px]">
                    {currentItem.type === "photo" ? (
                      <motion.img
                        key={currentItem.src}
                        src={currentItem.src}
                        alt="Beautiful birthday memory"
                        className="h-auto max-h-[75vh] w-full object-contain"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 1.2,
                          ease: "easeOut",
                        }}
                      />
                    ) : (
                      <video
                        key={currentItem.src}
                        src={currentItem.src}
                        controls
                        playsInline
                        preload="metadata"
                        muted={!videoSound}
                        className="max-h-[75vh] w-full object-contain"
                      />
                    )}

                    {/* Video label */}

                    {currentItem.type === "video" && (
                      <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-[#d95f7a] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg">
                        Video
                      </div>
                    )}

                    {/* Fullscreen */}

                    <button
                      type="button"
                      onClick={openFullscreen}
                      className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-2 text-sm text-[#805c63] shadow-lg backdrop-blur-sm transition-transform hover:scale-105"
                      aria-label="Fullscreen"
                    >
                      ⛶
                    </button>
                  </div>

                  {/* Caption */}

                  <div className="mt-4 text-center">
                    <p className="font-romantic text-2xl text-[#76545b] sm:text-3xl">
                      {captions[currentIndex % captions.length]}
                    </p>

                    <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#b99497]">
                      Memory {currentIndex + 1} of {galleryItems.length}
                    </p>
                  </div>

                  {/* Small heart */}

                  <div className="absolute bottom-3 right-5 text-xl text-[#e28796]">
                    ♡
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* =========================================================
              MOBILE NAVIGATION
          ========================================================= */}

          <div className="mt-5 flex items-center justify-center gap-4 md:hidden">
            <button
              type="button"
              onClick={previousMemory}
              className="rounded-full border border-[#e5adb2] bg-white/90 px-5 py-2 text-xl text-[#c96f82] shadow-md"
            >
              ←
            </button>

            <span className="text-xs font-medium text-[#98777c]">
              {currentIndex + 1} / {galleryItems.length}
            </span>

            <button
              type="button"
              onClick={nextMemory}
              className="rounded-full border border-[#e5adb2] bg-white/90 px-5 py-2 text-xl text-[#c96f82] shadow-md"
            >
              →
            </button>
          </div>

          {/* =========================================================
              COMBINED PHOTO + VIDEO THUMBNAILS
          ========================================================= */}

          <div className="mt-7 overflow-x-auto pb-3">
            <div className="flex min-w-max justify-center gap-3 px-4">
              {galleryItems.map((item, index) => (
                <motion.button
                  key={`${item.type}-${item.src}`}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{
                    y: -6,
                    rotate: index % 2 === 0 ? -2 : 2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-24 shrink-0 rounded-sm bg-[#fffdfa] p-2 pb-3 shadow-md transition-all sm:w-28 ${
                    currentIndex === index
                      ? "ring-2 ring-[#df8392] ring-offset-2 ring-offset-[#fbf5f1]"
                      : ""
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden bg-[#eee3df]">
                    {item.type === "photo" ? (
                      <img
                        src={item.src}
                        alt={`Memory ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <>
                        <video
                          src={item.src}
                          muted
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-contain"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white bg-[#df6e87]/90 text-sm text-white shadow-lg">
                            ▶
                          </span>
                        </div>

                        <span className="absolute left-1 top-1 rounded bg-[#d95f7a] px-1.5 py-0.5 text-[7px] font-bold uppercase text-white">
                          VIDEO
                        </span>
                      </>
                    )}
                  </div>

                  <span className="mt-1 block text-[10px] text-[#8d7075]">
                    {item.type === "video" ? "Video" : "Memory"}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Dots */}

          <div className="mt-2 flex justify-center gap-2">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to memory ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "w-6 bg-[#d97988]"
                    : "w-2 bg-[#d9b6b9]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* =========================================================
            BOTTOM CONTROLS
        ========================================================= */}

        <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {currentItem.type === "video" && (
            <button
              type="button"
              onClick={() => setVideoSound((prev) => !prev)}
              className="rounded-full border border-[#e3b1b4] bg-white/80 px-5 py-2 text-sm text-[#76545b] shadow-sm backdrop-blur-sm"
            >
              {videoSound ? "🔊 Sound On" : "🔇 Sound Off"}
            </button>
          )}

          <button
            type="button"
            onClick={openFullscreen}
            className="rounded-full border border-[#e3b1b4] bg-white/80 px-5 py-2 text-sm text-[#76545b] shadow-sm backdrop-blur-sm"
          >
            ⛶ Fullscreen
          </button>
        </div>

        {/* Continue */}

        <div className="mt-7 flex justify-center pb-6">
          <motion.button
            type="button"
            onClick={onComplete}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 10px 30px rgba(217,121,136,0.25)",
            }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-gradient-to-r from-[#d97988] to-[#e49a9e] px-8 py-3.5 text-sm font-semibold text-white shadow-lg sm:px-10 sm:text-base"
          >
            ♡ Continue to Next Surprise →
          </motion.button>
        </div>
      </section>

      {/* =========================================================
          FULLSCREEN VIEW
      ========================================================= */}

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setFullscreen(false)}
          >
            <button
              type="button"
              onClick={() => setFullscreen(false)}
              className="absolute right-5 top-5 z-20 rounded-full bg-white/10 px-4 py-2 text-xl text-white backdrop-blur-md"
            >
              ✕
            </button>

            <div
              className="relative flex max-h-[92vh] max-w-[95vw] flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              {currentItem.type === "photo" ? (
                <img
                  src={currentItem.src}
                  alt="Birthday memory fullscreen"
                  className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
                />
              ) : (
                <video
                  src={currentItem.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
                />
              )}

              <div className="mt-3 text-center font-romantic text-2xl text-white">
                {captions[currentIndex % captions.length]}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EXTRA POLAROID / BACKGROUND DETAILS */}

      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-pink-100/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-48 w-48 rounded-full bg-amber-100/40 blur-3xl" />

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </motion.main>
  );
}

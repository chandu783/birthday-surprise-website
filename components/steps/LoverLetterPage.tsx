"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";
import { fadeInUp } from "@/lib/animations";

interface LoverLetterPageProps {
  onComplete: () => void;
}

export default function LoverLetterPage({
  onComplete,
}: LoverLetterPageProps) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const letterContent = config.letter.content.split("\n");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      },
    },
  };

  const lineVariants = {
    hidden: {
      opacity: 0,
      y: 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const hearts = [
    { left: "7%", top: "18%", size: "18px", delay: 0 },
    { left: "16%", top: "55%", size: "13px", delay: 1.2 },
    { left: "88%", top: "20%", size: "17px", delay: 0.5 },
    { left: "93%", top: "58%", size: "12px", delay: 1.7 },
    { left: "24%", top: "83%", size: "15px", delay: 0.8 },
    { left: "78%", top: "82%", size: "18px", delay: 1.4 },
  ];

  const flowers = [
    { left: "2%", top: "5%", symbol: "🌸", size: 42, delay: 0 },
    { left: "90%", top: "7%", symbol: "🌸", size: 38, delay: 0.8 },
    { left: "4%", top: "73%", symbol: "🌹", size: 42, delay: 1 },
    { left: "91%", top: "70%", symbol: "🌹", size: 40, delay: 0.4 },
  ];

  return (
    <motion.main
      {...fadeInUp}
      className="relative min-h-screen min-h-[100svh] overflow-hidden px-4 py-8 md:py-12"
      style={{
        background:
          "radial-gradient(circle at 50% 25%, #273452 0%, #18223a 42%, #0b1022 100%)",
      }}
    >
      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft romantic glow */}
        <div
          className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(255,45,130,0.12), transparent 68%)",
          }}
        />

        {/* Top pink glow */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: "80%",
            height: "220px",
            background:
              "radial-gradient(ellipse, rgba(255,60,140,0.10), transparent 70%)",
          }}
        />

        {/* Floating hearts */}
        {hearts.map((heart, index) => (
          <motion.div
            key={index}
            className="absolute text-pink-400/50"
            style={{
              left: heart.left,
              top: heart.top,
              fontSize: heart.size,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.25, 0.8, 0.25],
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 4 + index * 0.3,
              repeat: Infinity,
              delay: heart.delay,
            }}
          >
            ♥
          </motion.div>
        ))}

        {/* Flowers */}
        {flowers.map((flower, index) => (
          <motion.div
            key={index}
            className="absolute select-none"
            style={{
              left: flower.left,
              top: flower.top,
              fontSize: flower.size,
              filter: "drop-shadow(0 5px 10px rgba(0,0,0,.3))",
            }}
            animate={{
              y: [0, -8, 0],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: flower.delay,
            }}
          >
            {flower.symbol}
          </motion.div>
        ))}

        {/* Small sparkles */}
        {[...Array(12)].map((_, index) => (
          <motion.span
            key={index}
            className="absolute text-pink-200/60"
            style={{
              left: `${8 + ((index * 17) % 85)}%`,
              top: `${10 + ((index * 23) % 78)}%`,
              fontSize: index % 2 === 0 ? "12px" : "8px",
            }}
            animate={{
              opacity: [0.15, 0.9, 0.15],
              scale: [0.7, 1.2, 0.7],
            }}
            transition={{
              duration: 2.5 + (index % 3),
              repeat: Infinity,
              delay: index * 0.2,
            }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto mb-8 max-w-4xl text-center md:mb-10"
      >
        {/* Small heading */}
        <div className="mb-3 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-pink-400/70 md:w-16" />

          <span className="text-[9px] tracking-[3px] text-pink-200/80 md:text-xs md:tracking-[5px]">
            ♥ SOME WORDS JUST FOR YOU ♥
          </span>

          <div className="h-px w-10 bg-gradient-to-l from-transparent to-pink-400/70 md:w-16" />
        </div>

        {/* Main title */}
        <h1
          className="text-white"
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(48px, 8vw, 82px)",
            lineHeight: 1,
            textShadow:
              "0 0 20px rgba(255,100,180,.35)",
          }}
        >
          A Letter For You{" "}
          <span className="text-pink-400">♡</span>
        </h1>

        {/* Subtitle */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="text-pink-400">♥</span>

          <p
            className="text-sm text-gray-200 md:text-lg"
            style={{
              fontFamily: "Georgia, serif",
            }}
          >
            From my heart to yours
          </p>

          <span className="text-pink-400">♥</span>
        </div>

        <p className="mx-auto mt-3 max-w-md text-xs leading-5 text-gray-400 md:text-sm">
          Sometimes feelings are too beautiful to say out loud...
          <br />
          so I wrote them down just for you.
        </p>
      </motion.header>

      {/* ================================================= */}
      {/* ENVELOPE AREA */}
      {/* ================================================= */}

      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.7,
        }}
        className="relative z-10 mx-auto mb-10 w-full max-w-[620px]"
      >
        {/* Decorative flowers behind envelope */}
        <div className="pointer-events-none absolute -left-3 bottom-3 z-0 text-4xl md:-left-10 md:text-6xl">
          🌸
        </div>

        <div className="pointer-events-none absolute -right-3 bottom-3 z-0 text-4xl md:-right-10 md:text-6xl">
          🌸
        </div>

        {/* ================================================= */}
        {/* ENVELOPE */}
        {/* ================================================= */}

        <motion.div
          whileHover={{
            y: -4,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={() =>
            setIsEnvelopeOpen(!isEnvelopeOpen)
          }
          className="relative mx-auto w-full cursor-pointer"
          style={{
            perspective: "1200px",
          }}
        >
          {/* Envelope shadow */}
          <div
            className="absolute left-1/2 top-5 -z-10 h-full w-[92%] -translate-x-1/2 rounded-3xl"
            style={{
              background:
                "rgba(0,0,0,.35)",
              filter: "blur(25px)",
            }}
          />

          {/* Envelope body */}
          <div
            className="relative overflow-visible rounded-2xl"
            style={{
              aspectRatio: "1.65",
              background:
                "linear-gradient(145deg, #ffdce9 0%, #f8b5cf 45%, #ed8fb2 100%)",
              border:
                "2px solid rgba(255,255,255,.65)",
              boxShadow:
                "0 20px 50px rgba(0,0,0,.35), 0 0 35px rgba(255,60,140,.18)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* ================================================= */}
            {/* LETTER INSIDE ENVELOPE */}
            {/* ================================================= */}

            <motion.div
              initial={false}
              animate={{
                y: isEnvelopeOpen ? "-68%" : "8%",
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-[7%] top-[7%] z-10 flex h-[85%] w-[86%] flex-col items-center justify-center rounded-md px-4 text-center md:px-8"
              style={{
                background:
                  "linear-gradient(135deg,#fffdf8,#fff4f5)",
                boxShadow:
                  "0 5px 18px rgba(0,0,0,.15)",
              }}
            >
              <span className="mb-2 text-pink-400 text-xl">
                ♥
              </span>

              <p
                className="text-sm text-pink-700 md:text-lg"
                style={{
                  fontFamily: "Georgia, serif",
                }}
              >
                A special letter
              </p>

              <p
                className="mt-1 text-xs italic text-pink-500 md:text-sm"
                style={{
                  fontFamily: "Georgia, serif",
                }}
              >
                just for you... ♡
              </p>
            </motion.div>

            {/* ================================================= */}
            {/* ENVELOPE BACK / SIDE */}
            {/* ================================================= */}

            <div
              className="absolute inset-0 z-20 rounded-2xl"
              style={{
                background:
                  "linear-gradient(145deg,#ffcfe0,#f3a1bd)",
                clipPath:
                  "polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%)",
              }}
            />

            {/* ================================================= */}
            {/* LEFT FOLD */}
            {/* ================================================= */}

            <div
              className="absolute bottom-0 left-0 z-30 h-[65%] w-1/2"
              style={{
                background:
                  "linear-gradient(135deg,#f6b2ca,#e98caf)",
                clipPath:
                  "polygon(0 0,100% 100%,0 100%)",
              }}
            />

            {/* ================================================= */}
            {/* RIGHT FOLD */}
            {/* ================================================= */}

            <div
              className="absolute bottom-0 right-0 z-30 h-[65%] w-1/2"
              style={{
                background:
                  "linear-gradient(225deg,#f6b2ca,#e98caf)",
                clipPath:
                  "polygon(100% 0,100% 100%,0 100%)",
              }}
            />

            {/* ================================================= */}
            {/* ENVELOPE FRONT */}
            {/* ================================================= */}

            <div
              className="absolute bottom-0 left-0 z-40 h-[62%] w-full"
              style={{
                background:
                  "linear-gradient(145deg,#ffc5da,#ed91b1)",
                clipPath:
                  "polygon(0 0,50% 55%,100% 0,100% 100%,0 100%)",
              }}
            />

            {/* ================================================= */}
            {/* TOP FLAP */}
            {/* ================================================= */}

            <motion.div
              initial={false}
              animate={{
                rotateX: isEnvelopeOpen ? -180 : 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-0 top-0 z-50 h-[58%] w-full origin-top"
              style={{
                clipPath:
                  "polygon(0 0,100% 0,50% 100%)",
                background:
                  "linear-gradient(145deg,#ffe9f1,#f6b1c9)",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            />

            {/* ================================================= */}
            {/* HEART SEAL */}
            {/* ================================================= */}

            <motion.div
              initial={false}
              animate={{
                scale: isEnvelopeOpen
                  ? 0
                  : [1, 1.06, 1],
              }}
              transition={
                isEnvelopeOpen
                  ? {
                      duration: 0.25,
                    }
                  : {
                      duration: 2,
                      repeat: Infinity,
                    }
              }
              className="absolute left-1/2 top-[50%] z-[60] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full md:h-[70px] md:w-[70px]"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%,#ff789f,#e51967 60%,#a90847)",
                boxShadow:
                  "0 7px 22px rgba(180,10,70,.4), inset 0 2px 4px rgba(255,255,255,.35)",
              }}
            >
              <span className="text-2xl text-white md:text-3xl">
                ♥
              </span>
            </motion.div>

            {/* ================================================= */}
            {/* CLOSED ENVELOPE TEXT */}
            {/* ================================================= */}

            <motion.div
              animate={{
                opacity: isEnvelopeOpen ? 0 : 1,
              }}
              transition={{
                duration: 0.25,
              }}
              className="absolute bottom-[9%] left-0 z-[55] w-full text-center"
            >
              <p
                className="text-sm font-semibold text-pink-700 md:text-xl"
                style={{
                  fontFamily: "Georgia, serif",
                }}
              >
                ♥ Click to Open ♥
              </p>

              <p className="mt-1 text-xs text-pink-800/70 md:text-sm">
                My love letter
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* ================================================= */}
      {/* LETTER */}
      {/* ================================================= */}

      {isEnvelopeOpen && (
        <motion.section
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative z-10 mx-auto mb-10 w-full max-w-4xl"
        >
          {/* Paper shadow */}
          <div
            className="absolute inset-4 -z-10 rounded-3xl"
            style={{
              background: "rgba(0,0,0,.35)",
              filter: "blur(25px)",
            }}
          />

          {/* Paper */}
          <div
            className="relative overflow-hidden rounded-2xl p-5 sm:p-7 md:p-12"
            style={{
              background:
                "linear-gradient(135deg,#fffdf6,#fff6e8,#fffaf4)",
              boxShadow:
                "0 20px 55px rgba(0,0,0,.35)",
              border:
                "1px solid rgba(190,130,80,.25)",
            }}
          >
            {/* ================================================= */}
            {/* PAPER FLOWERS */}
            {/* ================================================= */}

            <div className="pointer-events-none absolute left-1 top-1 text-3xl opacity-80 md:text-5xl">
              🌸
            </div>

            <div className="pointer-events-none absolute right-1 top-1 text-3xl opacity-80 md:text-5xl">
              🌷
            </div>

            <div className="pointer-events-none absolute bottom-1 left-1 text-3xl opacity-80 md:text-5xl">
              🌹
            </div>

            <div className="pointer-events-none absolute bottom-1 right-1 text-3xl opacity-80 md:text-5xl">
              🌸
            </div>

            {/* ================================================= */}
            {/* PAPER DECORATION */}
            {/* ================================================= */}

            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-pink-200" />

              <span className="text-xl text-pink-500">
                ♥
              </span>

              <div className="h-px flex-1 bg-pink-200" />
            </div>

            {/* Title */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-7 text-center"
            >
              <motion.p
                variants={lineVariants}
                className="text-3xl text-pink-600 md:text-4xl"
                style={{
                  fontFamily:
                    "'Great Vibes', cursive",
                }}
              >
                {config.letter.title}
              </motion.p>

              <motion.p
                variants={lineVariants}
                className="mt-2 text-xs uppercase tracking-[3px] text-gray-400"
              >
                A few words from my heart
              </motion.p>
            </motion.div>

            {/* ================================================= */}
            {/* LETTER CONTENT */}
            {/* ================================================= */}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative mx-auto max-w-3xl space-y-4 text-gray-800"
            >
              {letterContent.map((line, index) => (
                <motion.p
                  key={index}
                  variants={lineVariants}
                  className="text-[15px] leading-7 sm:text-base md:text-lg md:leading-8"
                  style={{
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {line || "\u00A0"}
                </motion.p>
              ))}
            </motion.div>

            {/* ================================================= */}
            {/* LETTER END */}
            {/* ================================================= */}

            <div className="mt-8 text-center">
              <div className="mb-3 flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-pink-200" />

                <span className="text-pink-500">
                  ♥
                </span>

                <div className="h-px w-16 bg-pink-200" />
              </div>

              <p
                className="text-2xl text-pink-600 md:text-3xl"
                style={{
                  fontFamily:
                    "'Great Vibes', cursive",
                }}
              >
                With all my love ♡
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* ================================================= */}
      {/* CONTINUE */}
      {/* ================================================= */}

      {isEnvelopeOpen && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.7,
            duration: 0.6,
          }}
          className="relative z-10 mx-auto w-full max-w-md text-center"
        >
          <motion.button
            whileHover={{
              scale: 1.04,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={onComplete}
            className="w-full rounded-full px-7 py-4 text-base font-bold text-white md:text-lg"
            style={{
              background:
                "linear-gradient(90deg,#ed1769,#ff4d91,#ed1769)",
              backgroundSize: "200% 100%",
              boxShadow:
                "0 10px 30px rgba(237,23,105,.35)",
            }}
          >
            Continue to Next Surprise
            <span className="ml-2">→</span>
          </motion.button>

          {/* Quote */}
          <div className="mt-6">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-pink-400/50" />

              <span className="text-pink-400">
                ♥
              </span>

              <div className="h-px w-12 bg-pink-400/50" />
            </div>

            <p
              className="mt-3 text-xs italic text-gray-400 md:text-sm"
              style={{
                fontFamily: "Georgia, serif",
              }}
            >
              “A small letter, but a lifetime of feelings...”
            </p>
          </div>
        </motion.div>
      )}

      {/* ================================================= */}
      {/* BOTTOM DECORATIVE HEARTS */}
      {/* ================================================= */}

      <div className="pointer-events-none relative z-10 mt-8 flex justify-center gap-3 text-pink-400/60">
        <span>♡</span>
        <span>♥</span>
        <span>♡</span>
      </div>
    </motion.main>
  );
}

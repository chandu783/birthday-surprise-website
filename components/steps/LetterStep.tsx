"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";
import { fadeInUp } from "@/lib/animations";
import {
  playAudio,
  setVolume,
  getVolume,
} from "@/lib/audio";

interface LetterStepProps {
  onComplete: () => void;
}

export default function LetterStep({
  onComplete,
}: LetterStepProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolumeState] = useState(getVolume());
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVolume = parseFloat(e.target.value);

    setVolumeState(newVolume);
    setVolume(newVolume);
  };

  const handlePlayAudio = async () => {
    if (!isPlaying) {
      await playAudio();
      setIsPlaying(true);
    }
  };

  return (
    <motion.main
      {...fadeInUp}
      className="relative min-h-screen min-h-[100svh] overflow-hidden flex flex-col items-center px-4 py-8 md:py-12 text-white"
      style={{
        background:
          "radial-gradient(circle at 50% 35%, #252f4d 0%, #18223b 38%, #10172c 70%, #080d1c 100%)",
      }}
    >
      {/* ================================================= */}
      {/* ROMANTIC BACKGROUND */}
      {/* ================================================= */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Pink glow */}
        <div
          className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "420px",
            height: "420px",
            background:
              "radial-gradient(circle, rgba(255,55,135,0.12), transparent 70%)",
          }}
        />

        {/* Stars */}
        <motion.span
          className="absolute left-[12%] top-[15%] text-pink-300 text-xl"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          ✦
        </motion.span>

        <motion.span
          className="absolute left-[28%] top-[25%] text-pink-200"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        >
          ✧
        </motion.span>

        <motion.span
          className="absolute right-[14%] top-[18%] text-pink-300 text-xl"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
          }}
        >
          ✦
        </motion.span>

        <motion.span
          className="absolute right-[8%] top-[45%] text-pink-200"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
          }}
        >
          ✧
        </motion.span>

        {/* Floating hearts */}
        <motion.span
          className="absolute left-[6%] top-[38%] text-pink-500/30 text-3xl"
          animate={{
            y: [0, -20, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        >
          ♡
        </motion.span>

        <motion.span
          className="absolute right-[7%] top-[30%] text-pink-500/30 text-2xl"
          animate={{
            y: [0, -25, 0],
            rotate: [5, -5, 5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
          }}
        >
          ♥
        </motion.span>

        <motion.span
          className="absolute left-[18%] bottom-[18%] text-pink-500/20 text-3xl"
          animate={{
            y: [0, -18, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        >
          ♡
        </motion.span>

        <motion.span
          className="absolute right-[20%] bottom-[20%] text-pink-500/20 text-3xl"
          animate={{
            y: [0, -22, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        >
          ♥
        </motion.span>
      </div>

      {/* ================================================= */}
      {/* TOP DECORATION */}
      {/* ================================================= */}

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 flex items-center justify-center gap-3 mb-4 w-full max-w-xl"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-500/70" />

        <span className="text-pink-400 text-xs">
          ♥
        </span>

        <span className="text-[8px] sm:text-[10px] tracking-[3px] sm:tracking-[4px] text-gray-300 whitespace-nowrap">
          SOME WORDS JUST FOR YOU
        </span>

        <span className="text-pink-400 text-xs">
          ♥
        </span>

        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-500/70" />
      </motion.div>

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <motion.header
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 text-center mb-7 md:mb-9"
      >
        <h1
          className="text-white font-normal leading-none"
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(48px, 7vw, 86px)",
            textShadow:
              "0 0 15px rgba(255,100,170,0.25)",
          }}
        >
          A Letter For You{" "}
          <span className="text-pink-400">
            ♡
          </span>
        </h1>

        <p
          className="mt-3 text-base md:text-xl text-gray-200"
          style={{
            fontFamily: "Georgia, serif",
          }}
        >
          <span className="text-pink-400 mr-2">
            ♥
          </span>

          From my heart to yours

          <span className="text-pink-400 ml-2">
            ♥
          </span>
        </p>

        <p
          className="mt-4 text-xs md:text-sm text-gray-400 leading-relaxed"
          style={{
            fontFamily: "Georgia, serif",
          }}
        >
          Sometimes it's hard to say everything out loud,
          <br />
          so I wrote it down just for you...
        </p>
      </motion.header>

      {/* ================================================= */}
      {/* MAIN AREA */}
      {/* ================================================= */}

      <div className="relative z-10 w-full max-w-6xl flex items-center justify-center gap-8">

        {/* ================================================= */}
        {/* LEFT DECORATION - DESKTOP ONLY */}
        {/* ================================================= */}

        <div className="hidden lg:flex w-40 flex-col items-center">

          {/* Candle */}
          <div
            className="relative w-16 h-20 rounded-lg"
            style={{
              background:
                "linear-gradient(90deg,#d99aae,#fff0f5,#d99aae)",
              boxShadow:
                "0 0 25px rgba(255,100,160,0.15)",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 0.85, 1],
                height: [20, 24, 20],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-5 rounded-full bg-orange-300"
              style={{
                boxShadow:
                  "0 0 12px rgba(255,170,70,0.8)",
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center text-pink-400 text-3xl">
              ♡
            </div>
          </div>

          {/* Note */}
          <div
            className="mt-7 w-28 p-4 text-center rotate-[-4deg]"
            style={{
              background: "#e9b7a8",
              color: "#6d3d44",
              fontFamily: "Georgia, serif",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.25)",
            }}
          >
            <div className="text-[11px] leading-5">
              Good
              <br />
              Things
              <br />
              Take Time
              <br />
              But
              <br />
              You're Always
              <br />
              Worth The Wait
            </div>

            <div className="text-pink-700 mt-1">
              ♡
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* ENVELOPE */}
        {/* ================================================= */}

        <motion.div
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full max-w-[560px] cursor-pointer"
        >

          {/* Decorative flowers */}
          <motion.div
            animate={{
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute -left-5 md:-left-8 top-[42%] z-20 text-pink-300 text-3xl md:text-5xl"
          >
            ✿
          </motion.div>

          <motion.div
            animate={{
              rotate: [5, -5, 5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute -right-5 md:-right-8 top-[42%] z-20 text-pink-300 text-3xl md:text-5xl"
          >
            ✿
          </motion.div>

          <div
            className={`relative w-full overflow-hidden rounded-2xl transition-all duration-700 ${
              isOpen
                ? "shadow-[0_20px_60px_rgba(255,50,130,0.25)]"
                : "shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
            }`}
            style={{
              aspectRatio: "1.55",
              background:
                "linear-gradient(145deg,#ffe5ee,#ffc4d9,#f59aba)",
              border:
                "2px solid rgba(255,255,255,0.65)",
            }}
          >

            {/* Envelope flap */}

            <motion.div
              animate={{
                rotateX: isOpen ? 180 : 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="absolute top-0 left-0 w-full h-[58%] z-30 origin-top"
              style={{
                background:
                  "linear-gradient(145deg,#fff0f5,#ffcbdc)",
                clipPath:
                  "polygon(0 0,100% 0,50% 100%)",
                transformStyle: "preserve-3d",
              }}
            />

            {/* Envelope side folds */}

            <div
              className="absolute bottom-0 left-0 w-full h-[60%] z-10"
              style={{
                background:
                  "linear-gradient(145deg,rgba(255,255,255,0.18),transparent)",
                clipPath:
                  "polygon(0 0,50% 55%,100% 0,100% 100%,0 100%)",
              }}
            />

            {/* Heart seal */}

            <motion.div
              animate={{
                scale: isOpen
                  ? 0
                  : [1, 1.06, 1],
              }}
              transition={{
                duration: isOpen ? 0.3 : 2,
                repeat: isOpen ? 0 : Infinity,
              }}
              className="absolute z-40 left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%,#ff8bb8,#ed1769 60%,#b80d50)",
                boxShadow:
                  "0 6px 25px rgba(210,20,90,0.4)",
              }}
            >
              ♥
            </motion.div>

            {/* CLOSED CONTENT */}

            {!isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-8 md:pb-12 text-center"
              >
                <div className="text-pink-500 text-xl mb-2">
                  ♡
                </div>

                <div
                  className="text-pink-600 text-base md:text-xl font-semibold italic"
                  style={{
                    fontFamily: "Georgia, serif",
                  }}
                >
                  ♥ Click to Open ♥
                </div>

                <div className="text-pink-700/70 text-xs md:text-sm mt-2">
                  My love letter
                </div>
              </motion.div>
            )}

            {/* OPEN LETTER */}

            {isOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.15,
                }}
                className="absolute inset-3 md:inset-5 z-50 rounded-lg overflow-y-auto p-4 md:p-7"
                style={{
                  background:
                    "linear-gradient(135deg,#fffafd,#ffffff)",
                  color: "#4d3540",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.15)",
                }}
              >
                <div
                  className="min-h-full border border-pink-200 rounded-md p-3 md:p-5"
                >

                  <div className="text-center text-pink-500 text-xl mb-1">
                    ♥
                  </div>

                  <h2
                    className="text-center text-pink-600 text-2xl md:text-3xl font-normal mb-4"
                    style={{
                      fontFamily:
                        "'Great Vibes', cursive",
                    }}
                  >
                    {config.letter.title},
                  </h2>

                  <div
                    className="text-xs md:text-sm leading-7 whitespace-pre-wrap text-gray-700"
                    style={{
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {config.letter.content}
                  </div>

                  <div
                    className="text-right mt-5 text-pink-600 text-xl"
                    style={{
                      fontFamily:
                        "'Great Vibes', cursive",
                    }}
                  >
                    With all my love ♡
                  </div>

                </div>
              </motion.div>
            )}

          </div>
        </motion.div>

        {/* ================================================= */}
        {/* RIGHT DECORATION - DESKTOP ONLY */}
        {/* ================================================= */}

        <div className="hidden lg:flex w-40 flex-col items-center">

          {/* Books */}

          <div className="w-40 space-y-1">
            {[
              "My Girl ♡",
              "My Happiness ♡",
              "My Everything ♡",
              "Forever Yours ♡",
            ].map((book) => (
              <div
                key={book}
                className="px-2 py-2.5 rounded text-center text-[11px]"
                style={{
                  background:
                    "linear-gradient(90deg,#241721,#4b2938,#21151e)",
                  border:
                    "1px solid #704557",
                  color: "#e9c4ce",
                  fontFamily:
                    "Georgia, serif",
                  boxShadow:
                    "0 5px 10px rgba(0,0,0,0.25)",
                }}
              >
                {book}
              </div>
            ))}
          </div>

          {/* Lantern */}

          <div
            className="relative mt-7 w-14 h-20 rounded-lg flex items-center justify-center"
            style={{
              background: "#24171b",
              border: "2px solid #704443",
            }}
          >
            <motion.div
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="w-5 h-8 rounded-full bg-orange-300"
              style={{
                boxShadow:
                  "0 0 20px rgba(255,170,70,0.9)",
              }}
            />
          </div>

        </div>
      </div>

      {/* ================================================= */}
      {/* BOTTOM QUOTE */}
      {/* ================================================= */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 text-center mt-6 md:mt-7"
      >
        <p
          className="text-xs md:text-sm text-gray-400 italic"
          style={{
            fontFamily: "Georgia, serif",
          }}
        >
          <span className="text-pink-400 text-lg">
            “
          </span>

          A small letter, but a lifetime of feelings...

          <span className="text-pink-400 text-lg">
            ”
          </span>
        </p>

        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="w-12 md:w-16 h-px bg-pink-500/60" />

          <span className="text-pink-400">
            ♥
          </span>

          <div className="w-12 md:w-16 h-px bg-pink-500/60" />
        </div>
      </motion.div>

      {/* ================================================= */}
      {/* CONTINUE BUTTON */}
      {/* ================================================= */}

      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        onClick={onComplete}
        whileHover={{
          scale: 1.03,
          y: -2,
        }}
        whileTap={{
          scale: 0.97,
        }}
        className="relative z-20 w-full max-w-[560px] mt-5 mb-20 md:mb-6 px-6 py-4 rounded-full text-base md:text-lg font-bold text-white transition-all"
        style={{
          background:
            "linear-gradient(90deg,#f32678,#ff4d91,#f32678)",
          backgroundSize: "200% 100%",
          boxShadow:
            "0 10px 30px rgba(240,35,115,0.3)",
        }}
      >
        One Last Thing... 💍
      </motion.button>

      {/* ================================================= */}
      {/* MUSIC PLAYER */}
      {/* ================================================= */}

      <div className="fixed bottom-5 right-5 z-[100]">

        {/* Desktop panel */}

        <div
          className="hidden md:block absolute bottom-[68px] right-0 w-[300px] p-5 rounded-2xl opacity-0 pointer-events-none translate-y-2 transition-all duration-300 hover:opacity-100 hover:pointer-events-auto hover:translate-y-0"
          style={{
            background: "#151a2b",
            border:
              "1px solid rgba(255,100,160,0.25)",
            boxShadow:
              "0 15px 40px rgba(0,0,0,0.35)",
          }}
        >
          <div className="text-center text-white font-semibold mb-4">
            <span className="text-pink-400 mr-2">
              ♫
            </span>
            Background Music
          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={handlePlayAudio}
              className="w-10 h-10 rounded-full bg-pink-500 text-white"
            >
              {isPlaying ? "♫" : "▶"}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 accent-pink-500"
            />

            <span className="text-xs text-gray-300 w-9">
              {Math.round(volume * 100)}%
            </span>

          </div>

          <p className="text-center text-[11px] text-gray-500 mt-3">
            {isPlaying
              ? "Music is playing... ♫"
              : "Click play to hear the music"}
          </p>
        </div>

        {/* Music button */}

        <motion.button
          onClick={handlePlayAudio}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          animate={
            isPlaying
              ? {
                  boxShadow: [
                    "0 0 15px rgba(255,50,130,0.3)",
                    "0 0 30px rgba(255,50,130,0.7)",
                    "0 0 15px rgba(255,50,130,0.3)",
                  ],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white text-xl shadow-lg"
        >
          {isPlaying ? "♫" : "♪"}
        </motion.button>

      </div>
    </motion.main>
  );
}

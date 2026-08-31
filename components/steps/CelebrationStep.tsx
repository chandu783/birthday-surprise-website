"use client";

import { motion } from "framer-motion";
import { config } from "@/config";
import { fadeInUp } from "@/lib/animations";

interface CelebrationStepProps {
  onComplete: () => void;
}

/* -------------------------------------------------------
   Sparkles
------------------------------------------------------- */

const sparkles = [
  { left: "4%", top: "12%", size: 5, delay: 0 },
  { left: "10%", top: "32%", size: 3, delay: 1.2 },
  { left: "17%", top: "18%", size: 7, delay: 2 },
  { left: "23%", top: "75%", size: 4, delay: 0.5 },
  { left: "30%", top: "25%", size: 3, delay: 2.8 },
  { left: "38%", top: "12%", size: 6, delay: 1.5 },
  { left: "45%", top: "82%", size: 4, delay: 0.9 },
  { left: "52%", top: "18%", size: 3, delay: 2.2 },
  { left: "60%", top: "72%", size: 6, delay: 1.1 },
  { left: "67%", top: "28%", size: 4, delay: 3 },
  { left: "74%", top: "12%", size: 7, delay: 0.3 },
  { left: "81%", top: "78%", size: 4, delay: 1.7 },
  { left: "88%", top: "30%", size: 6, delay: 2.4 },
  { left: "94%", top: "16%", size: 3, delay: 0.7 },
  { left: "96%", top: "65%", size: 5, delay: 1.9 },
];

/* -------------------------------------------------------
   Falling particles
------------------------------------------------------- */

const particles = Array.from({ length: 35 }, (_, i) => ({
  left: `${(i * 29) % 100}%`,
  delay: (i * 0.43) % 7,
  duration: 5 + ((i * 1.17) % 5),
  size: 2 + (i % 4),
}));

/* -------------------------------------------------------
   Fireworks
------------------------------------------------------- */

const fireworks = [
  { left: "12%", top: "20%", delay: 0 },
  { left: "85%", top: "18%", delay: 1.8 },
  { left: "20%", top: "68%", delay: 3.2 },
  { left: "78%", top: "70%", delay: 4.6 },
  { left: "50%", top: "10%", delay: 2.5 },
];

export default function CelebrationStep({
  onComplete,
}: CelebrationStepProps) {
  return (
    <motion.main
      {...fadeInUp}
      className="relative min-h-screen overflow-hidden bg-[#080b20] px-4 py-8 text-center"
    >
      {/* =================================================
          BACKGROUND GLOW
      ================================================= */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-600/10 blur-[150px]" />

        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-amber-400/10 blur-[120px]" />
      </div>

      {/* =================================================
          CONTINUOUS SPARKLES
      ================================================= */}

      <div className="pointer-events-none absolute inset-0 z-0">
        {sparkles.map((sparkle, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full bg-pink-200"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              width: sparkle.size,
              height: sparkle.size,
              boxShadow:
                "0 0 8px 3px rgba(255,180,220,0.8), 0 0 22px 6px rgba(255,105,180,0.45)",
            }}
            animate={{
              opacity: [0.15, 1, 0.35, 1, 0.15],
              scale: [0.5, 1.5, 0.8, 1.3, 0.5],
            }}
            transition={{
              duration: 3 + (index % 3),
              delay: sparkle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* =================================================
          FALLING LIGHT PARTICLES
      ================================================= */}

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute top-[-20px] rounded-full bg-amber-200"
            style={{
              left: particle.left,
              width: particle.size,
              height: particle.size,
              boxShadow:
                "0 0 10px 3px rgba(255,210,130,0.7)",
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, index % 2 === 0 ? 35 : -35],
              opacity: [0, 1, 0.8, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* =================================================
          HEART FIREWORKS
      ================================================= */}

      <div className="pointer-events-none absolute inset-0 z-0">
        {fireworks.map((firework, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              left: firework.left,
              top: firework.top,
            }}
          >
            {/* Core */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.3, 2, 0.3],
              }}
              transition={{
                duration: 2.8,
                delay: firework.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />

            {/* Heart particles */}
            {Array.from({ length: 10 }).map((_, heartIndex) => {
              const angle = (heartIndex / 10) * Math.PI * 2;
              const distance = 55;

              return (
                <motion.span
                  key={heartIndex}
                  className="absolute left-1/2 top-1/2 text-pink-400"
                  style={{
                    fontSize: index % 2 === 0 ? 15 : 11,
                    textShadow:
                      "0 0 8px rgba(255,80,170,0.9), 0 0 18px rgba(255,80,170,0.6)",
                  }}
                  animate={{
                    x: [
                      0,
                      Math.cos(angle) * distance,
                    ],
                    y: [
                      0,
                      Math.sin(angle) * distance,
                    ],
                    opacity: [0, 1, 0],
                    scale: [0.2, 1.2, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    delay: firework.delay + 0.2,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                    ease: "easeOut",
                  }}
                >
                  ♥
                </motion.span>
              );
            })}
          </div>
        ))}
      </div>

      {/* =================================================
          SIDE CRACKERS
      ================================================= */}

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="cracker cracker-left">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="cracker cracker-right">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl flex-col items-center justify-center">
        
        {/* Small heading */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-200 sm:text-sm"
        >
          A Little Birthday Surprise
        </motion.p>

        {/* =================================================
            HAPPY BIRTHDAY
        ================================================= */}

        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: 1,
            scale: [0.95, 1.03, 1],
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="font-romantic text-5xl leading-tight text-amber-100 drop-shadow-[0_0_20px_rgba(255,210,120,0.65)] sm:text-7xl md:text-8xl"
        >
          Happy Birthday
        </motion.h1>

        {/* Decorative line */}
        <div className="mt-4 flex items-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-300 sm:w-32" />

          <motion.div
            animate={{
              rotate: [0, 45, 90, 135, 180],
              scale: [1, 1.2, 1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="h-3 w-3 rotate-45 border border-amber-300 shadow-[0_0_15px_rgba(255,210,100,0.8)]"
          />

          <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-300 sm:w-32" />
        </div>

        {/* =================================================
            ANIMATED CAKE
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.4,
            duration: 1,
            type: "spring",
            bounce: 0.35,
          }}
          className="relative mt-7 h-[190px] w-[240px] sm:h-[220px] sm:w-[280px]"
        >
          {/* Cake glow */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-40 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/20 blur-3xl"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [0.9, 1.15, 0.9],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
          />

          {/* Plate */}
          <div className="absolute bottom-5 left-1/2 h-5 w-56 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-200/30 via-white/60 to-amber-200/30 shadow-[0_0_25px_rgba(255,220,150,0.4)] sm:w-64" />

          {/* Bottom cake */}
          <motion.div
            className="absolute bottom-8 left-1/2 h-20 w-48 -translate-x-1/2 rounded-b-2xl rounded-t-lg border border-pink-200/40 bg-gradient-to-b from-pink-400 to-rose-700 shadow-[0_10px_35px_rgba(244,63,94,0.45)] sm:w-56"
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Cream */}
            <div className="absolute -top-3 left-0 h-7 w-full rounded-full bg-gradient-to-b from-pink-100 to-pink-300 shadow-[0_0_15px_rgba(255,180,220,0.7)]" />

            {/* Cream drips */}
            <span className="absolute left-7 top-1 h-7 w-5 rounded-b-full bg-pink-200" />
            <span className="absolute left-20 top-1 h-10 w-5 rounded-b-full bg-pink-200" />
            <span className="absolute right-20 top-1 h-8 w-5 rounded-b-full bg-pink-200" />
            <span className="absolute right-7 top-1 h-6 w-5 rounded-b-full bg-pink-200" />

            {/* Cake decorations */}
            <div className="absolute inset-x-5 top-10 flex justify-between">
              <span className="h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(255,210,80,0.8)]" />
              <span className="h-3 w-3 rounded-full bg-pink-100 shadow-[0_0_10px_rgba(255,180,220,0.8)]" />
              <span className="h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(255,210,80,0.8)]" />
            </div>
          </motion.div>

          {/* Top cake */}
          <motion.div
            className="absolute bottom-[92px] left-1/2 h-14 w-40 -translate-x-1/2 rounded-xl bg-gradient-to-b from-rose-300 to-pink-500 shadow-[0_5px_25px_rgba(244,114,182,0.45)] sm:w-44"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute -top-2 left-0 h-6 w-full rounded-full bg-pink-100" />

            <span className="absolute left-7 top-1 h-7 w-4 rounded-b-full bg-white/80" />
            <span className="absolute left-1/2 top-1 h-9 w-4 -translate-x-1/2 rounded-b-full bg-white/80" />
            <span className="absolute right-7 top-1 h-7 w-4 rounded-b-full bg-white/80" />
          </motion.div>

          {/* Candles */}
          <div className="absolute bottom-[143px] left-1/2 flex -translate-x-1/2 gap-8">
            {[0, 1, 2].map((candle) => (
              <div key={candle} className="relative">
                {/* Candle */}
                <motion.div
                  className="h-12 w-3 rounded-t-md bg-gradient-to-b from-amber-100 to-pink-300 shadow-[0_0_10px_rgba(255,220,160,0.5)]"
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    delay: candle * 0.15,
                    repeat: Infinity,
                  }}
                />

                {/* Flame */}
                <motion.div
                  className="absolute -top-6 left-1/2 h-6 w-4 -translate-x-1/2 rounded-[50%_50%_50%_50%] bg-gradient-to-t from-orange-400 via-amber-200 to-white shadow-[0_0_12px_5px_rgba(255,190,60,0.75)]"
                  animate={{
                    scale: [0.8, 1.15, 0.9, 1.1, 0.8],
                    rotate: [-4, 5, -3, 4, -4],
                    opacity: [0.8, 1, 0.85, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.1,
                    delay: candle * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* =================================================
            MY BEAUTIFUL LOVE
        ================================================= */}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-romantic text-3xl text-pink-100 drop-shadow-[0_0_15px_rgba(255,130,190,0.5)] sm:text-5xl"
        >
          My Beautiful Love
        </motion.h2>

        {/* =================================================
            BIRTHDAY WISH
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-7 w-full max-w-2xl rounded-3xl border border-pink-300/30 bg-white/[0.08] px-6 py-6 shadow-[0_0_45px_rgba(236,72,153,0.18)] backdrop-blur-md sm:px-10"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-amber-200">
            A Birthday Wish From My Heart
          </p>

          <motion.p
            animate={{
              textShadow: [
                "0 0 5px rgba(255,255,255,0.1)",
                "0 0 15px rgba(255,180,220,0.35)",
                "0 0 5px rgba(255,255,255,0.1)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="font-romantic text-2xl leading-relaxed text-white sm:text-3xl"
          >
            {config.celebration.message}
          </motion.p>
        </motion.div>

        {/* =================================================
            CONTINUE BUTTON
        ================================================= */}

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 35px rgba(244,114,182,0.55)",
          }}
          whileTap={{ scale: 0.96 }}
          onClick={onComplete}
          className="mt-7 rounded-full border border-pink-200/30 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 px-8 py-3 text-base font-bold text-white shadow-[0_8px_30px_rgba(244,114,182,0.3)] sm:px-10 sm:py-4 sm:text-lg"
        >
          Continue to Gallery →
        </motion.button>
      </section>

      {/* =================================================
          CSS
      ================================================= */}

      <style jsx>{`
        .cracker {
          position: absolute;
          top: 38%;
          width: 4px;
          height: 105px;
          border-radius: 999px;
          background: linear-gradient(
            to bottom,
            #fcd34d,
            #f472b6,
            #fb7185
          );
          box-shadow:
            0 0 12px rgba(255, 210, 100, 0.8),
            0 0 25px rgba(244, 114, 182, 0.5);
          animation: crackerMove 2.8s ease-in-out infinite;
        }

        .cracker-left {
          left: 5%;
          transform: rotate(-25deg);
        }

        .cracker-right {
          right: 5%;
          transform: rotate(25deg);
          animation-delay: 1.4s;
        }

        .cracker span {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #f9a8d4;
          box-shadow:
            0 0 8px 3px rgba(249, 168, 212, 0.8),
            0 0 18px 4px rgba(244, 114, 182, 0.45);
          animation: crackerSpark 1.4s ease-in-out infinite;
        }

        .cracker span:nth-child(1) {
          top: 0;
          left: -18px;
        }

        .cracker span:nth-child(2) {
          top: 20%;
          right: -20px;
          animation-delay: 0.25s;
        }

        .cracker span:nth-child(3) {
          top: 42%;
          left: -25px;
          animation-delay: 0.5s;
        }

        .cracker span:nth-child(4) {
          top: 65%;
          right: -22px;
          animation-delay: 0.75s;
        }

        .cracker span:nth-child(5) {
          bottom: 0;
          left: -15px;
          animation-delay: 1s;
        }

        @keyframes crackerMove {
          0%,
          100% {
            opacity: 0.35;
            transform: rotate(-25deg) translateY(0);
          }

          50% {
            opacity: 1;
            transform: rotate(-25deg) translateY(18px);
          }
        }

        .cracker-right {
          animation-name: crackerMoveRight;
        }

        @keyframes crackerMoveRight {
          0%,
          100% {
            opacity: 0.35;
            transform: rotate(25deg) translateY(0);
          }

          50% {
            opacity: 1;
            transform: rotate(25deg) translateY(18px);
          }
        }

        @keyframes crackerSpark {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(0.4);
          }

          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @media (max-width: 640px) {
          .cracker {
            transform: scale(0.7) rotate(-25deg);
          }

          .cracker-right {
            transform: scale(0.7) rotate(25deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cracker,
          .cracker span {
            animation: none;
          }
        }
      `}</style>
    </motion.main>
  );
}

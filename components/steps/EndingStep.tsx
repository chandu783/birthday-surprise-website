"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Great_Vibes, Poppins } from "next/font/google";
import { config } from "@/config";
import { fadeInUp, createParticles } from "@/lib/animations";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function EndingStep() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [boxOpen, setBoxOpen] = useState(false);
  const [ringVisible, setRingVisible] = useState(false);
  const [celebration, setCelebration] = useState(false);

  useEffect(() => {
    createParticles("ending-canvas", config.ending.confettiCount);

    const openTimer = setTimeout(() => {
      setBoxOpen(true);
    }, 1000);

    const ringTimer = setTimeout(() => {
      setRingVisible(true);
    }, 1900);

    const celebrationTimer = setTimeout(() => {
      setCelebration(true);
    }, 2900);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(ringTimer);
      clearTimeout(celebrationTimer);
    };
  }, []);

  const flowers = [
    { left: "4%", top: "12%", size: 46, rotate: -18 },
    { left: "12%", top: "72%", size: 38, rotate: 15 },
    { left: "87%", top: "15%", size: 44, rotate: 20 },
    { left: "91%", top: "72%", size: 40, rotate: -15 },
    { left: "3%", top: "43%", size: 30, rotate: 8 },
    { left: "95%", top: "43%", size: 32, rotate: -10 },
  ];

  const hearts = [
    { left: "13%", top: "25%", size: 24, delay: 0 },
    { left: "82%", top: "29%", size: 30, delay: 0.7 },
    { left: "20%", top: "55%", size: 18, delay: 1.2 },
    { left: "78%", top: "57%", size: 22, delay: 1.8 },
    { left: "50%", top: "8%", size: 20, delay: 0.4 },
    { left: "50%", top: "82%", size: 25, delay: 1 },
  ];

  const sparkles = Array.from({ length: 22 }, (_, index) => ({
    left: `${5 + ((index * 37) % 90)}%`,
    top: `${5 + ((index * 53) % 88)}%`,
    delay: (index % 7) * 0.3,
    size: index % 3 === 0 ? 16 : 10,
  }));

  return (
    <motion.main
      {...fadeInUp}
      className={`${poppins.className} relative min-h-screen overflow-hidden bg-[#09030b] text-white`}
    >
      {/* =========================================================
          CANVAS CELEBRATION
      ========================================================= */}

      <canvas
        id="ending-canvas"
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-40 h-full w-full"
      />

      {/* =========================================================
          BEAUTIFUL ROMANTIC BACKGROUND
      ========================================================= */}

      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,#6b164b_0%,#35102f_28%,#17091c_55%,#09030b_100%)]" />

        {/* Pink glow */}
        <motion.div
          className="absolute left-1/2 top-[28%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-pink-600/20 blur-[130px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Purple glow */}
        <motion.div
          className="absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-700/20 blur-[120px]"
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-rose-600/20 blur-[120px]"
          animate={{
            x: [0, -60, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Soft vertical light */}
        <motion.div
          className="absolute left-1/2 top-0 h-[65%] w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-pink-300/40 to-transparent blur-sm"
          animate={{
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* Bottom romantic glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-pink-950/50 to-transparent" />
      </div>

      {/* =========================================================
          FLOWERS
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 z-10">
        {flowers.map((flower, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: flower.left,
              top: flower.top,
              width: flower.size,
              height: flower.size,
              transform: `rotate(${flower.rotate}deg)`,
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [
                flower.rotate,
                flower.rotate + 6,
                flower.rotate,
              ],
              opacity: [0.55, 0.9, 0.55],
            }}
            transition={{
              duration: 4 + index * 0.4,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut",
            }}
          >
            {/* Flower petals */}
            <div className="absolute left-1/2 top-0 h-[45%] w-[45%] -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-300 to-rose-600" />

            <div className="absolute bottom-0 left-0 h-[45%] w-[45%] rounded-full bg-gradient-to-br from-pink-400 to-rose-700" />

            <div className="absolute bottom-0 right-0 h-[45%] w-[45%] rounded-full bg-gradient-to-br from-rose-300 to-pink-700" />

            <div className="absolute bottom-[5%] left-1/2 h-[45%] w-[45%] -translate-x-1/2 rounded-full bg-gradient-to-br from-red-300 to-rose-700" />

            {/* Flower center */}
            <div className="absolute left-1/2 top-1/2 h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-200 to-pink-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
          </motion.div>
        ))}
      </div>

      {/* =========================================================
          FLOATING HEARTS
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 z-10">
        {hearts.map((heart, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: heart.left,
              top: heart.top,
              width: heart.size,
              height: heart.size,
            }}
            animate={{
              y: [0, -25, 0],
              scale: [0.85, 1.15, 0.85],
              opacity: [0.25, 0.8, 0.25],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: heart.delay,
              ease: "easeInOut",
            }}
          >
            <div className="absolute left-1/2 top-[20%] h-1/2 w-1/2 -translate-x-1/2 rotate-45 rounded-[50%_50%_0_50%] bg-gradient-to-br from-pink-300 to-rose-600 shadow-[0_0_20px_rgba(244,114,182,0.5)]" />
          </motion.div>
        ))}
      </div>

      {/* =========================================================
          SPARKLES
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 z-20">
        {sparkles.map((sparkle, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              width: sparkle.size,
              height: sparkle.size,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 90, 180],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + (index % 3) * 0.5,
              repeat: Infinity,
              delay: sparkle.delay,
              ease: "easeInOut",
            }}
          >
            <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-pink-200 shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
            <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-pink-200 shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
          </motion.div>
        ))}
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="relative z-30 flex min-h-screen items-center justify-center px-5 py-12">
        <div className="w-full max-w-3xl text-center">

          {/* Small top text */}
          <motion.p
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-3 text-xs font-medium uppercase tracking-[0.45em] text-pink-200/70 sm:text-sm"
          >
            Our forever begins here
          </motion.p>

          {/* =====================================================
              RING BOX
          ===================================================== */}

          <div
            className="relative mx-auto mb-8 h-[230px] w-[260px] sm:h-[260px] sm:w-[300px]"
            style={{ perspective: "1000px" }}
          >
            {/* Box glow */}
            <motion.div
              className="absolute left-1/2 top-[55%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/20 blur-[70px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.35, 0.65, 0.35],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />

            {/* Box shadow */}
            <motion.div
              className="absolute bottom-5 left-1/2 h-7 w-52 -translate-x-1/2 rounded-full bg-black/60 blur-xl"
              animate={{
                scaleX: boxOpen ? 1.15 : 1,
                opacity: boxOpen ? 0.7 : 0.9,
              }}
            />

            {/* =================================================
                RING
            ================================================= */}

            <AnimatePresence>
              {ringVisible && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 65,
                    scale: 0.6,
                  }}
                  animate={{
                    opacity: 1,
                    y: -10,
                    scale: 1,
                  }}
                  transition={{
                    duration: 1.3,
                    type: "spring",
                    stiffness: 70,
                    damping: 12,
                  }}
                  className="absolute left-1/2 top-[54px] z-30 h-[110px] w-[90px] -translate-x-1/2"
                >
                  {/* Ring glow */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-300/20 blur-2xl"
                    animate={{
                      scale: [1, 1.35, 1],
                      opacity: [0.4, 0.9, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />

                  {/* Ring band */}
                  <div className="absolute left-1/2 top-[35px] h-[58px] w-[58px] -translate-x-1/2 rounded-full border-[7px] border-pink-200 bg-gradient-to-br from-yellow-100 via-pink-200 to-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.7)]" />

                  {/* Ring inner hole */}
                  <div className="absolute left-1/2 top-[47px] h-[34px] w-[34px] -translate-x-1/2 rounded-full bg-[#40142f]" />

                  {/* Diamond */}
                  <motion.div
                    className="absolute left-1/2 top-[10px] h-[30px] w-[30px] -translate-x-1/2 rotate-45 rounded-[4px] border-2 border-white/90 bg-gradient-to-br from-white via-pink-100 to-pink-300 shadow-[0_0_25px_rgba(255,255,255,0.95)]"
                    animate={{
                      rotate: [45, 50, 45],
                      scale: [1, 1.08, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />

                  {/* Diamond shine */}
                  <motion.div
                    className="absolute left-[49%] top-[8px] h-2 w-2 rounded-full bg-white"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0.5],
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================
                INSIDE OF BOX
            ================================================= */}

            <div className="absolute bottom-6 left-1/2 z-10 h-[85px] w-[205px] -translate-x-1/2 rounded-b-[20px] border border-pink-200/20 bg-gradient-to-br from-[#7d3154] via-[#551c3c] to-[#301126] shadow-[0_20px_50px_rgba(0,0,0,0.55)] sm:w-[225px]">
              <div className="absolute inset-2 rounded-b-[16px] bg-gradient-to-br from-[#24101d] to-[#3c102b]" />

              <div className="absolute bottom-3 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-pink-300/20 blur-sm" />
            </div>

            {/* =================================================
                BOX LID
            ================================================= */}

            <motion.div
              className="absolute left-1/2 top-[100px] z-40 h-[55px] w-[215px] -translate-x-1/2 rounded-t-[18px] border border-pink-200/25 bg-gradient-to-br from-[#a14367] via-[#702542] to-[#42142e] shadow-[0_10px_25px_rgba(0,0,0,0.5)] sm:w-[235px]"
              initial={{
                rotateX: 0,
                y: 0,
              }}
              animate={
                boxOpen
                  ? {
                      rotateX: -105,
                      y: -65,
                    }
                  : {
                      rotateX: 0,
                      y: 0,
                    }
              }
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Lid shine */}
              <div className="absolute inset-x-8 top-3 h-[2px] rounded-full bg-pink-200/20" />

              {/* Ribbon */}
              <div className="absolute left-1/2 top-0 h-full w-5 -translate-x-1/2 bg-pink-200/10" />

              {/* Front heart clasp - CSS only */}
              <div className="absolute -bottom-3 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 rounded-[50%_50%_50%_0] border border-pink-200/40 bg-gradient-to-br from-pink-300 to-rose-600 shadow-[0_0_15px_rgba(244,114,182,0.6)]" />
            </motion.div>

            {/* Ribbon on box */}
            <div className="absolute bottom-6 left-1/2 z-20 h-[85px] w-5 -translate-x-1/2 bg-pink-200/10" />
          </div>

          {/* =====================================================
              MAIN MESSAGE
          ===================================================== */}

          <AnimatePresence>
            {celebration && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
                className="relative"
              >
                {/* Main celebration title */}
                <motion.h1
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 80,
                  }}
                  className={`${greatVibes.className} text-5xl leading-tight text-pink-100 drop-shadow-[0_0_25px_rgba(244,114,182,0.55)] sm:text-7xl`}
                >
                  {config.ending.celebrationMessage}
                </motion.h1>

                {/* Divider */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 150, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="mx-auto my-5 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"
                />

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className={`${greatVibes.className} text-3xl text-pink-200 sm:text-4xl`}
                >
                  Happy Birthday, {config.person.name}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-3 text-base font-medium tracking-wide text-pink-100/70 sm:text-lg"
                >
                  Forever yours
                </motion.p>

                {/* =================================================
                    CELEBRATION SYMBOLS — NO EMOJIS
                ================================================= */}

                <div className="mt-7 flex items-center justify-center gap-7">
                  {[0, 1, 2, 3, 4].map((item) => (
                    <motion.div
                      key={item}
                      className="relative h-8 w-8"
                      animate={{
                        y: [0, -15, 0],
                        rotate: [-5, 5, -5],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: item * 0.18,
                      }}
                    >
                      {item === 0 && (
                        <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-pink-400 shadow-[0_0_18px_rgba(244,114,182,0.8)]" />
                      )}

                      {item === 1 && (
                        <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-pink-300 shadow-[0_0_15px_rgba(244,114,182,0.7)]" />
                      )}

                      {item === 2 && (
                        <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-pink-200 bg-pink-400/30 shadow-[0_0_15px_rgba(244,114,182,0.7)]" />
                      )}

                      {item === 3 && (
                        <>
                          <div className="absolute left-1/2 top-1/2 h-1 w-8 -translate-x-1/2 bg-pink-300 shadow-[0_0_10px_rgba(244,114,182,0.8)]" />
                          <div className="absolute left-1/2 top-1/2 h-8 w-1 -translate-x-1/2 -translate-y-1/2 bg-pink-300 shadow-[0_0_10px_rgba(244,114,182,0.8)]" />
                        </>
                      )}

                      {item === 4 && (
                        <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-pink-300 to-rose-600 shadow-[0_0_20px_rgba(244,114,182,0.8)]" />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* =================================================
                    SAVE THIS MOMENT
                ================================================= */}

                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="relative mx-auto mt-9 max-w-2xl overflow-hidden rounded-3xl border border-pink-300/25 bg-white/[0.06] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8"
                >
                  {/* Card glow */}
                  <div className="absolute left-1/2 top-0 h-24 w-52 -translate-x-1/2 rounded-full bg-pink-500/20 blur-3xl" />

                  <div className="relative">
                    <h2
                      className={`${greatVibes.className} text-3xl text-pink-100 sm:text-4xl`}
                    >
                      Save This Moment
                    </h2>

                    <div className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-pink-300/70 to-transparent" />

                    <p className="text-sm leading-7 text-pink-100/65 sm:text-base">
                      This surprise was created with love and will forever be
                      a memory of this beautiful day. Every moment with you
                      means more than words can say.
                    </p>
                  </div>
                </motion.div>

                {/* =================================================
                    FINAL SIGNATURE
                ================================================= */}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7, duration: 1 }}
                  className="mt-8"
                >
                  <p
                    className={`${greatVibes.className} text-3xl text-pink-200 sm:text-4xl`}
                  >
                    With all my love,
                  </p>

                  <p
                    className={`${greatVibes.className} mt-1 text-4xl text-pink-100 sm:text-5xl`}
                  >
                    Your {config.person.nickname}
                  </p>

                  <motion.div
                    className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-pink-300 to-transparent"
                    animate={{
                      width: [80, 150, 80],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* =========================================================
          EXTRA CELEBRATION GLOW
      ========================================================= */}

      <AnimatePresence>
        {celebration && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.35, 0], scale: [0.5, 1.8, 2.2] }}
              transition={{ duration: 2.5 }}
              className="pointer-events-none absolute left-1/2 top-[38%] z-20 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-300/30"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{
                duration: 2,
                repeat: 2,
              }}
              className="pointer-events-none absolute inset-0 z-20 bg-pink-500/10"
            />
          </>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

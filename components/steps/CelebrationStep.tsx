"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";
import { fadeInUp, createParticles } from "@/lib/animations";

interface CelebrationStepProps {
  onComplete: () => void;
}

const sparkles = [
  { left: "8%", top: "18%", delay: 0 },
  { left: "18%", top: "70%", delay: 0.8 },
  { left: "88%", top: "22%", delay: 1.3 },
  { left: "78%", top: "76%", delay: 0.4 },
  { left: "52%", top: "12%", delay: 1.8 },
  { left: "94%", top: "56%", delay: 2.1 },
];

export default function CelebrationStep({ onComplete }: CelebrationStepProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    createParticles("celebration-canvas", config.celebration.confettiCount);
  }, []);

  return (
    <motion.main
      {...fadeInUp}
      className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#5b214f_0%,#24142f_44%,#0d1025_100%)] px-4 py-10 text-center sm:px-6 lg:py-16"
    >
      <canvas
        id="celebration-canvas"
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(255,214,128,0.3),transparent_70%)]" />
        {sparkles.map((sparkle, index) => (
          <motion.span
            key={index}
            className="absolute h-1.5 w-1.5 rounded-full bg-amber-200 shadow-[0_0_14px_4px_rgba(255,220,150,0.75)] sm:h-2 sm:w-2"
            style={{ left: sparkle.left, top: sparkle.top }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.35, 0.7] }}
            transition={{ duration: 2.8, delay: sparkle.delay, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as const }}
          />
        ))}

        <div className="firework firework-one" />
        <div className="firework firework-two" />
        <div className="firework firework-three" />
        <div className="cracker cracker-left" />
        <div className="cracker cracker-right" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl flex-col items-center justify-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/90 sm:text-sm"
        >
          A little birthday surprise
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, type: "spring", bounce: 0.25 }}
          className="rounded-[2rem] border border-amber-100/25 bg-white/[0.08] px-5 py-8 shadow-[0_0_70px_rgba(244,114,182,0.2)] backdrop-blur-sm sm:px-12 sm:py-12"
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 1, -1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as const }}
          >
            <h1 className="font-romantic text-5xl leading-[1.05] text-amber-100 drop-shadow-[0_0_18px_rgba(255,214,128,0.45)] sm:text-7xl md:text-8xl">
              Happy Birthday
            </h1>
            <p className="mt-5 text-2xl font-semibold text-white sm:text-3xl">
              My beautiful love
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mx-auto mt-6 max-w-xl text-base leading-7 text-rose-50 sm:text-lg sm:leading-8"
          >
            {config.celebration.message}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 text-3xl sm:gap-5 sm:text-5xl"
            aria-label="Birthday celebration decorations"
          >
            <span>🎂</span><span>🎁</span><span>🎊</span><span>🎈</span><span>✨</span>
          </motion.div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onComplete}
          className="mt-8 min-h-12 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 px-7 py-3 text-base font-bold text-white shadow-[0_8px_30px_rgba(244,114,182,0.35)] transition-shadow hover:shadow-[0_10px_40px_rgba(251,191,36,0.35)] sm:px-9 sm:text-lg"
        >
          Continue to Gallery →
        </motion.button>
      </section>
    </motion.main>
  );
}

/* The celebration is intentionally CSS-based so it remains vivid without WebGL or GPU assumptions. */

<style jsx>{`
  .firework {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 999px;
    background: #fde68a;
    box-shadow: 0 -42px 0 #f9a8d4, 30px -30px 0 #fde68a, 42px 0 0 #fda4af, 30px 30px 0 #fcd34d, 0 42px 0 #f9a8d4, -30px 30px 0 #fde68a, -42px 0 0 #fda4af, -30px -30px 0 #fcd34d;
    animation: burst 3.6s ease-in-out infinite;
  }
  .firework-one { left: 14%; top: 22%; }
  .firework-two { right: 15%; top: 35%; animation-delay: 1.2s; transform: scale(0.7); }
  .firework-three { right: 33%; bottom: 16%; animation-delay: 2.2s; transform: scale(0.5); }
  .cracker { position: absolute; top: 20%; width: 2px; height: 92px; border-radius: 999px; background: linear-gradient(#fcd34d, #f9a8d4); opacity: 0.8; animation: crackle 2.8s ease-in-out infinite; }
  .cracker-left { left: 7%; transform: rotate(-24deg); }
  .cracker-right { right: 7%; transform: rotate(24deg); animation-delay: 1.4s; }
  @keyframes burst { 0%, 100% { opacity: 0.25; transform: scale(0.45); } 45% { opacity: 1; transform: scale(1); } 70% { opacity: 0.2; transform: scale(1.15); } }
  @keyframes crackle { 0%, 100% { opacity: 0.25; transform: rotate(-24deg) translateY(0); } 50% { opacity: 0.9; transform: rotate(-24deg) translateY(16px); } }
  @media (prefers-reduced-motion: reduce) { .firework, .cracker { animation: none; } }
`}</style>


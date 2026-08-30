"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";
import { fadeInUp, createParticles } from "@/lib/animations";

export default function EndingStep() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    createParticles("ending-canvas", config.ending.confettiCount);
  }, []);

  return (
    <motion.div
      {...fadeInUp}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Canvas for particle effects */}
      <canvas
        id="ending-canvas"
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
      />

      {/* Animated background */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/40 via-red-600/30 to-orange-600/40 animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="relative z-10 text-center space-y-8 max-w-2xl"
      >
        {/* Main message */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="space-y-6"
        >
          <motion.div
            className="text-8xl md:text-9xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💍✨
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 drop-shadow-lg"
          >
            {config.ending.celebrationMessage}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl font-bold text-white"
          >
            Happy Birthday, {config.person.name}! 🎂
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg text-gray-300"
          >
            Forever yours 💕
          </motion.p>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-6 text-5xl md:text-6xl flex-wrap"
        >
          <motion.span
            animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0 }}
          >
            🎉
          </motion.span>
          <motion.span
            animate={{ y: [0, -30, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
          >
            🎁
          </motion.span>
          <motion.span
            animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }}
          >
            🎊
          </motion.span>
          <motion.span
            animate={{ y: [0, -30, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.9 }}
          >
            🌹
          </motion.span>
          <motion.span
            animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
          >
            💖
          </motion.span>
        </motion.div>

        {/* Memory message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-r from-pink-500/20 to-red-500/20 border-2 border-pink-500/50 rounded-2xl p-8 space-y-4"
        >
          <h2 className="text-lg md:text-xl font-bold text-white">
            Save This Moment
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            This surprise was created with love and will forever be a memory of this special day. May every birthday bring us closer together.
          </p>
        </motion.div>

        {/* Final message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-base md:text-lg font-semibold text-pink-300 italic"
        >
          With all my love,
          <br />
          Your {config.person.nickname} 💕
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

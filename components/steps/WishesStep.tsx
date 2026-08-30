"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";
import { fadeInUp, scaleIn } from "@/lib/animations";

interface WishesStepProps {
  onComplete: () => void;
}

export default function WishesStep({ onComplete }: WishesStepProps) {
  const [selectedWish, setSelectedWish] = useState<number | null>(null);

  return (
    <motion.div
      {...fadeInUp}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-transparent to-orange-600/10 animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 w-full max-w-2xl space-y-8"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-white text-center"
        >
          💝 Wishes for You
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-300 text-sm md:text-base"
        >
          On your special day, here are my heartfelt wishes for you...
        </motion.p>

        {/* Wishes grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {config.wishes.defaultWishes.map((wish, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedWish(selectedWish === index ? null : index)}
              {...scaleIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 rounded-xl backdrop-blur-md border-2 transition-all text-left ${
                selectedWish === index
                  ? "bg-pink-500/30 border-pink-500 shadow-lg shadow-pink-500/50"
                  : "bg-white/5 border-white/20 hover:bg-white/10"
              }`}
            >
              <p className="text-white font-semibold text-sm md:text-base">
                {wish}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={onComplete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all text-lg"
        >
          Let&apos;s Continue →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

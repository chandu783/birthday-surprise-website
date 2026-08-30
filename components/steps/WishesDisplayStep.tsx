"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";
import { fadeInUp } from "@/lib/animations";

interface WishesDisplayStepProps {
  onComplete: () => void;
}

export default function WishesDisplayStep({
  onComplete,
}: WishesDisplayStepProps) {
  const [wishes, setWishes] = useState<string[]>([]);
  const [selectedWish, setSelectedWish] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userWishes");
    if (stored) {
      try {
        setWishes(JSON.parse(stored));
      } catch {
        setWishes(config.wishes.defaultWishes);
      }
    } else {
      setWishes(config.wishes.defaultWishes);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <motion.div
      {...fadeInUp}
      className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 animate-pulse" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-romantic">
            Your Beautiful Wishes
          </h1>
          <p className="text-xl text-gray-300">
            These are the wishes you shared with me
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid gap-6 mb-12"
        >
          {wishes.map((wish, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedWish(selectedWish === index ? null : index)}
              className="group cursor-pointer"
            >
              <motion.div
                className="relative p-8 bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-500/40 rounded-2xl backdrop-blur-lg transition-all duration-300 hover:border-pink-500/60 hover:shadow-xl hover:shadow-pink-500/30"
                animate={{
                  boxShadow:
                    selectedWish === index
                      ? "0 0 30px rgba(236, 72, 153, 0.4)"
                      : "0 0 10px rgba(236, 72, 153, 0.1)",
                }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={{ scale: selectedWish === index ? 1.2 : 1 }}
                    className="text-3xl flex-shrink-0"
                  >
                    ✨
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-lg text-white leading-relaxed">
                      {wish}
                    </p>
                    <p className="text-sm text-gray-400 mt-3">
                      Wish {index + 1} from {config.person.name}&apos;s heart
                    </p>
                  </div>
                  <motion.div
                    animate={{
                      rotate: selectedWish === index ? 180 : 0,
                    }}
                    className="text-2xl"
                  >
                    💕
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
        >
          Next Surprise
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

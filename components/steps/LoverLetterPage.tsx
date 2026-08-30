"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";
import { fadeInUp } from "@/lib/animations";

interface LoverLetterPageProps {
  onComplete: () => void;
}

export default function LoverLetterPage({ onComplete }: LoverLetterPageProps) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const letterContent = config.letter.content.split("\n");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <motion.div
      {...fadeInUp}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative"
    >
      {/* Background glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/10 via-transparent to-pink-600/10 animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="relative z-10 max-w-3xl w-full mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-2 font-romantic">
          A Letter For You
        </h1>
        <p className="text-center text-gray-400">From my heart to yours</p>
      </motion.div>

      {/* Letter envelope animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        onClick={() => setIsEnvelopeOpen(!isEnvelopeOpen)}
        className="relative z-10 mb-12 cursor-pointer group"
      >
        <motion.div
          animate={{
            rotateX: isEnvelopeOpen ? 180 : 0,
            y: isEnvelopeOpen ? -20 : 0,
          }}
          transition={{ duration: 0.8 }}
          className="w-80 h-48 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-2xl shadow-pink-500/50 flex items-center justify-center relative"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            animate={{ scale: isEnvelopeOpen ? 0.8 : 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ y: isEnvelopeOpen ? -10 : 0 }}
              className="text-5xl mb-2"
            >
              💌
            </motion.div>
            <p className="text-white font-semibold text-lg">
              {isEnvelopeOpen ? "Your Letter" : "Click to Open"}
            </p>
            <p className="text-white/80 text-sm mt-1">
              {isEnvelopeOpen ? "Read my heart" : "My love letter"}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Letter content display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isEnvelopeOpen ? 1 : 0, y: isEnvelopeOpen ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl w-full mb-12 pointer-events-none"
      >
        {isEnvelopeOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-8 md:p-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-2xl"
          >
            <div className="text-center mb-8">
              <p className="text-2xl md:text-3xl font-romantic font-bold text-gray-900">
                {config.letter.title}
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              className="space-y-4 text-gray-800 text-base md:text-lg leading-relaxed font-sans"
            >
              {letterContent.map((line, index) => (
                <motion.p
                  key={index}
                  variants={lineVariants}
                  className="text-justify"
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>



      {/* Continue button */}
      {isEnvelopeOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="relative z-10 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
        >
          Continue to Next Surprise
        </motion.button>
      )}
    </motion.div>
  );
}

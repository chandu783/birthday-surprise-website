"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";
import { fadeInUp, heartbeat } from "@/lib/animations";

interface ProposalStepProps {
  onYes: () => void;
}

export default function ProposalStep({ onYes }: ProposalStepProps) {
  const [attemptCount, setAttemptCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const maxAttempts = config.proposal.noButtonResponses.length;
  const showSuccessMessage = attemptCount >= maxAttempts;

  const handleNoClick = () => {
    if (showSuccessMessage) {
      // Button stays in place, show success after message
      setTimeout(() => {
        onYes();
      }, 1000);
      return;
    }

    setAttemptCount(attemptCount + 1);

    // Move button to random position
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 200;
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  return (
    <motion.div
      {...fadeInUp}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 via-red-600/10 to-orange-600/20 animate-pulse" />
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-red-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 w-full max-w-2xl space-y-12"
      >
        {/* Main question */}
        <motion.div
          {...heartbeat}
          className="text-center space-y-6"
        >
          <motion.div
            className="text-6xl md:text-8xl"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
          >
            💍
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 drop-shadow-lg"
          >
            Will You Spend
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-2xl md:text-4xl font-bold text-white"
          >
            Every Birthday With Me?
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-2xl font-semibold text-pink-300"
          >
            {config.person.name}
          </motion.h3>
        </motion.div>

        {/* Response messages */}
        {attemptCount > 0 && attemptCount < maxAttempts && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl text-pink-300 font-bold">
              {config.proposal.noButtonResponses[attemptCount - 1]}
            </p>
          </motion.div>
        )}

        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            className="bg-gradient-to-r from-pink-500/20 to-red-500/20 border-2 border-pink-500/50 rounded-xl p-6"
          >
            <p className="text-lg md:text-xl font-bold text-white text-center">
              I knew you'd say yes! 💕 Getting ready for the best birthday ever...
            </p>
          </motion.div>
        )}

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center relative min-h-24"
        >
          {/* Yes button */}
          <motion.button
            onClick={onYes}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all text-lg md:text-xl"
          >
            YES! 💕 {config.proposal.yesBtnText}
          </motion.button>

          {/* No button - runs away */}
          <motion.button
            ref={noButtonRef}
            onClick={handleNoClick}
            animate={{
              x: noButtonPosition.x,
              y: noButtonPosition.y,
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15,
            }}
            whileHover={!showSuccessMessage ? { scale: 1.05 } : {}}
            whileTap={!showSuccessMessage ? { scale: 0.95 } : {}}
            className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-xl hover:shadow-lg transition-all text-lg md:text-xl cursor-pointer hover:from-gray-500 hover:to-gray-600"
          >
            {showSuccessMessage
              ? "Haha! 😄"
              : config.proposal.noBtnText}
          </motion.button>
        </motion.div>

        {/* Playful hint */}
        {attemptCount < maxAttempts && !showSuccessMessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-sm md:text-base text-gray-400 italic"
          >
            (Psst... the No button has a mind of its own 😉)
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

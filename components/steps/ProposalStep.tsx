"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Great_Vibes, Poppins } from "next/font/google";
import { config } from "@/config";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface ProposalStepProps {
  onYes: () => void;
}

const flowers = ["🌸", "🌹", "🌷", "🌺", "🌸", "🌷", "🌹"];
const hearts = ["❤️", "💕", "💖", "💗", "💓"];

export default function ProposalStep({ onYes }: ProposalStepProps) {
  const [noCount, setNoCount] = useState(0);
  const [showLove, setShowLove] = useState(false);

  const noResponses = config.proposal.noButtonResponses ?? [
    "No 😢",
    "Are you sure? 🥺",
    "Think again 💕",
    "Please? 🥹",
    "One more chance? ❤️",
  ];

  const handleNo = () => {
    setNoCount((prev) => Math.min(prev + 1, noResponses.length - 1));
  };

  const handleYes = () => {
    setShowLove(true);

    // Small romantic transition, then move to EndingStep.
    setTimeout(() => {
      onYes();
    }, 700);
  };

  return (
    <main
      className={`${poppins.className} relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#170914] via-[#35152d] to-[#120914] text-white`}
    >
      {/* Background glow */}
      <motion.div
        className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-pink-500/20 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-purple-500/20 blur-[110px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating flowers */}
      <div className="pointer-events-none absolute inset-0">
        {flowers.map((flower, index) => (
          <motion.div
            key={`flower-${index}`}
            className="absolute text-2xl opacity-70 sm:text-3xl"
            style={{
              left: `${8 + index * 13}%`,
              top: `${10 + ((index * 17) % 75)}%`,
            }}
            animate={{
              y: [0, -18, 0],
              x: [0, 8, 0],
              rotate: [-8, 8, -8],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4 + index * 0.4,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut",
            }}
          >
            {flower}
          </motion.div>
        ))}

        {hearts.map((heart, index) => (
          <motion.div
            key={`heart-${index}`}
            className="absolute text-lg opacity-60 sm:text-2xl"
            style={{
              right: `${8 + index * 16}%`,
              top: `${15 + ((index * 19) % 70)}%`,
            }}
            animate={{
              y: [0, -25, 0],
              scale: [0.8, 1.15, 0.8],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3.5 + index * 0.5,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut",
            }}
          >
            {heart}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-lg text-center"
        >
          {/* Small romantic heading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-3 text-sm font-medium tracking-[0.25em] text-pink-200/80 uppercase"
          >
            One little question...
          </motion.p>

          {/* Proposal question */}
          <motion.h1
            className={`${greatVibes.className} mb-8 text-5xl leading-tight text-pink-100 drop-shadow-[0_4px_20px_rgba(244,114,182,0.25)] sm:text-6xl`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              type: "spring",
            }}
          >
            Will you be mine
            <br />
            forever? ❤️
          </motion.h1>

          {/* CLOSED RING BOX */}
          <motion.div
            className="relative mx-auto mb-10 h-44 w-52 sm:h-48 sm:w-56"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {/* Glow behind box */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400/20 blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.65, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />

            {/* Box */}
            <motion.div
              className="absolute bottom-4 left-1/2 h-28 w-44 -translate-x-1/2 rounded-b-2xl border border-pink-200/20 bg-gradient-to-br from-[#7b304f] via-[#5a1f3c] to-[#351329] shadow-[0_20px_50px_rgba(0,0,0,0.45)] sm:h-30 sm:w-48"
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Front shine */}
              <div className="absolute inset-x-4 bottom-3 h-px bg-pink-200/20" />

              {/* Box button */}
              <div className="absolute bottom-3 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-pink-200/50 shadow-[0_0_12px_rgba(251,207,232,0.7)]" />
            </motion.div>

            {/* CLOSED LID */}
            <motion.div
              className="absolute left-1/2 top-7 z-20 h-12 w-48 -translate-x-1/2 rounded-t-xl border border-pink-200/20 bg-gradient-to-br from-[#91405f] via-[#6d2949] to-[#481833] shadow-[0_8px_20px_rgba(0,0,0,0.35)] sm:w-52"
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute left-1/2 top-1/2 h-2 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/10" />
            </motion.div>

            {/* Decorative ribbon */}
            <div className="absolute bottom-4 left-1/2 z-30 h-28 w-5 -translate-x-1/2 bg-pink-200/10" />
            <div className="absolute bottom-16 left-1/2 z-30 h-5 w-44 -translate-x-1/2 bg-pink-200/10 sm:w-48" />

            {/* Tiny heart */}
            <motion.div
              className="absolute -right-1 top-1 z-40 text-xl"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              💗
            </motion.div>
          </motion.div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mx-auto mb-7 max-w-md text-sm leading-7 text-pink-100/70 sm:text-base"
          >
            I have a little question for you...
            <br />
            and my heart already knows the answer. 💕
          </motion.p>

          {/* Buttons */}
          <div className="relative flex items-center justify-center gap-4">
            {/* YES */}
            <motion.button
              type="button"
              onClick={handleYes}
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 35px rgba(244,114,182,0.45)",
              }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(236,72,153,0.3)] transition-all sm:px-10 sm:text-base"
            >
              {config.proposal.yesBtnText || "YES ❤️"}
            </motion.button>

            {/* NO */}
            <motion.button
              type="button"
              onClick={handleNo}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              animate={
                noCount > 0
                  ? {
                      x: [0, -5, 5, -4, 4, 0],
                    }
                  : {}
              }
              transition={{
                duration: 0.35,
              }}
              className="rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-medium text-pink-100/80 backdrop-blur-md transition-all hover:bg-white/10 sm:px-10 sm:text-base"
            >
              {noResponses[noCount] ||
                config.proposal.noBtnText ||
                "NO 😢"}
            </motion.button>
          </div>

          {/* Playful response */}
          <AnimatePresence mode="wait">
            {noCount > 0 && (
              <motion.p
                key={noCount}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`${greatVibes.className} mt-6 text-2xl text-pink-200`}
              >
                You know you want to say yes... 🥺❤️
              </motion.p>
            )}
          </AnimatePresence>
        </motion.section>
      </div>

      {/* YES transition */}
      <AnimatePresence>
        {showLove && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#170914]/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className={`${greatVibes.className} px-6 text-center text-5xl text-pink-100 sm:text-6xl`}
            >
              I knew it... ❤️
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

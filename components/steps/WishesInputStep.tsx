"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";
import { fadeInUp } from "@/lib/animations";

interface WishesInputStepProps {
  onComplete: () => void;
}

export default function WishesInputStep({ onComplete }: WishesInputStepProps) {
  const [wishes, setWishes] = useState<string[]>(Array(config.wishes.maxWishes).fill(""));
  const [focused, setFocused] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleWishChange = (index: number, value: string) => {
    const newWishes = [...wishes];
    newWishes[index] = value;
    setWishes(newWishes);
    setSubmitError("");
  };

  const allWishesFilled = wishes.length === config.wishes.maxWishes && wishes.every((wish) => wish.trim().length > 0);

  const handleSubmit = async () => {
    if (!allWishesFilled || isSending || isSent) return;
    setIsSending(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wishes }),
      });
      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error || "Unable to send wishes.");
      }
      setIsSent(true);
      onComplete();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to send wishes.");
    } finally {
      setIsSending(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-transparent to-purple-600/10 animate-pulse" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-2xl w-full"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-romantic">
            Your Three Wishes
          </h1>
          <p className="text-xl text-gray-300">
            Share your heartfelt wishes for me on this special day
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="space-y-6 mb-12"
        >
          {wishes.map((wish, index) => (
            <motion.div key={index} variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2 font-sans">
                Wish {index + 1}
              </label>
              <div
                className={`relative transition-all duration-300 ${
                  focused === index ? "scale-105" : "scale-100"
                }`}
              >
                <textarea
                  value={wish}
                  onChange={(e) => handleWishChange(index, e.target.value)}
                  onFocus={() => setFocused(index)}
                  onBlur={() => setFocused(null)}
                  placeholder={config.wishes.placeholderWishes[index]}
                  className="w-full px-6 py-4 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-2 border-pink-500/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all duration-300 backdrop-blur-md resize-none"
                  rows={3}
                />
                {wish.trim() && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 text-pink-400"
                  >
                    ✓
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex gap-4"
        >
          <motion.button
            whileHover={allWishesFilled && !isSending ? { scale: 1.05 } : {}}
            whileTap={allWishesFilled && !isSending ? { scale: 0.95 } : {}}
            onClick={handleSubmit}
            disabled={!allWishesFilled || isSending || isSent}
            className={`flex-1 px-6 py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 ${
              allWishesFilled && !isSent
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg hover:shadow-pink-500/50 cursor-pointer"
                : "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"
            }`}
          >
            {isSending ? "Sending wishes..." : isSent ? "Wishes sent" : allWishesFilled ? "Send wishes" : "Fill all wishes"}
          </motion.button>
        </motion.div>

        {submitError && (
          <motion.p variants={itemVariants} role="alert" className="text-center text-rose-300 text-sm mt-4">
            {submitError}
          </motion.p>
        )}

        <motion.p
          variants={itemVariants}
          className="text-center text-gray-400 text-sm mt-6"
        >
          Your wishes will be sent securely after you submit them.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

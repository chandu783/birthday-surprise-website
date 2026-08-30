"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";
import { fadeInUp } from "@/lib/animations";
import { playAudio, setVolume, getVolume } from "@/lib/audio";

interface LetterStepProps {
  onComplete: () => void;
}

export default function LetterStep({ onComplete }: LetterStepProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolumeState] = useState(getVolume());
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolumeState(newVolume);
    setVolume(newVolume);
  };

  const handlePlayAudio = async () => {
    if (!isPlaying) {
      await playAudio();
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      {...fadeInUp}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/20 rounded-full filter blur-3xl animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 w-full max-w-2xl space-y-8"
      >
        {/* Letter envelope */}
        <motion.div
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="cursor-pointer"
        >
          <motion.div
            animate={{ rotateY: isOpen ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-video bg-gradient-to-br from-pink-200 to-pink-100 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden border-4 border-pink-300"
          >
            {!isOpen && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <motion.h2
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-3xl md:text-5xl font-black text-pink-600 mb-4"
                >
                  💌
                </motion.h2>
                <p className="text-pink-600 font-bold text-sm md:text-base">
                  Click to open your love letter
                </p>
              </motion.div>
            )}

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute inset-0 p-8 bg-gradient-to-br from-pink-50 to-white flex flex-col justify-center overflow-y-auto"
              >
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-pink-600">
                    {config.letter.title},
                  </h2>
                  <div className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                    {config.letter.content}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Music player section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4"
        >
          <h3 className="text-lg md:text-xl font-bold text-white text-center">
            🎵 Background Music
          </h3>

          {/* Volume control with heart shape visualization */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={handlePlayAudio}
                disabled={isPlaying}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full hover:shadow-lg hover:shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isPlaying ? "▶" : "▶"}
              </motion.button>

              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-gradient-to-r from-transparent to-pink-500 rounded-full appearance-none cursor-pointer accent-pink-500"
                />
              </div>

              <span className="text-white text-sm font-semibold min-w-12">
                {Math.round(volume * 100)}%
              </span>
            </div>

            <p className="text-xs text-gray-400 text-center">
              {isPlaying
                ? "Music is playing in the background 🎶"
                : "Click play to hear the music"}
            </p>
          </div>
        </motion.div>

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onComplete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all text-lg"
        >
          One Last Thing... 💍
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

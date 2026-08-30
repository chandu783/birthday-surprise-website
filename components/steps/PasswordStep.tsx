"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Delete, Heart, Lightbulb, LockKeyhole } from "lucide-react";
import { config } from "@/config";
import { fadeInUp, scaleIn } from "@/lib/animations";

interface PasswordStepProps {
  onSuccess: () => void;
}

const keypadRows = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["heart", "0", "delete"]];

export default function PasswordStep({ onSuccess }: PasswordStepProps) {
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(config.password.maxAttempts);
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState("");
  const [heartPulse, setHeartPulse] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const appendDigit = (digit: string) => {
    if (attempts === 0 || input.length >= 12) return;
    setInput((current) => current + digit);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toUpperCase() === config.password.correctPassword.toUpperCase()) {
      setError("");
      setTimeout(onSuccess, 500);
      return;
    }

    const remaining = attempts - 1;
    setAttempts(remaining);
    setInput("");
    setError(remaining === 0 ? "No more attempts. Refresh to try again." : "Wrong password! Try again.");
  };

  return (
    <motion.main {...fadeInUp} className="relative min-h-screen overflow-hidden px-4 py-6 sm:py-10 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 safe-area-inset">
      <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 size-64 sm:size-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.div {...scaleIn} className="relative z-10 w-full max-w-md space-y-4 sm:space-y-6">
        <div className="text-center space-y-1 sm:space-y-2">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-romantic text-5xl sm:text-6xl md:text-7xl leading-tight text-white drop-shadow-[0_0_14px_rgba(244,114,182,0.55)]">Hello My Love 💖</h1>
          </motion.div>
          <p className="font-sans text-sm sm:text-base text-gray-200">This surprise is just for you, {config.person.name}! 💕</p>
          <p className="font-sans text-xs sm:text-sm text-gray-400">Enter the password to unlock your birthday surprise.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="relative">
            <input
              ref={inputRef}
              type="password"
              inputMode="numeric"
              autoComplete="off"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(""); }}
              placeholder="Enter password..."
              disabled={attempts === 0}
              aria-label="Password"
              className="font-sans w-full h-12 sm:h-14 rounded-full border border-pink-400/60 bg-white/10 px-5 pr-12 text-center text-base sm:text-lg tracking-[0.35em] text-white placeholder:text-gray-400 placeholder:tracking-normal outline-none backdrop-blur-md transition-all focus:border-pink-300 focus:ring-4 focus:ring-pink-500/20 disabled:opacity-50"
            />
            <Heart className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-pink-300" fill="currentColor" aria-hidden="true" />
          </div>

          <div className="mx-auto grid w-full max-w-[19rem] grid-cols-3 gap-2.5 sm:gap-3" aria-label="Numeric password keypad">
            {keypadRows.flat().map((key) => (
              <motion.button
                key={key}
                type="button"
                disabled={attempts === 0}
                onClick={() => {
                  if (key === "heart") {
                    setHeartPulse(true);
                    setTimeout(() => setHeartPulse(false), 500);
                  } else if (key === "delete") {
                    setInput((current) => current.slice(0, -1));
                  } else {
                    appendDigit(key);
                  }
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.9 }}
                animate={key === "heart" && heartPulse ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                aria-label={key === "heart" ? "Heart" : key === "delete" ? "Delete last digit" : key}
                className="aspect-square w-full min-h-0 rounded-full border border-pink-300/40 bg-pink-500/15 text-lg font-semibold text-white shadow-[0_0_16px_rgba(236,72,153,0.18)] backdrop-blur-md transition-colors hover:border-pink-200/80 hover:bg-pink-400/25 disabled:opacity-50"
              >
                {key === "heart" ? <Heart className="mx-auto size-5" fill="currentColor" /> : key === "delete" ? <Delete className="mx-auto size-5" /> : key}
              </motion.button>
            ))}
          </div>

          <div className="flex gap-2">
            <motion.button type="submit" disabled={attempts === 0 || input.length === 0} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="font-sans flex-1 h-12 sm:h-14 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-sm sm:text-base font-semibold text-white shadow-lg shadow-pink-500/20 transition-all hover:shadow-pink-500/40 disabled:cursor-not-allowed disabled:opacity-50">
              <LockKeyhole className="mr-2 inline-block size-4" aria-hidden="true" /> Unlock My Surprise 🔐
            </motion.button>
            <motion.button type="button" onClick={() => setShowHint(!showHint)} whileTap={{ scale: 0.95 }} aria-label="Show hint" className="size-12 sm:size-14 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20">
              <Lightbulb className="mx-auto size-5" aria-hidden="true" />
            </motion.button>
          </div>
        </form>

        <AnimatePresence>
          {error && <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="font-sans text-center text-sm font-semibold text-red-400">{error}</motion.p>}
          {showHint && <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="rounded-2xl border border-amber-500/50 bg-amber-500/20 p-3 text-center backdrop-blur-md"><p className="font-sans text-sm font-semibold text-amber-200">Hint: {config.password.hint}</p></motion.div>}
        </AnimatePresence>

        <p className="font-sans text-center text-xs sm:text-sm text-gray-400">Attempts remaining: <span className="font-semibold text-pink-300">{attempts}</span></p>
        <p className="font-romantic text-center text-2xl sm:text-3xl text-pink-200 drop-shadow-[0_0_10px_rgba(244,114,182,0.35)]">Only you hold the key to my heart 💖</p>
      </motion.div>
    </motion.main>
  );
}

// Prevent a Tailwind class purge regression for the mobile safe-area utility.
void 0;

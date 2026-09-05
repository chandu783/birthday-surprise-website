"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";
import { fadeInUp, heartbeat } from "@/lib/animations";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownStepProps {
  onComplete?: () => void;
}

export default function CountdownStep({ onComplete }: CountdownStepProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isCountdownComplete, setIsCountdownComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(config.countdown.targetDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });

        setIsCountdownComplete(false);
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        setIsCountdownComplete(true);
      }
    };

    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleScreenTouch = () => {
    if (isCountdownComplete && onComplete) {
      onComplete();
    }
  };

  const TimeBox = ({
    value,
    label,
  }: {
    value: number;
    label: string;
  }) => (
    <motion.div
      {...fadeInUp}
      className="flex flex-col items-center gap-2 bg-gradient-to-br from-pink-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-6 border border-pink-500/30 min-w-24"
    >
      <div className="text-3xl md:text-4xl font-bold text-pink-400">
        {String(value).padStart(2, "0")}
      </div>

      <div className="text-xs md:text-sm uppercase font-semibold text-gray-300 tracking-wider">
        {label}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      {...fadeInUp}
      onClick={handleScreenTouch}
      onTouchStart={handleScreenTouch}
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ${
        isCountdownComplete ? "cursor-pointer" : ""
      }`}
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-transparent to-orange-600/10 animate-pulse" />
      </div>

      <motion.div
        {...heartbeat}
        className="relative z-10 text-center space-y-8"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-white text-balance"
        >
          Days Until {config.person.name}&apos;s Birthday ✨
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 justify-center max-w-2xl mx-auto"
        >
          <TimeBox value={timeLeft.days} label="Days" />
          <TimeBox value={timeLeft.hours} label="Hours" />
          <TimeBox value={timeLeft.minutes} label="Minutes" />
          <TimeBox value={timeLeft.seconds} label="Seconds" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-300"
        >
          {isCountdownComplete
            ? "It's time! 🎉"
            : "Get ready for something special! 🎂"}
        </motion.p>

        {isCountdownComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: [0.95, 1.02, 0.95],
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="space-y-3"
          >
            <p className="text-base md:text-lg text-pink-400 font-semibold">
              Your surprise is ready 💝
            </p>

            <p className="text-sm md:text-base text-gray-400">
              Touch anywhere to continue
            </p>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm md:text-base text-center pointer-events-none"
      >
        {isCountdownComplete ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-pink-400 font-semibold"
          >
            Touch the screen to continue ↓
          </motion.p>
        ) : (
          <p>Scroll down to continue ↓</p>
        )}
      </motion.div>
    </motion.div>
  );
}

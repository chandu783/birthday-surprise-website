"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import CountdownStep from "@/components/steps/CountdownStep";
import PasswordStep from "@/components/steps/PasswordStep";
import CelebrationStep from "@/components/steps/CelebrationStep";
import GalleryStep from "@/components/steps/GalleryStep";
import WishesInputStep from "@/components/steps/WishesInputStep";
import WishesDisplayStep from "@/components/steps/WishesDisplayStep";
import LoverLetterPage from "@/components/steps/LoverLetterPage";
import OptionsPage from "@/components/steps/OptionsPage";
import ProposalStep from "@/components/steps/ProposalStep";
import EndingStep from "@/components/steps/EndingStep";
import { initAudio } from "@/lib/audio";
import { config } from "@/config";
import FloatingMusicPlayer from "@/components/FloatingMusicPlayer";

type Step =
  | "countdown"
  | "password"
  | "celebration"
  | "gallery"
  | "wishes-input"
  | "wishes-display"
  | "letter"
  | "options"
  | "proposal"
  | "ending";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("countdown");
  const [mounted, setMounted] = useState(false);
  const [isBeforeBirthday, setIsBeforeBirthday] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Check if today is before the birthday
    const today = new Date();
    const birthdayDate = new Date(config.dates.birthday);
    setIsBeforeBirthday(today < birthdayDate);
    
    // Initialize audio on first interaction
    const handleFirstInteraction = () => {
      initAudio();
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  if (!mounted) return null;

  const handleStepComplete = (nextStep: Step) => {
    setCurrentStep(nextStep);
  };

  const handleCountdownComplete = () => {
    // When countdown completes, allow access to password page
    setIsBeforeBirthday(false);
    handleStepComplete("password");
  };

  const birthdayDate = new Date(config.dates.birthday);

  // If before birthday and not at countdown, lock the page
  if (isBeforeBirthday && currentStep !== "countdown") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-transparent to-orange-600/10 animate-pulse" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-md"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-romantic">
            This is locked!
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            This content will be available on {birthdayDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentStep("countdown")}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all"
          >
            Back to Countdown
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  // If before birthday, force countdown step
  const displayStep = isBeforeBirthday ? "countdown" : currentStep;

  return (
    <div className="overflow-x-hidden bg-slate-900">
      <FloatingMusicPlayer />
      <AnimatePresence mode="wait">
        {displayStep === "countdown" && (
          <div key="countdown">
            <CountdownStep onComplete={handleCountdownComplete} />
          </div>
        )}

        {displayStep === "password" && (
          <div key="password">
            <PasswordStep
              onSuccess={() => handleStepComplete("celebration")}
            />
          </div>
        )}

        {displayStep === "celebration" && (
          <div key="celebration">
            <CelebrationStep
              onComplete={() => handleStepComplete("gallery")}
            />
          </div>
        )}

        {displayStep === "gallery" && (
          <div key="gallery">
            <GalleryStep onComplete={() => handleStepComplete("wishes-input")} />
          </div>
        )}

        {displayStep === "wishes-input" && (
          <div key="wishes-input">
            <WishesInputStep onComplete={() => handleStepComplete("wishes-display")} />
          </div>
        )}

        {displayStep === "wishes-display" && (
          <div key="wishes-display">
            <WishesDisplayStep onComplete={() => handleStepComplete("letter")} />
          </div>
        )}

        {displayStep === "letter" && (
          <div key="letter">
            <LoverLetterPage onComplete={() => handleStepComplete("options")} />
          </div>
        )}

        {displayStep === "options" && (
          <div key="options">
            <OptionsPage onComplete={() => handleStepComplete("proposal")} />
          </div>
        )}

        {displayStep === "proposal" && (
          <div key="proposal">
            <ProposalStep onYes={() => handleStepComplete("ending")} />
          </div>
        )}

        {displayStep === "ending" && (
          <div key="ending">
            <EndingStep />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

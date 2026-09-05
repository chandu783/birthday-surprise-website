"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Great_Vibes, Poppins } from "next/font/google";
import { config } from "@/config";
import { fadeInUp } from "@/lib/animations";

interface OptionsPageProps {
  onComplete: () => void;
}

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function OptionsPage({ onComplete }: OptionsPageProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.92,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const sections = [
    {
      title: "About Us",
      icon: "💑",
      content: `We met on ${config.dates.meetingDate}. Since then, every day with you has been a blessing. You are my greatest love and my truest friend. Thank you for being the most amazing person in my life.`,
      gradient: "from-pink-500/20 via-rose-500/10 to-red-500/20",
      border: "border-pink-400/30",
      glow: "hover:shadow-pink-500/30",
    },
    {
      title: "Photo Gallery",
      icon: "📸",
      content: `We have ${config.gallery.photos.length} beautiful memories captured in photos. Each one tells a story of us together. Every smile, every moment, every laugh - they are all treasures I hold close to my heart.`,
      gradient: "from-purple-500/20 via-pink-500/10 to-rose-500/20",
      border: "border-purple-400/30",
      glow: "hover:shadow-purple-500/30",
    },
    {
      title: "Video Gallery",
      icon: "🎬",
      content: `Your ${config.gallery.videos.length} special videos capture the moments we'll cherish forever. From laughter to tears of joy, these memories are the essence of our love story.`,
      gradient: "from-blue-500/20 via-purple-500/10 to-pink-500/20",
      border: "border-blue-400/30",
      glow: "hover:shadow-blue-500/30",
    },
    {
      title: "Love Letter",
      icon: "💌",
      content: `I've already shared my deepest feelings in my love letter. Everything I wanted to say is written with all the love in my heart. You mean the world to me.`,
      gradient: "from-rose-500/20 via-red-500/10 to-pink-500/20",
      border: "border-rose-400/30",
      glow: "hover:shadow-rose-500/30",
    },
  ];

  return (
    <motion.div
      {...fadeInUp}
      className={`${poppins.className} min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-10`}
    >
      {/* Romantic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#160914] via-[#250d20] to-[#100713]" />

      {/* Glow Orbs */}
      <motion.div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />

      {/* Floating Flowers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { emoji: "🌸", left: "5%", top: "15%", delay: 0 },
          { emoji: "🌹", left: "90%", top: "20%", delay: 1 },
          { emoji: "🌷", left: "12%", top: "75%", delay: 2 },
          { emoji: "🌺", left: "85%", top: "70%", delay: 1.5 },
          { emoji: "🌸", left: "50%", top: "8%", delay: 2.5 },
          { emoji: "💕", left: "25%", top: "30%", delay: 3 },
          { emoji: "💖", left: "75%", top: "45%", delay: 1 },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl md:text-3xl opacity-40"
            style={{
              left: item.left,
              top: item.top,
            }}
            animate={{
              y: [-10, 10, -10],
              rotate: [-8, 8, -8],
              opacity: [0.25, 0.55, 0.25],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-10"
        >
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-4xl mb-4"
          >
            💕
          </motion.div>

          <h1
            className={`${greatVibes.className} text-5xl md:text-7xl text-pink-200 drop-shadow-[0_0_20px_rgba(244,114,182,0.35)]`}
          >
            Our Little Love Story
          </h1>

          <p className="mt-3 text-sm md:text-lg text-pink-100/70">
            A few beautiful memories before the final surprise...
          </p>

          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="h-px w-16 bg-pink-400/30" />
            <span className="text-pink-300">♡</span>
            <span className="h-px w-16 bg-pink-400/30" />
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {sections.map((section) => {
            const isSelected = selectedSection === section.title;

            return (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className="group cursor-pointer"
                onClick={() =>
                  setSelectedSection(
                    isSelected ? null : section.title
                  )
                }
              >
                <motion.div
                  whileHover={{
                    y: -7,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`relative h-full min-h-[220px] overflow-hidden rounded-[2rem] border ${section.border} bg-gradient-to-br ${section.gradient} backdrop-blur-xl p-6 md:p-8 shadow-2xl ${section.glow} transition-shadow duration-500`}
                >
                  {/* Card glow */}
                  <div className="absolute -top-16 -right-16 w-32 h-32 bg-pink-400/10 rounded-full blur-2xl" />

                  {/* Flower */}
                  <motion.div
                    animate={{
                      rotate: [-5, 5, -5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="absolute right-5 top-5 text-2xl opacity-50"
                  >
                    🌸
                  </motion.div>

                  <div className="relative z-10">
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                      }}
                      className="text-5xl mb-5"
                    >
                      {section.icon}
                    </motion.div>

                    <h2
                      className={`${greatVibes.className} text-3xl md:text-4xl text-pink-100 mb-3`}
                    >
                      {section.title}
                    </h2>

                    <p className="text-sm md:text-base text-white/65 leading-relaxed">
                      {section.content.substring(0, 90)}...
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-pink-300 text-sm font-medium">
                      <span>
                        {isSelected
                          ? "Hide memory"
                          : "Read this memory"}
                      </span>

                      <motion.span
                        animate={{
                          x: isSelected ? 4 : 0,
                        }}
                      >
                        {isSelected ? "↑" : "→"}
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Selected Content */}
        <AnimatePresence mode="wait">
          {selectedSection && (
            <motion.div
              key={selectedSection}
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 15,
                scale: 0.97,
              }}
              transition={{
                duration: 0.5,
              }}
              className="mt-6 relative overflow-hidden rounded-[2rem] border border-pink-400/25 bg-white/[0.06] backdrop-blur-2xl p-6 md:p-9"
            >
              <div className="absolute top-3 left-5 text-xl opacity-50">
                🌸
              </div>

              <div className="absolute bottom-3 right-5 text-xl opacity-50">
                🌹
              </div>

              <div className="relative z-10 text-center">
                <div className="text-3xl mb-4">💌</div>

                <p className="text-base md:text-lg text-pink-50/85 leading-8">
                  {
                    sections.find(
                      (section) =>
                        section.title === selectedSection
                    )?.content
                  }
                </p>

                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedSection(null);
                  }}
                  className="mt-6 rounded-full border border-pink-300/30 bg-pink-500/10 px-6 py-2.5 text-sm text-pink-200 transition hover:bg-pink-500/20"
                >
                  Close ♡
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <motion.div
          variants={itemVariants}
          className="mt-8"
        >
          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 35px rgba(244, 114, 182, 0.35)",
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={onComplete}
            className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 px-8 py-4 text-base md:text-lg font-semibold text-white shadow-xl shadow-pink-500/20"
          >
            <motion.div
              className="absolute inset-0 bg-white/10"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />

            <span className="relative z-10">
              Continue to My Final Surprise 💕
            </span>
          </motion.button>

          <p className="text-center text-xs text-pink-100/40 mt-3">
            There's something special waiting for you...
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

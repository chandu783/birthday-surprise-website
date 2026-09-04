```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Great_Vibes, Poppins } from "next/font/google";
import { config } from "@/config";
import { fadeInUp } from "@/lib/animations";

/* =========================================================
   FONTS
========================================================= */

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

/* =========================================================
   TYPES
========================================================= */

interface CombinedSurpriseProps {
  onComplete: () => void;
}

/* =========================================================
   FLOWER DATA
========================================================= */

const flowers = [
  { emoji: "🌸", left: "4%", delay: 0, duration: 8 },
  { emoji: "🌷", left: "14%", delay: 2, duration: 10 },
  { emoji: "🌹", left: "27%", delay: 1, duration: 9 },
  { emoji: "🌺", left: "72%", delay: 3, duration: 10 },
  { emoji: "🌸", left: "84%", delay: 1.5, duration: 8 },
  { emoji: "🌷", left: "94%", delay: 4, duration: 9 },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CombinedSurprise({
  onComplete,
}: CombinedSurpriseProps) {
  const [page, setPage] = useState<"options" | "proposal">("options");

  return (
    <div className={poppins.className}>
      <AnimatePresence mode="wait">
        {page === "options" ? (
          <OptionsPage
            key="options"
            onComplete={() => setPage("proposal")}
          />
        ) : (
          <ProposalPage
            key="proposal"
            onComplete={onComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   OPTIONS PAGE
========================================================= */

function OptionsPage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [selectedSection, setSelectedSection] =
    useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
      scale: 0.9,
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
      color:
        "from-pink-500/20 to-rose-500/20 border-pink-400/30",
    },
    {
      title: "Photo Gallery",
      icon: "📸",
      content: `We have ${config.gallery.photos.length} beautiful memories captured in photos. Each one tells a story of us together. Every smile, every moment, every laugh - they are all treasures I hold close to my heart.`,
      color:
        "from-purple-500/20 to-pink-500/20 border-purple-400/30",
    },
    {
      title: "Video Gallery",
      icon: "🎬",
      content: `Our ${config.gallery.videos.length} special videos capture the moments we'll cherish forever. From laughter to tears of joy, these memories are the essence of our love story.`,
      color:
        "from-blue-500/20 to-purple-500/20 border-blue-400/30",
    },
    {
      title: "Love Letter",
      icon: "💌",
      content:
        "I've already shared my deepest feelings in my love letter. Everything I wanted to say is written with all the love in my heart. You mean the world to me.",
      color:
        "from-rose-500/20 to-red-500/20 border-rose-400/30",
    },
  ];

  return (
    <motion.div
      {...fadeInUp}
      className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-10"
      style={{
        background:
          "radial-gradient(circle at 50% 20%, #42152f 0%, #211025 40%, #0b0712 100%)",
      }}
    >
      {/* Background glow */}

      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-pink-500/20 blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-purple-500/20 blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
      />

      {/* Floating flowers */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {flowers.map((flower, index) => (
          <motion.div
            key={index}
            className="absolute text-3xl md:text-5xl"
            style={{
              left: flower.left,
              bottom: "-70px",
            }}
            animate={{
              y: "-115vh",
              opacity: [0, 0.8, 0.8, 0],
              x: [0, 20, -15, 10, 0],
              rotate: [0, 20, -20, 15, 0],
            }}
            transition={{
              duration: flower.duration,
              delay: flower.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {flower.emoji}
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="text-center mb-10"
        >
          <p className="text-pink-300/70 text-xs uppercase tracking-[0.35em] mb-3">
            Our Little World
          </p>

          <h1
            className={`${greatVibes.className} text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-pink-100`}
          >
            Our Memories
          </h1>

          <p className="text-sm md:text-lg text-pink-100/60 mt-3">
            Every moment with you is a memory worth keeping ♡
          </p>
        </motion.div>

        {/* Cards */}

        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-5 md:gap-6"
        >
          {sections.map((section, index) => {
            const selected =
              selectedSection === section.title;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                onClick={() =>
                  setSelectedSection(
                    selected ? null : section.title
                  )
                }
                whileHover={{
                  scale: 1.03,
                  y: -5,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className={`relative cursor-pointer p-6 md:p-8 rounded-[2rem] border backdrop-blur-xl bg-gradient-to-br ${section.color} shadow-xl transition-all duration-300`}
              >
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                  className="text-5xl mb-4"
                >
                  {section.icon}
                </motion.div>

                <h2
                  className={`${greatVibes.className} text-3xl md:text-4xl text-white mb-2`}
                >
                  {section.title}
                </h2>

                <p className="text-sm md:text-base text-pink-100/60 leading-relaxed">
                  {section.content.substring(0, 95)}...
                </p>

                <div className="mt-4 text-sm text-pink-300 font-medium">
                  {selected
                    ? "Showing your memory ♡"
                    : "Tap to read more →"}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Selected section */}

        <AnimatePresence>
          {selectedSection && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              className="mt-6 p-6 md:p-8 rounded-[2rem] border border-pink-300/20 bg-black/30 backdrop-blur-xl"
            >
              <p className="text-center text-pink-100/80 text-base md:text-lg leading-relaxed">
                {
                  sections.find(
                    (section) =>
                      section.title === selectedSection
                  )?.content
                }
              </p>

              <button
                onClick={() => setSelectedSection(null)}
                className="block mx-auto mt-5 text-sm text-pink-300 hover:text-pink-200"
              >
                Close ♡
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue */}

        <motion.button
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
          }}
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={onComplete}
          className="w-full mt-8 py-4 md:py-5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white text-base md:text-lg font-semibold shadow-[0_0_35px_rgba(236,72,153,0.35)]"
        >
          Continue to My Final Surprise 💕
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   PROPOSAL PAGE
========================================================= */

function ProposalPage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [attemptCount, setAttemptCount] = useState(0);

  const [noButtonPosition, setNoButtonPosition] =
    useState({
      x: 0,
      y: 0,
    });

  const [accepted, setAccepted] = useState(false);

  const maxAttempts =
    config.proposal.noButtonResponses.length;

  const showSuccessMessage =
    attemptCount >= maxAttempts;

  /* =======================================================
     YES
  ======================================================== */

  const handleYes = () => {
    if (accepted) return;

    setAccepted(true);

    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  /* =======================================================
     NO
  ======================================================== */

  const handleNo = () => {
    if (accepted) return;

    if (showSuccessMessage) {
      setAccepted(true);

      setTimeout(() => {
        onComplete();
      }, 3000);

      return;
    }

    setAttemptCount((previous) => previous + 1);

    const randomX =
      (Math.random() - 0.5) * 280;

    const randomY =
      (Math.random() - 0.5) * 220;

    setNoButtonPosition({
      x: randomX,
      y: randomY,
    });
  };

  return (
    <motion.div
      {...fadeInUp}
      className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-8"
      style={{
        background:
          "radial-gradient(circle at 50% 35%, #52183d 0%, #2a102b 35%, #13091d 70%, #07050d 100%)",
      }}
    >
      {/* =================================================
          BACKGROUND LIGHTS
      ================================================== */}

      <motion.div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-pink-500/20 blur-[110px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-rose-500/20 blur-[120px]"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full"
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />

      {/* =================================================
          FLOATING FLOWERS
      ================================================== */}

      <div className="absolute inset-0 pointer-events-none">
        {flowers.map((flower, index) => (
          <motion.div
            key={index}
            className="absolute text-3xl md:text-5xl"
            style={{
              left: flower.left,
              bottom: "-80px",
            }}
            animate={{
              y: "-115vh",
              opacity: [0, 0.8, 0.8, 0],
              rotate: [0, 25, -25, 15, 0],
              x: [0, 20, -15, 15, 0],
            }}
            transition={{
              duration: flower.duration,
              delay: flower.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {flower.emoji}
          </motion.div>
        ))}
      </div>

      {/* =================================================
          FLOATING HEARTS
      ================================================== */}

      {[
        ["8%", "20%"],
        ["17%", "70%"],
        ["80%", "23%"],
        ["91%", "67%"],
        ["50%", "10%"],
      ].map(([left, top], index) => (
        <motion.div
          key={index}
          className="absolute text-pink-300/50 text-xl md:text-3xl pointer-events-none"
          style={{
            left,
            top,
          }}
          animate={{
            y: [-10, 15, -10],
            x: [-5, 5, -5],
            scale: [0.8, 1.15, 0.8],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 4,
            delay: index * 0.5,
            repeat: Infinity,
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* =================================================
          SPARKLES
      ================================================== */}

      {Array.from({ length: 25 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute text-pink-200/60 text-xs pointer-events-none"
          style={{
            left: `${(index * 37) % 100}%`,
            top: `${(index * 53) % 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.4, 0.5],
          }}
          transition={{
            duration: 2 + (index % 3),
            delay: (index % 5) * 0.5,
            repeat: Infinity,
          }}
        >
          ✦
        </motion.span>
      ))}

      {/* =================================================
          MAIN CARD
      ================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="absolute -inset-5 rounded-[3rem] bg-pink-500/10 blur-3xl" />

        <motion.div
          className="relative rounded-[2rem] md:rounded-[3rem] border border-pink-300/25 bg-black/35 backdrop-blur-2xl px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 shadow-2xl"
          animate={{
            boxShadow: [
              "0 0 50px rgba(236,72,153,0.10)",
              "0 0 90px rgba(236,72,153,0.25)",
              "0 0 50px rgba(236,72,153,0.10)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          {/* =================================================
              TOP FLOWERS
          ================================================== */}

          <div className="flex justify-center items-center gap-3 mb-6 text-2xl md:text-3xl">
            <motion.span
              animate={{
                rotate: [-8, 8, -8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              🌸
            </motion.span>

            <span className="text-pink-300">
              ♡
            </span>

            <motion.span
              animate={{
                rotate: [8, -8, 8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              🌹
            </motion.span>

            <span className="text-pink-300">
              ♡
            </span>

            <motion.span
              animate={{
                rotate: [-8, 8, -8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              🌷
            </motion.span>
          </div>

          {/* =================================================
              CLOSED / OPEN RING BOX
          ================================================== */}

          <div className="relative flex justify-center mb-7">
            <div className="relative h-32 w-44 md:h-40 md:w-56">

              {/* Glow */}

              <motion.div
                className="absolute inset-0 rounded-full bg-pink-500/30 blur-3xl"
                animate={{
                  scale: accepted
                    ? [1, 1.6, 2]
                    : [1, 1.15, 1],
                  opacity: accepted
                    ? [0.4, 0.8, 0]
                    : [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: accepted ? 2 : 3,
                  repeat: accepted ? 0 : Infinity,
                }}
              />

              {/* =================================================
                  BOX BASE
              ================================================== */}

              <motion.div
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-36 h-16 md:w-48 md:h-20 rounded-xl bg-gradient-to-br from-rose-700 via-pink-600 to-rose-800 border border-pink-300/40 shadow-[0_15px_40px_rgba(244,63,94,0.45)]"
                animate={{
                  y: accepted ? 3 : [0, -3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: accepted ? 0 : Infinity,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-3xl">
                  ♡
                </div>

                <div className="absolute inset-x-4 top-2 h-px bg-white/25" />
              </motion.div>

              {/* =================================================
                  CLOSED BOX LID
              ================================================== */}

              <motion.div
                className="absolute bottom-[58px] md:bottom-[68px] left-1/2 -translate-x-1/2 w-36 h-12 md:w-48 md:h-14 origin-bottom rounded-t-xl bg-gradient-to-br from-pink-500 via-rose-600 to-pink-700 border border-pink-300/50 shadow-[0_5px_20px_rgba(244,63,94,0.45)]"
                animate={
                  accepted
                    ? {
                        rotateX: -115,
                        y: -20,
                      }
                    : {
                        rotateX: 0,
                        y: 0,
                      }
                }
                transition={{
                  duration: 1.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: 700,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-xl">
                  ♡
                </div>
              </motion.div>

              {/* =================================================
                  RING REVEAL
              ================================================== */}

              <AnimatePresence>
                {accepted && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.3,
                      y: 25,
                    }}
                    animate={{
                      opacity: [0, 1, 1],
                      scale: [0.3, 1.25, 1],
                      y: [25, -15, -5],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.75,
                    }}
                    className="absolute left-1/2 bottom-[45px] -translate-x-1/2 text-5xl md:text-7xl z-20"
                  >
                    💍
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Ring sparkle */}

              {accepted && (
                <>
                  <motion.div
                    className="absolute left-[35%] top-[0%] text-yellow-200 text-2xl z-30"
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.6, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      delay: 1.2,
                      repeat: 2,
                    }}
                  >
                    ✨
                  </motion.div>

                  <motion.div
                    className="absolute right-[25%] top-[5%] text-white text-xl z-30"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 1.5,
                      repeat: 2,
                    }}
                  >
                    ✦
                  </motion.div>
                </>
              )}
            </div>
          </div>

          {/* =================================================
              NAME
          ================================================== */}

          <div className="text-center">
            <p className="text-[10px] md:text-xs text-pink-200/60 uppercase tracking-[0.4em] mb-2">
              My Dearest
            </p>

            <h3
              className={`${greatVibes.className} text-3xl md:text-4xl text-pink-200`}
            >
              {config.person.name}
            </h3>

            <div className="flex justify-center items-center gap-3 my-5">
              <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-pink-400/50" />

              <motion.span
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="text-pink-400 text-xl"
              >
                ♡
              </motion.span>

              <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-pink-400/50" />
            </div>

            {/* =================================================
                QUESTION
            ================================================== */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              className={`${greatVibes.className} text-5xl sm:text-6xl md:text-7xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-pink-100`}
            >
              Will You Spend
            </motion.h1>

            <motion.h2
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.45,
              }}
              className="mt-2 text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-wide"
            >
              Every Birthday
              <br />
              <span className="text-pink-200">
                With Me?
              </span>
            </motion.h2>

            <p
              className={`${greatVibes.className} mt-5 text-xl md:text-2xl text-pink-100/70`}
            >
              More birthdays, more memories,
              <br />
              more love... just you and me, always ♡
            </p>
          </div>

          {/* =================================================
              NO RESPONSE
          ================================================== */}

          <AnimatePresence mode="wait">
            {attemptCount > 0 &&
              attemptCount < maxAttempts &&
              !accepted && (
                <motion.div
                  key={attemptCount}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  className="mt-6 text-center"
                >
                  <p
                    className={`${greatVibes.className} text-xl md:text-2xl text-pink-200`}
                  >
                    {
                      config.proposal.noButtonResponses[
                        attemptCount - 1
                      ]
                    }
                  </p>
                </motion.div>
              )}
          </AnimatePresence>

          {/* =================================================
              SUCCESS MESSAGE
          ================================================== */}

          <AnimatePresence>
            {showSuccessMessage && !accepted && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="mt-6 p-5 rounded-2xl bg-pink-500/10 border border-pink-300/20"
              >
                <p
                  className={`${greatVibes.className} text-xl md:text-2xl text-pink-100 text-center`}
                >
                  I knew you'd say yes! 💕
                  <br />
                  Getting ready for the best birthday ever...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* =================================================
              ACCEPTED
          ================================================== */}

          <AnimatePresence>
            {accepted && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-5 text-center"
              >
                <motion.p
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                  }}
                  className={`${greatVibes.className} text-2xl md:text-3xl text-pink-200`}
                >
                  You just made my heart the happiest... ❤️
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* =================================================
              BUTTONS
          ================================================== */}

          {!accepted && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.8,
              }}
              className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[80px]"
            >
              {/* YES */}

              <motion.button
                onClick={handleYes}
                whileHover={{
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.94,
                }}
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(244,63,94,0.3)",
                    "0 0 35px rgba(244,63,94,0.7)",
                    "0 0 15px rgba(244,63,94,0.3)",
                  ],
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                  },
                }}
                className="relative w-full sm:w-auto min-w-[190px] px-9 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-semibold text-lg border border-pink-200/50 overflow-hidden"
              >
                <motion.span
                  className="absolute inset-y-0 -left-20 w-10 bg-white/30 blur-md skew-x-[-20deg]"
                  animate={{
                    x: [0, 280],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />

                <span className="relative z-10">
                  YES! 💕
                </span>
              </motion.button>

              {/* NO */}

              <motion.button
                onClick={handleNo}
                animate={{
                  x: noButtonPosition.x,
                  y: noButtonPosition.y,
                }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 14,
                }}
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="w-full sm:w-auto min-w-[150px] px-9 py-4 rounded-full bg-white/5 backdrop-blur-md text-pink-100 font-medium text-lg border border-pink-200/20 hover:bg-white/10"
              >
                No 🙈
              </motion.button>
            </motion.div>
          )}

          {/* =================================================
              HINT
          ================================================== */}

          {!accepted &&
            attemptCount < maxAttempts && (
              <p className="text-center mt-5 text-xs text-pink-100/40 italic">
                (Psst... the No button has a mind of its own 😉)
              </p>
            )}

          {/* =================================================
              BOTTOM FLOWERS
          ================================================== */}

          <motion.div
            className="flex justify-center gap-3 mt-7 text-xl md:text-2xl opacity-70"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <span>🌸</span>
            <span>🌹</span>
            <span>🌷</span>
            <span>🌺</span>
            <span>🌸</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* =====================================================
          YES CELEBRATION
      ====================================================== */}

      <AnimatePresence>
        {accepted && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 45 }).map((_, index) => (
              <motion.div
                key={index}
                className="absolute text-xl md:text-3xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.3, 1, 0.6],
                  y: [
                    0,
                    -100 - Math.random() * 300,
                  ],
                  x: [
                    0,
                    (Math.random() - 0.5) * 150,
                    (Math.random() - 0.5) * 300,
                  ],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.8,
                  ease: "easeOut",
                }}
              >
                {
                  ["❤️", "💕", "🌸", "🌹", "🌷", "✨", "💖"][
                    index % 7
                  ]
                }
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";
import { fadeInUp } from "@/lib/animations";

interface OptionsPageProps {
  onComplete: () => void;
}

export default function OptionsPage({ onComplete }: OptionsPageProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

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
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const sections = [
    {
      title: "About Us",
      icon: "💑",
      content: `We met on ${config.dates.meetingDate}. Since then, every day with you has been a blessing. You are my greatest love and my truest friend. Thank you for being the most amazing person in my life.`,
      color: "from-pink-500/20 to-rose-500/20 border-pink-500/40",
    },
    {
      title: "Photo Gallery",
      icon: "📸",
      content: `We have ${config.gallery.photos.length} beautiful memories captured in photos. Each one tells a story of us together. Every smile, every moment, every laugh - they are all treasures I hold close to my heart.`,
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/40",
    },
    {
      title: "Video Gallery",
      icon: "🎬",
      content: `Our ${config.gallery.videos.length} special videos capture the moments we'll cherish forever. From laughter to tears of joy, these memories are the essence of our love story.`,
      color: "from-blue-500/20 to-purple-500/20 border-blue-500/40",
    },
    {
      title: "Love Letter",
      icon: "💌",
      content: `I've already shared my deepest feelings in my love letter. Everything I wanted to say is written with all the love in my heart. You mean the world to me.`,
      color: "from-rose-500/20 to-red-500/20 border-rose-500/40",
    },
  ];

  return (
    <motion.div
      {...fadeInUp}
      className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative"
    >
      {/* Background glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-pink-600/10 animate-pulse" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-romantic">
            Settings & Memories
          </h1>
          <p className="text-xl text-gray-300">
            Explore our special moments together
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onClick={() =>
                setSelectedSection(
                  selectedSection === section.title ? null : section.title
                )
              }
              className="group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`p-8 bg-gradient-to-br ${section.color} backdrop-blur-lg rounded-3xl border-2 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/30 h-full`}
              >
                <div className="text-5xl mb-4">{section.icon}</div>
                <h2 className="text-2xl font-bold text-white mb-2 font-romantic">
                  {section.title}
                </h2>
                <p className="text-gray-300 mb-4">
                  {section.content.substring(0, 80)}...
                </p>
                <motion.div
                  animate={{
                    x: selectedSection === section.title ? 5 : 0,
                  }}
                  className="text-pink-400 font-semibold text-sm"
                >
                  Click to view →
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected section details */}
        {selectedSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-12 p-8 bg-gradient-to-br from-gray-800/50 to-slate-800/50 backdrop-blur-lg rounded-3xl border-2 border-pink-500/30"
          >
            <div className="text-center mb-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                {sections.find((s) => s.title === selectedSection)?.content}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSection(null)}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500/50 to-rose-500/50 text-white rounded-xl font-semibold hover:from-pink-500 hover:to-rose-500 transition-all duration-300"
            >
              Close
            </motion.button>
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
        >
          Ready for the Final Surprise
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

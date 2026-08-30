// Birthday Surprise Configuration - Customize all values here
export const config = {
  // Personal Details
  person: {
    name: "Naani", // Birthday person's name
    nickname: "Beautiful",
  },

  // Important Dates (YYYY-MM-DD format)
  dates: {
    birthday: "2026-09-16", // Her birthday
    meetingDate: "2024-07-15", // When you met
  },

  // Step 1: Countdown Settings
  countdown: {
    targetDate: "2026-08-30T00:00:00+05:30", // IST timezone
    enabled: true,
  },

  // Step 2: Password Settings
  password: {
    correctPassword: "2007", // Change to your password
    hint: "Think of what I feel for you... 💕",
    maxAttempts: 3,
  },

  // Step 3: Celebration Settings
  celebration: {
    message: "Let's celebrate your special day together! 🎉",
    confettiCount: 80, // Balanced for mobile performance
    autoProgressDelay: 40000, // ms before auto-moving to next step
  },

  // Step 4: Gallery Settings (Photos & Videos)
  gallery: {
    // Example photos included in /public/memories/. Replace these with personal photos when ready.
    photos: [
      "/memories/memory-01.png",
      "/memories/memory-02.png",
      "/memories/memory-03.png",
      "/memories/memory-04.png",
    ],
    // Add licensed videos to /public/memories/ when available.
    videos: [],
    enableSwipe: true, // Manual swipe only, no auto-scroll
    manualNavigationOnly: true,
  },

  // Step 5: Wishes Settings (User Input)
  wishes: {
    maxWishes: 3, // User enters 3 wishes
    placeholderWishes: [
      "Enter your first wish...",
      "Enter your second wish...",
      "Enter your third wish...",
    ],
    // These are pre-filled default wishes if user doesn't enter custom ones
    defaultWishes: [
      "May every moment with me be filled with joy 💕",
      "Wishing you endless happiness and laughter 😊",
      "May your dreams come true, especially the ones with me 🌟",
    ],
    notificationEmail: "gajulachandu1234@gmail.com",
  },

  // Step 6: Love Letter (Separate Page)
  letter: {
    title: "A Letter For You",
    subject: "My Love, My Life",
    content: `Dear Naani,

I still remember the moment I first saw you – time seemed to stand still. Your presence has filled my life with colors I never knew existed, and every day with you feels like a blessing I never deserve.

You are not just my love, but my best friend, my confidant, and my home. The way you laugh, the way you care, the way you love – everything about you makes me want to be a better person.

On this special day, I want you to know that every moment spent with you is a gift I cherish with all my heart. Your smile lights up my darkest days, and your love keeps me going.

I promise to love you endlessly, to support your dreams, and to make every birthday of yours as special as you make every day of my life.

Forever and always yours,
With all my love 💕

P.S. You are my greatest adventure and my truest home.`,
  },

  // Step 7: Wishes Display (After User Input)
  wishesDisplay: {
    title: "Our Wishes Together",
    message: "These are the beautiful wishes you shared with me 💝",
  },

  // Step 8: Options/Settings Page (Separate)
  options: {
    title: "Settings & Memories",
    sections: [
      "About Us",
      "Photo Gallery",
      "Video Gallery",
      "Love Letter",
    ],
  },

  // Step 9: Proposal Settings
  proposal: {
    yesBtnText: "Yes, Forever! 💍",
    noBtnText: "Maybe...",
    noButtonResponses: [
      "Are you sure? 🥺",
      "Really? Think again... 💔",
      "Give me another chance? 🌹",
      "Please? 😭",
      "I'll keep asking because you're worth it 🙏",
    ],
    proposalMessage: "Will you be mine, forever and always?",
  },

  // Step 10: Ending/Proposal Success
  ending: {
    celebrationMessage: "You've made me the happiest person alive! 💍✨",
    confettiCount: 120, // Celebrate bigger on proposal success
    finalMessage: "I love you more than words could ever express. Here's to our forever story 💕",
  },

  // Audio Settings
  audio: {
    enabled: true,
    volume: 0.4, // Default 40%
    backgroundMusicPath: "/audio/background.mp3",
    songs: [
      { title: "Love Me Like You Do", path: "/audio/love-me-like-you-do.mp3" },
      { title: "Your Eyes Got My Heart", path: "/audio/your-eyes-got-my-heart.mp3" },
    ],
    loop: true,
  },

  // Animation & Performance Settings
  animations: {
    enableParticles: true,
    particleCount: 50, // Balanced for mobile
    reduceMotionRespect: true, // Respect prefers-reduced-motion
  },

  // UI Theme Colors
  theme: {
    primary: "#ec4899", // Pink
    secondary: "#f97316", // Orange
    accent: "#fbbf24", // Amber
    dark: "#1a1a1a",
    light: "#ffffff",
  },
};

// Export a typed version for better IntelliSense
export type Config = typeof config;

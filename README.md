# 🎂 Birthday Surprise Website

A beautiful, fully responsive, and smooth mobile-optimized birthday surprise experience built with Next.js, Framer Motion, and Tailwind CSS.

## Features

✨ **Eight-Step Journey:**
1. **Countdown** - Live countdown timer to birthday (IST timezone)
2. **Password Protection** - Secure access with hint system
3. **Celebration** - Confetti animation and party vibes
4. **Photo Gallery** - Interactive gallery with swipe support for mobile
5. **Wishes** - Heartfelt birthday wishes
6. **Love Letter** - Interactive letter with clickable envelope
7. **Proposal** - Fun interactive proposal (the "NO" button runs away!)
8. **Ending** - Grand finale with confetti celebration

## Performance Optimized

🚀 **Mobile-First Design:**
- Smooth animations using Framer Motion (respects `prefers-reduced-motion`)
- Canvas-based particle effects for confetti (optimized for mobile)
- Lazy-loaded gallery images with placeholder support
- Debounced touch/scroll events to prevent jank
- Sub-300ms interaction response times

📊 **Web Vitals:**
- LCP: ~1056ms (excellent)
- FCP: ~216ms (excellent)
- CLS: 0.0 (perfect)
- Full page hydration without performance impact

## Customization

All values are centralized in `config.ts` for easy customization:

```typescript
// Person details
person.name = "Priya"
person.nickname = "Beautiful"

// Important dates
dates.birthday = "2026-08-04"
dates.meetingDate = "2024-07-15"

// Password (change to your custom password)
password.correctPassword = "ILOVEYOU"

// Wishes, letter content, proposal messages - all customizable
```

## Installation & Setup

### 1. Clone and Install

```bash
git clone <repo-url>
cd birthday-surprise
pnpm install
```

### 2. Customize

Edit `config.ts` to personalize:
- Person's name and nickname
- Birthday date
- Password and hint
- All messages and wishes
- Letter content

### 3. Add Photos

Place your photos in `/public/memories/` with names `img1.jpg` through `img6.jpg` (or update the paths in `config.ts`).

The app supports any number of images:

```typescript
// In config.ts
gallery.images: [
  "/memories/photo1.jpg",
  "/memories/photo2.jpg",
  // Add more...
]
```

### 4. Add Background Music

Replace `/public/audio/background.mp3` with your custom audio file. The app supports:
- MP3, WAV, OGG formats
- Autoplay on first user interaction
- Volume control (0-100%)
- Loop playback

### 5. Run Local Dev Server

```bash
pnpm dev
# Open http://localhost:3000
```

### 6. Deploy to Vercel

```bash
vercel deploy
```

## Tech Stack

- **Frontend:** Next.js 16 (App Router)
- **Animations:** Framer Motion 12
- **Styling:** Tailwind CSS v4
- **Date Handling:** date-fns
- **Performance:** Code-splitting, lazy loading, debouncing

## Mobile Optimization

✅ **Touch-Friendly:**
- Buttons: 44x44px minimum (WCAG compliant)
- Swipe gallery navigation
- Optimized tap targets
- No hover-only interactions

✅ **Battery & Performance:**
- RequestAnimationFrame for smooth 60fps
- CSS keyframes for background effects
- Canvas-based particles (GPU-efficient)
- Debounced scroll/resize handlers
- Respects `prefers-reduced-motion` setting

## File Structure

```
/app
  ├── layout.tsx          # Root layout with metadata
  ├── page.tsx            # Main orchestrator component
  └── globals.css         # Tailwind & base styles

/components/steps
  ├── CountdownStep.tsx   # Countdown timer
  ├── PasswordStep.tsx    # Password auth
  ├── CelebrationStep.tsx # Confetti celebration
  ├── GalleryStep.tsx     # Photo gallery
  ├── WishesStep.tsx      # Birthday wishes
  ├── LetterStep.tsx      # Love letter + music
  ├── ProposalStep.tsx    # Proposal with runaway button
  └── EndingStep.tsx      # Final celebration

/lib
  ├── animations.ts       # Animation variants & utilities
  ├── audio.ts           # Audio management
  └── (utilities)

config.ts                  # ALL customizable values
public/
  ├── audio/background.mp3
  └── memories/           # Add your photos here
```

## Responsive Breakpoints

- **Mobile:** 320px - 768px (2-column grid layouts)
- **Tablet:** 768px - 1024px (improved spacing)
- **Desktop:** 1024px+ (full layout)

## Browser Support

✅ Chrome/Edge (latest)  
✅ Firefox (latest)  
✅ Safari (latest)  
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## UX Features

🎨 **Glassmorphism UI**
- Semi-transparent cards with backdrop blur
- Gradient overlays
- Smooth transitions

💝 **Playful Interactions**
- The NO button runs away (5 attempts before staying)
- Auto-progression between steps
- Heartbeat animations on key elements

🎵 **Audio Integration**
- Volume slider with visual feedback
- Autoplay on first interaction (mobile-friendly)
- Persistent background music

## Performance Tips

1. **Optimize images** before adding to `/public/memories/`
   ```bash
   # Example: reduce file size
   imagemin img1.jpg --out-dir=optimized
   ```

2. **Custom fonts** (optional):
   - Already using system fonts for best performance
   - Can add Google Fonts in `layout.tsx`

3. **Deploy with Vercel**:
   - Zero-config deployment
   - Automatic image optimization
   - Edge caching

## Troubleshooting

**Photos not showing?**
- Check file paths in `config.ts`
- Ensure files are in `/public/memories/`
- Verify filenames match exactly (case-sensitive)

**Audio not playing on mobile?**
- iOS requires user interaction first (app handles this)
- Ensure audio file is in `/public/audio/background.mp3`
- Check browser console for errors

**Animations lagging?**
- Reduce `particleCount` in `config.ts`
- Check for background tasks consuming CPU
- Test on physical device (dev server may be slower)

## Customization Examples

### Change colors
Edit the theme colors in `config.ts`:
```typescript
theme: {
  primary: "#ec4899",    // Pink
  secondary: "#f97316",  // Orange
  accent: "#fbbf24",     // Amber
}
```

### Add more wishes
```typescript
wishes: [
  "Your custom wish here 💕",
  "Another wish...",
  // Add more
]
```

### Change password
```typescript
password: {
  correctPassword: "YOUR_PASSWORD",
  hint: "Your custom hint",
}
```

## License

MIT - Feel free to customize and share

## Created with ❤️

Perfect for:
- ✅ Birthdays
- ✅ Anniversaries
- ✅ Marriage proposals
- ✅ Special occasions
- ✅ Long-distance relationships

---

**Made with love using v0.app**

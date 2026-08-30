# Quick Start Guide - 5 Minutes ⏱️

## Step 1: Customize config.ts (2 min)

Open `config.ts` and update:

```typescript
// Update person details
person: {
  name: "Priya",        // Birthday person's name
  nickname: "Beautiful",
},

// Update dates
dates: {
  birthday: "2026-08-04",    // Her actual birthday
  meetingDate: "2024-07-15", // When you met
},

// Update password
password: {
  correctPassword: "ILOVEYOU",  // Change to your password
  hint: "Think of what I feel for you... 💕",
},

// Update wishes array with your own wishes
wishes: [
  "May every moment with me be filled with joy 💕",
  // Add more...
],

// Update the love letter
letter: {
  title: "My Dearest",
  content: "Your custom letter content here...",
},
```

## Step 2: Add Your Photos (2 min)

1. Create folder: `/public/memories/`
2. Add your photos: `img1.jpg`, `img2.jpg`, etc.
3. Make sure they match the paths in `config.ts`

**Quick tip:** Resize photos to ~1200x800px for best performance on mobile.

## Step 3: Add Background Music (1 min)

1. Replace `/public/audio/background.mp3` with your favorite song
2. Supported formats: MP3, WAV, OGG

**Quick tip:** Keep file size under 5MB for mobile friendliness.

## Step 4: Test Locally

```bash
pnpm dev
# Open http://localhost:3000
```

**Test password:** `ILOVEYOU` (change this in config.ts!)

## Step 5: Deploy to Vercel

```bash
# Option 1: Via CLI
vercel deploy

# Option 2: Push to GitHub and connect to Vercel
git push origin main
```

---

## Key Features to Remember

🔐 **Password Protection**
- Default: `ILOVEYOU`
- Change in `config.ts` → `password.correctPassword`

📸 **Gallery**
- Add photos to `/public/memories/`
- Update paths in `config.ts` → `gallery.images`
- Supports unlimited photos

🎵 **Background Music**
- Replace `/public/audio/background.mp3`
- User controls volume slider
- Plays on first interaction (mobile-friendly)

💍 **The NO Button**
- Runs away when clicked (5 times before giving up!)
- Click YES to see the ending

🎂 **Countdown**
- Automatically calculates from `dates.birthday`
- Uses IST timezone by default
- Update in `config.ts` → `countdown.targetDate`

---

## Customization Checklist

- [ ] Updated person name and nickname
- [ ] Set correct birthday date
- [ ] Changed password
- [ ] Updated all wishes
- [ ] Wrote custom love letter
- [ ] Added photos to `/public/memories/`
- [ ] Updated photo paths in config (if different names)
- [ ] Replaced background music
- [ ] Tested locally with `pnpm dev`
- [ ] Deployed to Vercel

---

## Mobile Testing

Test on actual phone before sending:

```bash
# Get local IP
ipconfig getifaddr en0  # macOS
# Then visit: http://<your-ip>:3000
```

**Test on:**
- ✅ Portrait orientation (how it will be viewed)
- ✅ Different phones (iPhone, Android)
- ✅ Slow 4G connection (simulate in DevTools)

---

## Performance Notes

✅ **Optimized for mobile:**
- Smooth 60fps animations
- Fast load time (~1 second)
- Minimal battery drain
- Works offline (after first load)

❌ **If lagging on mobile:**
- Reduce photo sizes
- Reduce audio file size
- Lower particle count in `config.ts` → `celebration.confettiCount`

---

## Need Help?

Check these files:
- `config.ts` - ALL customizable values
- `README.md` - Detailed documentation
- `/components/steps/` - Individual step components

---

## Tips for the Best Experience

1. **Test the password** - Make sure you change it and remember it!
2. **Optimize images** - Use https://imageoptim.com or similar
3. **Keep music file small** - Aim for < 3MB
4. **Test on mobile first** - That's where it will be viewed
5. **Add personal touches** - Customize the letter and wishes
6. **Set correct dates** - Countdown should show accurate time

---

**Ready? Start with Step 1 in config.ts! 💕**

Happy Birthday! 🎉

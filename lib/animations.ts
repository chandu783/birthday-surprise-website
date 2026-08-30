import { config } from "@/config";

export const prefersReducedMotion = () => {
  if (!config.animations.reduceMotionRespect) return false;

  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return false;
};

// Particle effect for confetti/celebrations
export const createParticles = (
  canvasId: string,
  count: number = config.animations.particleCount
) => {
  if (prefersReducedMotion()) return;

  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const context = ctx;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles: Particle[] = [];

  class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    size: number;
    color: string;

    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height - canvas.height;
      this.vx = (Math.random() - 0.5) * 8;
      this.vy = Math.random() * 4 + 4;
      this.life = 1;
      this.size = Math.random() * 4 + 2;
      const colors = ["#ec4899", "#f97316", "#fbbf24", "#ff69b4", "#ff1493"];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= 0.015;
      this.vy += 0.1; // Gravity
    }

    draw() {
      context.save();
      context.globalAlpha = this.life;
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }
  }

  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();

      if (particles[i].life <= 0) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    }
  };

  animate();
};

// Framer Motion animation variants for consistency
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: prefersReducedMotion() ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: prefersReducedMotion() ? 0 : 0.4 },
};

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: { duration: prefersReducedMotion() ? 0 : 0.5 },
};

export const slideInLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
  transition: { duration: prefersReducedMotion() ? 0 : 0.5 },
};

export const slideInRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
  transition: { duration: prefersReducedMotion() ? 0 : 0.5 },
};

export const heartbeat = {
  animate: prefersReducedMotion()
    ? {}
    : {
        scale: [1, 1.1, 1],
      },
  transition: {
    duration: prefersReducedMotion() ? 0 : 0.6,
    repeat: Infinity,
    repeatDelay: 2,
  },
};

// Debounce utility for touch/scroll events
export const debounce = <T extends (...args: never[]) => unknown>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

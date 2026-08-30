import { config } from "@/config";

let audioInstance: HTMLAudioElement | null = null;
let volumeLevel = config.audio.volume;

export const initAudio = () => {
  if (typeof window === "undefined") return;

  if (!audioInstance) {
    audioInstance = new Audio(config.audio.backgroundMusicPath);
    audioInstance.loop = config.audio.loop;
    audioInstance.volume = volumeLevel;
    audioInstance.preload = "auto";
  }

  return audioInstance;
};

export const playAudio = async () => {
  try {
    const audio = initAudio();
    if (audio) {
      // For mobile, we need user interaction first
      await audio.play().catch((error) => {
        console.log("[v0] Audio play requires user interaction:", error.message);
      });
    }
  } catch (error) {
    console.log("[v0] Audio play error:", error);
  }
};

export const pauseAudio = () => {
  if (audioInstance) {
    audioInstance.pause();
  }
};

export const setVolume = (volume: number) => {
  volumeLevel = Math.max(0, Math.min(1, volume));
  if (audioInstance) {
    audioInstance.volume = volumeLevel;
  }
  return volumeLevel;
};

export const getVolume = () => volumeLevel;

export const stopAudio = () => {
  if (audioInstance) {
    audioInstance.pause();
    audioInstance.currentTime = 0;
  }
};

export const resumeAudio = async () => {
  try {
    if (audioInstance) {
      await audioInstance.play().catch(() => {
        // Silently fail if autoplay not allowed
      });
    }
  } catch (error) {
    console.log("[v0] Resume audio error:", error);
  }
};

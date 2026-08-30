"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { config } from "@/config";

export default function FloatingMusicPlayer() {
  const songs = useMemo(
    () => config.audio.songs?.length ? config.audio.songs : [{ title: "Our song", path: config.audio.backgroundMusicPath }],
    [],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [volume, setVolume] = useState(config.audio.volume);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(songs[0].path);
    audio.loop = config.audio.loop;
    audio.volume = config.audio.volume;
    audio.addEventListener("ended", () => setIsPlaying(false));
    audio.addEventListener("error", () => setAudioError(true));
    audioRef.current = audio;
    void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    return () => { audio.pause(); audio.src = ""; };
  }, [songs]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); return; }
    try { await audio.play(); setIsPlaying(true); setAudioError(false); } catch { setAudioError(true); }
  };

  const changeSong = (index: number) => {
    const audio = audioRef.current;
    if (!audio || index === songIndex) return;
    audio.src = songs[index].path;
    audio.volume = isMuted ? 0 : volume;
    setSongIndex(index);
    setAudioError(false);
    void audio.play().then(() => setIsPlaying(true)).catch(() => setAudioError(true));
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    setIsMuted(value === 0);
    if (audioRef.current) audioRef.current.volume = value;
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.95 }} className="absolute bottom-16 right-0 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-pink-300/30 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl">
            <p className="mb-3 truncate font-sans text-sm font-semibold text-white">{songs[songIndex].title}</p>
            <div className="mb-3 grid gap-2">
              {songs.map((song, index) => <button key={song.path} type="button" onClick={() => changeSong(index)} className={`rounded-lg px-3 py-2 text-left text-xs font-sans ${index === songIndex ? "bg-pink-500 text-white" : "bg-white/10 text-gray-300"}`}>{song.title}</button>)}
            </div>
            <button type="button" onClick={togglePlayPause} className="mb-3 w-full rounded-lg bg-pink-500 px-4 py-2 font-sans font-semibold text-white">{isPlaying ? "Pause" : "Play"}</button>
            <label className="block font-sans text-xs text-gray-300">Volume
              <input aria-label="Volume" type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume} onChange={(event) => handleVolumeChange(Number(event.target.value))} className="mt-2 w-full accent-pink-500" />
            </label>
            {audioError && <p role="status" className="mt-3 font-sans text-xs text-rose-300">Add the licensed MP3 files to public/audio to play these songs.</p>}
          </motion.div>
        )}
      </AnimatePresence>
      <button type="button" aria-label="Open music player" onClick={() => setIsOpen((open) => !open)} className="flex h-14 w-14 items-center justify-center rounded-full border border-pink-300/50 bg-pink-500 text-2xl text-white shadow-lg transition hover:scale-105">{isPlaying ? "♫" : "♪"}</button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface FloatingElement {
  id: string;
  type: "heart" | "petal" | "text";
  animationClass: "heart" | "heart-2" | "petal";
  left: number;
  delay: number;
  duration: number;
  text: string;
}

export default function BackgroundEffects() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hearts = ["💕", "💖", "💗", "💓", "💝"];
    const petals = ["🌹", "✨", "💫"];
    // A few slow elements are much smoother than continuously rebuilding many elements.
    const elementCount = window.innerWidth > 768 ? 6 : 3;
    const newElements: FloatingElement[] = [];

    for (let i = 0; i < elementCount; i++) {
      const type = i % 3 === 0 ? "petal" : i % 2 === 0 ? "heart" : "text";
      newElements.push({
        id: `element-${i}`,
        type,
        animationClass: type === "petal" ? "petal" : i % 2 === 0 ? "heart-2" : "heart",
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 14 + Math.random() * 6,
        text:
          type === "text"
            ? ["love", "forever", "always", "you"][Math.floor(Math.random() * 4)]
            : type === "heart"
              ? hearts[Math.floor(Math.random() * hearts.length)]
              : petals[Math.floor(Math.random() * petals.length)],
      });
    }

    setElements(newElements);
  }, []);

  return (
    <div className="bg-effects" aria-hidden="true">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`floating-element ${element.animationClass}`}
          style={{
            left: `${element.left}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`,
            fontSize: element.type === "text" ? "0.875rem" : undefined,
            opacity: element.type === "text" ? 0.6 : 0.8,
          }}
        >
          {element.text}
        </div>
      ))}
    </div>
  );
}

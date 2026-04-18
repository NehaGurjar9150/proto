import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

export function StarField({ density = 150 }: { density?: number }) {
  const stars = useMemo<Star[]>(() => {
    const colors = ["#ffffff", "#a5e8ff", "#ffd6f5", "#fff5b8"];
    return Array.from({ length: density }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [density]);

  const shootingStars = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        top: Math.random() * 60,
        left: Math.random() * 60,
        delay: i * 7 + Math.random() * 5,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.color,
            boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      {shootingStars.map((s) => (
        <span
          key={`shoot-${s.id}`}
          className="absolute h-px w-24"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            background: "linear-gradient(90deg, transparent, #fff, transparent)",
            animation: `shooting-star 3s ease-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

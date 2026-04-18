import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";

const toolStyles: Record<Project["toolColor"], string> = {
  cyan: "bg-cyan/15 text-cyan border-cyan/40",
  magenta: "bg-magenta/15 text-magenta border-magenta/40",
  gold: "bg-gold/15 text-gold border-gold/40",
};

// Mini chart SVGs to make slides feel like dashboards
function MiniBars({ color }: { color: string }) {
  const heights = [40, 70, 55, 85, 45, 75, 60, 90];
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full opacity-90">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 24 + 8}
          y={100 - h}
          width={16}
          height={h}
          rx={2}
          fill={color}
          opacity={0.7 + (i % 3) * 0.1}
        />
      ))}
    </svg>
  );
}
function MiniLine({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      <defs>
        <linearGradient id={`lg-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,80 L25,60 L50,70 L75,40 L100,50 L125,25 L150,35 L175,15 L200,20 L200,100 L0,100 Z"
        fill={`url(#lg-${color})`}
      />
      <path
        d="M0,80 L25,60 L50,70 L75,40 L100,50 L125,25 L150,35 L175,15 L200,20"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
      {[0, 25, 50, 75, 100, 125, 150, 175, 200].map((x, i) => {
        const ys = [80, 60, 70, 40, 50, 25, 35, 15, 20];
        return <circle key={i} cx={x} cy={ys[i]} r={2.5} fill={color} />;
      })}
    </svg>
  );
}
function MiniDonut({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <circle cx="50" cy="50" r="35" fill="none" stroke="#ffffff15" strokeWidth="14" />
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke={color}
        strokeWidth="14"
        strokeDasharray="160 220"
        strokeDashoffset="0"
        transform="rotate(-90 50 50)"
        strokeLinecap="round"
      />
      <text x="50" y="55" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="JetBrains Mono">
        72%
      </text>
    </svg>
  );
}
function MiniGrid({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      {Array.from({ length: 40 }).map((_, i) => {
        const x = (i % 10) * 20 + 5;
        const y = Math.floor(i / 10) * 22 + 6;
        const op = Math.random() * 0.8 + 0.2;
        return <rect key={i} x={x} y={y} width="14" height="14" rx="2" fill={color} opacity={op} />;
      })}
    </svg>
  );
}

const charts = [MiniBars, MiniLine, MiniDonut, MiniGrid];

const colorMap = { cyan: "#00d4ff", magenta: "#ff006e", gold: "#ffd700" };

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = project.images.length;
  const accent = colorMap[project.toolColor];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % total), 3500 + index * 250);
    return () => clearInterval(t);
  }, [paused, total, index]);

  return (
    <article
      className="group relative rounded-2xl border border-border bg-card/60 backdrop-blur-md overflow-hidden flex flex-col hover:border-cyan/50 transition-all duration-500 hover:-translate-y-1"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* glow on hover */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accent}30, transparent 60%)`,
        }}
      />

      {/* SLIDER */}
      <div
        className="relative h-52 overflow-hidden border-b border-border"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {project.images.map((bg, i) => {
            const Chart = charts[i % charts.length];
            return (
              <div
                key={i}
                className="min-w-full h-full relative flex flex-col justify-between p-5"
                style={{ background: bg }}
              >
                {/* dashboard header */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-white/40" />
                    <span className="h-2 w-2 rounded-full bg-white/40" />
                    <span className="h-2 w-2 rounded-full bg-white/40" />
                  </div>
                  <span className="font-mono text-[9px] tracking-wider text-white/60 uppercase">
                    Slide {i + 1}/{total}
                  </span>
                </div>
                {/* mini chart */}
                <div className="flex-1 flex items-center justify-center px-2 py-2">
                  <div className="w-full h-24">
                    <Chart color={accent} />
                  </div>
                </div>
                {/* footer kpis */}
                <div className="flex items-center justify-between font-mono text-[10px] text-white/70">
                  <span>▲ {(12 + i * 7) % 40}.{(i * 3) % 9}%</span>
                  <span>{project.industry.toUpperCase()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* tool badge */}
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-medium tracking-wider uppercase border backdrop-blur-md ${toolStyles[project.toolColor]}`}
        >
          {project.tool}
        </span>

        {/* nav arrows */}
        {total > 1 && (
          <>
            <button
              aria-label="Previous"
              onClick={() => setSlide((s) => (s - 1 + total) % total)}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 border border-white/20 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan hover:text-background"
            >
              ‹
            </button>
            <button
              aria-label="Next"
              onClick={() => setSlide((s) => (s + 1) % total)}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 border border-white/20 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan hover:text-background"
            >
              ›
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1 rounded-full transition-all ${
                    slide === i ? "w-6 bg-white" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* BODY */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            MISSION_{project.num}
          </span>
          <span className="font-mono text-[10px] text-cyan">● ACTIVE</span>
        </div>

        <h3 className="font-display text-xl text-foreground leading-tight">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.desc}
        </p>

        <div className="rounded-lg border border-border bg-background/50 p-3 mt-1">
          <p className="font-mono text-[9px] tracking-widest text-magenta uppercase mb-2">
            ▸ Key Insights
          </p>
          <ul className="space-y-1.5">
            {project.insights.map((ins) => (
              <li
                key={ins}
                className="text-xs text-foreground/80 leading-relaxed flex gap-2"
              >
                <span className="text-cyan mt-1 text-[8px]">◆</span>
                <span>{ins}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.skills.map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-secondary/60 border border-border text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

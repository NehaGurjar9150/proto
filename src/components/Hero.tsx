import { useEffect, useState } from "react";

const skills = ["Power BI", "MySQL", "Tableau", "Python", "Excel", "MongoDB"];

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 1500;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setN(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end]);
  return (
    <span>
      {n}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-24 pb-16 px-6 md:px-10"
    >
      {/* grid backdrop */}
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* nebula glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-cyan/20 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-magenta/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-10 items-center">
        {/* LEFT */}
        <div className="lg:col-span-7 space-y-7">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan/40 bg-cyan/5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-cyan animate-ping opacity-75" />
              <span className="relative rounded-full h-2 w-2 bg-cyan" />
            </span>
            <span className="font-mono text-xs tracking-widest text-cyan uppercase">
              Signal Active · Open to Opportunities
            </span>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
              Mission Profile
            </p>
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight">
              Neha
              <br />
              <span className="gradient-text">Gurjar</span>
            </h1>
            <p className="font-mono text-base md:text-lg text-cyan pt-2">
              &gt; Data Analyst
              <span className="animate-pulse">_</span>
            </p>
          </div>

          <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
            Charting unknown territories of raw data — transforming{" "}
            <span className="text-foreground">galaxies of numbers</span> into
            navigable dashboards, sharp insights, and decisions that move
            businesses forward.
          </p>

          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span
                key={s}
                className="px-3 py-1.5 text-xs font-mono rounded-md bg-secondary/60 border border-border text-foreground/80 hover:border-cyan hover:text-cyan transition-all"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#projects"
              className="group relative px-6 py-3 rounded-md bg-gradient-to-r from-cyan to-magenta text-background font-medium text-sm overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Missions
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-md border border-border text-foreground hover:border-cyan hover:text-cyan transition-all text-sm font-medium"
            >
              Open Transmission
            </a>
          </div>
        </div>

        {/* RIGHT — telemetry panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-xl border border-border bg-card/40 backdrop-blur-md p-5 overflow-hidden">
            {/* scan line */}
            <div className="absolute inset-x-0 top-0 h-12 scanline animate-data-flow" />

            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                Telemetry · Live Feed
              </p>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-destructive" />
                <span className="h-2 w-2 rounded-full bg-gold" />
                <span className="h-2 w-2 rounded-full bg-cyan" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { n: 9, l: "Missions", c: "cyan", s: "+" },
                { n: 6, l: "Tools Mastered", c: "magenta", s: "+" },
                { n: 4, l: "Industries", c: "gold", s: "" },
                { n: 100, l: "% Curiosity", c: "cyan", s: "" },
              ].map((stat) => (
                <div
                  key={stat.l}
                  className="relative rounded-lg border border-border bg-background/60 p-4 group hover:border-cyan/60 transition-colors"
                >
                  <div
                    className="font-display text-3xl md:text-4xl font-bold leading-none mb-1"
                    style={{ color: `var(--${stat.c})` }}
                  >
                    <Counter end={stat.n} suffix={stat.s} />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {stat.l}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground">DATA_PROCESSED</span>
                <span className="text-cyan">98.7%</span>
              </div>
              <div className="h-1 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan to-magenta rounded-full"
                  style={{ width: "98.7%" }}
                />
              </div>
              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <span className="text-muted-foreground">INSIGHT_OUTPUT</span>
                <span className="text-magenta">∞</span>
              </div>
              <div className="h-1 rounded-full bg-secondary overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-magenta to-gold rounded-full" />
              </div>
            </div>
          </div>

          {/* mission briefing */}
          <div className="rounded-xl border border-magenta/30 bg-magenta/5 backdrop-blur-md p-5">
            <p className="font-mono text-[10px] tracking-widest text-magenta uppercase mb-2">
              ▸ Mission Briefing
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Aspiring Data Analyst with hands-on command of{" "}
              <span className="text-cyan">Power BI, SQL, Python</span> — ready
              to translate raw data into clear, business-moving signal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

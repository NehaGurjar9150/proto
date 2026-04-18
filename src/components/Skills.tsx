import { ScrollReveal } from "./ScrollReveal";

const groups = [
  {
    title: "BI & Visualization",
    icon: "📊",
    color: "cyan",
    items: [
      { name: "Power BI", level: 90 },
      { name: "Tableau", level: 75 },
      { name: "Excel · Pivot · Charts", level: 92 },
      { name: "KPI Design & Dashboards", level: 88 },
      { name: "Data Storytelling", level: 85 },
    ],
  },
  {
    title: "Data & Databases",
    icon: "🗄️",
    color: "magenta",
    items: [
      { name: "MySQL · Joins · Aggregations", level: 80 },
      { name: "MongoDB", level: 65 },
      { name: "Data Cleaning & Transformation", level: 90 },
      { name: "Power Query", level: 82 },
      { name: "Subqueries & Window Functions", level: 75 },
    ],
  },
  {
    title: "Analytics & Programming",
    icon: "🐍",
    color: "gold",
    items: [
      { name: "Python (Intermediate)", level: 70 },
      { name: "Pandas & NumPy", level: 72 },
      { name: "Exploratory Data Analysis", level: 85 },
      { name: "Business Insights & Reporting", level: 88 },
      { name: "Performance Tracking", level: 82 },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-end justify-between gap-6 mb-12 pb-6 border-b border-border">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-magenta uppercase mb-3">
                Constellation Map
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
                Skills & <span className="gradient-text">Expertise</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl">
                Signal strength across the analytics stack — calibrated through
                real projects, not just coursework.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {groups.map((g, gi) => (
            <ScrollReveal key={g.title} delay={gi * 120}>
            <div
              key={g.title}
              className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-md p-6 overflow-hidden group hover:border-cyan/40 transition-colors"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ background: `var(--${g.color})` }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">{g.icon}</span>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                      Cluster
                    </p>
                    <h3 className="font-display text-xl text-foreground">
                      {g.title}
                    </h3>
                  </div>
                </div>

                <ul className="space-y-3">
                  {g.items.map((item) => (
                    <li key={item.name}>
                      <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                        <span className="text-foreground/90">{item.name}</span>
                        <span style={{ color: `var(--${g.color})` }}>
                          {item.level}%
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${item.level}%`,
                            background: `linear-gradient(90deg, var(--${g.color}), var(--cyan))`,
                            boxShadow: `0 0 10px var(--${g.color})`,
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

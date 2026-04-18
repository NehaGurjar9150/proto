import { ScrollReveal } from "./ScrollReveal";

const traits = [
  { label: "Analytical Mindset", value: "First Principles" },
  { label: "Dashboard Craft", value: "Power BI · Tableau" },
  { label: "Data Wrangling", value: "Excel · SQL · Python" },
  { label: "Decision Support", value: "KPI · Insights · Storytelling" },
];

export function About() {
  return (
    <section id="mission" className="relative py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
        <ScrollReveal className="lg:col-span-5 lg:sticky lg:top-28">
          <p className="font-mono text-xs tracking-[0.3em] text-cyan uppercase mb-3">
            Mission Briefing
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
            From raw signal to{" "}
            <span className="gradient-text">strategic decisions</span>.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            I'm an aspiring Data Analyst with a strong interest in data
            visualization, business insights, and data-driven decision-making.
            Every project I take on is approached like a mission: clear
            objective, clean data, sharp insight, decision-ready output.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {traits.map((t) => (
              <div
                key={t.label}
                className="rounded-lg border border-border bg-card/40 backdrop-blur-md p-3"
              >
                <p className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
                  {t.label}
                </p>
                <p className="text-sm text-foreground mt-1">{t.value}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="lg:col-span-7 space-y-4">
          {[
            {
              h: "Analytical & problem-solving mindset",
              p: "Approach every dataset with structured curiosity — define the question, then let the data answer it.",
              tag: "01",
            },
            {
              h: "Hands-on dashboard development",
              p: "Built 9+ end-to-end Power BI, Tableau and Excel dashboards spanning operations, sales, healthcare, retail & automotive.",
              tag: "02",
            },
            {
              h: "Data → actionable insight",
              p: "Comfortable across the full pipeline — clean, model, visualize, narrate. Insight is the deliverable, not the chart.",
              tag: "03",
            },
            {
              h: "Continuously learning",
              p: "Actively deepening SQL, Python and advanced analytics to grow into a well-rounded data professional.",
              tag: "04",
            },
          ].map((c, i) => (
            <ScrollReveal key={c.tag} delay={i * 80}>
              <div
                className="group relative flex gap-5 rounded-xl border border-border bg-card/40 backdrop-blur-md p-5 hover:border-cyan/40 transition-colors"
              >
                <div className="font-display text-3xl gradient-text font-bold leading-none">
                  {c.tag}
                </div>
                <div>
                  <h3 className="font-display text-lg text-foreground mb-1">
                    {c.h}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.p}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

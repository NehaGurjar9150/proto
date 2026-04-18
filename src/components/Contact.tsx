const channels = [
  {
    label: "EMAIL",
    value: "nehagurjar992@gmail.com",
    href: "mailto:nehagurjar992@gmail.com",
    icon: "✉",
  },
  {
    label: "LINKEDIN",
    value: "neha-gurjar-134a33222",
    href: "https://in.linkedin.com/in/neha-gurjar-134a33222",
    icon: "in",
  },
  {
    label: "PHONE",
    value: "+91 72250 52478",
    href: "tel:+917225052478",
    icon: "☏",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl border border-border overflow-hidden p-8 md:p-14"
          style={{
            background:
              "radial-gradient(ellipse at top left, oklch(0.18 0.18 220 / 0.5), transparent 60%), radial-gradient(ellipse at bottom right, oklch(0.18 0.22 340 / 0.4), transparent 60%), oklch(0.06 0.03 270)",
          }}
        >
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-cyan to-transparent" />

          <div className="relative grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs tracking-[0.3em] text-cyan uppercase mb-3">
                Open Transmission
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
                Let's chart your <br />
                <span className="gradient-text">next data mission.</span>
              </h2>
              <p className="text-muted-foreground mt-5 max-w-lg leading-relaxed">
                Actively seeking Data Analyst roles — internships, entry-level
                positions, and freelance projects. Signal is open, transmission
                ready.
              </p>
              <div className="flex flex-wrap gap-3 mt-7">
                <a
                  href="mailto:nehagurjar992@gmail.com"
                  className="px-6 py-3 rounded-md bg-gradient-to-r from-cyan to-magenta text-background font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Send Transmission →
                </a>
                <a
                  href="/Neha_Gurjar_Resume.pdf"
                  download
                  className="px-6 py-3 rounded-md border border-border text-foreground hover:border-cyan hover:text-cyan transition-all text-sm font-medium flex items-center gap-2"
                >
                  ↓ Download Resume
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-border bg-background/60 backdrop-blur p-4 hover:border-cyan transition-all"
                >
                  <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-cyan/30 to-magenta/30 border border-cyan/30 flex items-center justify-center font-mono text-cyan group-hover:scale-110 transition-transform">
                    {c.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                      {c.label}
                    </p>
                    <p className="text-sm text-foreground truncate group-hover:text-cyan transition-colors">
                      {c.value}
                    </p>
                  </div>
                  <span className="text-muted-foreground group-hover:text-cyan group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <span>© 2025 Neha Gurjar · Data Analyst</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
            Signal stable · Coordinates locked
          </span>
        </footer>
      </div>
    </section>
  );
}

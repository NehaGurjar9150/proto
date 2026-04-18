import { useEffect, useState } from "react";

const links = [
  { href: "#mission", label: "Mission" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-cyan/30 blur-md group-hover:bg-magenta/40 transition-colors" />
            <span className="relative h-3 w-3 rounded-full bg-gradient-to-br from-cyan to-magenta animate-pulse-glow" />
          </span>
          <span className="font-display font-semibold tracking-tight text-foreground">
            neha<span className="text-cyan">.</span>analytics
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all font-mono"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/Neha_Gurjar_Resume.pdf"
          download
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-cyan to-magenta text-background hover:opacity-90 transition-opacity"
        >
          <span>Download CV</span>
          <span>↓</span>
        </a>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <ul className="flex flex-col p-4 gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 font-mono"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/Neha_Gurjar_Resume.pdf"
                download
                className="block px-4 py-2 rounded-md text-sm bg-gradient-to-r from-cyan to-magenta text-background text-center font-medium"
              >
                Download CV ↓
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

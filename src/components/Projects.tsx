import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ScrollReveal } from "./ScrollReveal";

export function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-end justify-between gap-6 mb-12 pb-6 border-b border-border">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-cyan uppercase mb-3">
                Mission Logs
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
                Featured <span className="gradient-text">Missions</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl">
                Nine end-to-end analytics missions across operations, sales,
                healthcare, retail and automotive — each transmitting
                decision-grade signal back to the ground.
              </p>
            </div>
            <div className="hidden md:flex flex-col items-end font-mono text-xs text-muted-foreground gap-1">
              <span>STATUS · <span className="text-cyan">ALL_DEPLOYED</span></span>
              <span>COUNT · <span className="text-magenta">{projects.length}</span></span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ScrollReveal key={p.id} delay={(i % 3) * 100}>
              <ProjectCard project={p} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

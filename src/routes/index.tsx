import { createFileRoute } from "@tanstack/react-router";
import { StarField } from "@/components/StarField";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WarpSequence } from "@/components/WarpSequence";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Neha Gurjar — Data Analyst Portfolio" },
      {
        name: "description",
        content:
          "Aspiring Data Analyst specializing in Power BI, SQL, Tableau & Python. Explore 9 end-to-end analytics missions transforming raw data into decisions.",
      },
      { property: "og:title", content: "Neha Gurjar — Data Analyst Portfolio" },
      {
        property: "og:description",
        content:
          "Power BI · SQL · Tableau · Python — 9 dashboards across operations, sales, healthcare, retail and automotive.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="relative">
      <StarField density={180} />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <WarpSequence />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

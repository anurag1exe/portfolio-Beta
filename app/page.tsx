import GlassHero from "@/components/glass-hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Work from "@/components/sections/work";
import Experiments from "@/components/sections/experiments";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      {/* Hero - untouched, encapsulated in its own 100dvh container
          at the top of the document. */}
      <GlassHero />

      {/* Everything below the fold, stacked vertically in normal
          document flow. */}
      <div className="page-flow">
        <About />
        <Skills />
        <Work />
        <Experiments />
        <Contact />
      </div>
    </>
  );
}

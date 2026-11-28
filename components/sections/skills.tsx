"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/* ── Skills data ────────────────────────────────────────────────
   Edit this array only to change the section content.
   (Intentionally excludes Tailwind / Vite / DSA.) */
const SKILLS: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "C", "HTML", "CSS"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["React.js", "Next.js", "Node.js", "Flutter", "Streamlit"],
  },
  {
    title: "AI & Data",
    items: [
      "Pandas",
      "NumPy",
      "Plotly",
      "Google Gemini API",
      "Prompt Engineering",
      "MCP",
      "Stitch MCP",
    ],
  },
  {
    title: "Databases & Tools",
    items: [
      "MySQL",
      "SQL",
      "Git",
      "GitHub",
      "VS Code",
      "Render",
      "REST APIs",
    ],
  },
  {
    title: "Core Concepts",
    items: ["OOP", "DBMS", "Operating Systems", "Computer Networks", "Linux Administration"],
  },
];

/* Card reveal delay: 80ms stagger between cards */
const cardDelay = (index: number) => 200 + index * 80;
/* Chip reveal delay inside a card: 30ms stagger, starting after its card */
const chipDelay = (cardIndex: number, chipIndex: number) => cardDelay(cardIndex) + 200 + chipIndex * 30;

const delayStyle = (ms: number) => ({ "--sk-delay": `${ms}ms` }) as CSSProperties;

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll reveal: fade-up + blur. Adds .is-visible once per element,
     staggered via the --sk-delay custom property set inline. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = Array.from(section.querySelectorAll<HTMLElement>("[data-sk-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" aria-label="Skills" className="skills" ref={sectionRef}>
      {/* Decorative top-left radial glow */}
      <div className="skills-glow" aria-hidden="true" />

      <div className="skills-container">
        {/* Section header - same structure as 01 / ABOUT */}
        <header data-sk-reveal style={delayStyle(0)}>
          <p className="section-label">
            <span className="section-label-accent">02</span> / Skills
          </p>
          <h2 className="section-title">
            Tools I <span className="section-title-gradient">build with</span>
          </h2>
          <div className="section-underline" aria-hidden="true" />
          <p className="section-sub">
            A focused toolkit developed through coursework, projects, hackathons and
            hands-on experiments.
          </p>
        </header>

        {/* 5 glass cards: 3 + 2 grid, equal height per row */}
        <ul className="skills-grid">
          {SKILLS.map((group, groupIndex) => (
            <li
              key={group.title}
              className="glass-card skills-card section-reveal"
              data-sk-reveal
              style={delayStyle(cardDelay(groupIndex))}
            >
              <h3 className="skills-card-title">
                {/* Inline "</>" mark - decorative, no icon library */}
                <svg
                  className="skills-card-icon"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m8 6-6 6 6 6" />
                  <path d="m16 6 6 6-6 6" />
                </svg>
                {group.title}
              </h3>

              <ul className="chip-list">
                {group.items.map((item, itemIndex) => (
                  <li
                    key={item}
                    className="chip section-reveal"
                    data-sk-reveal
                    style={delayStyle(chipDelay(groupIndex, itemIndex))}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
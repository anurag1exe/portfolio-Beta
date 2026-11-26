"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";

/* ── Experiments data ──────────────────────────────────────────
   Edit this array only to change the section content.
   `href` is optional: leave it "" and no link is rendered.
   Do not re-add Tailwind / Vite / DSA / Express.js / Scikit-Learn /
   MongoDB / Mongoose / MongoDB Atlas as stack items. */
type Experiment = {
  kind: string; // short label, e.g. "Prototype", "Tool", "Study"
  title: string;
  blurb: string;
  stack: string[];
  href: string;
};

const EXPERIMENTS: Experiment[] = [
  {
    // TODO: replace with a real experiment (placeholder entry 1 of 3)
    kind: "Placeholder",
    title: "Experiment One",
    blurb: "TODO: one or two lines on what this experiment explores and what you learned.",
    stack: ["TODO", "Stack"],
    href: "", // TODO: real URL or leave empty
  },
  {
    // TODO: replace with a real experiment (placeholder entry 2 of 3)
    kind: "Placeholder",
    title: "Experiment Two",
    blurb: "TODO: one or two lines on what this experiment explores and what you learned.",
    stack: ["TODO", "Stack"],
    href: "", // TODO: real URL or leave empty
  },
  {
    // TODO: replace with a real experiment (placeholder entry 3 of 3)
    kind: "Placeholder",
    title: "Experiment Three",
    blurb: "TODO: one or two lines on what this experiment explores and what you learned.",
    stack: ["TODO", "Stack"],
    href: "", // TODO: real URL or leave empty
  },
];

/* Reveal stagger: header first, then cards 80ms apart */
const cardDelay = (index: number) => 200 + index * 80;
const delayStyle = (ms: number) => ({ "--sk-delay": `${ms}ms` }) as CSSProperties;

export default function Experiments() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll reveal: fade-up + blur, fires once per element */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = Array.from(section.querySelectorAll<HTMLElement>("[data-ex-reveal]"));
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
    <section id="experiments" aria-label="Experiments" className="experiments" ref={sectionRef}>
      <div className="experiments-glow" aria-hidden="true" />

      <div className="experiments-container">
        <header className="section-reveal" data-ex-reveal style={delayStyle(0)}>
          <p className="section-label">
            <span className="section-label-accent">04</span> / Experiments
          </p>
          <h2 className="section-title">
            Playground &amp; <span className="section-title-gradient">prototypes</span>
          </h2>
          <div className="section-underline" aria-hidden="true" />
          <p className="section-sub">
            Smaller builds and trials, where ideas get tested before they become projects.
          </p>
        </header>

        <ul className="experiments-grid">
          {EXPERIMENTS.map((experiment, index) => (
            <li
              key={experiment.title}
              className="glass-card experiments-card section-reveal"
              data-ex-reveal
              style={delayStyle(cardDelay(index))}
            >
              <div className="experiments-card-top">
                <span className="experiments-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="experiments-kind">{experiment.kind}</span>
              </div>

              <h3 className="experiments-card-title">{experiment.title}</h3>
              <p className="experiments-card-blurb">{experiment.blurb}</p>

              <ul className="chip-list" aria-label={`${experiment.title} stack`}>
                {experiment.stack.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>

              {experiment.href && (
                <a
                  className="experiments-link"
                  href={experiment.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View experiment
                  <ArrowUpRight className="experiments-link-icon" size={16} aria-hidden="true" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

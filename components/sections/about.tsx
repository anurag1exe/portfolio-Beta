"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/*
 * ABOUT — light bluish redesign.
 *
 * Self-contained: all styling lives in the APPENDED "ABOUT" block of
 * app/globals.css (.about-* classes + --ab-* variables). Other sections
 * (hero, work, experiments, contact) are untouched.
 *
 * Motion: IntersectionObserver fade-up + blur reveal, staggered 80ms
 * per element via the --ab-delay custom property. Hover glow on tags
 * and card rows. prefers-reduced-motion is honoured in CSS.
 */

const BIO =
  "I'm a BCA student at DBS Global University who loves how software and systems fit together. From deploying Linux-based multiplayer servers with 99.5%+ uptime to building a freight forecasting dashboard for Smart India Hackathon 2026, I learn by building. I work with Python, SQL and the web stack, and I'm always looking for the next real problem to solve.";

const HIGHLIGHTS = ["IIT Madras Certified", "SIH-2026 Lead", "Python, SQL, Web"];

const CURRENTLY = [
  { label: "Learning", value: "C Language, Optimization & Payment Integration" },
  { label: "Building", value: "Apps & Webpages" },
  { label: "Exploring", value: "Linux & AI Workflows" },
];

/* Stagger helper: 80ms per element, consumed by .ab-reveal in globals.css */
const delay = (ms: number): CSSProperties =>
  ({ "--ab-delay": `${ms}ms` }) as CSSProperties;

export default function About() {
  const rootRef = useRef<HTMLElement | null>(null);

  /* Scroll reveal — observe .ab-reveal elements once, then unobserve. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>(".ab-reveal"));
    if (targets.length === 0) return;

    /* Safety net: reveal instantly if IntersectionObserver is unavailable */
    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={rootRef} id="about" aria-label="About" className="about">
      {/* Subtle radial glow, top-right */}
      <div className="about-glow" aria-hidden="true" />

      <div className="about-inner">
        <div className="about-grid">
          {/* LEFT — label, tagline, bio, stat chips */}
          <div className="about-main">
            <p className="about-label ab-reveal" style={delay(0)}>
              <span className="about-label-num">01</span> / About
            </p>

            <h2 className="about-tagline">
              <span className="about-tagline-line ab-reveal" style={delay(80)}>
                Systems thinker.
              </span>
              <span
                className="about-tagline-line about-tagline-gradient ab-reveal"
                style={delay(160)}
              >
                Software builder.
              </span>
            </h2>

            {/* 60px accent underline */}
            <div
              className="about-underline ab-reveal"
              style={delay(240)}
              aria-hidden="true"
            />

            <p className="about-bio ab-reveal" style={delay(320)}>
              {BIO}
            </p>

            <ul className="about-tags" aria-label="Highlights">
              {HIGHLIGHTS.map((tag, i) => (
                <li
                  key={tag}
                  className="about-tag-item ab-reveal"
                  style={delay(400 + i * 80)}
                >
                  <span className="about-tag-bar" aria-hidden="true" />
                  <span className="about-tag-text">{tag}</span>
                  {i === HIGHLIGHTS.length - 1 ? (
                    <span className="about-tag-bar" aria-hidden="true" />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — glass CURRENTLY card */}
          <aside className="about-side">
            <div className="about-card ab-reveal" style={delay(480)}>
              <p className="about-card-label">
                <span className="about-dot" aria-hidden="true" />
                Currently
              </p>
              <ul className="about-rows">
                {CURRENTLY.map((row) => (
                  <li key={row.label} className="about-row">
                    <span className="about-row-label">{row.label}</span>
                    <span className="about-row-value">{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

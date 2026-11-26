"use client";

import { useEffect, useRef, type ComponentType, type CSSProperties } from "react";
import { ArrowUpIcon, ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/sections/icons";

/* ── Contact data ──────────────────────────────────────────────
   Edit these values only to change the section content. */
const EMAIL = "anuragkumar9678@gmail.com";
const GITHUB_URL = "https://github.com/anurag1exe";
const LINKEDIN_URL = "https://www.linkedin.com/in/anurag-kumar-a15100345/";

const CONTACT_COPY = {
  titleStart: "Let's build something",
  titleGradient: "meaningful.",
  // TODO: replace with your own closing pitch if you want different wording
  sub: "Have an idea, a project or an opportunity? My inbox is open, and I usually reply quickly.",
  cta: "Email me",
  footerTagline: "Think / Build / Repeat",
  footerCopyright: "© 2026 Anurag Kumar",
};

type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  external: boolean;
};

const CONTACT_LINKS: ContactLink[] = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, icon: MailIcon, external: false },
  { label: "GitHub", value: "anurag1exe", href: GITHUB_URL, icon: GitHubIcon, external: true },
  { label: "LinkedIn", value: "Anurag Kumar", href: LINKEDIN_URL, icon: LinkedInIcon, external: true },
];

const delayStyle = (ms: number) => ({ "--sk-delay": `${ms}ms` }) as CSSProperties;

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll reveal: fade-up + blur, fires once per element */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = Array.from(section.querySelectorAll<HTMLElement>("[data-ct-reveal]"));
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

  /* Back to top: JS scroll because the frozen hero has no anchor id */
  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="contact" aria-label="Contact" className="contact" ref={sectionRef}>
      <div className="contact-glow" aria-hidden="true" />

      <div className="contact-container">
        <p className="section-label section-reveal" data-ct-reveal style={delayStyle(0)}>
          <span className="section-label-accent">05</span> / Contact
        </p>

        <div className="glass-card contact-card section-reveal" data-ct-reveal style={delayStyle(120)}>
          {/* Top: heading, pitch and primary CTA */}
          <div className="contact-top">
            <div className="contact-intro">
              <h2 className="section-title contact-title">
                {CONTACT_COPY.titleStart}{" "}
                <span className="section-title-gradient">{CONTACT_COPY.titleGradient}</span>
              </h2>
              <div className="section-underline" aria-hidden="true" />
              <p className="section-sub">{CONTACT_COPY.sub}</p>
            </div>

            <a className="contact-cta" href={`mailto:${EMAIL}`}>
              {CONTACT_COPY.cta}
              <ArrowUpRightIcon className="contact-cta-icon" />
            </a>
          </div>

          <div className="contact-divider" aria-hidden="true" />

          {/* Bottom: email, GitHub, LinkedIn */}
          <ul className="contact-links">
            {CONTACT_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.label}>
                  <a
                    className="contact-link"
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    <span className="contact-link-icon">
                      <Icon className="contact-link-svg" />
                    </span>
                    <span className="contact-link-text">
                      <span className="contact-link-label">{link.label}</span>
                      <span className="contact-link-value">{link.value}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <footer className="contact-footer section-reveal" data-ct-reveal style={delayStyle(240)}>
          <p className="contact-footer-text">{CONTACT_COPY.footerTagline}</p>
          <p className="contact-footer-text">{CONTACT_COPY.footerCopyright}</p>
          <button type="button" className="contact-top-btn" onClick={scrollToTop}>
            <ArrowUpIcon className="contact-top-btn-icon" />
            Back to top
          </button>
        </footer>
      </div>
    </section>
  );
}

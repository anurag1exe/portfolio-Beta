"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import FloatingCardGallery, {
  type Project,
} from "@/components/ui/floating-card-gallery";

/* ==================================================================
   WORK (03) — project data. Edit this array to add or change
   projects; the floating gallery renders whatever it receives.
   image / githubUrl / liveUrl are intentionally empty strings when
   not yet provided — paste real links below (never invent URLs).
   ================================================================== */
const PROJECTS: Project[] = [
  {
    title: "GraphOps SOC Workbench",
    badges: ["Cybersecurity", "Hackathon Nationals"],
    description:
      "Cybersecurity graph-analytics workbench for SOC teams: simulates attack blast radius, finds choke points and maps least-cost attack paths across an environment, built for the Hackfront hackathon.",
    fullDescription:
      "Cybersecurity graph-analytics workbench for SOC teams: simulates attack blast radius, finds choke points and maps least-cost attack paths across an environment, built for the Hackfront hackathon.",
    tags: ["Graph Algorithms", "SIEM", "Dijkstra"],
    image: "/images/graphops-thumb.png",
    imageAlt: "GraphOps SOC Workbench preview",
    githubUrl: "https://github.com/anurag1exe/GraphOPS-omen-hackathon-build",
    liveUrl: "https://grapsops-omen.vercel.app/",
  },
  {
    title: "Stylexy: Barber Shop Booking App",
    status: "PROTOTYPE",
    description:
      "Premium Flutter app for booking barber shop appointments, with an interactive calendar, ratings and reviews, profile management and offline local storage.",
    fullDescription:
      "Premium Flutter app for booking barber shop appointments, with an interactive calendar, ratings and reviews, profile management and offline local storage.",
    tags: ["Flutter", "Dart", "SQLite", "Android"],
    image: "/images/project-card-2.png",
    imageAlt: "Stylexy barber shop app preview",
    githubUrl: "https://github.com/anurag1exe/App-for-barber-shop-Prototype-",
    liveUrl: "",
    apkUrl:
      "https://github.com/anurag1exe/App-for-barber-shop-Prototype-/raw/refs/heads/main/apk/Stylexy.apk",
  },
  {
    title: "Fall Detection System for Senior Citizens",
    status: "HARDWARE",
    description:
      "End-to-end Arduino fall detection system with a Python FastAPI backend and a real-time telemetry dashboard that alerts caregivers when a fall is suspected.",
    fullDescription:
      "End-to-end Arduino fall detection system with a Python FastAPI backend and a real-time telemetry dashboard that alerts caregivers when a fall is suspected.",
    tags: ["Arduino", "Python", "FastAPI", "IoT"],
    image: "/images/project-card-3.png",
    imageAlt: "Fall detection system for senior citizens preview",
    githubUrl:
      "https://github.com/anurag1exe/Fall-detection-for-senior-citizens-running-on-Arduino-uno-Q",
    liveUrl: "",
  },
  {
    title: "Cinemate AI: Movie Recommender",
    status: "WEB APP",
    description:
      "Personalized movie recommendation web app with a hybrid AI engine, Google login, real-time ratings and an NLP review sentiment analyzer.",
    fullDescription:
      "Personalized movie recommendation web app with a hybrid AI engine, Google login, real-time ratings and an NLP review sentiment analyzer.",
    tags: ["Python", "Streamlit", "scikit-learn", "SQLite"],
    image: "/images/project-card-4.png",
    imageAlt: "Cinemate AI movie recommender preview",
    githubUrl:
      "https://github.com/anurag1exe/Movie-recommender-Personalized-with-google-login-",
    liveUrl: "https://movierecommenderrr.streamlit.app/",
  },
];

/* Header reveal stagger (ms) — same rhythm as the Skills section */
const delayStyle = (ms: number) =>
  ({ "--sk-delay": `${ms}ms` }) as CSSProperties;

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Same scroll-reveal pattern as Skills: fade-up + blur, once,
     staggered via the --sk-delay custom property set inline. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = Array.from(
      section.querySelectorAll<HTMLElement>("[data-wk-reveal]"),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
      { threshold: 0.15 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" aria-label="Work" className="work" ref={sectionRef}>
      <div className="work-glow" aria-hidden="true" />

      <div className="work-container">
        {/* Section header — same structure/primitives as Skills */}
        <div className="work-head">
          <p className="section-label section-reveal" data-wk-reveal style={delayStyle(0)}>
            <span className="section-label-accent">03</span> / WORK
          </p>
          <h2 className="section-title section-reveal" data-wk-reveal style={delayStyle(80)}>
            Things <span className="section-title-gradient">I&rsquo;ve built</span>
          </h2>
          <div
            className="section-underline section-reveal"
            data-wk-reveal
            style={delayStyle(160)}
            aria-hidden="true"
          />
          <p className="section-sub section-reveal" data-wk-reveal style={delayStyle(240)}>
            Selected projects from hackathons, freelance work and
            self-directed engineering.
          </p>
        </div>

        {/* Floating card gallery — 3D tilt, hover lift, expand overlay */}
        <FloatingCardGallery projects={PROJECTS} />
      </div>
    </section>
  );
}

// ARCHIVED_PROJECTS (not rendered, restore later if needed)
/*
  {
    title: "Intelligent Freight Forecasting Dashboard",
    status: "SIH 2026",
    description:
      "Predictive dashboard for freight volume, supply-chain bottlenecks and cargo routes, built for the Ministry of Steel problem statement SIH26006.",
    fullDescription:
      "Interactive dashboard with forecasting logic for freight volume needs, shipment trends, cargo routes and resource allocation. Built as a team for Smart India Hackathon 2026, including solution design, prototype and the Round 1 technical presentation.",
    tags: ["Python", "Pandas", "Plotly", "Streamlit"],
    // TODO: paste real link
    image: "",
    // TODO: paste real link
    githubUrl: "",
    // TODO: paste real link
    liveUrl: "",
  },
  {
    title: "Cross-Platform Multiplayer Server",
    status: "Hosted",
    description:
      "Linux-hosted PaperMC server with GeyserMC and Floodgate for Java and Bedrock cross-play, with automated backups and firewall setup.",
    fullDescription:
      "Architected a multiplayer game server on Linux with port forwarding, firewall rules, automated backup jobs and custom plugin pipelines, targeting 99.5%+ uptime and low latency for cross-play between Java and Bedrock players.",
    tags: ["Linux", "Networking", "PaperMC", "GeyserMC"],
    // TODO: paste real link
    image: "",
    // TODO: paste real link
    githubUrl: "",
    // TODO: paste real link
    liveUrl: "",
  },
  {
    title: "Freelance Web Development",
    status: "Client work",
    description:
      "Responsive landing pages for local initiatives and personal clients, plus photography and video editing for brand positioning.",
    fullDescription:
      "Designed and delivered responsive landing pages using HTML, CSS and JavaScript, and handled the full digital asset pipeline: photography, video editing and layout structuring.",
    tags: ["HTML", "CSS", "JavaScript"],
    // TODO: paste real link
    image: "",
    // TODO: paste real link
    githubUrl: "",
    // TODO: paste real link
    liveUrl: "",
  },
  {
    title: "Python Automation and SQL Projects",
    status: "Self-directed",
    description:
      "Modular CLI utilities with exception handling and normalized SQL schemas, plus AI-assisted debugging and refactoring workflows.",
    fullDescription:
      "Structured Python CLI scripts using modular functions and robust exception handling, with normalized SQL schemas and prompt-engineering workflows for debugging, refactoring and documentation.",
    tags: ["Python", "SQL", "Prompt Engineering"],
    // TODO: paste real link
    image: "",
    // TODO: paste real link
    githubUrl: "",
    // TODO: paste real link
    liveUrl: "",
  },
*/

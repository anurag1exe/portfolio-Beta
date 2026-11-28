"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { GitHubIcon } from "@/components/sections/icons";

/* ==================================================================
   FloatingCardGallery — light-bluish project gallery for WORK (03)
   - 3D perspective tilt follows the mouse (max 4 degrees), driven
     entirely by framer-motion MotionValues + springs: NO setState
     per mousemove, so no re-render churn and no hydration risk.
   - Tilt is disabled on touch devices and for reduced-motion users.
   - Cards: staggered spring entrance, hover lift, click/keyboard
     expand into a glass overlay (Escape or X closes).
   - No random values at render time; decorative glow blobs are
     pure CSS (no keyframes needed).
   ================================================================== */

export type Project = {
  title: string;
  description: string;
  fullDescription?: string;
  tags: string[];
  status?: string;
  badge?: string;
  badges?: string[];
  image?: string;
  imageAlt?: string;
  githubUrl?: string;
  liveUrl?: string;
  apkUrl?: string;
};

type FloatingCardGalleryProps = {
  projects: Project[];
};

const MAX_TILT = 4; // degrees
const TILT_SPRING = { stiffness: 120, damping: 18, mass: 0.4 };
const ENTRANCE_SPRING = { type: "spring", stiffness: 90, damping: 16 } as const;

const pad2 = (n: number) => String(n + 1).padStart(2, "0");

/* -------- footer links, shared by card footer and overlay -------- */

const stopCardEvent = (event: { stopPropagation: () => void }) => {
  event.stopPropagation();
};

function GitHubLink({ project }: { project: Project }) {
  if (!project.githubUrl) return null;
  return (
    <a
      className="work-github"
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`GitHub repository for ${project.title}`}
      onClick={stopCardEvent}
      onPointerDown={stopCardEvent}
      onMouseDown={stopCardEvent}
      onTouchStart={stopCardEvent}
    >
      <GitHubIcon className="work-github-icon" />
    </a>
  );
}

function LiveLink({ project }: { project: Project }) {
  if (!project.liveUrl) return null;
  return (
    <a
      className="work-live"
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Live demo of ${project.title}`}
      onClick={stopCardEvent}
      onPointerDown={stopCardEvent}
      onMouseDown={stopCardEvent}
      onTouchStart={stopCardEvent}
    >
      LIVE
      <ArrowUpRight
        className="work-live-arrow"
        size={14}
        strokeWidth={1.8}
        aria-hidden="true"
      />
    </a>
  );
}

function ApkLink({ project }: { project: Project }) {
  if (!project.apkUrl) return null;
  const shortName = project.title.split(":")[0].trim() || project.title;
  return (
    <a
      className="work-live work-apk"
      href={project.apkUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download ${shortName} APK`}
      onClick={stopCardEvent}
      onPointerDown={stopCardEvent}
      onMouseDown={stopCardEvent}
      onTouchStart={stopCardEvent}
    >
      DOWNLOAD APK
      <Download
        className="work-apk-icon"
        size={14}
        strokeWidth={1.8}
        aria-hidden="true"
      />
    </a>
  );
}

/* ----------------------------- gallery ---------------------------- */

export default function FloatingCardGallery({ projects }: FloatingCardGalleryProps) {
  const reduceMotion = useReducedMotion() ?? false;

  /* 3D tilt: normalized pointer position -> springy card-grid rotation */
  const gridRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0); // -0.5 .. 0.5 from center
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]),
    TILT_SPRING,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]),
    TILT_SPRING,
  );

  /* Enable tilt only for fine pointers (mouse) — never on touch. */
  const [tiltEnabled, setTiltEnabled] = useState(false);
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setTiltEnabled(finePointer.matches);
    update();
    finePointer.addEventListener("change", update);
    return () => finePointer.removeEventListener("change", update);
  }, []);

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  /* Expanded (detail) overlay state + focus return */
  const [expanded, setExpanded] = useState<number | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  const closeCard = (index: number) => {
    setExpanded(null);
    /* Hand focus back to the card that was opened */
    requestAnimationFrame(() => cardRefs.current[index]?.focus());
  };

  /* Escape closes the expanded overlay */
  useEffect(() => {
    if (expanded === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(null);
        requestAnimationFrame(() => cardRefs.current[expanded]?.focus());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  const openCard = (index: number) => setExpanded(index);

  /* Enter/Space opens from the card itself only (never from inner links) */
  const handleCardKeyDown = (
    event: ReactKeyboardEvent<HTMLElement>,
    index: number,
  ) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCard(index);
    }
  };

  /* Exactly 4 projects -> intentional 2-column desktop layout */
  const gridClass =
    projects.length === 4 ? "work-grid work-grid--two" : "work-grid";

  const initial = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 36, scale: 0.97 };
  const inView = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: 1 };
  const entrance = reduceMotion
    ? { duration: 0.35, delay: 0 }
    : ENTRANCE_SPRING;

  return (
    <div
      className="gallery-zone"
      onMouseMove={tiltEnabled ? handleMouseMove : undefined}
      onMouseLeave={tiltEnabled ? resetTilt : undefined}
    >
      <motion.div
        ref={gridRef}
        className={gridClass}
        style={
          tiltEnabled
            ? { rotateX, rotateY, transformPerspective: 1200 }
            : undefined
        }
      >
        {projects.map((project, index) => {
          const badgeList =
            project.badges && project.badges.length > 0
              ? project.badges
              : project.badge
                ? [project.badge]
                : project.status
                  ? [project.status]
                  : [];

          const isBlank =
            !project.title &&
            !project.description &&
            project.tags.length === 0 &&
            badgeList.length === 0 &&
            !project.image &&
            !project.githubUrl &&
            !project.liveUrl &&
            !project.apkUrl;

          return (
            <motion.article
              key={project.title || `blank-${index}`}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className={
                isBlank
                  ? "work-card work-card--blank glass-card"
                  : "work-card glass-card"
              }
              role={isBlank ? undefined : "button"}
              tabIndex={isBlank ? undefined : 0}
              aria-expanded={isBlank ? undefined : expanded === index}
              aria-label={
                isBlank
                  ? "Coming soon"
                  : `${project.title} — press Enter for details`
              }
              onClick={isBlank ? undefined : () => openCard(index)}
              onKeyDown={
                isBlank ? undefined : (event) => handleCardKeyDown(event, index)
              }
              initial={initial}
              whileInView={inView}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...entrance, delay: index * 0.08 }}
              whileHover={
                isBlank || reduceMotion ? undefined : { y: -10, scale: 1.02 }
              }
            >
              {/* Decorative blue glow blob in the card corner */}
              <span className="work-card-blob" aria-hidden="true" />

              {/* Cover: image, or gradient placeholder with mono index */}
              <div className="work-cover">
                {project.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    className="work-cover-img"
                    src={project.image}
                    alt={project.imageAlt ?? `${project.title} preview`}
                    width={1321}
                    height={413}
                    loading="lazy"
                  />
                ) : (
                  <span className="work-cover-index" aria-hidden="true">
                    {pad2(index)}
                  </span>
                )}
                {!project.image && (
                  <span className="work-cover-ring" aria-hidden="true" />
                )}
              </div>

              {!isBlank && (
                <>
                  {/* Top row: mono index + status/badge pill(s) */}
                  <div className="work-card-top">
                    <span className="work-card-index">{pad2(index)}</span>
                    {badgeList.length > 0 ? (
                      <div className="work-badges">
                        {badgeList.map((badgeText) => (
                          <span key={badgeText} className="work-status">
                            {badgeText}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <h3 className="work-card-title">{project.title}</h3>
                  <p className="work-card-desc">{project.description}</p>

                  <ul
                    className="chip-list work-card-tags"
                    aria-label="Technologies used"
                  >
                    {project.tags.map((tag) => (
                      <li key={tag} className="chip">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {/* Footer: divider + links (rendered only when a link exists) */}
                  {project.githubUrl || project.liveUrl || project.apkUrl ? (
                    <div className="work-card-footer">
                      <GitHubLink project={project} />
                      <LiveLink project={project} />
                      <ApkLink project={project} />
                    </div>
                  ) : null}

                  {/* Expanded detail overlay */}
                  <AnimatePresence>
                    {expanded === index && (
                      <motion.div
                        className="work-overlay"
                        role="dialog"
                        aria-label={`${project.title} details`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="work-overlay-close"
                          aria-label="Close details"
                          autoFocus
                          onClick={(event) => {
                            event.stopPropagation();
                            closeCard(index);
                          }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            aria-hidden="true"
                          >
                            <path d="M6 6l12 12" />
                            <path d="M18 6 6 18" />
                          </svg>
                        </button>

                        <p className="work-overlay-kicker">Project details</p>
                        <p className="work-overlay-title">{project.title}</p>
                        {project.image ? (
                          <div className="work-overlay-cover">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              className="work-overlay-cover-img"
                              src={project.image}
                              alt={project.imageAlt ?? `${project.title} preview`}
                              width={1321}
                              height={413}
                              loading="lazy"
                            />
                          </div>
                        ) : null}
                        <p className="work-overlay-desc">
                          {project.fullDescription ?? project.description}
                        </p>

                        <ul
                          className="chip-list work-overlay-tags"
                          aria-label="Technologies used"
                        >
                          {project.tags.map((tag) => (
                            <li key={tag} className="chip">
                              {tag}
                            </li>
                          ))}
                        </ul>

                        <div className="work-overlay-links">
                          <GitHubLink project={project} />
                          <LiveLink project={project} />
                          <ApkLink project={project} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}
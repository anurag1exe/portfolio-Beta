import type { ReactNode } from "react";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
};

/* Numbered eyebrow + display title, matching the hero's mono/sans
   typographic system. Body already inherits Albert Sans (--f-sans). */
export function SectionHeading({ index, label, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="pf-mono text-[11px] uppercase tracking-[0.2em] text-black/45">
        <span className="text-sky-500">{index}</span> / {label}
      </p>
      <h2 className="mt-4 text-[clamp(2.2rem,5vw,3.4rem)] font-light leading-[1.04] tracking-[-0.04em] text-[#0a0e14]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-black/55">{description}</p>
      ) : null}
    </div>
  );
}

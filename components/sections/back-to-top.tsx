"use client";

import { ArrowUpIcon } from "@/components/sections/icons";

/* Back-to-top button for the contact footer. JS scroll because the
   hero owns the top of the document and has no anchor id (and the
   hero must stay untouched). Respects reduced-motion users. */
export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 pf-mono text-[10px] uppercase tracking-[0.18em] text-black/60 transition-colors duration-300 hover:bg-[#0a0e14] hover:text-white"
    >
      <ArrowUpIcon className="h-3.5 w-3.5" />
      Back to top
    </button>
  );
}

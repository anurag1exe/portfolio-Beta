"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ActionItem {
  id: string;
  label: string;
  icon: React.ElementType;
  content: React.ReactNode;
  dimensions: {
    width: number;
    height: number;
  };
}

export interface DynamicActionBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  actions: ActionItem[];
}

const DynamicActionBar = React.forwardRef<
  HTMLDivElement,
  DynamicActionBarProps
>(({ actions, className, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const activeAction = activeIndex !== null ? actions[activeIndex] : null;

  const BUTTON_BAR_HEIGHT = 56;

  /* Widths are constants so the server render and the client's
     first render always match (no `typeof window` branch — that
     caused a hydration mismatch). Small screens are handled
     purely in CSS via max-w-[calc(100vw_-_2rem)] below.
     At rest the box hugs the buttons — labels always visible.
     Hovering it breathes open to the full-size bar. */
  const REST_WIDTH = 396;
  const FULL_WIDTH = 460;
  const barExpanded = isHovered || activeIndex !== null;

  const containerAnimate = activeAction
    ? {
        width: activeAction.dimensions.width,
        height: activeAction.dimensions.height + BUTTON_BAR_HEIGHT,
      }
    : {
        width: barExpanded ? FULL_WIDTH : REST_WIDTH,
        height: BUTTON_BAR_HEIGHT,
      };

  const transition = { type: "spring" as const, stiffness: 400, damping: 35 };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveIndex(null);
      }}
      {...props}
    >
      <motion.div
        className="flex max-w-[calc(100vw_-_2rem)] flex-col overflow-hidden rounded-2xl border border-black/10 bg-black/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        animate={containerAnimate}
        transition={transition}
        initial={{ width: 396, height: BUTTON_BAR_HEIGHT }}
      >
        <div className="flex-grow overflow-hidden">
          <AnimatePresence>
            {activeAction && (
              <motion.div
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {activeAction.content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className={`flex flex-shrink-0 items-center justify-center px-2 transition-all duration-300 max-md:gap-2 ${
            barExpanded ? "gap-4" : "gap-2.5"
          }`}
          style={{ height: `${BUTTON_BAR_HEIGHT}px` }}
        >
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex h-full items-center justify-center gap-2 rounded-2xl text-zinc-800 transition-all duration-300 hover:bg-zinc-950 hover:text-white max-md:gap-1.5 max-md:px-2.5 ${
                  barExpanded ? "px-4" : "px-2.5"
                }`}
              >
                <Icon className="size-6 max-md:size-5" />
                <span className="font-bold max-md:text-xs">{action.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
});

DynamicActionBar.displayName = "DynamicActionBar";

export default DynamicActionBar;

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-32 cursor-pointer overflow-hidden rounded-full border bg-background py-1.5 px-2 text-left font-semibold text-xs",
        className,
      )}
      {...props}
    >
      <span className="inline-block translate-x-7 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 relative z-10 text-xs">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-1.5 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 text-xs">
        <span>{text}</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </div>
      <div className="absolute left-3.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:-translate-y-0 group-hover:rounded-none group-hover:bg-primary z-0"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const STAGES = [
  "Landing",
  "Questions",
  "Profile",
  "Photo",
  "Analyzing",
  "Results",
] as const;
export type Stage = (typeof STAGES)[number];

export function ProgressRail({ current }: { current: Stage }) {
  const activeIndex = STAGES.indexOf(current);
  return (
    <div className="flex w-full gap-1" aria-label="Progress">
      {STAGES.map((stage, i) => (
        <div
          key={stage}
          className={cn(
            "h-[3px] flex-1 rounded-full transition-colors",
            i <= activeIndex ? "bg-primary" : "bg-border",
          )}
        />
      ))}
    </div>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        variant === "primary"
          ? "bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90"
          : "px-3 py-3 text-muted-foreground underline underline-offset-4 hover:text-foreground",
        className,
      )}
    />
  );
}

export function Pill({
  children,
  tone = "sage",
}: {
  children: ReactNode;
  tone?: "sage" | "gold";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        tone === "gold"
          ? "border-gold/40 bg-gold-soft text-gold"
          : "border-primary/30 bg-sage-soft text-primary",
      )}
    >
      {children}
    </span>
  );
}

export function Check({ filled }: { filled: boolean }) {
  return (
    <span
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
        filled ? "border-primary bg-primary" : "border-border bg-card",
      )}
    >
      {filled && (
        <svg viewBox="0 0 12 12" className="size-3 text-primary-foreground" aria-hidden>
          <path
            d="M2 6.5 4.6 9 10 3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("card-flat p-6", className)}>{children}</div>;
}

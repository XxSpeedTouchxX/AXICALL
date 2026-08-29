import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "orange" | "navy" | "outline" | "outline-inverse";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  orange: "bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-[var(--black)]",
  navy: "bg-[var(--black)] hover:bg-[var(--ink)] text-[var(--bone)]",
  outline: "border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--paper)]",
  "outline-inverse": "border border-[var(--bone)] text-[var(--bone)] hover:bg-[var(--bone)]/10",
};

export function Button({ variant = "orange", loading = false, className = "", disabled, children, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3 font-bold tracking-tight",
        "transition-[colors,transform,box-shadow] duration-200 ease-out",
        "hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-none",
        "disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}

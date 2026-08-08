import type { ButtonHTMLAttributes } from "react";

type Variant = "orange" | "navy" | "outline" | "outline-inverse";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  orange: "bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-[var(--color-navy)]",
  navy: "bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-white",
  outline: "border border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-[var(--color-gray-50)]",
  "outline-inverse": "border border-white text-white hover:bg-white/10",
};

export function Button({ variant = "orange", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-6 py-3 font-semibold transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

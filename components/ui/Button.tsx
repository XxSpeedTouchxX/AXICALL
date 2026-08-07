import type { ButtonHTMLAttributes } from "react";

type Variant = "orange" | "navy" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  orange: "bg-[--color-orange] hover:bg-[--color-orange-dark] text-white",
  navy: "bg-[--color-navy] hover:bg-[--color-navy-light] text-white",
  outline: "border border-[--color-navy] text-[--color-navy] hover:bg-[--color-gray-50]",
};

export function Button({ variant = "orange", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-6 py-3 font-semibold transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

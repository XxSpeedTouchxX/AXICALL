import type { ComponentType, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ComponentType<{ className?: string }>;
}

export function Input({ label, error, icon: Icon, id, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-navy)]">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-gray-600)]" />
        )}
        <input
          id={inputId}
          className={`w-full border border-[var(--color-gray-200)] bg-white py-2.5 text-[var(--color-navy)] transition-colors focus:border-[var(--color-orange)] focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)]/15 ${Icon ? "pl-10 pr-3" : "px-3"} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}

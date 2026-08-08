import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-navy)]">
        {label}
      </label>
      <input
        id={inputId}
        className={`rounded-md border border-[var(--color-gray-200)] bg-white px-3 py-2 text-[var(--color-navy)] focus:border-[var(--color-orange)] focus:outline-none ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}

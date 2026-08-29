import type { ComponentType, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  suffix?: string;
  icon?: ComponentType<{ className?: string }>;
}

export function Input({
  label,
  error,
  hint,
  suffix,
  icon: Icon,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? props.name;
  const hintId = hint ? `${inputId}-hint` : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-[var(--ink)]">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
        )}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={hintId}
          className={`w-full border bg-white py-2.5 text-[var(--ink)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/15 ${
            error ? "border-red-600" : "border-[var(--line)] focus:border-[var(--accent)]"
          } ${Icon ? "pl-10" : "pl-3"} ${suffix ? "pr-12" : "pr-3"} ${className}`}
          {...props}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
            {suffix}
          </span>
        )}
      </div>
      {hint && !error && (
        <span id={hintId} className="text-xs text-[var(--muted)]">
          {hint}
        </span>
      )}
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}

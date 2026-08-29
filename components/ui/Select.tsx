import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

export function Select({
  label,
  options,
  error,
  placeholder = "Sélectionner...",
  id,
  name,
  className = "",
  ...props
}: SelectProps) {
  const selectId = id ?? name;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-sm font-medium text-[var(--ink)]">
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          name={name}
          className={`w-full appearance-none border bg-white py-2.5 pl-3 pr-10 text-[var(--ink)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/15 ${
            error ? "border-red-600" : "border-[var(--line)] focus:border-[var(--accent)]"
          } ${className}`}
          aria-invalid={error ? true : undefined}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
          aria-hidden="true"
        />
      </div>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}

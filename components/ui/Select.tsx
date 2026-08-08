import type { SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
}

export function Select({ label, options, error, id, name, className = "", ...props }: SelectProps) {
  const selectId = id ?? name;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={selectId} className="text-sm font-medium text-[var(--color-navy)]">
        {label}
      </label>
      <select
        id={selectId}
        name={name}
        className={`rounded-md border border-[var(--color-gray-200)] bg-white px-3 py-2 text-[var(--color-navy)] focus:border-[var(--color-orange)] focus:outline-none ${className}`}
        {...props}
      >
        <option value="">Sélectionner...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}

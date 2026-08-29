import { Check } from "lucide-react";

interface RadioCardProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export function RadioCard({ name, value, label, checked, onChange }: RadioCardProps) {
  return (
    <label
      className={`group relative flex cursor-pointer items-center justify-center gap-2 border px-4 py-3.5 text-center text-sm transition-all duration-150 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2 ${
        checked
          ? "border-accent bg-accent/10 font-bold text-ink shadow-[inset_0_0_0_1px_var(--accent)]"
          : "border-line bg-white text-muted hover:-translate-y-0.5 hover:border-ink hover:text-ink hover:shadow-md"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {checked && (
        <span
          aria-hidden="true"
          className="absolute -right-px -top-px flex h-4 w-4 items-center justify-center bg-accent text-black"
        >
          <Check className="h-3 w-3" strokeWidth={3} />
        </span>
      )}
      {label}
    </label>
  );
}

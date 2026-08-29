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
      className={`cursor-pointer border px-4 py-3 text-center transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--color-orange)] has-[:focus-visible]:ring-offset-2 ${
        checked
          ? "border-[var(--color-orange)] bg-[var(--color-orange)]/10 font-semibold text-[var(--color-navy)]"
          : "border-[var(--color-gray-200)] text-[var(--color-gray-600)] hover:border-[var(--color-navy)]"
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
      {label}
    </label>
  );
}

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
      className={`cursor-pointer rounded-lg border px-4 py-3 text-center transition-colors ${
        checked
          ? "border-[--color-orange] bg-orange-50 font-semibold text-[--color-navy]"
          : "border-[--color-gray-200] text-[--color-gray-600] hover:border-[--color-navy]"
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

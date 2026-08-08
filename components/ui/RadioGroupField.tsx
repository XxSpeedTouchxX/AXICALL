import { RadioCard } from "./RadioCard";

interface RadioGroupOption<T extends string> {
  value: T;
  label: string;
}

interface RadioGroupFieldProps<T extends string> {
  legend: string;
  name: string;
  options: RadioGroupOption<T>[];
  value: T | undefined;
  onChange: (value: T) => void;
  /** Tailwind grid-cols classes for the option layout — varies per group size. */
  columns?: string;
}

export function RadioGroupField<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  columns = "grid-cols-2",
}: RadioGroupFieldProps<T>) {
  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="mb-2 text-sm font-medium text-[var(--color-navy)]">{legend}</legend>
      <div className={`grid gap-3 ${columns}`}>
        {options.map((opt) => (
          <RadioCard
            key={opt.value}
            name={name}
            value={opt.value}
            label={opt.label}
            checked={value === opt.value}
            onChange={(v) => onChange(v as T)}
          />
        ))}
      </div>
    </fieldset>
  );
}

const OUI_NON: RadioGroupOption<"oui" | "non">[] = [
  { value: "oui", label: "Oui" },
  { value: "non", label: "Non" },
];

interface BooleanRadioGroupProps {
  legend: string;
  name: string;
  value: boolean | undefined;
  onChange: (value: boolean) => void;
}

/** A yes/no RadioGroupField backed by a real boolean, not the "oui"/"non" strings. */
export function BooleanRadioGroup({ legend, name, value, onChange }: BooleanRadioGroupProps) {
  return (
    <RadioGroupField
      legend={legend}
      name={name}
      options={OUI_NON}
      value={value === undefined ? undefined : value ? "oui" : "non"}
      onChange={(v) => onChange(v === "oui")}
    />
  );
}

"use client";

import { Input } from "./Input";
import { Select } from "./Select";

export const DIAL_CODES = [
  { value: "+33", label: "France (+33)" },
  { value: "+32", label: "Belgique (+32)" },
  { value: "+41", label: "Suisse (+41)" },
  { value: "+1", label: "États-Unis / Canada (+1)" },
  { value: "+44", label: "Royaume-Uni (+44)" },
];

export function currentDialCode(phone: string): string {
  const match = DIAL_CODES.find((d) => phone.startsWith(d.value));
  return match?.value ?? "+33";
}

interface PhoneFieldProps {
  value: string;
  onChange: (telephone: string) => void;
}

/** Two controlled fields (dial code + number) sharing a single ContactInfo.telephone string. */
export function PhoneField({ value, onChange }: PhoneFieldProps) {
  const telephone = value || "+33 ";

  return (
    <>
      <Select
        label="Indicatif"
        name="indicatif"
        options={DIAL_CODES}
        value={currentDialCode(telephone)}
        onChange={(e) => {
          const rest = telephone.replace(/^\+\d{1,3}\s?/, "").trimStart();
          onChange(`${e.target.value} ${rest}`.trimEnd());
        }}
      />
      <Input
        label="Téléphone"
        name="telephone"
        type="tel"
        value={telephone}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}

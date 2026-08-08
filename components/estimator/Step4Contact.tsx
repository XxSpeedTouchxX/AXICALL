"use client";

import Link from "next/link";
import type { ContactInfo } from "@/types/vehicle";
import { Input } from "@/components/ui/Input";
import { PhoneField } from "@/components/ui/PhoneField";
import { CityPostalFields } from "./CityPostalFields";
import { CONSENT_TEXT } from "@/lib/company";

interface Step4Props {
  value: Partial<ContactInfo>;
  onChange: (patch: Partial<ContactInfo>) => void;
}

export function Step4Contact({ value, onChange }: Step4Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Nom"
          name="nom"
          value={value.nom ?? ""}
          onChange={(e) => onChange({ nom: e.target.value })}
        />
        <Input
          label="Prénom"
          name="prenom"
          value={value.prenom ?? ""}
          onChange={(e) => onChange({ prenom: e.target.value })}
        />
        <PhoneField
          value={value.telephone ?? ""}
          onChange={(telephone) => onChange({ telephone })}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={value.email ?? ""}
          onChange={(e) => onChange({ email: e.target.value })}
        />
        <CityPostalFields
          ville={value.ville ?? ""}
          codePostal={value.codePostal ?? ""}
          onChange={(patch) => onChange(patch)}
        />
      </div>

      <label className="flex items-start gap-2 text-sm text-[var(--color-navy)]">
        <input
          type="checkbox"
          checked={value.consentement === true}
          onChange={(e) => onChange({ consentement: e.target.checked })}
          className="mt-1"
        />
        {CONSENT_TEXT}
      </label>
      <p className="text-xs text-[var(--color-gray-600)]">
        En savoir plus dans notre{" "}
        <Link href="/politique-de-confidentialite" className="underline hover:text-[var(--color-navy)]">
          politique de confidentialité
        </Link>
        .
      </p>
    </div>
  );
}

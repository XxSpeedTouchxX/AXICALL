"use client";

import Link from "next/link";
import { User, Mail } from "lucide-react";
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
  const consented = value.consentement === true;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Prénom"
          name="prenom"
          icon={User}
          autoComplete="given-name"
          value={value.prenom ?? ""}
          onChange={(e) => onChange({ prenom: e.target.value })}
        />
        <Input
          label="Nom"
          name="nom"
          autoComplete="family-name"
          value={value.nom ?? ""}
          onChange={(e) => onChange({ nom: e.target.value })}
        />
        <PhoneField
          value={value.telephone ?? ""}
          onChange={(telephone) => onChange({ telephone })}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          icon={Mail}
          autoComplete="email"
          placeholder="vous@exemple.fr"
          value={value.email ?? ""}
          onChange={(e) => onChange({ email: e.target.value })}
        />
        <CityPostalFields
          ville={value.ville ?? ""}
          codePostal={value.codePostal ?? ""}
          onChange={(patch) => onChange(patch)}
        />
      </div>

      <label
        className={`flex cursor-pointer items-start gap-3 border-l-[3px] p-4 text-sm transition-colors ${
          consented
            ? "border-[var(--accent)] bg-[var(--accent)]/[0.07]"
            : "border-[var(--line)] bg-[var(--paper)]/60 hover:border-[var(--muted)]"
        }`}
      >
        <input
          type="checkbox"
          checked={consented}
          onChange={(e) => onChange({ consentement: e.target.checked })}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
        />
        <span className="leading-relaxed text-[var(--muted)]">{CONSENT_TEXT}</span>
      </label>

      <p className="text-xs text-[var(--muted)]">
        En savoir plus dans notre{" "}
        <Link
          href="/politique-de-confidentialite"
          className="underline transition-colors hover:text-[var(--ink)]"
        >
          politique de confidentialité
        </Link>
        .
      </p>
    </div>
  );
}

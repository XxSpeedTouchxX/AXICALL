"use client";

import Link from "next/link";
import type { ContactInfo } from "@/types/vehicle";
import { Input } from "@/components/ui/Input";

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
        <Input
          label="Téléphone"
          name="telephone"
          type="tel"
          value={value.telephone ?? ""}
          onChange={(e) => onChange({ telephone: e.target.value })}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={value.email ?? ""}
          onChange={(e) => onChange({ email: e.target.value })}
        />
        <Input
          label="Ville"
          name="ville"
          value={value.ville ?? ""}
          onChange={(e) => onChange({ ville: e.target.value })}
        />
        <Input
          label="Code postal"
          name="codePostal"
          value={value.codePostal ?? ""}
          onChange={(e) => onChange({ codePostal: e.target.value })}
        />
      </div>

      <label className="flex items-start gap-2 text-sm text-[var(--color-navy)]">
        <input
          type="checkbox"
          checked={value.consentement === true}
          onChange={(e) => onChange({ consentement: e.target.checked })}
          className="mt-1"
        />
        J&apos;accepte d&apos;être contacté concernant mon estimation.
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

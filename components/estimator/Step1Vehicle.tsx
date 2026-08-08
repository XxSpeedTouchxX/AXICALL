"use client";

import type { VehicleInfo, Carburant, Boite } from "@/types/vehicle";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { RadioCard } from "@/components/ui/RadioCard";

const CARBURANTS: { value: Carburant; label: string }[] = [
  { value: "essence", label: "Essence" },
  { value: "diesel", label: "Diesel" },
  { value: "hybride", label: "Hybride" },
  { value: "electrique", label: "Electrique" },
];

const BOITES: { value: Boite; label: string }[] = [
  { value: "manuelle", label: "Manuelle" },
  { value: "automatique", label: "Automatique" },
];

const MARQUES = [
  "Renault",
  "Peugeot",
  "Citroën",
  "Volkswagen",
  "Audi",
  "BMW",
  "Mercedes-Benz",
  "Ford",
  "Opel",
  "Toyota",
  "Nissan",
  "Fiat",
  "Dacia",
  "Seat",
  "Skoda",
  "Hyundai",
  "Kia",
  "Volvo",
  "Mini",
  "Land Rover",
  "Mazda",
  "Honda",
  "Suzuki",
  "Jeep",
  "Alfa Romeo",
  "Porsche",
  "DS Automobiles",
  "Autre",
].map((m) => ({ value: m, label: m }));

const currentYear = new Date().getFullYear();
const ANNEES = Array.from({ length: currentYear - 1979 }, (_, i) => currentYear - i).map(
  (year) => ({ value: String(year), label: String(year) })
);

const NOMBRE_PORTES = [2, 3, 4, 5].map((n) => ({ value: String(n), label: String(n) }));

/** Popular models per brand, for the cascading "Modèle" dropdown. Not exhaustive —
 * anything not listed falls back to "Autre / non listé" with free-text entry. */
const MODELES_PAR_MARQUE: Record<string, string[]> = {
  Renault: ["Clio", "Captur", "Mégane", "Kadjar", "Twingo", "Scénic", "Talisman", "Zoe", "Austral"],
  Peugeot: ["208", "2008", "308", "3008", "5008", "508", "108", "Partner"],
  Citroën: ["C3", "C4", "C5 Aircross", "Berlingo", "C1", "C3 Aircross"],
  Volkswagen: ["Golf", "Polo", "Tiguan", "Passat", "T-Roc", "T-Cross", "Touran"],
  Audi: ["A1", "A3", "A4", "A6", "Q2", "Q3", "Q5"],
  BMW: ["Série 1", "Série 2", "Série 3", "Série 5", "X1", "X3", "X5"],
  "Mercedes-Benz": ["Classe A", "Classe B", "Classe C", "Classe E", "GLA", "GLC"],
  Ford: ["Fiesta", "Focus", "Puma", "Kuga", "EcoSport"],
  Opel: ["Corsa", "Astra", "Crossland", "Grandland", "Mokka"],
  Toyota: ["Yaris", "Corolla", "C-HR", "RAV4", "Aygo"],
  Nissan: ["Micra", "Juke", "Qashqai", "X-Trail"],
  Fiat: ["500", "Panda", "Tipo", "500X"],
  Dacia: ["Sandero", "Duster", "Spring", "Jogger"],
  Seat: ["Ibiza", "Leon", "Arona", "Ateca"],
  Skoda: ["Fabia", "Octavia", "Kamiq", "Karoq"],
  Hyundai: ["i10", "i20", "i30", "Tucson", "Kona"],
  Kia: ["Picanto", "Rio", "Ceed", "Sportage", "Niro"],
  Volvo: ["XC40", "XC60", "V40", "V60"],
  Mini: ["Cooper", "Countryman", "Clubman"],
  "Land Rover": ["Range Rover Evoque", "Discovery Sport", "Defender"],
  Mazda: ["2", "3", "CX-3", "CX-5"],
  Honda: ["Civic", "CR-V", "Jazz", "HR-V"],
  Suzuki: ["Swift", "Vitara", "S-Cross"],
  Jeep: ["Renegade", "Compass", "Cherokee"],
  "Alfa Romeo": ["Giulietta", "Giulia", "Stelvio"],
  Porsche: ["911", "Cayenne", "Macan", "Panamera"],
  "DS Automobiles": ["DS3", "DS4", "DS7"],
};

const AUTRE_MODELE = "Autre / non listé";

interface Step1Props {
  value: Partial<VehicleInfo>;
  onChange: (patch: Partial<VehicleInfo>) => void;
}

export function Step1Vehicle({ value, onChange }: Step1Props) {
  const modeles = value.marque ? MODELES_PAR_MARQUE[value.marque] : undefined;
  const modeleSelectValue = !modeles
    ? ""
    : value.modele && modeles.includes(value.modele)
      ? value.modele
      : value.modele
        ? AUTRE_MODELE
        : "";

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Marque"
          name="marque"
          options={MARQUES}
          value={value.marque ?? ""}
          onChange={(e) => onChange({ marque: e.target.value, modele: "" })}
        />
        {modeles ? (
          <div className="flex flex-col gap-4">
            <Select
              label="Modèle"
              name="modele"
              options={[...modeles.map((m) => ({ value: m, label: m })), { value: AUTRE_MODELE, label: AUTRE_MODELE }]}
              value={modeleSelectValue}
              onChange={(e) =>
                onChange({ modele: e.target.value === AUTRE_MODELE ? "" : e.target.value })
              }
            />
            {modeleSelectValue === AUTRE_MODELE && (
              <Input
                label="Précisez le modèle"
                name="modele-autre"
                value={value.modele ?? ""}
                onChange={(e) => onChange({ modele: e.target.value })}
              />
            )}
          </div>
        ) : (
          <Input
            label="Modèle"
            name="modele"
            value={value.modele ?? ""}
            onChange={(e) => onChange({ modele: e.target.value })}
          />
        )}
        <Select
          label="Année"
          name="annee"
          options={ANNEES}
          value={value.annee ? String(value.annee) : ""}
          onChange={(e) => onChange({ annee: Number(e.target.value) })}
        />
        <Input
          label="Version / finition (optionnel)"
          name="version"
          value={value.version ?? ""}
          onChange={(e) => onChange({ version: e.target.value || undefined })}
        />
        <Input
          label="Kilométrage"
          name="kilometrage"
          type="number"
          value={value.kilometrage ?? ""}
          onChange={(e) => onChange({ kilometrage: Number(e.target.value) })}
        />
        <Input
          label="Puissance fiscale (optionnel)"
          name="puissanceFiscale"
          type="number"
          value={value.puissanceFiscale ?? ""}
          onChange={(e) =>
            onChange({ puissanceFiscale: e.target.value ? Number(e.target.value) : undefined })
          }
        />
        <Select
          label="Nombre de portes"
          name="nombrePortes"
          options={NOMBRE_PORTES}
          value={value.nombrePortes ? String(value.nombrePortes) : ""}
          onChange={(e) => onChange({ nombrePortes: Number(e.target.value) })}
        />
      </div>

      <fieldset className="border-0 p-0 m-0">
        <legend className="mb-2 text-sm font-medium text-[var(--color-navy)]">Carburant</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CARBURANTS.map((c) => (
            <RadioCard
              key={c.value}
              name="carburant"
              value={c.value}
              label={c.label}
              checked={value.carburant === c.value}
              onChange={(v) => onChange({ carburant: v as Carburant })}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="border-0 p-0 m-0">
        <legend className="mb-2 text-sm font-medium text-[var(--color-navy)]">Boîte</legend>
        <div className="grid grid-cols-2 gap-3">
          {BOITES.map((b) => (
            <RadioCard
              key={b.value}
              name="boite"
              value={b.value}
              label={b.label}
              checked={value.boite === b.value}
              onChange={(v) => onChange({ boite: v as Boite })}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}

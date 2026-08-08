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

/**
 * Models sold new in France over roughly the last 15-20 years, per brand —
 * covers the vast majority of the used-car market. Not exhaustive (no full
 * historical catalog back to the 1980s) — anything not listed falls back to
 * "Autre / non listé" with free-text entry.
 */
const MODELES_PAR_MARQUE: Record<string, string[]> = {
  Renault: [
    "Twingo", "Clio", "Captur", "Mégane", "Scénic", "Kadjar", "Austral", "Talisman", "Espace",
    "Koleos", "Kangoo", "Trafic", "Master", "Zoe", "Twizy", "Arkana", "Symbioz", "Laguna",
    "Modus", "Wind",
  ],
  Peugeot: [
    "108", "208", "2008", "308", "3008", "408", "508", "5008", "107", "206", "207", "301",
    "306", "307", "406", "407", "607", "Partner", "Rifter", "Traveller", "Expert", "Boxer",
    "RCZ", "Bipper",
  ],
  Citroën: [
    "C1", "C3", "C3 Aircross", "C4", "C4 X", "C4 Picasso", "C5", "C5 Aircross", "C5 X",
    "C4 Cactus", "C6", "C8", "C2", "C-Elysée", "Berlingo", "SpaceTourer", "Jumpy", "Jumper", "Ami",
  ],
  Volkswagen: [
    "up!", "Polo", "Golf", "Golf SW", "Jetta", "Passat", "Passat SW", "Arteon", "T-Cross",
    "T-Roc", "Taigo", "Tiguan", "Touareg", "Touran", "Sharan", "Scirocco", "Beetle", "Caddy",
    "Transporter", "Multivan", "Amarok", "ID.3", "ID.4", "ID.5", "ID.7", "ID. Buzz", "Eos",
  ],
  Audi: [
    "A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q4 e-tron", "Q5", "Q6 e-tron", "Q7",
    "Q8", "TT", "R8", "e-tron", "e-tron GT",
  ],
  BMW: [
    "Série 1", "Série 2", "Série 3", "Série 4", "Série 5", "Série 6", "Série 7", "Série 8",
    "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "i3", "i4", "i5", "i7", "iX", "iX1", "iX2", "iX3",
  ],
  "Mercedes-Benz": [
    "Classe A", "Classe B", "Classe C", "Classe E", "Classe S", "CLA", "CLS", "CLK", "GLA",
    "GLB", "GLC", "GLE", "GLS", "GLK", "Classe G", "Vito", "Classe V", "Citan", "Sprinter",
    "SLK/SLC", "EQA", "EQB", "EQC", "EQE", "EQS",
  ],
  Ford: [
    "Ka", "Ka+", "Fiesta", "Focus", "Mondeo", "Puma", "EcoSport", "Kuga", "Edge", "B-Max",
    "C-Max", "Grand C-Max", "S-Max", "Galaxy", "Mustang", "Mustang Mach-E", "Tourneo Connect",
    "Tourneo Custom", "Transit Connect", "Ranger",
  ],
  Opel: [
    "Corsa", "Adam", "Astra", "Astra Sports Tourer", "Insignia", "Meriva", "Zafira",
    "Zafira Life", "Mokka", "Crossland", "Grandland", "Frontera", "Combo", "Vivaro", "Movano",
    "Antara", "Agila", "Karl", "Cascada",
  ],
  Toyota: [
    "Aygo", "Aygo X", "Yaris", "Yaris Cross", "Corolla", "Auris", "Avensis", "C-HR", "RAV4",
    "Prius", "Prius+", "Highlander", "Land Cruiser", "Hilux", "Proace City", "Proace", "Verso",
    "bZ4X", "GT86", "Supra", "Camry",
  ],
  Nissan: [
    "Micra", "Note", "Juke", "Qashqai", "X-Trail", "Ariya", "Leaf", "Pulsar", "Almera",
    "Primera", "Murano", "Pathfinder", "Navara", "370Z", "GT-R", "Townstar", "Kicks",
  ],
  Fiat: [
    "500", "500C", "500X", "500L", "Panda", "Tipo", "Punto", "Grande Punto", "Bravo", "Croma",
    "Idea", "Multipla", "Doblo", "Fiorino", "Qubo", "Ducato", "500e", "Grande Panda",
  ],
  Dacia: ["Sandero", "Sandero Stepway", "Logan", "Logan MCV", "Duster", "Lodgy", "Dokker", "Spring", "Jogger", "Bigster"],
  Seat: ["Ibiza", "Leon", "Arona", "Ateca", "Tarraco", "Altea", "Toledo", "Alhambra", "Mii", "Exeo"],
  Skoda: ["Fabia", "Scala", "Rapid", "Rapid Spaceback", "Octavia", "Kamiq", "Karoq", "Kodiaq", "Superb", "Yeti", "Roomster", "Citigo", "Enyaq"],
  Hyundai: [
    "i10", "i20", "i30", "i40", "ix20", "ix35", "Tucson", "Kona", "Bayon", "Santa Fe", "Getz",
    "Accent", "Elantra", "Sonata", "Ioniq", "Ioniq 5", "Ioniq 6", "Veloster",
  ],
  Kia: ["Picanto", "Rio", "Ceed", "Ceed SW", "Pro Ceed", "Stonic", "Sportage", "Sorento", "Niro", "Soul", "Venga", "Carens", "Carnival", "Optima", "Cerato", "EV6", "EV9", "EV3"],
  Volvo: ["S40", "S60", "S70", "S80", "S90", "V40", "V50", "V60", "V70", "V90", "C30", "C70", "XC40", "XC60", "XC70", "XC90", "EX30", "EX90"],
  Mini: ["Mini (3 portes)", "Mini 5 portes", "Cabrio", "Clubman", "Countryman", "Paceman", "Coupé", "Roadster", "John Cooper Works", "Aceman"],
  "Land Rover": ["Range Rover", "Range Rover Sport", "Range Rover Evoque", "Range Rover Velar", "Discovery", "Discovery Sport", "Freelander", "Defender"],
  Mazda: ["2", "3", "6", "CX-3", "CX-30", "CX-5", "CX-60", "CX-80", "MX-5", "MX-30", "Premacy", "5", "RX-8"],
  Honda: ["Jazz", "Civic", "Accord", "CR-V", "HR-V", "ZR-V", "FR-V", "Insight", "e", "CR-Z"],
  Suzuki: ["Alto", "Swift", "Ignis", "Baleno", "SX4", "S-Cross", "Vitara", "Jimny", "Wagon R+", "Swace", "Across"],
  Jeep: ["Renegade", "Compass", "Cherokee", "Grand Cherokee", "Patriot", "Wrangler", "Avenger"],
  "Alfa Romeo": ["147", "156", "159", "166", "Giulietta", "Mito", "Giulia", "Stelvio", "Tonale", "Brera", "GT"],
  Porsche: ["911", "718 Boxster", "718 Cayman", "Boxster", "Cayman", "Cayenne", "Macan", "Panamera", "Taycan"],
  "DS Automobiles": ["DS3", "DS4", "DS5", "DS7", "DS9"],
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

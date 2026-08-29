"use client";

import type { VehicleCondition, EtatGeneral, ControleTechnique } from "@/types/vehicle";
import { Input } from "@/components/ui/Input";
import { RadioGroupField, BooleanRadioGroup } from "@/components/ui/RadioGroupField";

const ETATS: { value: EtatGeneral; label: string }[] = [
  { value: "excellent", label: "Excellent" },
  { value: "tres_bon", label: "Très bon" },
  { value: "correct", label: "Correct" },
  { value: "a_prevoir", label: "À prévoir" },
];

const CONTROLES: { value: ControleTechnique; label: string }[] = [
  { value: "valide", label: "Valide" },
  { value: "expire", label: "Expiré" },
  { value: "non_effectue", label: "Non effectué" },
];

interface Step2Props {
  value: Partial<VehicleCondition>;
  onChange: (patch: Partial<VehicleCondition>) => void;
}

export function Step2Condition({ value, onChange }: Step2Props) {
  return (
    <div className="flex flex-col gap-7">
      <RadioGroupField
        legend="État général"
        name="etatGeneral"
        options={ETATS}
        value={value.etatGeneral}
        onChange={(etatGeneral) => onChange({ etatGeneral })}
        columns="grid-cols-2 sm:grid-cols-4"
        hint="Carrosserie, intérieur et mécanique, dans l'ensemble."
      />

      <BooleanRadioGroup
        legend="Le véhicule a-t-il déjà été accidenté ?"
        name="accident"
        value={value.accident}
        onChange={(accident) => onChange({ accident })}
        hint="Même un choc réparé — cela reste visible à l'expertise."
      />

      <RadioGroupField
        legend="Contrôle technique"
        name="controleTechnique"
        options={CONTROLES}
        value={value.controleTechnique}
        onChange={(controleTechnique) => onChange({ controleTechnique })}
        columns="grid-cols-3"
      />

      <Input
        label="Nombre de propriétaires"
        name="nombreProprietaires"
        type="number"
        inputMode="numeric"
        min={1}
        placeholder="Ex : 2"
        hint="Vous compris, tel qu'indiqué sur la carte grise."
        value={value.nombreProprietaires ?? ""}
        onChange={(e) =>
          onChange({ nombreProprietaires: e.target.value ? Number(e.target.value) : undefined })
        }
      />

      <BooleanRadioGroup
        legend="Carnet d'entretien disponible"
        name="carnetEntretien"
        value={value.carnetEntretien}
        onChange={(carnetEntretien) => onChange({ carnetEntretien })}
        hint="Un historique d'entretien complet valorise nettement le véhicule."
      />
    </div>
  );
}

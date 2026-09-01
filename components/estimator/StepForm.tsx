"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, AlertCircle, ShieldCheck, Clock, Lock } from "lucide-react";
import { useEstimationForm } from "@/lib/useEstimationForm";
import {
  vehicleInfoSchema,
  vehicleConditionSchema,
  sellerSituationSchema,
  contactInfoSchema,
} from "@/lib/validation";
import { StepIndicator } from "./StepIndicator";
import { Step1Vehicle } from "./Step1Vehicle";
import { Step2Condition } from "./Step2Condition";
import { Step3Situation } from "./Step3Situation";
import { Step4Contact } from "./Step4Contact";
import { Button } from "@/components/ui/Button";
import { HoneypotField } from "@/components/ui/HoneypotField";

/** Human-readable names so validation errors can say what is actually missing. */
const FIELD_LABELS: Record<string, string> = {
  marque: "la marque",
  modele: "le modèle",
  annee: "l'année",
  kilometrage: "le kilométrage",
  carburant: "le carburant",
  boite: "la boîte de vitesses",
  nombrePortes: "le nombre de portes",
  etatGeneral: "l'état général",
  accident: "l'historique d'accident",
  controleTechnique: "le contrôle technique",
  nombreProprietaires: "le nombre de propriétaires",
  carnetEntretien: "le carnet d'entretien",
  motifVente: "le motif de vente",
  delaiVente: "le délai de vente",
  nom: "votre nom",
  prenom: "votre prénom",
  telephone: "votre téléphone",
  email: "votre email",
  ville: "votre ville",
  codePostal: "votre code postal",
  consentement: "votre accord pour être recontacté",
  cguAcceptees: "l'acceptation des CGU",
};

function describeMissing(paths: string[]): string {
  const names = paths
    .map((p) => FIELD_LABELS[p])
    .filter((n): n is string => Boolean(n));
  if (names.length === 0) return "Merci de compléter tous les champs requis.";
  if (names.length === 1) return `Il manque ${names[0]}.`;
  const last = names[names.length - 1];
  return `Il manque ${names.slice(0, -1).join(", ")} et ${last}.`;
}

const STEP_LABELS = ["Véhicule", "État", "Projet", "Contact"];

const STEP_HEADINGS = [
  { title: "Votre véhicule", desc: "Les informations principales pour identifier votre voiture." },
  { title: "État du véhicule", desc: "Plus l'état est précis, plus l'estimation sera juste." },
  { title: "Votre projet", desc: "Pour adapter notre accompagnement à votre situation." },
  { title: "Vos coordonnées", desc: "Pour vous transmettre votre estimation et vous rappeler." },
];

const REASSURANCE = [
  { icon: ShieldCheck, text: "100% gratuit, sans engagement" },
  { icon: Clock, text: "Rappel d'un expert sous 24h" },
  { icon: Lock, text: "Vos données ne sont jamais revendues" },
];

export function StepForm() {
  const router = useRouter();
  const form = useEstimationForm();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);
  const [honeypot, setHoneypot] = useState("");

  // Single source of truth per step: its validation schema, the data it
  // validates, and the element it renders — instead of three separate
  // parallel arrays/conditionals kept in sync by hand.
  const steps = [
    {
      schema: vehicleInfoSchema,
      data: form.data.vehicle,
      element: <Step1Vehicle value={form.data.vehicle} onChange={form.updateVehicle} />,
    },
    {
      schema: vehicleConditionSchema,
      data: form.data.condition,
      element: <Step2Condition value={form.data.condition} onChange={form.updateCondition} />,
    },
    {
      schema: sellerSituationSchema,
      data: form.data.situation,
      element: <Step3Situation value={form.data.situation} onChange={form.updateSituation} />,
    },
    {
      schema: contactInfoSchema,
      data: form.data.contact,
      element: <Step4Contact value={form.data.contact} onChange={form.updateContact} />,
    },
  ];

  const currentStep = steps[form.step - 1];
  const isLastStep = form.step === steps.length;
  const heading = STEP_HEADINGS[form.step - 1];

  function handleNext() {
    const result = currentStep.schema.safeParse(currentStep.data);
    if (!result.success) {
      setError(describeMissing(result.error.issues.map((i) => String(i.path[0]))));
      return;
    }
    setError(null);
    setDirection(1);
    form.goNext();
  }

  function handleBack() {
    setError(null);
    setDirection(-1);
    form.goBack();
  }

  async function handleSubmit() {
    const result = contactInfoSchema.safeParse(form.data.contact);
    if (!result.success) {
      setError(describeMissing(result.error.issues.map((i) => String(i.path[0]))));
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "estimation", ...form.data, societeWeb: honeypot }),
      });
      if (!res.ok) throw new Error("submit failed");
      const body = await res.json();
      sessionStorage.setItem(
        "estimation-result",
        JSON.stringify({ ...body, vehicule: form.data.vehicle })
      );
      form.reset();
      router.push("/estimation/merci");
    } catch {
      setError("Une erreur est survenue, merci de réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="relative border border-[var(--line)] bg-white shadow-xl">
        <HoneypotField value={honeypot} onChange={setHoneypot} />
        <div className="border-b border-[var(--line)] bg-[var(--paper)]/50 px-6 py-6 sm:px-8">
          <StepIndicator step={form.step} labels={STEP_LABELS} />
        </div>

        <div className="px-6 py-8 sm:px-8">
          {/* Keyed on the step so React remounts and replays the entry animation.
              Deliberately no AnimatePresence/exit: waiting for an exit animation
              would leave the panel blank between steps, which reads as lag. */}
          <motion.div
            key={form.step}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <p className="eyebrow mb-2">
              — Étape {form.step} / {steps.length}
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)]">{heading.title}</h2>
            <p className="mt-1.5 mb-7 text-sm text-[var(--muted)]">{heading.desc}</p>

            {currentStep.element}
          </motion.div>

          {error && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-2.5 border-l-[3px] border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {error}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-6">
            {form.step > 1 ? (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Précédent
              </Button>
            ) : (
              <span />
            )}
            {!isLastStep ? (
              <Button onClick={handleNext}>
                Suivant
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} loading={submitting}>
                {submitting ? "Envoi en cours…" : "Obtenir mon estimation"}
              </Button>
            )}
          </div>
        </div>
      </div>

      <ul className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center sm:gap-6">
        {REASSURANCE.map((r) => (
          <li key={r.text} className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <r.icon className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
            {r.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

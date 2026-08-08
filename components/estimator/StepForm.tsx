"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEstimationForm } from "@/lib/useEstimationForm";
import {
  vehicleInfoSchema,
  vehicleConditionSchema,
  sellerSituationSchema,
  contactInfoSchema,
} from "@/lib/validation";
import { ProgressBar } from "./ProgressBar";
import { Step1Vehicle } from "./Step1Vehicle";
import { Step2Condition } from "./Step2Condition";
import { Step3Situation } from "./Step3Situation";
import { Step4Contact } from "./Step4Contact";
import { Button } from "@/components/ui/Button";

export function StepForm() {
  const router = useRouter();
  const form = useEstimationForm();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

  function handleNext() {
    const result = currentStep.schema.safeParse(currentStep.data);
    if (!result.success) {
      setError("Merci de compléter tous les champs requis.");
      return;
    }
    setError(null);
    form.goNext();
  }

  async function handleSubmit() {
    const result = contactInfoSchema.safeParse(form.data.contact);
    if (!result.success) {
      setError("Merci de compléter tous les champs requis.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "estimation", ...form.data }),
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
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <ProgressBar step={form.step} total={steps.length} />

      {currentStep.element}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-between">
        {form.step > 1 ? (
          <Button variant="outline" onClick={form.goBack}>
            Précédent
          </Button>
        ) : (
          <span />
        )}
        {!isLastStep ? (
          <Button onClick={handleNext}>Suivant</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Envoi..." : "Obtenir mon estimation"}
          </Button>
        )}
      </div>
    </div>
  );
}

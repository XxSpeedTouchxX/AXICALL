"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/company";

interface StoredResult {
  id: string;
  score: number;
  urgence: "chaud" | "tiede" | "froid";
  vehicule: { marque?: string; modele?: string; annee?: number; kilometrage?: number };
}

const MESSAGES: Record<StoredResult["urgence"], string> = {
  chaud:
    "Votre profil correspond exactement à ce que recherchent nos partenaires. Un expert vous contacte en priorité.",
  tiede: "Votre estimation est enregistrée. Un membre de notre équipe reviendra vers vous rapidement.",
  froid: "Merci pour votre demande. Nous restons disponibles quand vous serez prêt à avancer.",
};

export function ResultView() {
  const [result, setResult] = useState<StoredResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("estimation-result");
    if (raw) setResult(JSON.parse(raw));
  }, []);

  if (!result) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-6 text-[var(--color-gray-600)]">
          Nous n&apos;avons pas retrouvé de demande récente. Vous pouvez refaire une estimation.
        </p>
        <Link href="/estimation">
          <Button>Estimer mon véhicule</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="mb-4 text-3xl font-bold text-[var(--color-navy)]">
        Votre demande d&apos;estimation a bien été enregistrée.
      </h1>
      <div className="mb-6 rounded-lg border border-[var(--color-gray-200)] bg-white p-6 text-left">
        <p className="font-semibold text-[var(--color-navy)]">
          {result.vehicule.marque} {result.vehicule.modele} ({result.vehicule.annee})
        </p>
        <p className="text-[var(--color-gray-600)]">{result.vehicule.kilometrage} km</p>
      </div>
      <p className="mb-8 text-[var(--color-gray-600)]">{MESSAGES[result.urgence]}</p>
      <a href={COMPANY.phoneHref}>
        <Button>Être rappelé maintenant</Button>
      </a>
    </div>
  );
}

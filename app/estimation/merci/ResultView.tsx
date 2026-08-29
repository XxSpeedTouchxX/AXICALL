"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Phone, Car, Clock, FileText } from "lucide-react";
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

const NEXT_STEPS = [
  { icon: Phone, title: "Un expert vous rappelle", desc: `Sous 24h ouvrées, aux horaires ${COMPANY.hours}.` },
  { icon: Car, title: "Estimation affinée", desc: "Nous validons ensemble les détails de votre véhicule." },
  { icon: FileText, title: "Vous décidez", desc: "Aucun engagement : vous restez libre à chaque étape." },
];

export function ResultView() {
  const [result, setResult] = useState<StoredResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("estimation-result");
    if (!raw) return;
    try {
      setResult(JSON.parse(raw));
    } catch {
      // Malformed/tampered sessionStorage value — fall back to the "no recent
      // request found" state below instead of crashing the page.
    }
  }, []);

  if (!result) {
    return (
      <div className="mx-auto max-w-xl border border-[var(--line)] bg-white p-10 text-center shadow-lg">
        <p className="mb-6 text-[var(--muted)]">
          Nous n&apos;avons pas retrouvé de demande récente. Vous pouvez refaire une estimation.
        </p>
        <Link href="/estimation">
          <Button>Estimer mon véhicule</Button>
        </Link>
      </div>
    );
  }

  const { marque, modele, annee, kilometrage } = result.vehicule;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="border border-[var(--line)] bg-white shadow-xl">
        <div className="relative overflow-hidden bg-[var(--black)] px-8 py-10 text-center text-[var(--bone)]">
          <div
            className="pointer-events-none absolute -right-[10%] -top-[40%] h-[180%] w-[55%]"
            style={{ background: "radial-gradient(circle, rgba(255,74,28,0.2) 0%, transparent 58%)" }}
            aria-hidden="true"
          />
          <div className="relative">
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-[var(--accent)]" aria-hidden="true" />
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Votre demande est enregistrée.
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-[var(--bone)]/70">
              {MESSAGES[result.urgence]}
            </p>
          </div>
        </div>

        <div className="px-8 py-8">
          <p className="eyebrow mb-3">— Votre véhicule</p>
          <div className="mb-8 border-l-[3px] border-[var(--accent)] bg-[var(--paper)]/60 p-5">
            <p className="font-bold tracking-tight text-[var(--ink)]">
              {marque} {modele} {annee ? `(${annee})` : ""}
            </p>
            {kilometrage != null && (
              <p className="mt-0.5 text-sm text-[var(--muted)]">
                {kilometrage.toLocaleString("fr-FR")} km
              </p>
            )}
          </div>

          <p className="eyebrow mb-4">— La suite</p>
          <ol className="mb-8 flex flex-col">
            {NEXT_STEPS.map((s, i) => (
              <li
                key={s.title}
                className={`flex items-start gap-4 border-t border-[var(--line)] py-4 ${
                  i === NEXT_STEPS.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent)]">
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-bold tracking-tight text-[var(--ink)]">{s.title}</p>
                  <p className="text-sm text-[var(--muted)]">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={COMPANY.phoneHref} className="flex-1">
              <Button className="w-full">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Être rappelé maintenant
              </Button>
            </a>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Retour à l&apos;accueil
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 text-xs text-[var(--muted)]">
        <Clock className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
        Vous recevrez également un email de confirmation.
      </p>
    </div>
  );
}

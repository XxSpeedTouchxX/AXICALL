"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const CONSENT_KEY = "cookie-consent";

export type CookieConsent = "accepted" | "declined";

export function getStoredCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(CONSENT_KEY);
  return stored === "accepted" || stored === "declined" ? stored : null;
}

export function CookieBanner() {
  const [consent, setConsent] = useState<CookieConsent | null>("accepted");

  useEffect(() => {
    setConsent(getStoredCookieConsent());
  }, []);

  function choose(value: CookieConsent) {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  }

  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Consentement aux cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-gray-200)] bg-white px-4 py-4 shadow-[0_-2px_10px_rgba(0,0,0,0.08)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-[var(--color-gray-600)]">
          Ce site utilise le stockage de votre navigateur pour le fonctionnement du simulateur
          d&apos;estimation. Nous pourrons à l&apos;avenir utiliser des cookies de mesure d&apos;audience
          soumis à votre accord. En savoir plus dans notre{" "}
          <Link href="/politique-de-confidentialite" className="underline hover:text-[var(--color-navy)]">
            politique de confidentialité
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="outline" onClick={() => choose("declined")}>
            Refuser
          </Button>
          <Button onClick={() => choose("accepted")}>Accepter</Button>
        </div>
      </div>
    </div>
  );
}

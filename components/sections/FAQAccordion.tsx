"use client";

import { useState } from "react";

const FAQS = [
  { q: "L'estimation est-elle gratuite ?", a: "Oui, l'estimation est 100% gratuite et sans engagement." },
  { q: "Dois-je vendre mon véhicule ?", a: "Non, l'estimation ne vous engage à rien. Vous restez libre de vendre ou non." },
  { q: "Combien de temps faut-il pour avoir une réponse ?", a: "Un expert vous recontacte généralement sous 24h ouvrées." },
  { q: "Quels véhicules acceptez-vous ?", a: "Tous types de véhicules d'occasion, essence, diesel, hybride ou électrique." },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {FAQS.map((faq, i) => (
        <div key={faq.q} className="rounded-lg border border-[var(--color-gray-200)]">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            aria-controls={`faq-panel-${i}`}
            className="w-full px-5 py-4 text-left font-medium text-[var(--color-navy)]"
          >
            {faq.q}
          </button>
          {openIndex === i && (
            <p id={`faq-panel-${i}`} className="px-5 pb-4 text-[var(--color-gray-600)]">{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

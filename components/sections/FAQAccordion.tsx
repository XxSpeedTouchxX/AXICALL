"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const FAQS = [
  { q: "L'estimation est-elle gratuite ?", a: "Oui, l'estimation est 100% gratuite et sans engagement." },
  { q: "Dois-je vendre mon véhicule ?", a: "Non, l'estimation ne vous engage à rien. Vous restez libre de vendre ou non." },
  { q: "Combien de temps faut-il pour avoir une réponse ?", a: "Un expert vous recontacte généralement sous 24h ouvrées." },
  { q: "Quels véhicules acceptez-vous ?", a: "Tous types de véhicules d'occasion, essence, diesel, hybride ou électrique." },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto flex max-w-3xl flex-col">
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.q} className={`border-t border-[var(--color-gray-200)] ${i === FAQS.length - 1 ? "border-b" : ""}`}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              className="flex w-full items-center justify-between gap-4 py-5 text-left font-bold tracking-tight text-[var(--color-navy)]"
            >
              {faq.q}
              <Plus
                className={`h-5 w-5 shrink-0 text-[var(--color-orange)] transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-[var(--color-gray-600)]">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

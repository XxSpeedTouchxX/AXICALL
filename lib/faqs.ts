/**
 * FAQ content, kept in a plain module so both the client accordion and the
 * server-rendered FAQPage structured data can read it. Exporting it from the
 * "use client" component instead would hand the server a client reference,
 * not the array.
 */
export const FAQS = [
  {
    q: "L'estimation est-elle gratuite ?",
    a: "Oui, l'estimation est 100% gratuite et sans engagement.",
  },
  {
    q: "Dois-je vendre mon véhicule ?",
    a: "Non, l'estimation ne vous engage à rien. Vous restez libre de vendre ou non.",
  },
  {
    q: "Combien de temps faut-il pour avoir une réponse ?",
    a: "Un expert vous recontacte généralement sous 24h ouvrées.",
  },
  {
    q: "Quels véhicules acceptez-vous ?",
    a: "Tous types de véhicules d'occasion, essence, diesel, hybride ou électrique.",
  },
] as const;

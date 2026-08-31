import type { Metadata } from "next";
import Link from "next/link";
import { ArticlePage } from "@/components/content/ArticlePage";
import { Callout } from "@/components/content/Callout";

export const metadata: Metadata = {
  title: "Notre méthode d'estimation, expliquée simplement | MonEstimationAuto",
  description:
    "Ce que nous regardons pour estimer votre véhicule, ce que nous ne faisons pas, et pourquoi un rendez-vous reste nécessaire pour fixer un prix précis.",
  alternates: { canonical: "/notre-methode" },
};

/** Source: "AXICALL - Page méthode d'estimation v1" — page de réassurance. */
export default function NotreMethodePage() {
  return (
    <ArticlePage
      eyebrow="Transparence"
      title="Notre méthode d'estimation, expliquée simplement"
      subtitle="Une estimation n'a de valeur que si l'on comprend d'où elle vient."
    >
      <p>
        Voici, en toute transparence, comment votre estimation est établie — ce que nous prenons en
        compte, ce que nous ne prétendons pas faire, et pourquoi un échange avec un professionnel
        reste nécessaire pour aboutir à un prix précis.
      </p>

      <h2>Ce que nous regardons</h2>
      <ul>
        <li>La marque, le modèle et l&apos;année de votre véhicule.</li>
        <li>Le kilométrage, comparé à la moyenne attendue pour cet âge de véhicule.</li>
        <li>L&apos;état général que vous déclarez.</li>
        <li>La motorisation.</li>
        <li>Les tendances actuelles du marché de l&apos;occasion pour ce type de véhicule.</li>
      </ul>
      <p>
        Le détail de ces critères et de leur effet réel sur le prix est développé dans notre guide{" "}
        <Link href="/combien-vaut-ma-voiture">combien vaut ma voiture</Link>.
      </p>

      <h2>Ce que nous ne faisons pas</h2>
      <ul>
        <li>
          Nous n&apos;affichons jamais un prix ferme à ce stade : seule une estimation indicative
          est donnée.
        </li>
        <li>Nous ne prétendons pas remplacer une expertise physique du véhicule.</li>
        <li>Nous ne vous engageons à rien : l&apos;estimation est gratuite et sans contrepartie.</li>
      </ul>

      <h2>Pourquoi un rendez-vous ensuite</h2>
      <p>
        L&apos;estimation en ligne donne un ordre de grandeur fiable, mais seul un examen physique
        du véhicule (état réel, options, historique complet) permet de fixer un prix de vente
        précis. C&apos;est l&apos;objet du rendez-vous proposé avec l&apos;agence de votre secteur.
      </p>

      <Callout title="Notre engagement">
        Aucune information que vous nous confiez n&apos;est revendue à des tiers en dehors du cadre
        strict de votre demande. Voir notre{" "}
        <Link href="/politique-de-confidentialite">politique de confidentialité</Link> pour le
        détail.
      </Callout>
    </ArticlePage>
  );
}

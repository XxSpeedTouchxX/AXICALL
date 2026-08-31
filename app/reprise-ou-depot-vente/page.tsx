import type { Metadata } from "next";
import Link from "next/link";
import { ArticlePage } from "@/components/content/ArticlePage";
import { DataTable } from "@/components/content/DataTable";
import { Callout, KeyPoints } from "@/components/content/Callout";

export const metadata: Metadata = {
  title: "Reprise concession ou dépôt-vente : le vrai calcul | MonEstimationAuto",
  description:
    "Prix, délai, conditions et contrôle sur le prix : le comparatif complet entre la reprise en concession et le dépôt-vente en agence.",
  alternates: { canonical: "/reprise-ou-depot-vente" },
};

/** Source: "AXICALL - Page pilier P6 v1" — mot-clé cible « reprise ou dépôt vente ». */
export default function RepriseOuDepotVentePage() {
  return (
    <ArticlePage
      eyebrow="Comparatif"
      title="Reprise concession ou dépôt-vente : le vrai calcul"
      subtitle="Laquelle des deux correspond à ce que vous recherchez, chiffres à l'appui."
      ctaLabel="Comparer sur mon véhicule"
      ctaIntro="Avant de choisir entre reprise et dépôt-vente, obtenez une estimation gratuite de votre véhicule en 90 secondes : c'est la seule base qui permet de comparer objectivement les deux options."
    >
      <p>
        Quand vient le moment de changer de véhicule, la reprise en concession paraît la solution la
        plus simple : un seul rendez-vous, une seule signature, aucune gestion. Le dépôt-vente
        demande d&apos;attendre un peu plus. La question n&apos;est pas laquelle est la meilleure
        dans l&apos;absolu, mais laquelle correspond à ce que vous recherchez.
      </p>

      <h2>Le calcul que peu de gens font</h2>
      <p>
        La reprise en concession est presque toujours inférieure au prix de marché, parce
        qu&apos;elle est adossée à l&apos;achat d&apos;un véhicule neuf ou d&apos;occasion. Le
        concessionnaire intègre dans son offre de reprise sa propre marge de revente future. Ce
        n&apos;est pas une mauvaise pratique, c&apos;est simplement la mécanique du modèle.
      </p>
      <p>
        Le dépôt-vente, lui, vise le prix auquel votre véhicule se vendrait réellement à un acheteur
        final, moins une commission fixée à l&apos;avance. La différence entre les deux peut
        représenter plusieurs centaines, parfois plusieurs milliers d&apos;euros selon le véhicule.
      </p>

      <h2>Comparatif direct</h2>
      <DataTable
        caption="Reprise en concession comparée au dépôt-vente en agence"
        highlightColumn={2}
        headers={["Critère", "Reprise concession", "Dépôt-vente en agence"]}
        rows={[
          ["Prix obtenu", "En dessous du marché, intègre la marge du concessionnaire", "Proche du prix du marché, moins une commission connue à l'avance"],
          ["Délai", "Immédiat", "1 à 4 semaines en moyenne, variable selon le véhicule"],
          ["Condition", "Souvent liée à l'achat d'un véhicule chez le même professionnel", "Aucune condition d'achat"],
          ["Effort demandé", "Minimal", "Faible : un rendez-vous, puis l'agence gère le reste"],
          ["Contrôle sur le prix", "Offre à prendre ou à laisser", "Prix minimum fixé avec vous à la signature du mandat"],
        ]}
      />

      <h2>Quand la reprise a du sens</h2>
      <ul>
        <li>Vous achetez un véhicule neuf ou d&apos;occasion chez ce professionnel de toute façon.</li>
        <li>La simplicité immédiate compte plus que l&apos;écart de prix.</li>
        <li>Vous n&apos;avez pas de contrainte de délai particulière à respecter.</li>
      </ul>

      <h2>Quand le dépôt-vente a du sens</h2>
      <ul>
        <li>
          Vous ne changez pas de véhicule chez un professionnel en particulier, ou vous voulez
          dissocier les deux transactions.
        </li>
        <li>L&apos;écart de prix potentiel justifie d&apos;attendre quelques semaines.</li>
        <li>Vous voulez garder le contrôle sur le prix minimum de vente.</li>
      </ul>

      <h2>Un exemple concret, pour fixer les idées</h2>
      <p>
        Prenons un véhicule dont la reprise en concession serait proposée autour de 11 000 €. Le
        même véhicule, mis en dépôt-vente, viserait un prix de marché plus proche de 13 500 à
        14 500 €, moins une commission d&apos;agence. Même après commission, l&apos;écart net reste
        généralement favorable au dépôt-vente — mais seule une estimation réelle sur votre véhicule
        permet de le vérifier, les fourchettes variant fortement selon le modèle, l&apos;état et le
        marché local.
      </p>
      <Callout title="Ce chiffre est un exemple pédagogique">
        Il illustre un ordre de grandeur, pas une promesse. Chaque véhicule a sa propre fourchette :
        c&apos;est l&apos;objet de l&apos;estimation gratuite.
      </Callout>

      <h2>Le rachat cash, une troisième option à situer</h2>
      <p>
        Entre la reprise concession et le dépôt-vente existe une troisième voie : le rachat cash par
        une plateforme spécialisée. Le principe est proche de la reprise — un prix inférieur au
        marché contre une rapidité maximale (24 à 72 heures), sans obligation d&apos;achat.
        C&apos;est une option pertinente en cas d&apos;urgence réelle, mais elle ne remplace pas le
        dépôt-vente pour qui vise le meilleur prix net.{" "}
        <Link href="/vendre-sa-voiture">Voir les 5 solutions comparées</Link>.
      </p>

      <KeyPoints
        points={[
          "La reprise et le rachat cash sacrifient le prix pour la rapidité et la simplicité.",
          "Le dépôt-vente vise le prix du marché en échange d'un délai plus long, sans effort de votre part.",
          "Le bon choix dépend de votre situation, pas d'une règle universelle.",
          "La seule façon de comparer objectivement est de connaître la valeur réelle de votre véhicule.",
        ]}
      />
    </ArticlePage>
  );
}

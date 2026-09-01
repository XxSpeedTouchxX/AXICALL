import type { Metadata } from "next";
import Link from "next/link";
import { ArticlePage } from "@/components/content/ArticlePage";
import { DataTable } from "@/components/content/DataTable";
import { Callout, KeyPoints } from "@/components/content/Callout";

export const metadata: Metadata = {
  title: "Vendre sa voiture : les 5 solutions comparées en 2026 | Estimer Mon Auto",
  description:
    "Vente entre particuliers, reprise, rachat cash, mandataire ou dépôt-vente : comparatif du prix, du délai et de l'effort demandé pour chaque solution.",
  alternates: { canonical: "/vendre-sa-voiture" },
};

/** Source: "AXICALL - Page pilier P1 v1" — mot-clé cible « vendre sa voiture ». */
export default function VendreSaVoiturePage() {
  return (
    <ArticlePage
      eyebrow="Guide"
      title="Vendre sa voiture : les 5 solutions comparées"
      subtitle="Prix, délai et effort demandé — le comparatif complet pour choisir en connaissance de cause."
      ctaIntro="Avant de choisir, la première chose à savoir est ce que vaut réellement votre véhicule aujourd'hui. Une estimation gratuite et sans engagement prend 90 secondes et donne une base pour comparer objectivement chaque solution."
    >
      <p>
        Vendre sa voiture, ce n&apos;est jamais une seule décision. C&apos;est un choix entre cinq
        façons de faire, chacune avec son prix, son délai et son niveau d&apos;implication. Ce guide
        compare les cinq, sans en favoriser une par défaut, pour que vous choisissiez en
        connaissance de cause.
      </p>

      <h2>Les 5 façons de vendre une voiture</h2>
      <DataTable
        caption="Comparatif des cinq solutions de vente"
        headers={["Solution", "Prix obtenu", "Délai", "Effort demandé"]}
        rows={[
          ["Vente entre particuliers", "Le plus élevé, en théorie", "2 à 6 semaines", "Élevé : annonce, appels, visites, négociation"],
          ["Reprise en concession", "Le plus bas", "Immédiat, à l'achat d'un véhicule", "Faible, mais lié à un nouvel achat"],
          ["Rachat cash", "Bas à moyen", "24 à 72 h", "Faible"],
          ["Mandataire / vente accompagnée", "Moyen à élevé", "2 à 8 semaines", "Moyen"],
          ["Dépôt-vente en agence", "Proche du prix de marché", "1 à 4 semaines en moyenne", "Faible : vous déposez, l'agence s'occupe du reste"],
        ]}
      />

      <h2>1. La vente entre particuliers</h2>
      <p>
        C&apos;est la solution la plus répandue en France, et elle peut effectivement rapporter le
        prix le plus élevé sur le papier. En pratique, elle demande de rédiger une annonce, de
        répondre aux messages, de filtrer les curieux, d&apos;organiser des visites — parfois le soir
        ou le week-end — et de gérer la négociation jusqu&apos;au bout.
      </p>
      <p>
        Le vrai coût de cette solution n&apos;est pas dans le prix affiché, il est dans le temps
        passé et dans le risque : faux acheteurs, rendez-vous annulés, tentatives d&apos;arnaque au
        paiement. Beaucoup de vendeurs commencent par cette voie et l&apos;abandonnent après quelques
        semaines de frustration.
      </p>

      <h2>2. La reprise en concession</h2>
      <p>
        La solution la plus rapide, mais aussi la moins avantageuse financièrement. Le
        concessionnaire propose un prix qui intègre sa propre marge de revente, et cette offre est
        presque toujours conditionnée à l&apos;achat d&apos;un véhicule neuf ou d&apos;occasion chez
        lui.
      </p>
      <p>
        C&apos;est un bon choix si la simplicité prime sur tout, notamment lors du renouvellement
        d&apos;un véhicule. C&apos;est un mauvais calcul si l&apos;objectif est de maximiser ce que
        vous récupérez.
      </p>

      <h2>3. Le rachat cash</h2>
      <p>
        Des plateformes spécialisées proposent une offre ferme en 24 à 72 heures, sans négociation
        prolongée. C&apos;est rapide et sans risque de mauvaise surprise sur le paiement. Le prix
        proposé reste néanmoins structurellement inférieur au prix du marché : ces acteurs rachètent
        pour revendre, leur modèle économique repose sur cette différence.
      </p>
      <Callout title="Ce qu'il faut comprendre">
        Une offre de rachat cash n&apos;est pas un prix de marché, c&apos;est un prix de
        liquidation. La différence entre les deux, c&apos;est le temps que vous acceptez
        d&apos;attendre.
      </Callout>

      <h2>4. Le mandataire ou la vente accompagnée en ligne</h2>
      <p>
        Certaines plateformes proposent d&apos;accompagner la vente entre particuliers :
        vérification du véhicule, rédaction de l&apos;annonce, gestion des contacts, parfois
        transaction sécurisée. C&apos;est un bon compromis entre autonomie et délégation, à
        condition d&apos;accepter que tout se passe à distance, sans point de vente physique.
      </p>

      <h2>5. Le dépôt-vente en agence</h2>
      <p>
        Vous confiez votre véhicule à une agence locale, qui prend en charge la mise en vente :
        photos, annonce, visites, négociation, formalités administratives. Vous fixez avec
        l&apos;agence un prix minimum en dessous duquel elle ne peut pas vendre. Vous récupérez le
        montant convenu une fois la vente conclue.
      </p>
      <p>
        L&apos;avantage du dépôt-vente tient dans cet équilibre : il vise le prix du marché, comme
        une vente entre particuliers, mais délègue tout ce qui prend du temps et comporte un risque.
        C&apos;est la seule solution qui combine les deux.{" "}
        <Link href="/depot-vente">Voir en détail comment fonctionne le dépôt-vente</Link>.
      </p>

      <h2>Comment choisir</h2>
      <DataTable
        caption="Quelle solution selon votre priorité"
        headers={["Votre priorité", "Solution la plus adaptée"]}
        rows={[
          ["Le prix avant tout, et vous avez du temps", "Vente entre particuliers"],
          ["La rapidité absolue, quitte à perdre en prix", "Rachat cash"],
          ["Vous changez de véhicule chez le même professionnel", "Reprise en concession"],
          ["Le prix du marché, sans y consacrer votre temps", "Dépôt-vente en agence"],
        ]}
      />

      <KeyPoints
        points={[
          "Il n'existe pas de solution universellement meilleure : chacune répond à une priorité différente.",
          "Le rachat cash et la reprise concession sacrifient le prix pour la rapidité.",
          "La vente entre particuliers sacrifie le temps et la tranquillité pour le prix.",
          "Le dépôt-vente en agence est la seule option qui ne demande de sacrifier ni l'un ni l'autre.",
        ]}
      />
    </ArticlePage>
  );
}

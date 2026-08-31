import type { Metadata } from "next";
import Link from "next/link";
import { ArticlePage } from "@/components/content/ArticlePage";
import { DataTable } from "@/components/content/DataTable";
import { KeyPoints } from "@/components/content/Callout";

export const metadata: Metadata = {
  title: "Combien vaut ma voiture : les 9 critères qui font le prix | MonEstimationAuto",
  description:
    "Kilométrage, état, historique, motorisation, options, couleur, localisation : les 9 critères qui expliquent l'écart de prix entre deux véhicules identiques.",
  alternates: { canonical: "/combien-vaut-ma-voiture" },
};

/** Source: "AXICALL - Page pilier P2 v1" — mot-clé cible « combien vaut ma voiture ». */
export default function CombienVautMaVoiturePage() {
  return (
    <ArticlePage
      eyebrow="Guide"
      title="Combien vaut ma voiture : les 9 critères qui font le prix"
      subtitle="Pourquoi deux véhicules identiques peuvent se vendre à plusieurs milliers d'euros d'écart."
      ctaLabel="Estimer mon véhicule"
      ctaIntro="Plutôt que d'estimer à l'œil à partir d'une moyenne nationale, obtenez une estimation qui prend en compte les critères réels de votre véhicule, gratuitement et en 90 secondes."
    >
      <p>
        Deux voitures identiques, même modèle, même année, peuvent se vendre à plusieurs milliers
        d&apos;euros d&apos;écart. Ce n&apos;est jamais le hasard : neuf critères précis expliquent
        la quasi-totalité de la différence. Les connaître permet de comprendre pourquoi une
        estimation varie, et d&apos;éviter de se fier à une moyenne nationale qui ne dit rien de
        votre véhicule en particulier.
      </p>

      <h2>1. Le kilométrage</h2>
      <p>
        C&apos;est le critère le plus visible et le plus souvent surestimé dans son impact. Un
        kilométrage élevé pour l&apos;âge du véhicule fait baisser le prix, mais un kilométrage très
        bas peut aussi inquiéter un acheteur (véhicule peu roulé, batterie ou pièces qui ont vieilli
        sans être sollicitées). Ce qui compte vraiment, c&apos;est la cohérence entre l&apos;âge et
        le kilométrage.
      </p>

      <h2>2. L&apos;année et la génération du modèle</h2>
      <p>
        Deux véhicules du même nom mais de générations différentes n&apos;ont pas la même valeur :
        un restylage, un changement de motorisation ou une nouvelle génération peuvent créer un
        écart important, même à âge apparent égal.
      </p>

      <h2>3. L&apos;état général</h2>
      <p>
        Carrosserie, intérieur, pneumatiques, présence de rayures ou de chocs non réparés : ce
        critère se juge à l&apos;œil et pèse directement sur la marge de négociation qu&apos;un
        acheteur va tenter d&apos;obtenir.
      </p>

      <h2>4. L&apos;historique d&apos;entretien</h2>
      <p>
        Un carnet d&apos;entretien complet, avec factures, rassure et justifie un prix plus élevé. À
        l&apos;inverse, l&apos;absence d&apos;historique fait naturellement baisser la confiance de
        l&apos;acheteur, même si le véhicule est objectivement en bon état.
      </p>

      <h2>5. La motorisation</h2>
      <p>
        Certaines motorisations se revendent mieux que d&apos;autres selon les zones et les usages.
        Un diesel garde de la valeur en usage routier intensif, une motorisation électrique récente
        suit une cote encore instable et évolue plus vite que les autres.
      </p>

      <h2>6. Les options et la finition</h2>
      <p>
        GPS intégré, caméra de recul, sièges chauffants, toit ouvrant : certaines options augmentent
        réellement la valeur perçue, d&apos;autres n&apos;ont presque aucun effet sur le prix final.
        Les options qui comptent le plus sont celles liées à la sécurité et au confort de conduite
        quotidien.
      </p>

      <h2>7. La couleur</h2>
      <p>
        Un critère sous-estimé : les couleurs neutres (blanc, gris, noir) se revendent en général
        plus facilement et plus vite que les teintes vives, ce qui influence indirectement le prix
        via le délai de vente.
      </p>

      <h2>8. La localisation</h2>
      <p>
        La demande n&apos;est pas homogène sur tout le territoire. Un même véhicule peut se vendre
        plus vite et légèrement plus cher dans une zone où la demande pour ce type de modèle est
        plus forte.
      </p>

      <h2>9. La demande actuelle du marché</h2>
      <p>
        Le marché de l&apos;occasion bouge en continu : une motorisation en forte demande à un
        instant donné peut voir sa cote évoluer en quelques mois. C&apos;est pour cela qu&apos;une
        estimation datée de plusieurs mois n&apos;est plus fiable.
      </p>

      <h2>Cote officielle ou estimation de marché : quelle différence ?</h2>
      <p>
        Une cote officielle donne une valeur théorique moyenne, calculée sur de larges catégories.
        Une estimation de marché s&apos;appuie sur les annonces et transactions réelles et récentes
        pour un véhicule aux caractéristiques précises. La seconde est plus fine, parce qu&apos;elle
        intègre les neuf critères ci-dessus, pas seulement la marque, le modèle et l&apos;année.{" "}
        <Link href="/notre-methode">Voir notre méthode d&apos;estimation</Link>.
      </p>

      <h2>Ce que ces critères changent concrètement</h2>
      <DataTable
        caption="Effet de chaque critère sur le prix"
        headers={["Critère", "Effet sur le prix"]}
        rows={[
          ["Kilométrage cohérent avec l'âge", "Neutre à positif"],
          ["Historique d'entretien complet", "Positif"],
          ["État général soigné", "Positif"],
          ["Options sécurité et confort récentes", "Positif modéré"],
          ["Couleur vive ou atypique", "Léger effet négatif sur le délai de vente"],
          ["Motorisation en forte demande locale", "Positif"],
        ]}
      />

      <KeyPoints
        points={[
          "Le prix d'un véhicule ne se résume jamais à sa marque, son modèle et son année.",
          "Les neuf critères se combinent, ils ne s'additionnent pas simplement.",
          "Une estimation fiable doit être récente et fondée sur des données de marché actuelles.",
          "C'est cette combinaison précise qui explique pourquoi deux véhicules « identiques » n'ont jamais exactement la même valeur.",
        ]}
      />
    </ArticlePage>
  );
}

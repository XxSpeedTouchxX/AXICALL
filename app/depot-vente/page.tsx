import type { Metadata } from "next";
import Link from "next/link";
import { ArticlePage } from "@/components/content/ArticlePage";
import { Callout, KeyPoints } from "@/components/content/Callout";

export const metadata: Metadata = {
  title: "Le dépôt-vente automobile : comment ça marche vraiment | Estimer Mon Auto",
  description:
    "Étapes, commission, délai, responsabilité pendant la mise en vente : le fonctionnement réel du dépôt-vente automobile, expliqué sans promesse creuse.",
  alternates: { canonical: "/depot-vente" },
};

const FAQS = [
  {
    q: "Puis-je récupérer mon véhicule si je change d'avis ?",
    a: "Les conditions dépendent du mandat signé — c'est un point à clarifier avant signature, pas après.",
  },
  {
    q: "Que se passe-t-il si le véhicule ne se vend pas dans le délai prévu ?",
    a: "Selon les agences, le mandat est renouvelé, ajusté en prix, ou le véhicule est restitué. À faire préciser à l'avance.",
  },
  {
    q: "Le prix minimum est-il négociable après signature ?",
    a: "Non, sauf accord explicite de votre part : c'est justement l'objet du prix plancher que vous fixez ensemble.",
  },
];

/** Source: "AXICALL - Page pilier P3 v1" — mot-clé cible « dépôt vente voiture ». */
export default function DepotVentePage() {
  return (
    <ArticlePage
      eyebrow="Guide"
      title="Le dépôt-vente automobile : comment ça marche vraiment"
      subtitle="Le déroulement concret, ce que vous gardez sous contrôle, et ce qui change par rapport à une vente entre particuliers."
      ctaIntro="La première étape avant tout mandat est de connaître la valeur estimée de votre véhicule. Une estimation gratuite en 90 secondes vous donne une base concrète pour échanger avec une agence de votre secteur."
    >
      <p>
        Le dépôt-vente automobile fonctionne sur un principe simple, emprunté à l&apos;immobilier :
        vous confiez votre véhicule à une agence spécialisée, qui se charge de tout jusqu&apos;à la
        vente.
      </p>

      <Callout title="Le principe en une phrase">
        Vous fixez un prix minimum avec l&apos;agence, elle s&apos;occupe de tout le reste, et vous
        recevez le montant convenu une fois la vente conclue.
      </Callout>

      <h2>Les étapes concrètes</h2>
      <ol>
        <li>
          Estimation du véhicule, souvent en ligne dans un premier temps, puis affinée lors
          d&apos;un rendez-vous en agence.
        </li>
        <li>
          Rendez-vous physique : l&apos;agence examine le véhicule, vérifie les papiers, prend des
          photos.
        </li>
        <li>
          Fixation du prix de vente et du prix minimum en dessous duquel l&apos;agence ne peut pas
          vendre sans votre accord.
        </li>
        <li>
          Signature d&apos;un mandat de vente, qui précise la durée, la commission et les
          conditions.
        </li>
        <li>Mise en vente : annonce, vitrine physique le cas échéant, visites gérées par l&apos;agence.</li>
        <li>Négociation avec les acheteurs, prise en charge intégralement par l&apos;agence.</li>
        <li>
          Vente conclue : formalités administratives gérées par l&apos;agence, versement du montant
          convenu.
        </li>
      </ol>

      <h2>Qui reste responsable pendant la mise en vente ?</h2>
      <p>
        C&apos;est la question la plus posée, et elle mérite une réponse précise plutôt qu&apos;une
        formule rassurante toute faite. Le cadre exact dépend du mandat signé avec chaque agence :
        certaines conservent le véhicule sur leur parc, d&apos;autres travaillent différemment.
      </p>
      <Callout title="Ce qu'il faut vérifier avant de signer">
        Demandez explicitement : la localisation du véhicule, l&apos;assurance pendant les essais,
        la fréquence des points d&apos;étape, et les conditions de récupération du véhicule si vous
        changez d&apos;avis.
      </Callout>

      <h2>Combien ça coûte ?</h2>
      <p>
        La commission varie selon les agences et la valeur du véhicule. Elle est prélevée uniquement
        en cas de vente : si le véhicule ne se vend pas, vous ne payez rien dans la grande majorité
        des modèles du marché. C&apos;est un point à vérifier explicitement dans le mandat, car les
        pratiques diffèrent d&apos;une enseigne à l&apos;autre.
      </p>
      <p>
        La bonne façon de juger le coût n&apos;est pas de le comparer à zéro, mais à ce qu&apos;il
        remplace : le temps passé à gérer une vente entre particuliers, le risque de négociation
        ratée, et l&apos;incertitude sur la fiabilité de l&apos;acheteur.
      </p>

      <h2>Combien de temps pour vendre ?</h2>
      <p>
        Le délai dépend du véhicule, de son prix, et du dynamisme du marché local au moment de la
        mise en vente. Il n&apos;existe pas de délai garanti universel, et toute promesse de délai
        fixe doit être regardée avec prudence. La bonne question à poser à l&apos;agence est : « Sur
        quel type de véhicule et sur quelle période portent vos délais moyens ? »
      </p>

      <h2>Dépôt-vente ou reprise / rachat cash : la vraie différence</h2>
      <p>
        La reprise en concession et le rachat cash offrent tous les deux un prix inférieur au
        marché, en échange de la rapidité. Le dépôt-vente vise le prix du marché, en échange
        d&apos;un délai plus long. Ce n&apos;est pas une question de qualité de service, c&apos;est
        une conséquence directe du modèle économique de chaque solution : un acheteur qui revend
        prend une marge, une agence en dépôt-vente prend une commission sur un prix que vous
        validez.{" "}
        <Link href="/reprise-ou-depot-vente">Voir le comparatif chiffré reprise / dépôt-vente</Link>.
      </p>

      <h2>Les questions les plus fréquentes</h2>
      {FAQS.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}

      <KeyPoints
        points={[
          "Le dépôt-vente délègue la totalité du processus, du contact acheteur jusqu'aux formalités.",
          "Vous gardez le contrôle du prix minimum, jamais imposé sans votre accord.",
          "La commission n'est due qu'en cas de vente, dans la grande majorité des mandats du marché.",
          "C'est la seule solution qui vise le prix du marché sans demander votre temps.",
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </ArticlePage>
  );
}

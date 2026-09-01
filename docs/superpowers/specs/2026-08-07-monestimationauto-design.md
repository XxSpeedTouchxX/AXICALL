# Estimer Mon Auto — Site de génération de leads pour Axicall

Date: 2026-08-07
Statut: Validé par l'utilisateur, prêt pour planification d'implémentation

## Contexte et objectif

Axicall est une agence dans l'automobile (estimation, rachat, mise en relation autour des véhicules d'occasion). Le site public s'appelle **Estimer Mon Auto**. L'objectif unique du site est de transformer des visiteurs en **leads qualifiés** : un visiteur estime son véhicule via un simulateur multi-étapes, laisse ses coordonnées, et devient un lead scoré (chaud/tiède/froid) prêt à être rappelé par un commercial ou revendu à un professionnel.

Ce n'est pas un site vitrine classique : chaque page est pensée comme une étape d'un tunnel de conversion.

## Stack technique

- Next.js 16+ (App Router), TypeScript, Tailwind CSS, React
- Déploiement : GitHub → Vercel, sans configuration serveur additionnelle
- Pas de WordPress, pas de PHP

## Identité visuelle

- Nom du site : **Estimer Mon Auto** (Axicall = raison sociale, mentionnée en footer/mentions légales)
- Couleurs : bleu nuit (fond header/sections fortes, CTA secondaires), blanc (fonds clairs, texte), gris (neutres/bordures), **orange** (accent — CTA principal "Estimer mon véhicule")
- Style : automobile premium, sobre, inspirant confiance. Pas d'animations excessives, pas de blocs génériques.
- Coordonnées de contact (téléphone, email, horaires, adresse) : **placeholders explicites** à remplacer par l'utilisateur avant mise en production (ex: `01 23 45 67 89`, `contact@monestimationauto.fr`).

## Arborescence du projet

```
app/
  page.tsx                    Accueil
  estimation/page.tsx         Simulateur multi-étapes (4 étapes)
  estimation/merci/page.tsx   Page résultat après soumission
  comment-ca-marche/page.tsx
  avis-clients/page.tsx
  faq/page.tsx
  contact/page.tsx
  api/leads/route.ts          POST — valide, score et enregistre un lead
  sitemap.ts
  robots.ts
  layout.tsx
  globals.css
components/
  layout/     Header, Footer, CallBar (barre d'appel mobile), ExitIntentPopup
  home/       Hero, TrustBadges, CTASection
  estimator/  StepForm, Step1Vehicle, Step2Condition, Step3Situation, Step4Contact, ProgressBar
  sections/   Testimonials, FAQAccordion, HowItWorks
  ui/         Button, Input, Select, RadioCard (primitives réutilisées partout)
lib/
  scoring.ts     calcul du score chaud/tiède/froid (fonction pure)
  leads.ts       couche d'abstraction stockage (saveLead) — aujourd'hui fichier JSON local, demain Supabase
  validation.ts  schémas Zod par étape + schéma complet
types/
  vehicle.ts, lead.ts
data/
  leads.json     stockage local de dev (gitignored en prod réelle, mais présent pour la démo)
```

## Simulateur d'estimation (cœur du produit)

### Étape 1 — Informations véhicule
Marque, modèle, année, version/finition, kilométrage, carburant (Essence/Diesel/Hybride/Électrique), boîte (Manuelle/Automatique), puissance fiscale, nombre de portes.

### Étape 2 — État du véhicule
État général (Excellent/Très bon/Correct/À prévoir), accident (Oui/Non), contrôle technique (Valide/Expiré/Non effectué), nombre de propriétaires, carnet d'entretien disponible (Oui/Non).

### Étape 3 — Situation du vendeur
Motif de vente (Acheter un nouveau véhicule / Besoin d'argent / Changement de véhicule / Succession / Autre), date souhaitée de vente (Urgent / Sous 1 mois / Plus tard).

### Étape 4 — Coordonnées
Nom, prénom, téléphone, email, ville, code postal, case de consentement obligatoire ("J'accepte d'être contacté concernant mon estimation.").

### Comportement
- État géré par un hook `useEstimationForm` (React state + sessionStorage pour survivre à un refresh accidentel ; effacé après soumission réussie).
- Validation par étape avec Zod (`lib/validation.ts`) avant de permettre "Suivant".
- Barre de progression visible (`ProgressBar`).
- Design premium : `RadioCard` pour les choix (état, carburant, boîte...) plutôt que des `<select>` bruts quand ça améliore l'UX.

## Flux de soumission et scoring

1. À l'étape 4, POST vers `app/api/leads/route.ts` avec l'objet complet.
2. L'API revalide tout avec Zod côté serveur (jamais confiance au client seul).
3. Calcul du score via `scoreLead()` (`lib/scoring.ts`) — fonction pure et testable, système de points :
   - +30 points si date de vente "Urgent"
   - +15 points si date de vente "Sous 1 mois"
   - +20 points si véhicule récent (année ≥ année courante − 8) ET kilométrage < 120 000 km (10 points si un seul des deux critères)
   - +15 points si téléphone valide (format FR : `0[1-9]\d{8}` après nettoyage des espaces)
   - +15 points si état général "Excellent" ou "Très bon" ET contrôle technique "Valide"
   - +5 points si aucun accident déclaré
   - Total sur 100 points. Seuils : `chaud` ≥ 60, `tiede` 30–59, `froid` < 30.
4. Génération de l'`id` du lead via `crypto.randomUUID()`.
5. Persistance via `lib/leads.ts::saveLead()` — implémentation actuelle : append dans `data/leads.json`. Cette fonction est le seul point de contact avec le stockage, pour permettre un remplacement par Supabase sans toucher au reste du code.
6. Réponse de l'API : `{ id, score, urgence }` (le score numérique et l'urgence `chaud/tiede/froid`).
7. Avant l'appel API, le client a déjà les données complètes du formulaire (véhicule + situation) dans l'état de `useEstimationForm` / sessionStorage. Après une réponse API réussie, le client stocke `{ id, score, urgence, vehicule: {...} }` dans sessionStorage sous une clé dédiée (ex: `estimation-result`), puis redirige vers `/estimation/merci`. La page de résultat lit cette clé sessionStorage pour afficher le résumé du véhicule et le message personnalisé — pas de round-trip serveur supplémentaire, pas de `GET /api/leads/[id]` nécessaire pour cette version. Si la clé est absente (accès direct à l'URL), la page affiche un message générique invitant à refaire une estimation.
8. La page affiche : confirmation, résumé du véhicule, message personnalisé selon le score, CTA "Être rappelé maintenant".

### Modèle de lead (`types/lead.ts`)
Type discriminé par un champ `type` :
- `EstimationLead` (`type: 'estimation'`) : date de création, infos véhicule (marque, modèle, année, kilométrage, carburant), infos prospect (nom, téléphone, email, ville), qualification (score, urgence, statut).
- `ContactLead` (`type: 'contact'`) : date de création, infos prospect (nom, email, téléphone, message), sans infos véhicule ni score/urgence (statut uniquement, initialisé à `Nouveau`).

Statuts (les deux types) : `Nouveau | À rappeler | Contacté | Rendez-vous pris | Vendu | Perdu` (créé à `Nouveau` ; pas d'UI back-office dans cette version, mais la donnée est structurée pour en brancher une plus tard).

Le formulaire de contact (page Contact) réutilise `saveLead()` avec un `ContactLead`.

## Pages marketing

- **Accueil** : Header (logo, nav, CTA orange "Estimer mon véhicule gratuitement") → Hero (titre/sous-titre/2 CTA/image) → 4 blocs de confiance (estimation gratuite, réponse rapide, accompagnement personnalisé, réseau de professionnels) → aperçu "Comment ça marche" → extrait témoignages → CTA final.
- **Comment ça marche** : 4 étapes expliquées (remplir l'estimation, recevoir une analyse, un expert rappelle, finaliser la vente).
- **Avis clients** : témoignages réalistes (fictifs, clairement écrits comme des exemples).
- **FAQ** : accordéon (gratuité, obligation de vendre, délai de réponse, véhicules acceptés).
- **Contact** : formulaire, téléphone, email, horaires (placeholders).

## Éléments de conversion transverses

- `CallBar` : barre d'appel fixe en bas d'écran sur mobile uniquement (lien `tel:` placeholder).
- `ExitIntentPopup` : déclenché sur intention de sortie desktop (mouse leave viewport top) ou après 30s sans interaction sur mobile (le timer est réinitialisé par tout `touchstart`, `scroll` ou `click` ; il se déclenche si aucun de ces événements ne survient pendant 30s) ; dismiss persisté en sessionStorage pour ne pas re-spammer un même visiteur.
- CTA présent après chaque section significative des pages marketing.

## SEO

- `generateMetadata` par page (title/description ciblés : estimation voiture, estimation véhicule, rachat voiture, vendre voiture rapidement, reprise automobile).
- Open Graph avec image par défaut.
- `app/sitemap.ts` et `app/robots.ts` générés dynamiquement.
- JSON-LD `LocalBusiness`/`Organization` sur Accueil et Contact.

## Hors périmètre (explicitement exclu de cette version)

- Pas d'interface back-office/admin pour gérer les leads (la donnée est prête, l'UI ne l'est pas).
- Pas de connexion Supabase/CRM réelle — uniquement la couche d'abstraction `lib/leads.ts` prête à être branchée.
- Pas d'authentification.
- Pas de paiement.

## Déploiement et README

Le README couvrira : installation locale, déploiement Vercel (push GitHub → import → build auto), configuration d'un domaine personnalisé, variables d'environnement (`.env.example` avec emplacements réservés pour les futures clés Supabase/Resend), et une section expliquant comment brancher Supabase plus tard (remplacer l'implémentation de `saveLead()`).

# MonEstimationAuto

Site de génération de leads pour Axicall : estimation, rachat et mise en relation autour des véhicules d'occasion. Le cœur du site est un simulateur d'estimation en 4 étapes qui transforme les visiteurs en leads qualifiés et scorés (chaud / tiède / froid).

Stack : Next.js 16 (App Router), TypeScript, Tailwind CSS, React, Zod, Vitest.

## Installation locale

```bash
npm install
npm run dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000).

## Tests

```bash
npm test
```

Lance la suite Vitest (unitaire + composants). `npm run build` vérifie en plus le typage TypeScript et la compilation de production.

## Déploiement sur Vercel

1. Poussez le dépôt sur GitHub.
2. Sur [vercel.com](https://vercel.com), importez le dépôt — Next.js est détecté automatiquement, aucune configuration de build n'est nécessaire.
3. Déployez.

### Domaine personnalisé

Dans les paramètres du projet Vercel → **Domains**, ajoutez votre nom de domaine et suivez les instructions DNS fournies par Vercel.

## Variables d'environnement

Voir [`.env.example`](.env.example). Aucune variable n'est requise pour faire fonctionner le site tel quel (le stockage des leads se fait dans un fichier JSON local). Les variables présentes sont réservées aux intégrations futures décrites ci-dessous.

## Notifications email

Chaque nouveau lead (estimation ou contact) déclenche un email à l'agence (`COMPANY.email` dans [`lib/company.ts`](lib/company.ts)), et une confirmation est envoyée au prospect après une estimation. L'intégration ([`lib/email.ts`](lib/email.ts)) utilise l'API [Resend](https://resend.com) directement en HTTP — pas de dépendance npm ajoutée.

**Sans `RESEND_API_KEY` configurée, les emails ne partent pas** : ils sont simplement logués dans la console du serveur, pour que le site fonctionne en local/CI sans compte Resend. Pour activer l'envoi réel :

1. Créez un compte [Resend](https://resend.com) et récupérez une clé API.
2. Ajoutez `RESEND_API_KEY=re_...` dans `.env.local` (et dans les variables d'environnement Vercel une fois déployé).
3. Vérifiez votre domaine d'envoi dans Resend et mettez à jour `FROM_ADDRESS` dans `lib/email.ts` (actuellement `onboarding@resend.dev`, l'adresse de test par défaut de Resend, limitée en volume et non personnalisée).

## Brancher Supabase plus tard

Toute la persistance des leads passe par une seule fonction : `saveLead()` (et `getAllLeads()`) dans [`lib/leads.ts`](lib/leads.ts). Aucun autre fichier ne connaît le détail du stockage. Pour brancher Supabase :

1. Créez un projet Supabase et une table `leads`.
2. Ajoutez `NEXT_PUBLIC_SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` dans `.env.local` (voir `.env.example`).
3. Remplacez le corps de `saveLead()`/`getAllLeads()` dans `lib/leads.ts` par des appels au client Supabase — aucun appelant (l'API route, les formulaires) n'a besoin d'être modifié.

## Brancher un CRM

Même principe : le point d'entrée unique est `lib/leads.ts`. Un webhook vers un CRM (HubSpot, Pipedrive, etc.) ou vers Make/Zapier peut être ajouté dans `saveLead()` après la persistance, ou en remplacement de celle-ci.

## Checklist avant mise en production

- [x] Coordonnées réelles (téléphone, email, horaires, SIRET) dans [`lib/company.ts`](lib/company.ts), utilisées par Footer/CallBar/Contact/mentions légales.
- [x] Vidéo hero réelle dans [`components/home/Hero.tsx`](components/home/Hero.tsx) (`public/hero-video.mp4`), remplaçant l'ancien placeholder image.
- [x] Pages légales (mentions légales, politique de confidentialité, CGU) créées avec les vraies informations de l'entreprise.
- [x] Bandeau de consentement cookies ([`components/layout/CookieBanner.tsx`](components/layout/CookieBanner.tsx)).
- [x] Case de consentement conforme (texte nominatif, durée 12 mois, droit de retrait — voir `CONSENT_TEXT` dans `lib/company.ts`), preuve stockée avec chaque lead.
- [x] Notifications email agence + confirmation prospect (voir section ci-dessus) — **nécessite d'ajouter `RESEND_API_KEY` pour partir réellement**.
- [ ] Témoignages dans [`components/sections/Testimonials.tsx`](components/sections/Testimonials.tsx) : actuellement marqués "exemples illustratifs" avec une mention explicite sur le site. À remplacer par de vrais avis clients quand disponibles, ou garder la mention si les exemples restent fictifs (la loi française encadre les avis présentés comme authentiques).
- [ ] Mettre à jour `BASE_URL` dans [`app/sitemap.ts`](app/sitemap.ts), [`app/robots.ts`](app/robots.ts) et `metadataBase` dans [`app/layout.tsx`](app/layout.tsx) avec le nom de domaine réel une fois acheté (actuellement `monestimationauto.fr` en placeholder).
- [ ] Vérifier un domaine d'envoi Resend et mettre à jour `FROM_ADDRESS` dans `lib/email.ts` (actuellement l'adresse de test Resend).
- [ ] Brancher Supabase et/ou un CRM si un stockage au-delà du fichier JSON local est nécessaire (voir sections ci-dessus).

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

## Brancher Supabase plus tard

Toute la persistance des leads passe par une seule fonction : `saveLead()` (et `getAllLeads()`) dans [`lib/leads.ts`](lib/leads.ts). Aucun autre fichier ne connaît le détail du stockage. Pour brancher Supabase :

1. Créez un projet Supabase et une table `leads`.
2. Ajoutez `NEXT_PUBLIC_SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` dans `.env.local` (voir `.env.example`).
3. Remplacez le corps de `saveLead()`/`getAllLeads()` dans `lib/leads.ts` par des appels au client Supabase — aucun appelant (l'API route, les formulaires) n'a besoin d'être modifié.

## Brancher un CRM

Même principe : le point d'entrée unique est `lib/leads.ts`. Un webhook vers un CRM (HubSpot, Pipedrive, etc.) ou vers Make/Zapier peut être ajouté dans `saveLead()` après la persistance, ou en remplacement de celle-ci.

## Checklist avant mise en production

- [ ] Remplacer le numéro de téléphone, l'email et les horaires placeholders dans [`components/layout/Footer.tsx`](components/layout/Footer.tsx), [`components/layout/CallBar.tsx`](components/layout/CallBar.tsx) et [`app/contact/page.tsx`](app/contact/page.tsx).
- [ ] Remplacer l'image placeholder [`public/hero-car.jpg`](public/hero-car.jpg) par une photo automobile réelle et sous licence (ratio 16:9 recommandé, pour correspondre au conteneur `aspect-video` du hero).
- [ ] Mettre à jour `BASE_URL` dans [`app/sitemap.ts`](app/sitemap.ts), [`app/robots.ts`](app/robots.ts) et `metadataBase` dans [`app/layout.tsx`](app/layout.tsx) avec le nom de domaine réel une fois connu.
- [ ] Remplacer les témoignages fictifs dans [`components/sections/Testimonials.tsx`](components/sections/Testimonials.tsx) par de vrais avis clients (ou les marquer clairement comme illustratifs).
- [ ] Brancher Supabase et/ou un CRM si un stockage au-delà du fichier JSON local est nécessaire (voir sections ci-dessus).

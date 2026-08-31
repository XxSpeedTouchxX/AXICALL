import type { MetadataRoute } from "next";

const BASE_URL = "https://www.monestimationauto.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  // Indexable pages only. The legal pages and /estimation/merci are marked
  // noindex (see "AXICALL - Arborescence du site v1"), so listing them here
  // would send search engines contradictory signals. The paid-traffic landing
  // page is intentionally excluded too.
  // Priority reflects the acquisition funnel: the simulator first, then the
  // pillar pages that feed it, then the supporting pages.
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/estimation", priority: 1 },
    { path: "/vendre-sa-voiture", priority: 0.9 },
    { path: "/combien-vaut-ma-voiture", priority: 0.9 },
    { path: "/depot-vente", priority: 0.9 },
    { path: "/reprise-ou-depot-vente", priority: 0.9 },
    { path: "/notre-methode", priority: 0.7 },
    { path: "/comment-ca-marche", priority: 0.6 },
    { path: "/avis-clients", priority: 0.6 },
    { path: "/faq", priority: 0.6 },
    { path: "/contact", priority: 0.5 },
  ];
  return routes.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    priority,
  }));
}

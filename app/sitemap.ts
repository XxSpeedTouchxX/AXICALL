import type { MetadataRoute } from "next";

const BASE_URL = "https://www.monestimationauto.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  // Indexable pages only. The legal pages and /estimation/merci are marked
  // noindex (see "AXICALL - Arborescence du site v1"), so listing them here
  // would send search engines contradictory signals. The paid-traffic landing
  // page is intentionally excluded too.
  const routes = [
    "",
    "/estimation",
    "/comment-ca-marche",
    "/avis-clients",
    "/faq",
    "/contact",
  ];
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}

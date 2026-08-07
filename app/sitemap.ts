import type { MetadataRoute } from "next";

const BASE_URL = "https://www.monestimationauto.fr";

export default function sitemap(): MetadataRoute.Sitemap {
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

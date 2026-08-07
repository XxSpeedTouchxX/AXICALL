import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/estimation/merci" },
    sitemap: "https://www.monestimationauto.fr/sitemap.xml",
  };
}

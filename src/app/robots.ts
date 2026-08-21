import type { MetadataRoute } from "next";

const RACINE = (
  process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://sar.quebec"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // La vérification d'une carte de membre se fait par jeton : ces adresses
      // n'ont aucune valeur en recherche et ne doivent pas être indexées.
      disallow: ["/api/", "/*/verification/"],
    },
    sitemap: `${RACINE}/sitemap.xml`,
  };
}

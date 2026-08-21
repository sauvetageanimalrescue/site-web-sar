import type { MetadataRoute } from "next";
import { adressePublique, estSiteDefinitif } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Tant que le site vit sur une adresse temporaire, on interdit toute
  // indexation. Deux versions du même contenu indexées en parallèle se
  // cannibalisent dans les résultats de recherche, et c'est la plus ancienne
  // qui gagne. L'ouverture se fait en changeant NEXT_PUBLIC_SITE_URL.
  if (!estSiteDefinitif()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // La vérification d'une carte de membre se fait par jeton : ces adresses
      // n'ont aucune valeur en recherche et ne doivent pas être indexées.
      disallow: ["/api/", "/*/verification/"],
    },
    sitemap: `${adressePublique()}/sitemap.xml`,
  };
}

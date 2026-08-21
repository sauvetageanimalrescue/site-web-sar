import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { PAGES_FR } from "@/contenu/pages/fr";
import { FICHES } from "@/contenu/fiches";
import { POSTES } from "@/contenu/postes";

// Adresse publique du site. Sans variable d'environnement, on retombe sur le
// domaine définitif plutôt que sur localhost, qui produirait un sitemap
// inutilisable une fois déployé.
const RACINE = (
  process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://sar.quebec"
).replace(/\/$/, "");

// Routes dédiées, écrites à la main : les dossiers de l'application ne sont
// pas lisibles au moment de la génération. La page de vérification d'une carte
// de membre est volontairement absente, elle n'a rien à faire dans un index.
const ROUTES = [
  "",
  "signalement",
  "membre",
  "dons",
  "stages",
  "recrutement",
  "equipe",
  "statistiques",
  "informations",
  "distinctions",
  "in-memoriam",
  "serie-televisee",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const chemins = [
    ...ROUTES,
    ...Object.keys(PAGES_FR),
    ...FICHES.map((f) => `informations/${f.slug}`),
    ...POSTES.map((p) => `equipe/${p.cle}`),
  ];

  return routing.locales.flatMap((langue) =>
    chemins.map((chemin) => ({
      url: `${RACINE}/${langue}${chemin ? `/${chemin}` : ""}`,
      lastModified: new Date(),
      // La page d'accueil prime, puis les pages éditoriales, puis les fiches.
      priority: chemin === "" ? 1 : chemin.includes("/") ? 0.5 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((autre) => [
            autre,
            `${RACINE}/${autre}${chemin ? `/${chemin}` : ""}`,
          ]),
        ),
      },
    })),
  );
}

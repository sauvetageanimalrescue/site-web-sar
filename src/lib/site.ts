// Adresse publique du site, unique source de vérité pour le sitemap, le
// fichier robots et les métadonnées.
const DEFINITIF = "https://sar.quebec";

export function adressePublique() {
  const brut = process.env.NEXT_PUBLIC_SITE_URL;
  return (brut?.startsWith("https://") ? brut : DEFINITIF).replace(/\/$/, "");
}

// Vrai seulement sur le domaine définitif. Ailleurs, le site se comporte comme
// une préproduction : aucune indexation, aucun risque de contenu dupliqué.
export function estSiteDefinitif() {
  const a = adressePublique();
  return a === DEFINITIF || a === "https://www.sar.quebec";
}

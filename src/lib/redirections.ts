// Correspondance entre les adresses de l'ancien site Shopify et les pages du
// nouveau site. Sans elle, chaque lien indexé par Google depuis des années,
// chaque publication Facebook et chaque carte d'affaires mènerait à une page
// introuvable le jour de la bascule.
//
// La clé est l'ancien chemin, la valeur le nouveau. Les variantes /en/ et
// /es/ sont générées automatiquement dans next.config.ts.
export const REDIRECTIONS: Record<string, string> = {
  // Pages de l'organisation
  "/pages/mission": "/mission",
  "/pages/dg": "/direction",
  "/pages/territoire": "/territoire",
  "/pages/registre": "/statistiques",
  "/pages/dans-les-medias": "/medias",
  "/pages/politique-de-confidentialite": "/confidentialite",

  // Contribuer
  "/pages/contribuez": "/membre",
  "/pages/carte2026": "/membre",
  "/pages/campagne": "/dons",
  "/pages/patreon": "/patreon",
  "/pages/certificats": "/partenariat",
  "/pages/partenaires": "/partenaires",
  "/pages/stages-dobservation": "/stages",

  // Recrutement et fonctions. « Patrouilleur » est devenu « Secouriste » ;
  // « Éclaireur » est un grade et non un poste, il retourne au recrutement.
  "/pages/recrutement": "/recrutement",
  "/pages/egs": "/equipe/repartiteur",
  "/pages/messager": "/equipe/messager",
  "/pages/patrouilleur": "/equipe/secouriste",
  "/pages/sauveteur": "/equipe/sauveteur",
  "/pages/eclaireur": "/recrutement",

  // Formations et ateliers
  "/pages/formations": "/formations",
  "/pages/isa": "/formations/initiation-secours-animal",
  "/pages/psa": "/formations/premiers-secours-animal",
  "/pages/psa-en-ligne": "/formations/premiers-secours-animal",
  "/pages/formations-services-urgence": "/formations/services-urgence",
  "/pages/ecoles-primaires": "/ateliers/primaire",

  // Services
  "/pages/signalement": "/signalement",
  "/pages/municipalites": "/services/municipalites",

  // Événements retirés du site : ils renvoient vers les dons, qui est
  // l'intention derrière ces campagnes.
  "/pages/descendez-don": "/dons",
  "/pages/marche-canine": "/dons",

  // Produits
  "/products/carte-de-membre-2026": "/membre",
  "/products/certificat-de-partenaire": "/partenariat",

  // Les stages d'observation, un par un : un motif « commence par » n'est pas
  // accepté, et ces produits datés ne seront jamais renouvelés.
  "/products/stage2601": "/stages",
  "/products/stage2602": "/stages",
  "/products/stage2603": "/stages",
  "/products/stage2604": "/stages",
  "/products/stage2605": "/stages",
  "/products/stage2606": "/stages",
  "/products/stage2607": "/stages",
  "/products/stage2608": "/stages",
  "/products/stage-observation-2611-vendredi-17-avril-2026": "/stages",
  "/products/stage-observation-2612-vendredi-1-mai-2026": "/stages",
  "/products/stage-observation-2613-vendredi-15-mai-2026": "/stages",
  "/products/stage-observation-2614-vendredi-29-mai-2026": "/stages",
  "/products/stage-observation-2615-vendredi-12-juin-2026": "/stages",
  "/products/stage-observation-2616-vendredi-26-juin-2026": "/stages",
  "/products/stage-observation-2617-vendredi-24-juillet-2026": "/stages",
  "/products/stage-observation-2618-vendredi-7-aout-2026": "/stages",
  "/products/stage-observation-9999-jeudi-16-avril-2026": "/stages",

  // Collections
  "/collections/formations": "/formations",
  "/collections/membership": "/membre",
  "/collections/stages": "/stages",
  "/collections/certificats-de-don": "/dons",
  "/collections/descendez-don": "/dons",
  "/collections/marche-canine": "/dons",
  "/collections/programme-de-sterilisation": "/dons",
  "/collections/gardien-de-la-faune": "/membre",

  // Les fiches de fonction ont quitté L'équipe pour le recrutement.
  "/equipe/repartiteur": "/recrutement/repartiteur",
  "/equipe/messager": "/recrutement/messager",
  "/equipe/secouriste": "/recrutement/secouriste",
  "/equipe/sauveteur": "/recrutement/sauveteur",

  // Blogues
  "/blogs/news": "/medias",
  "/blogs/conseils": "/informations",
};

// Familles d'adresses traitées par motif plutôt qu'une par une : les stages
// portent tous un numéro différent, les articles de blogue un titre, et la
// boutique de vêtements n'a pas d'équivalent sur le nouveau site.
export const MOTIFS: { source: string; destination: string }[] = [
  { source: "/blogs/news/:article", destination: "/medias" },
  { source: "/blogs/conseils/:article", destination: "/informations" },
  // Tout le reste de l'ancienne boutique : aucune page équivalente.
  { source: "/collections/:handle", destination: "/" },
  { source: "/products/:handle", destination: "/" },
  { source: "/pages/:handle", destination: "/" },
  // Adresses techniques de Shopify.
  { source: "/cart", destination: "/" },
  { source: "/account/:reste*", destination: "/" },
  { source: "/search", destination: "/informations" },
];

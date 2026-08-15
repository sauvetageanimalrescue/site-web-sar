// Coordonnées et liens officiels de l'organisation. Une seule source pour
// l'en-tête, le pied de page, les courriels et les données structurées.

export const ORGANISATION = {
  // Un seul nom sur tout le site : « Sauvetage Animal Rescue ». L'ancienne
  // raison sociale longue n'apparaît nulle part.
  nom: "Sauvetage Animal Rescue",
  fondation: 2010,
  adresse: {
    rue: "2180, rue Sainte-Catherine Ouest",
    ville: "Montréal",
    province: "Québec",
    pays: "Canada",
    codePostal: "H3H 1M7",
  },
  telephones: {
    signalement: "514-773-3911",
    sansFrais: "833-773-3911",
    officier: "514-270-3636",
    telecopieur: "438-238-4481",
  },
  courriels: {
    general: "info@sar.quebec",
    direction: "e.dussault@sar.quebec",
  },
  reseaux: {
    facebook: "https://www.facebook.com/sauvetageanimalrescue",
    instagram: "https://www.instagram.com/sauvetageanimalrescue",
    tiktok: "https://tiktok.com/@sauvetageanimalrescue",
    youtube: "https://www.youtube.com/c/sauvetageanimalrescue",
    messenger: "https://m.me/sauvetageanimalrescue",
    patreon: "https://www.patreon.com/sauvetageanimalrescue",
  },
} as const;

// Numéro de téléphone au format tel: (sans ponctuation).
export function lienTelephone(numero: string) {
  return `tel:+1${numero.replace(/\D/g, "")}`;
}

// Année de la carte de membre en vente. À incrémenter chaque janvier.
export const ANNEE_CARTE = 2026;

// Tarifs 2026, en dollars canadiens.
export const TARIFS = {
  carteMembre: 30,
  stage: 220,
  certificatPartenaire: 2000,
} as const;

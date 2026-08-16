import type { Locale } from "@/i18n/routing";

// Les reconnaissances de l'organisation. Chaque distinction est représentée
// par une barrette de ruban, comme dans les services d'urgence : les bandes
// de couleur sont dessinées en CSS, il n'y a donc aucune image à produire et
// le rendu reste net à toutes les tailles.
export type Distinction = {
  cle: string;
  groupe: "actes" | "service" | "deploiements";
  // Bandes de gauche à droite. Une bande étroite se répète peu, une large
  // occupe plus de place : les largeurs sont proportionnelles au nombre.
  bandes: { couleur: string; poids?: number }[];
  // Un dispositif posé au centre de la barrette, comme une étoile de citation.
  dispositif?: "etoile" | "feuille";
};

export const DISTINCTIONS: Distinction[] = [
  {
    cle: "bravoure",
    groupe: "actes",
    bandes: [
      { couleur: "#cc2f26", poids: 2 },
      { couleur: "#ffffff" },
      { couleur: "#0b2338", poids: 3 },
      { couleur: "#ffffff" },
      { couleur: "#cc2f26", poids: 2 },
    ],
    dispositif: "etoile",
  },
  {
    cle: "merite",
    groupe: "actes",
    bandes: [
      { couleur: "#0b2338", poids: 2 },
      { couleur: "#c4ff3d" },
      { couleur: "#0b2338", poids: 2 },
      { couleur: "#c4ff3d" },
      { couleur: "#0b2338", poids: 2 },
    ],
  },
  {
    cle: "vieSauvee",
    groupe: "actes",
    bandes: [
      { couleur: "#3f8f4e", poids: 3 },
      { couleur: "#ffffff" },
      { couleur: "#3f8f4e", poids: 3 },
    ],
  },
  {
    cle: "anciennete5",
    groupe: "service",
    bandes: [
      { couleur: "#2e86c1", poids: 3 },
      { couleur: "#ffffff" },
      { couleur: "#2e86c1", poids: 3 },
    ],
  },
  {
    cle: "anciennete10",
    groupe: "service",
    bandes: [
      { couleur: "#2e86c1", poids: 2 },
      { couleur: "#ffffff" },
      { couleur: "#2e86c1", poids: 2 },
      { couleur: "#ffffff" },
      { couleur: "#2e86c1", poids: 2 },
    ],
  },
  {
    cle: "formateur",
    groupe: "service",
    bandes: [
      { couleur: "#16405f", poids: 2 },
      { couleur: "#c4ff3d", poids: 3 },
      { couleur: "#16405f", poids: 2 },
    ],
  },
  {
    cle: "directionGenerale",
    groupe: "service",
    bandes: [
      { couleur: "#0b2338", poids: 5 },
      { couleur: "#c4ff3d" },
    ],
    dispositif: "etoile",
  },
  {
    cle: "sinistre",
    groupe: "deploiements",
    bandes: [
      { couleur: "#6fbbe0", poids: 2 },
      { couleur: "#0b2338" },
      { couleur: "#6fbbe0", poids: 2 },
      { couleur: "#0b2338" },
      { couleur: "#6fbbe0", poids: 2 },
    ],
  },
  {
    cle: "international",
    groupe: "deploiements",
    bandes: [
      { couleur: "#cc2f26", poids: 2 },
      { couleur: "#ffffff", poids: 3 },
      { couleur: "#cc2f26", poids: 2 },
    ],
    dispositif: "feuille",
  },
];

type Fiche = { titre: string; critere: string };

const TEXTES: Record<Locale, Record<string, Fiche>> = {
  fr: {
    bravoure: {
      titre: "Citation pour acte de bravoure",
      critere:
        "Décernée à l'intervenant qui a accepté un risque personnel réel pour secourir un animal. La plus haute reconnaissance de l'organisation.",
    },
    merite: {
      titre: "Mention pour acte méritoire",
      critere:
        "Souligne une intervention menée avec un sang-froid, une ingéniosité ou une maîtrise technique remarquables, au-delà de ce qui était attendu.",
    },
    vieSauvee: {
      titre: "Insigne de vie sauvée",
      critere:
        "Remise à l'intervenant dont l'action directe a permis à un animal de survivre à une situation qui lui était fatale autrement.",
    },
    anciennete5: {
      titre: "Médaille d'ancienneté, cinq ans",
      critere:
        "Cinq années de service actif et de bonne conduite au sein de l'organisation.",
    },
    anciennete10: {
      titre: "Médaille d'ancienneté, dix ans",
      critere:
        "Dix années de service actif. Une agrafe s'ajoute au ruban à chaque tranche de cinq ans supplémentaire.",
    },
    formateur: {
      titre: "Insigne de formateur",
      critere:
        "Porté par l'intervenant qualifié pour enseigner et évaluer, et qui a formé des membres de l'équipe.",
    },
    directionGenerale: {
      titre: "Mention de la direction générale",
      critere:
        "Décernée par le directeur général pour une contribution soutenue qui a marqué l'organisation, sur le terrain ou en soutien.",
    },
    sinistre: {
      titre: "Barrette de déploiement en sinistre",
      critere:
        "Portée par tout intervenant déployé lors d'un sinistre majeur, hors du territoire habituel, à la demande des autorités.",
    },
    international: {
      titre: "Barrette de mission internationale",
      critere:
        "Portée par tout intervenant ayant participé à une mission de l'organisation à l'étranger.",
    },
  },
  en: {
    bravoure: {
      titre: "Citation for bravery",
      critere:
        "Awarded to a responder who accepted real personal risk to rescue an animal. The organisation's highest honour.",
    },
    merite: {
      titre: "Meritorious service mention",
      critere:
        "Recognises an operation carried out with remarkable composure, ingenuity or technical mastery, beyond what was expected.",
    },
    vieSauvee: {
      titre: "Life saved insignia",
      critere:
        "Given to a responder whose direct action allowed an animal to survive a situation that would otherwise have been fatal.",
    },
    anciennete5: {
      titre: "Long service medal, five years",
      critere: "Five years of active service and good conduct.",
    },
    anciennete10: {
      titre: "Long service medal, ten years",
      critere:
        "Ten years of active service. A clasp is added to the ribbon for each additional five years.",
    },
    formateur: {
      titre: "Instructor insignia",
      critere:
        "Worn by a responder qualified to teach and evaluate, who has trained members of the team.",
    },
    directionGenerale: {
      titre: "Executive Director's commendation",
      critere:
        "Awarded by the Executive Director for a sustained contribution that has shaped the organisation, in the field or in support.",
    },
    sinistre: {
      titre: "Disaster deployment bar",
      critere:
        "Worn by any responder deployed to a major disaster outside our usual territory, at the request of the authorities.",
    },
    international: {
      titre: "International mission bar",
      critere:
        "Worn by any responder who took part in an organisation mission abroad.",
    },
  },
  es: {
    bravoure: {
      titre: "Citación por acto de valentía",
      critere:
        "Otorgada al interviniente que aceptó un riesgo personal real para rescatar a un animal. El máximo reconocimiento de la organización.",
    },
    merite: {
      titre: "Mención por acto meritorio",
      critere:
        "Destaca una intervención realizada con una sangre fría, un ingenio o un dominio técnico notables, más allá de lo esperado.",
    },
    vieSauvee: {
      titre: "Insignia de vida salvada",
      critere:
        "Entregada al interviniente cuya acción directa permitió que un animal sobreviviera a una situación de otro modo fatal.",
    },
    anciennete5: {
      titre: "Medalla de antigüedad, cinco años",
      critere: "Cinco años de servicio activo y buena conducta.",
    },
    anciennete10: {
      titre: "Medalla de antigüedad, diez años",
      critere:
        "Diez años de servicio activo. Se añade un broche a la cinta por cada cinco años adicionales.",
    },
    formateur: {
      titre: "Insignia de formador",
      critere:
        "La lleva el interviniente calificado para enseñar y evaluar, que ha formado a miembros del equipo.",
    },
    directionGenerale: {
      titre: "Mención de la dirección general",
      critere:
        "Otorgada por el director general por una contribución sostenida que ha marcado a la organización.",
    },
    sinistre: {
      titre: "Barra de despliegue en siniestro",
      critere:
        "La lleva todo interviniente desplegado en un siniestro mayor, fuera del territorio habitual, a petición de las autoridades.",
    },
    international: {
      titre: "Barra de misión internacional",
      critere:
        "La lleva todo interviniente que participó en una misión de la organización en el extranjero.",
    },
  },
};

export function ficheDistinction(cle: string, langue: Locale): Fiche {
  // Repli sur le français : une distinction non traduite reste visible.
  return TEXTES[langue]?.[cle] ?? TEXTES.fr[cle];
}

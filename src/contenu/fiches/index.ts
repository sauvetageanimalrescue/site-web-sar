import type { Locale } from "@/i18n/routing";
import type { CatalogueFiches, TexteFiche } from "./types";
import { FICHES_FR } from "./fr";
import { FICHES_EN } from "./en";
import { FICHES_ES } from "./es";

const CATALOGUES: Record<Locale, CatalogueFiches> = {
  fr: FICHES_FR,
  en: FICHES_EN,
  es: FICHES_ES,
};

export { FICHES, trouverFiche } from "./registre";
export type { Fiche, TexteFiche, CategorieFiche, Urgence } from "./types";

// Repli sur le français quand une fiche n'est pas encore traduite : mieux vaut
// une page lisible dans une autre langue qu'une erreur 404, et le repli reste
// visible dans le code plutôt que caché derrière une traduction automatique.
export function texteFiche(slug: string, locale: Locale): TexteFiche | null {
  return CATALOGUES[locale][slug] ?? FICHES_FR[slug] ?? null;
}

export function ficheEstTraduite(slug: string, locale: Locale): boolean {
  return Boolean(CATALOGUES[locale][slug]);
}

import type { Locale } from "@/i18n/routing";
import type { CataloguePages, PageEditoriale } from "./types";
import { PAGES_FR } from "./fr";
import { PAGES_EN } from "./en";
import { PAGES_ES } from "./es";

const CATALOGUES: Record<Locale, CataloguePages> = {
  fr: PAGES_FR,
  en: PAGES_EN,
  es: PAGES_ES,
};

export type { PageEditoriale, BlocPage } from "./types";

// Repli sur le français quand une page n'est pas encore traduite: mieux vaut
// une page lisible dans une autre langue qu'une erreur 404 pendant qu'on
// rattrape les traductions.
export function lirePageEditoriale(
  chemin: string,
  locale: Locale,
): PageEditoriale | null {
  return CATALOGUES[locale][chemin]?? PAGES_FR[chemin]?? null;
}

// Tous les chemins connus, pour le prérendu statique et le plan du site.
export function cheminsEditoriaux(): string[] {
  return Object.keys(PAGES_FR);
}

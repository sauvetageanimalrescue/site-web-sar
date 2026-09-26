"use client";

import { useLocale, useTranslations } from "next-intl";
import { Chiffre } from "@/components/barres";
import { CarteVues } from "@/components/carte-vues";
import { useStatistiquesDirect } from "@/components/statistiques-direct";
import {
  TOTAL_MISSIONS,
  ANIMAUX,
  MUNICIPALITES_DESSERVIES,
  PAR_ETAT,
} from "@/contenu/statistiques-2026";
import { especesAnnee } from "@/lib/especes-statistiques";
import { libelleEspece } from "@/lib/especes";
import type { Locale } from "@/i18n/routing";

export function ChiffresAnnuels() {
  const t = useTranslations("statistiques");
  const locale = useLocale() as Locale;
  const stats = useStatistiquesDirect();
  const premiere = especesAnnee(stats)[0];
  const pluriels = t.raw("especesPluriel") as Record<string, string>;
  const legende = premiere && (pluriels[premiere.code] ?? t("chiffreEspeceGenerique", {
    espece: libelleEspece(premiere.code, locale),
  }));

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Chiffre valeur={(stats?.deplacements.annee ?? TOTAL_MISSIONS).toString()} legende={t("chiffreMissions")} />
      <Chiffre valeur={(stats?.annee ?? ANIMAUX).toString()} legende={t("chiffreAnimaux")} />
      <Chiffre valeur={MUNICIPALITES_DESSERVIES.toString()} legende={t("chiffreMunicipalites")} />
      {premiere && <Chiffre valeur={premiere.valeur.toString()} legende={legende} />}
    </div>
  );
}

export function GraphiquesEspeces() {
  const t = useTranslations("statistiques");
  const stats = useStatistiquesDirect();
  const parEspece = especesAnnee(stats).map(({ libelle, valeur }) => ({ libelle, valeur }));

  return (
    <CarteVues
      vues={[
        { titre: t("parEspece"), donnees: parEspece },
        { titre: t("parEtat"), donnees: PAR_ETAT, couleur: "var(--vert)" },
      ]}
    />
  );
}

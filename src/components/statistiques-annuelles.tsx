"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Chiffre } from "@/components/barres";
import { CarteVues } from "@/components/carte-vues";
import { Section } from "@/components/ui";
import { useStatistiquesDirect } from "@/components/statistiques-direct";
import { libelleEspece } from "@/lib/especes";
import type { Locale } from "@/i18n/routing";
import type { Mesure } from "@/contenu/statistiques-2026";

export function StatistiquesAnnuelles() {
  const t = useTranslations("statistiques");
  const locale = useLocale() as Locale;
  const stats = useStatistiquesDirect();
  const [selection, setSelection] = useState<number | null>(null);
  const annee = stats?.annees.find(a => a.annee === (selection ?? stats.anneeCourante));
  if (!stats || !annee) return <Section largeur="carte"><p role="status">{t("vide")}</p></Section>;

  const traduire = (donnees: Mesure[]) => donnees.map(d => ({ ...d,
    libelle: d.libelle === "Non renseigné" ? t("nonRenseigne") : d.libelle === "Profil indisponible" ? t("profilIndisponible") : d.libelle,
  }));
  const parEspece = annee.especes.map(e => ({ libelle: libelleEspece(e.code, locale), valeur: e.sauves }));
  const etats = t.raw("etats") as Record<string, string>;
  const parEtat = traduire(annee.etats).map(e => ({ ...e, libelle: etats[e.libelle] ?? e.libelle }));
  const mois = annee.parMois.map((valeur, i) => ({ valeur, libelle: new Intl.DateTimeFormat(locale, { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(2026, i, 1))) }));
  const jours = annee.parJour.map((valeur, i) => ({ valeur, libelle: new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: "UTC" }).format(new Date(Date.UTC(2026, 0, 5 + i))) }));
  const equipeMissions = [...annee.equipe].sort((a, b) => b.missions - a.missions || b.animaux - a.animaux || a.nom.localeCompare(b.nom, locale));
  const equipeAnimaux = [...annee.equipe].sort((a, b) => b.animaux - a.animaux || b.missions - a.missions || a.nom.localeCompare(b.nom, locale));

  return <>
    <Section titre={t("anneeTitre", { annee: annee.annee })}>
      <div className="mb-6 flex items-center gap-3">
        <label htmlFor="annee-statistiques" className="font-medium">{t("choisirAnnee")}</label>
        <select id="annee-statistiques" value={annee.annee} onChange={e => setSelection(Number(e.target.value))}
          className="rounded-lg border border-border bg-surface px-4 py-2 text-marine focus-visible:outline-2 focus-visible:outline-ciel">
          {stats.annees.map(a => <option key={a.annee} value={a.annee}>{a.annee}</option>)}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Chiffre valeur={annee.missions.toLocaleString(locale)} legende={t("chiffreMissions")} />
        <Chiffre valeur={annee.animaux.toLocaleString(locale)} legende={t("chiffreAnimaux")} />
        <Chiffre valeur={annee.municipalites.toLocaleString(locale)} legende={t("chiffreMunicipalites")} />
        <Chiffre valeur={annee.regions.toLocaleString(locale)} legende={t("chiffreRegions")} />
      </div>
    </Section>
    <Section titre={t("rythmeTitre")} fond largeur="carte">
      <CarteVues key={`rythme-${annee.annee}`} vues={[
        { titre: t("parMois"), donnees: mois }, { titre: t("parJour"), donnees: jours },
      ]} />
    </Section>
    <Section titre={t("animauxTitre")} largeur="carte">
      <CarteVues limite={10} key={`animaux-${annee.annee}`} vues={[
        { titre: t("parEspece"), donnees: parEspece }, { titre: t("parEtat"), donnees: parEtat, couleur: "var(--vert)" },
      ]} />
    </Section>
    <Section titre={t("geoTitre")} fond largeur="carte">
      <CarteVues limite={10} key={`geo-${annee.annee}`} vues={[
        { titre: t("parRegion"), donnees: traduire(annee.parRegion) },
        { titre: t("parMunicipalite"), donnees: traduire(annee.parMunicipalite), couleur: "var(--vert)" },
      ]} />
    </Section>
    <Section titre={t("appelsTitre")} largeur="carte">
      <CarteVues limite={10} key={`appels-${annee.annee}`} vues={[
        { titre: t("parDemandeur"), donnees: traduire(annee.demandeurs) },
        { titre: t("parLieu"), donnees: traduire(annee.lieux), couleur: "var(--vert)" },
      ]} />
    </Section>
    <Section titre={t("equipeTitre")} fond largeur="carte">
      <CarteVues limite={10} key={`equipe-${annee.annee}`} vues={[
        { titre: t("equipeMissions"), donnees: traduire(equipeMissions.map(p => ({ libelle: p.nom, valeur: p.missions }))) },
        { titre: t("equipeAnimaux"), donnees: traduire(equipeAnimaux.map(p => ({ libelle: p.nom, valeur: p.animaux }))), couleur: "var(--vert)" },
      ]} />
    </Section>
  </>;
}

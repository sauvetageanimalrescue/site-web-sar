"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Statistiques } from "@/lib/statistiques";
import { useTranslations } from "next-intl";

const ContexteStatistiques = createContext<Statistiques | null>(null);

export function StatistiquesDirect({
  initiales,
  children,
}: {
  initiales: Statistiques | null;
  children: ReactNode;
}) {
  const [stats, setStats] = useState(initiales);
  const [retard, setRetard] = useState(false);
  const t = useTranslations("statistiques");

  // Une requête à la fois, seulement dans un onglet visible. Un échec garde
  // les chiffres affichés et espace les reprises, jusqu'au retour du service.
  useEffect(() => {
    let fini = false, enCours = false, echecs = 0;
    let minuterie: ReturnType<typeof setTimeout>;
    let controleur: AbortController | null = null;
    const rafraichir = async () => {
      if (fini || enCours) return;
      clearTimeout(minuterie);
      if (document.visibilityState !== "visible") {
        minuterie = setTimeout(rafraichir, 60_000);
        return;
      }
      enCours = true;
      controleur = new AbortController();
      const expiration = setTimeout(() => controleur?.abort(), 30_000);
      try {
        const res = await fetch("/api/statistiques", { cache: "no-store", signal: controleur.signal });
        if (!res.ok) throw new Error("indisponible");
        const nouvelles: Statistiques = await res.json();
        if (!Array.isArray(nouvelles.annees) || !Number.isFinite(nouvelles.annee)) throw new Error("indisponible");
        if (!fini) { setStats(nouvelles); setRetard(false); }
        echecs = 0;
      } catch {
        echecs++;
        if (!fini) setRetard(true);
      } finally {
        clearTimeout(expiration);
        enCours = false;
        if (!fini) minuterie = setTimeout(rafraichir, Math.min(300_000, 60_000 * 2 ** Math.min(echecs, 3)));
      }
    };
    minuterie = setTimeout(rafraichir, initiales ? 60_000 : 0);
    const surRetour = () => {
      if (document.visibilityState === "visible") void rafraichir();
    };
    document.addEventListener("visibilitychange", surRetour);
    return () => {
      fini = true;
      controleur?.abort();
      clearTimeout(minuterie);
      document.removeEventListener("visibilitychange", surRetour);
    };
  }, [initiales]);

  return <ContexteStatistiques.Provider value={stats}>
    {retard && <p role="status" className="mx-auto max-w-7xl px-4 py-3 text-sm text-amber-800">{t("actualisationRetardee")}</p>}
    {children}
  </ContexteStatistiques.Provider>;
}

export function useStatistiquesDirect() {
  return useContext(ContexteStatistiques);
}

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Statistiques } from "@/lib/statistiques";

const ContexteStatistiques = createContext<Statistiques | null>(null);

export function StatistiquesDirect({
  initiales,
  children,
}: {
  initiales: Statistiques | null;
  children: ReactNode;
}) {
  const [stats, setStats] = useState(initiales);

  // Une seule lecture alimente les compteurs et les chiffres annuels. Elle se
  // lance aussi au montage, car le HTML initial peut avoir été mis en cache.
  useEffect(() => {
    const rafraichir = async () => {
      try {
        const res = await fetch("/api/statistiques", { cache: "no-store" });
        if (res.ok) setStats(await res.json());
      } catch {
        // En cas de panne, garder la dernière valeur connue.
      }
    };
    void rafraichir();
    const minuterie = setInterval(rafraichir, 60_000);
    const surRetour = () => {
      if (document.visibilityState === "visible") void rafraichir();
    };
    document.addEventListener("visibilitychange", surRetour);
    return () => {
      clearInterval(minuterie);
      document.removeEventListener("visibilitychange", surRetour);
    };
  }, []);

  return <ContexteStatistiques.Provider value={stats}>{children}</ContexteStatistiques.Provider>;
}

export function useStatistiquesDirect() {
  return useContext(ContexteStatistiques);
}

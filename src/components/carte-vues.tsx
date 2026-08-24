"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Chevron } from "@/components/ui";
import { Barres } from "@/components/barres";
import type { Mesure } from "@/contenu/statistiques-2026";

export type Vue = { titre: string; donnees: Mesure[]; couleur?: string };

// Une seule carte au centre, qu'on feuillette avec deux chevrons, plutôt que
// deux ou trois graphiques côte à côte. La page reste courte, la mise en page
// ne se casse pas sur un téléphone, et l'oeil n'a qu'un seul endroit à lire.
export function CarteVues({
  vues,
  className,
}: {
  vues: Vue[];
  className?: string;
}) {
  const t = useTranslations("statistiques");
  const [i, setI] = useState(0);
  const vue = vues[i];
  const aller = (pas: number) => setI((n) => (n + pas + vues.length) % vues.length);

  return (
    <div
      className={`mx-auto max-w-2xl rounded-xl border border-border bg-surface p-5 sm:p-7 ${className ?? ""}`}
    >
      <div className="flex items-center justify-between gap-4">
        <Bouton libelle={t("precedent")} sens="gauche" onClick={() => aller(-1)} />
        <h3 className="text-center font-[family-name:var(--font-titre)] text-lg font-bold uppercase leading-tight tracking-wide text-marine">
          {vue.titre}
        </h3>
        <Bouton libelle={t("suivant")} sens="droite" onClick={() => aller(1)} />
      </div>

      {/* Les trois vues sont empilées dans la même case de grille : la carte
          prend donc la hauteur de la plus longue et ne saute plus quand on
          passe de douze mois à quatre moments de la journée. Les vues
          inactives restent en place, simplement invisibles. */}
      <div className="mt-6 grid">
        {vues.map((v, n) => (
          <div
            key={v.titre}
            className={`col-start-1 row-start-1 ${
              n === i ? "" : "invisible pointer-events-none"
            }`}
            aria-hidden={n !== i}
          >
            <Barres donnees={v.donnees} couleur={v.couleur} />
          </div>
        ))}
      </div>

      {/* Les pastilles disent combien de vues existent et où l'on se trouve ;
          sans elles, rien n'indique qu'il y a autre chose à voir. */}
      <div className="mt-6 flex justify-center gap-2">
        {vues.map((v, n) => (
          <button
            key={v.titre}
            type="button"
            aria-label={v.titre}
            aria-current={n === i}
            onClick={() => setI(n)}
            className={`h-2 rounded-full transition-all ${
              n === i ? "w-6 bg-marine" : "w-2 bg-border hover:bg-ciel"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Bouton({
  libelle,
  sens,
  onClick,
}: {
  libelle: string;
  sens: "gauche" | "droite";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={libelle}
      onClick={onClick}
      className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-marine transition hover:border-marine hover:bg-marine hover:text-white"
    >
      <Chevron className={`size-4 ${sens === "gauche" ? "rotate-180" : ""}`} />
    </button>
  );
}

"use client";

import { useRef, useState } from "react";
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
  limite,
}: {
  vues: Vue[];
  className?: string;
  limite?: number;
}) {
  const t = useTranslations("statistiques");
  const [i, setI] = useState(0);
  const [complet, setComplet] = useState(false);
  const geste = useRef<{ x: number; y: number } | null>(null);
  const vue = vues[i];
  const aller = (pas: number) => { setComplet(false); setI((n) => (n + pas + vues.length) % vues.length); };

  return (
    <div
      className={`mx-auto max-w-2xl rounded-xl border border-border bg-surface p-5 sm:p-7 ${className ?? ""}`}
      onTouchStart={e => { const p = e.touches[0]; geste.current = { x: p.clientX, y: p.clientY }; }}
      onTouchCancel={() => { geste.current = null; }}
      onTouchEnd={e => {
        if (!geste.current) return;
        const p = e.changedTouches[0], dx = p.clientX - geste.current.x, dy = p.clientY - geste.current.y;
        geste.current = null;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) aller(dx < 0 ? 1 : -1);
      }}
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
            {v.donnees.length ? <Barres donnees={limite && !(complet && n === i) ? v.donnees.slice(0, limite) : v.donnees} couleur={v.couleur} /> : <p className="text-sm text-muted">{t("aucuneDonnee")}</p>}
          </div>
        ))}
      </div>

      {limite && vue.donnees.length > limite ? <button type="button" aria-expanded={complet}
        className="mt-4 text-sm font-semibold text-marine underline underline-offset-4"
        onClick={() => setComplet(v => !v)}>{t(complet ? "voirMoins" : "voirPlus")}</button> : null}

      {/* Les pastilles disent combien de vues existent et où l'on se trouve ;
          sans elles, rien n'indique qu'il y a autre chose à voir. */}
      <div className="mt-6 flex justify-center gap-2">
        {vues.map((v, n) => (
          <button
            key={v.titre}
            type="button"
            aria-label={v.titre}
            aria-current={n === i}
            onClick={() => { setComplet(false); setI(n); }}
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

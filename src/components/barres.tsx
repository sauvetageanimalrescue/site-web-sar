import type { Mesure } from "@/contenu/statistiques-2026";

// Diagramme à barres horizontales, dessiné en CSS. Les barres horizontales
// plutôt que verticales parce que les libellés sont longs, « Animal remis au
// service animalier » ne tient pas sous une colonne, et parce qu'un téléphone
// affiche une liste bien mieux qu'une grille.
export function Barres({
  donnees,
  couleur = "var(--ciel)",
}: {
  donnees: Mesure[];
  couleur?: string;
}) {
  const sommet = Math.max(...donnees.map((d) => d.valeur), 1);

  return (
    <ul className="space-y-2.5">
      {donnees.map((d) => (
        <li key={d.libelle} className="grid grid-cols-[1fr_auto] gap-x-3">
          <span className="text-sm text-foreground">{d.libelle}</span>
          <span className="chiffres-tabulaires text-sm font-semibold text-marine">
            {d.valeur}
          </span>
          <span className="col-span-2 mt-1 block h-2 overflow-hidden rounded-full bg-surface-2">
            <span
              className="block h-full rounded-full"
              style={{
                width: `${Math.max((d.valeur / sommet) * 100, 1.5)}%`,
                backgroundColor: couleur,
              }}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

// Un chiffre mis en avant, avec sa légende dessous. Rien d'autre : une
// précision en gris sous chaque carte alourdissait la rangée et détournait
// l'oeil du nombre, qui est le seul point de la carte.
export function Chiffre({
  valeur,
  legende,
}: {
  valeur: string;
  legende: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="chiffres-tabulaires font-[family-name:var(--font-titre)] text-4xl font-bold leading-none text-marine">
        {valeur}
      </p>
      <p className="mt-2 font-medium text-foreground">{legende}</p>
    </div>
  );
}

import type { ReactNode } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Chevron } from "@/components/ui";

// LA CARTE IMAGE, canevas unique de toutes les cartes du site.
//
// Une photo qui remplit la carte, un dégradé marine qui monte du bas, le
// titre posé dessus en majuscules, et une pastille d'action à droite. Ce
// gabarit sert à la page d'accueil, au recrutement, aux épisodes de la série
// et aux hommages : si l'apparence des cartes doit changer, elle change ici
// et nulle part ailleurs.
export function CarteImage({
  image,
  titre,
  sousTitre,
  href,
  externe = false,
  icone,
  format = "carre",
  grisaille = false,
  taille = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
}: {
  image?: string;
  titre: string;
  sousTitre?: string;
  href?: string;
  externe?: boolean;
  icone?: ReactNode;
  // Carré par défaut ; seize neuf pour les vignettes de vidéo, qui le sont.
  format?: "carre" | "video";
  // Le noir et blanc distingue les portraits d'hommage de toute autre image.
  grisaille?: boolean;
  taille?: string;
}) {
  const classe = `group relative isolate flex ${
    format === "carre" ? "aspect-square" : "aspect-video"
  } flex-col justify-end overflow-hidden rounded-xl bg-marine transition`;

  const contenu = (
    <>
      {image && (
        <Image
          src={image}
          alt=""
          fill
          sizes={taille}
          className={`-z-10 object-cover ${grisaille ? "grayscale" : ""} ${
            href ? "transition duration-700 group-hover:scale-105" : ""
          }`}
        />
      )}
      {/* Dégradé resserré vers le bas : il porte le titre sans assombrir
          toute la photo. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-marine from-8% via-marine/55 via-22% to-transparent to-50%" />
      <div className="flex items-end justify-between gap-3 p-5">
        <div>
          <h3 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase leading-tight tracking-wide text-white">
            {titre}
          </h3>
          {sousTitre && (
            <p className="mt-1 text-sm uppercase tracking-wider text-lime">
              {sousTitre}
            </p>
          )}
        </div>
        {icone !== undefined ? (
          icone
        ) : href ? (
          <Chevron className="size-6 shrink-0 text-lime transition group-hover:translate-x-1" />
        ) : null}
      </div>
    </>
  );

  if (!href) return <div className={classe.replace("group ", "")}>{contenu}</div>;

  // Une destination hors du site ne passe pas par le Link de next-intl, qui
  // préfixerait la locale à l'URL absolue.
  return externe ? (
    <a href={href} target="_blank" rel="noreferrer" className={classe}>
      {contenu}
    </a>
  ) : (
    <Link href={href} className={classe}>
      {contenu}
    </Link>
  );
}

// LA GRILLE DE CARTES : quatre par rangée sur grand écran, deux sur tablette,
// une sur téléphone. Jamais plus de quatre d'affilée sans un bloc de texte.
export function GrilleCartes({
  children,
  colonnes = 4,
}: {
  children: ReactNode;
  colonnes?: 3 | 4;
}) {
  return (
    <div
      className={`grid gap-5 sm:grid-cols-2 ${
        colonnes === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
      }`}
    >
      {children}
    </div>
  );
}

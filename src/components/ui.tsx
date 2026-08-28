import Image from "next/image";
import type { ReactNode } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";

// Un lien de contenu peut pointer ailleurs (Patreon, par exemple) : le Link de
// next-intl préfixerait la locale à une URL absolue.
function LienAction({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

// En-tête de page : bandeau marine avec image de fond optionnelle.
export function EnTetePage({
  surtitre,
  titre,
  intro,
  image,
  imagePosition,
  imageFit = "cover",
  imageTailleNaturelle,
  imageLargeurComplete,
}: {
  surtitre?: string;
  titre: string;
  intro?: string;
  image?: string;
  // Décalage du cadrage, ex. "center 200px" pour descendre la photo et
  // révéler ce qu'il y a plus haut dans l'image (des visages, par exemple).
  imagePosition?: string;
  // "contain" : la photo au complet, sans recadrage, sur fond marine — pour
  // une image où rien ne doit être coupé (un objet plutôt qu'une scène).
  imageFit?: "cover" | "contain";
  // Taille réelle (largeur/hauteur en pixels) de la photo : la photo ne se
  // fait jamais recadrer à l'échelle, peu importe la largeur de la fenêtre.
  // Un agrandissement de fenêtre ne fait que révéler plus de bleu marine à
  // gauche (l'image reste ancrée à droite par défaut), jamais un zoom.
  imageTailleNaturelle?: { largeur: number; hauteur: number };
  // La photo couvre toujours toute la largeur du bandeau (jamais de bleu sur
  // les côtés), mise à l'échelle au minimum nécessaire pour y arriver :
  // contrairement à `cover`, l'échelle suit uniquement la largeur, jamais la
  // hauteur, donc pas de changement de zoom imprévisible au redimensionnement.
  imageLargeurComplete?: boolean;
}) {
  return (
    <section className="relative isolate flex min-h-[23rem] items-start overflow-hidden bg-marine sm:min-h-[27rem]">
      {image && (imageTailleNaturelle || imageLargeurComplete) && (
        <div
          aria-hidden
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: imageLargeurComplete
              ? "100% auto"
              : `${imageTailleNaturelle!.largeur}px ${imageTailleNaturelle!.hauteur}px`,
            backgroundPosition: imagePosition ?? "right center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      {image && !imageTailleNaturelle && (
        <>
          {/* La photo se voit vraiment : le dégradé la couvre à gauche, là où
              se lit le texte, et la laisse respirer à droite. */}
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`opacity-45 ${imageFit === "contain" ? "object-contain" : "object-cover"}`}
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
        </>
      )}
      {image && (
        <div className="absolute inset-0 bg-gradient-to-r from-marine via-marine/80 to-marine/35" />
      )}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:py-20">
        {surtitre && (
          <p className="font-[family-name:var(--font-titre)] text-lg font-semibold uppercase tracking-[0.22em] text-lime sm:text-2xl">
            {surtitre}
          </p>
        )}
        <h1 className="mt-3 max-w-4xl whitespace-pre-line font-[family-name:var(--font-titre)] text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
          {titre}
        </h1>
        {intro && (
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/80">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

export function Section({
  titre,
  children,
  fond = false,
  etroite = false,
  largeur,
}: {
  titre?: string;
  children: ReactNode;
  fond?: boolean;
  etroite?: boolean;
  // « pleine » occupe la largeur du site, « texte » une largeur de lecture,
  // « carte » la largeur d'une carte centrée.
  largeur?: "pleine" | "texte" | "carte";
}) {
  const choix = largeur ?? (etroite ? "texte" : "pleine");
  const cadre =
    choix === "carte" ? "max-w-2xl" : choix === "texte" ? "max-w-3xl" : "max-w-7xl";
  return (
    <section className={fond ? "bg-surface-2 py-14" : "py-14"}>
      <div className={`mx-auto px-4 ${cadre}`}>
        {titre && (
          <h2 className="mb-6 font-[family-name:var(--font-titre)] text-3xl font-bold uppercase tracking-wide text-marine">
            {titre}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

// Bloc de texte long : interlignage confortable, largeur de lecture limitée.
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="paragraphe max-w-3xl space-y-4 text-lg leading-relaxed text-foreground/90">
      {children}
    </div>
  );
}

// Chevron plein, dessiné plutôt que tracé : une pointe massive dont les bras
// sont coupés à l'horizontale en haut et en bas. Les icônes de bibliothèque
// sont des traits fins, impossibles à épaissir sans arrondir les bouts.
export function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <polygon points="5,2 11.3,2 19,12 11.3,22 5,22 12.6,12" />
    </svg>
  );
}

// Liste simple : une colonne, pas d'encadré, pas d'aplat de couleur. Seule la
// puce porte l'accent, et le texte garde sa largeur de lecture.
export function ListePuces({
  items,
  teinte = "bg-ciel",
}: {
  items: string[];
  teinte?: string;
}) {
  return (
    <ul className="max-w-3xl space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-foreground/90">
          <span
            className={`mt-2 size-2 shrink-0 rounded-full ${teinte}`}
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CarteLien({
  href,
  titre,
  texte,
  libelleLien,
  image,
}: {
  href: string;
  titre: string;
  texte: string;
  libelleLien: string;
  image?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition hover:border-ciel hover:shadow-lg"
    >
      {image && (
        <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-[family-name:var(--font-titre)] text-xl font-semibold uppercase tracking-wide text-marine">
          {titre}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{texte}</p>
        <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-ciel">
          {libelleLien}
          <IconArrowRight
            className="size-4 transition group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}

// Section large : un bloc de texte et une image côte à côte, l'image passant
// d'un côté puis de l'autre au fil de la page.
export function SectionAlternee({
  surtitre,
  titre,
  texte,
  image,
  actions,
  cote = "droite",
  fond = false,
  presentation = "photo",
}: {
  surtitre?: string;
  titre: string;
  texte: string;
  image: string;
  actions?: { href: string; libelle: string; principal?: boolean }[];
  cote?: "droite" | "gauche";
  fond?: boolean;
  // « objet » présente l'image comme un objet posé, incliné et détouré,
  // plutôt que comme une photo cadrée dans un rectangle.
  presentation?: "photo" | "objet";
}) {
  return (
    <section className={fond ? "bg-surface-2 py-16" : "py-16"}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
        <div className={cote === "gauche" ? "lg:order-2" : undefined}>
          {surtitre && (
            <p className="font-[family-name:var(--font-titre)] text-lg font-semibold uppercase tracking-[0.22em] text-ciel sm:text-xl">
              {surtitre}
            </p>
          )}
          <h2 className="mt-2 whitespace-pre-line font-[family-name:var(--font-titre)] text-3xl font-bold uppercase leading-tight tracking-wide text-marine sm:text-4xl">
            {titre}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{texte}</p>

          {actions && actions.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((a) => (
                <LienAction
                  key={a.href}
                  href={a.href}
                  className={
                    a.principal
                      ? "rounded-md bg-marine px-6 py-3.5 font-semibold text-white transition hover:bg-marine-clair"
                      : "rounded-md border border-marine px-6 py-3.5 font-semibold text-marine transition hover:bg-marine hover:text-white"
                  }
                >
                  {a.libelle}
                </LienAction>
              ))}
            </div>
          )}
        </div>

        {presentation === "objet" ? (
          <div
            className={`flex justify-center ${cote === "gauche" ? "lg:order-1" : ""}`}
          >
            <Image
              src={image}
              alt=""
              width={972}
              height={1594}
              sizes="(max-width: 1024px) 60vw, 30vw"
              className="w-full max-w-[240px] rotate-6 rounded-xl shadow-2xl transition duration-500 hover:rotate-3 sm:max-w-[272px]"
            />
          </div>
        ) : (
          <div
            className={`relative aspect-[4/3] overflow-hidden rounded-xl border border-border ${
              cote === "gauche" ? "lg:order-1" : ""
            }`}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}

// Encadré d'appel à l'action en fin de page.
// LE BAS DE PAGE À DEUX BOUTONS : bandeau marine qui ferme une page, avec un
// titre, un texte facultatif et ses boutons. Il prend la largeur d'une carte
// pour s'aligner sur les paragraphes de la page plutôt que sur le bord de
// l'écran, sans quoi il paraît décroché du contenu qu'il conclut.
export function AppelAction({
  titre,
  texte,
  actions,
}: {
  titre: string;
  texte?: string;
  actions: { href: string; libelle: string; principal?: boolean }[];
}) {
  return (
    <section className="bg-marine py-14">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="whitespace-pre-line font-[family-name:var(--font-titre)] text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
          {titre}
        </h2>
        {texte && (
          <p className="mt-4 max-w-2xl text-lg text-white/75">{texte}</p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          {actions.map((a) => (
            <LienAction
              key={a.href}
              href={a.href}
              className={
                a.principal
                  ? "rounded-md bg-lime px-6 py-3.5 font-semibold text-marine transition hover:bg-lime-fonce"
                  : "rounded-md border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              }
            >
              {a.libelle}
            </LienAction>
          ))}
        </div>
      </div>
    </section>
  );
}

// LA DÉCLARATION : une affirmation courte, centrée, sur fond gris, suivie de
// deux boutons. Elle sert de respiration entre deux rangées de cartes et
// porte les arguments de fond de l'organisation. Le titre se compose sur
// plusieurs lignes avec des retours forcés dans la traduction.
export function Declaration({
  titre,
  texte,
  actions,
}: {
  titre: string;
  texte: string;
  actions: { href: string; libelle: string; principal?: boolean }[];
}) {
  return (
    <section className="bg-surface-2 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="whitespace-pre-line font-[family-name:var(--font-titre)] text-4xl font-bold uppercase leading-tight tracking-wide text-marine sm:text-5xl">
          {titre}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {texte}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {actions.map((a) => (
            <LienAction
              key={a.href}
              href={a.href}
              className={
                a.principal
                  ? "rounded-md bg-marine px-6 py-3.5 font-semibold text-white transition hover:bg-marine-clair"
                  : "rounded-md border border-marine px-6 py-3.5 font-semibold text-marine transition hover:bg-marine hover:text-white"
              }
            >
              {a.libelle}
            </LienAction>
          ))}
        </div>
      </div>
    </section>
  );
}

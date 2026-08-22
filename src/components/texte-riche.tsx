import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

// Un balisage minimal pour les paragraphes éditoriaux: **gras** et
// [libellé](/adresse). Rien d'autre. Le contenu reste du texte simple dans
// les fichiers de contenu, et aucune balise HTML n'est interprétée: on ne
// construit que des éléments React, donc rien ne peut être injecté.
//
// Un lien interne passe par le Link de next-intl, qui ajoute la langue;
// une adresse absolue s'ouvre dans un nouvel onglet.
function liens(texte: string, cle: string): ReactNode[] {
  const morceaux: ReactNode[] = [];
  const motif = /\[([^\]]+)\]\(([^)]+)\)/g;
  let dernier = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = motif.exec(texte)) !== null) {
    if (m.index > dernier) morceaux.push(texte.slice(dernier, m.index));
    const [, libelle, adresse] = m;
    morceaux.push(
      /^https?:\/\//.test(adresse) ? (
        <a
          key={`${cle}-l${n}`}
          href={adresse}
          target="_blank"
          rel="noreferrer"
          className="text-ciel underline underline-offset-4 hover:text-marine"
        >
          {libelle}
        </a>
      ) : (
        <Link
          key={`${cle}-l${n}`}
          href={adresse}
          className="text-ciel underline underline-offset-4 hover:text-marine"
        >
          {libelle}
        </Link>
      ),
    );
    dernier = m.index + m[0].length;
    n++;
  }
  if (dernier < texte.length) morceaux.push(texte.slice(dernier));
  return morceaux;
}

export function TexteRiche({ texte }: { texte: string }) {
  const morceaux: ReactNode[] = [];
  const motif = /\*\*([^*]+)\*\*/g;
  let dernier = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = motif.exec(texte)) !== null) {
    if (m.index > dernier)
      morceaux.push(...liens(texte.slice(dernier, m.index), `t${n}`));
    morceaux.push(
      <strong key={`g${n}`} className="font-semibold text-marine">
        {liens(m[1], `g${n}`)}
      </strong>,
    );
    dernier = m.index + m[0].length;
    n++;
  }
  if (dernier < texte.length)
    morceaux.push(...liens(texte.slice(dernier), "fin"));
  return <>{morceaux}</>;
}

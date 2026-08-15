"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { IconArrowRight, IconPointFilled } from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";
import type { Statistiques } from "@/lib/statistiques";

type Props = { initiales: Statistiques | null };

// Compte de 0 (ou de la valeur précédente) jusqu'à la cible. Les chiffres d'un
// compteur de sauvetages méritent d'être vus bouger.
function useNombreAnime(cible: number, duree = 900) {
  const [valeur, setValeur] = useState(cible);
  const precedent = useRef(cible);
  const premier = useRef(true);

  useEffect(() => {
    const depart = premier.current ? 0 : precedent.current;
    premier.current = false;
    precedent.current = cible;

    if (depart === cible) {
      setValeur(cible);
      return;
    }

    let image = 0;
    const debut = performance.now();
    const avancer = (maintenant: number) => {
      const t = Math.min((maintenant - debut) / duree, 1);
      // Décélération douce : rapide au départ, précis à l'arrivée.
      const eased = 1 - Math.pow(1 - t, 3);
      setValeur(Math.round(depart + (cible - depart) * eased));
      if (t < 1) image = requestAnimationFrame(avancer);
    };
    image = requestAnimationFrame(avancer);
    return () => cancelAnimationFrame(image);
  }, [cible, duree]);

  return valeur;
}

function Case({
  valeur,
  etiquette,
  vedette = false,
}: {
  valeur: number;
  etiquette: string;
  vedette?: boolean;
}) {
  const locale = useLocale();
  const anime = useNombreAnime(valeur);

  return (
    <div
      className={`rounded-xl px-4 py-5 text-center ${
        vedette ? "bg-lime text-marine" : "bg-white/10 text-white"
      }`}
    >
      <p
        className={`chiffres-tabulaires font-[family-name:var(--font-titre)] font-bold leading-none ${
          vedette ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"
        }`}
      >
        {anime.toLocaleString(locale)}
      </p>
      <p
        className={`mt-2 text-xs font-medium uppercase tracking-wider ${
          vedette ? "text-marine/70" : "text-white/60"
        }`}
      >
        {etiquette}
      </p>
    </div>
  );
}

export function CompteurSauvetages({ initiales }: Props) {
  const t = useTranslations("compteur");
  const locale = useLocale();
  const [stats, setStats] = useState(initiales);

  // Rafraîchissement périodique : le registre est alimenté en continu par les
  // équipes sur le terrain, le compteur suit sans rechargement de page.
  useEffect(() => {
    const rafraichir = async () => {
      try {
        const res = await fetch("/api/statistiques", { cache: "no-store" });
        if (res.ok) setStats(await res.json());
      } catch {
        // Réseau instable : on garde simplement les derniers chiffres connus.
      }
    };
    const minuterie = setInterval(rafraichir, 60_000);
    const surRetour = () => {
      if (document.visibilityState === "visible") rafraichir();
    };
    document.addEventListener("visibilitychange", surRetour);
    return () => {
      clearInterval(minuterie);
      document.removeEventListener("visibilitychange", surRetour);
    };
  }, []);

  if (!stats) {
    return (
      <section className="bg-marine py-14">
        <div className="mx-auto max-w-7xl px-4 text-center text-white/60">
          {t("indisponible")}
        </div>
      </section>
    );
  }

  const heure = new Date(stats.genere_a).toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="bg-marine py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-titre)] text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
              {t("titre")}
            </h2>
            <p className="mt-1 flex items-center gap-1 text-sm text-white/60">
              <IconPointFilled
                className="size-4 animate-pulse text-vert"
                aria-hidden
              />
              {t("sousTitre")}
            </p>
          </div>
          <Link
            href="/statistiques"
            className="group flex items-center gap-2 text-sm font-medium text-lime hover:text-lime-fonce"
          >
            {t("voirDetails")}
            <IconArrowRight
              className="size-4 transition group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>

        {/* Pas de total « depuis la fondation » : les chiffres antérieurs au
            registre n'existent pas de façon fiable, et un compteur public ne
            doit afficher que ce qui est vérifiable. */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Case valeur={stats.jour} etiquette={t("jour")} vedette />
          <Case valeur={stats.semaine} etiquette={t("semaine")} />
          <Case valeur={stats.mois} etiquette={t("mois")} />
          <Case valeur={stats.annee} etiquette={t("annee")} />
        </div>

        <p className="mt-4 text-right text-xs text-white/40">
          {t("miseAJour", { heure })}
        </p>
      </div>
    </section>
  );
}

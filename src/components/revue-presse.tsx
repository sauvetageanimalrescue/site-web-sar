"use client";

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";
import { Chevron } from "@/components/ui";
import { presseTriee, type Support } from "@/contenu/presse";

const SUPPORTS: (Support | "tous")[] = [
  "tous",
  "article",
  "radio",
  "television",
  "balado",
];

// Une date partielle reste lisible: « 2020 » ou « juin 2026 » plutôt qu'une
// date inventée au jour près.
function afficherDate(date: string | undefined, mois: (d: Date) => string) {
  if (!date) return null;
  const [a, m, j] = date.split("-");
  if (j) return mois(new Date(Number(a), Number(m) - 1, Number(j)));
  if (m) return mois(new Date(Number(a), Number(m) - 1, 1));
  return a;
}

export function RevuePresse() {
  const t = useTranslations("medias");
  const f = useFormatter();
  const [filtre, setFiltre] = useState<Support | "tous">("tous");

  const coupures = presseTriee().filter(
    (c) => filtre === "tous" || c.support === filtre,
  );

  return (
    <div>
      {/* Le filtre reprend la forme des pastilles du site: petit, discret,
          et il n'apparaît que parce qu'il y a plusieurs supports. */}
      <div className="mb-6 flex flex-wrap gap-2">
        {SUPPORTS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFiltre(s)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              filtre === s
                ? "border-marine bg-marine text-white"
                : "border-border text-foreground hover:border-ciel"
            }`}
          >
            {t(`supports.${s}`)}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {coupures.map((c) => (
          <li key={c.url}>
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition hover:border-ciel"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-xs uppercase tracking-wider text-ciel">
                  {c.media}
                  {c.date ? ` · ${afficherDate(c.date, (d) =>
                    c.date!.length > 7
                      ? f.dateTime(d, { day: "numeric", month: "long", year: "numeric" })
                      : f.dateTime(d, { month: "long", year: "numeric" }),
                  )}` : ""}
                </span>
                <span className="mt-1 block font-medium leading-snug text-marine">
                  {c.titre}
                </span>
              </span>
              <Chevron className="size-5 shrink-0 text-ciel transition group-hover:translate-x-1" />
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-muted">{t("presseNote")}</p>
    </div>
  );
}

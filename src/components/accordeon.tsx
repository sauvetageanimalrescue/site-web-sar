"use client";

import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";

export type ItemAccordeon = { question: string; reponse: string };

// Une question, une réponse repliée derrière un chevron : prend moins de
// place qu'une grille de cartes pour une longue liste de cas particuliers,
// et se lit comme les questions qu'on se pose vraiment avant d'appeler.
export function Accordeon({ items }: { items: ItemAccordeon[] }) {
  const [ouvert, setOuvert] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-surface">
      {items.map((item, i) => {
        const estOuvert = ouvert === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOuvert(estOuvert ? null : i)}
              aria-expanded={estOuvert}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-foreground"
            >
              {item.question}
              <IconChevronDown
                className={`size-4 shrink-0 text-muted transition ${estOuvert ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {estOuvert && (
              <p className="px-5 pb-4 text-sm leading-relaxed text-muted">
                {item.reponse}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

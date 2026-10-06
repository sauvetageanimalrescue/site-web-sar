"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  format?: "full" | "banner";
  chargement: string;
  erreur: string;
};

export function WidgetTirage({ format = "full", chargement, erreur }: Props) {
  const [messageErreur, setMessageErreur] = useState(false);
  const [chargementEnCours, setChargementEnCours] = useState(true);
  const conteneurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let actif = true;
    const observateur = new MutationObserver(() => {
      const contenu = conteneurRef.current?.textContent ?? "";
      if (contenu.includes("Unable to load raffle widget.")) {
        setMessageErreur(true);
        setChargementEnCours(false);
      } else if (conteneurRef.current?.childElementCount) {
        setChargementEnCours(false);
      }
    });

    if (conteneurRef.current) {
      observateur.observe(conteneurRef.current, { childList: true, subtree: true });
    }

    function chargerScript(adresse: string) {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = adresse;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Chargement impossible"));
        document.body.appendChild(script);
      });
    }

    async function chargerWidget() {
      try {
        if (!("jQuery" in window)) {
          await chargerScript("https://code.jquery.com/jquery-3.7.1.min.js");
        }
        if (!actif) return;

        await chargerScript("https://tirage.moitiemoitie.com/embed/embed.js");
        if (actif && !conteneurRef.current?.childElementCount) {
          setChargementEnCours(false);
        }
      } catch {
        if (actif) {
          setMessageErreur(true);
          setChargementEnCours(false);
        }
      }
    }

    void chargerWidget();

    return () => {
      actif = false;
      observateur.disconnect();
      conteneurRef.current?.replaceChildren();
    };
  }, [format]);

  return (
    <div className="w-full" aria-busy={chargementEnCours}>
      <div
        ref={conteneurRef}
        raffle-id="1084"
        raffle-format={format}
        display-logo={format === "banner" ? "true" : undefined}
        display-qrcode={format === "banner" ? "false" : undefined}
        lang="fr"
      />
      {chargementEnCours && <p role="status" className="sr-only">{chargement}</p>}
      {messageErreur && <p role="alert" className="mt-3 text-sm text-red-700">{erreur}</p>}
    </div>
  );
}

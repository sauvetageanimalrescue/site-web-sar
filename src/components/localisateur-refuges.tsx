"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { SOURCE_INTERDICTION, SOURCE_REFUGES, type Refuge } from "@/lib/refuges";

type Reponse = { adresseTrouvee?: string; ville?: string; refuges?: (Refuge & { distance: number })[]; interdiction?: boolean; erreur?: string };

export function LocalisateurRefuges() {
  const t = useTranslations("localisateur");
  const [adresse, setAdresse] = useState("");
  const [espece, setEspece] = useState("");
  const [rive, setRive] = useState("");
  const [charge, setCharge] = useState(false);
  const [reponse, setReponse] = useState<Reponse | null>(null);

  async function chercher(evenement: FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    setCharge(true);
    setReponse(null);
    try {
      const retour = await fetch("/api/localisateur-refuges", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adresse, espece, rive }),
      });
      setReponse(await retour.json() as Reponse);
    } catch { setReponse({ erreur: "geocodeur" }); }
    finally { setCharge(false); }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={chercher} className="space-y-5">
        <div>
          <label htmlFor="espece-refuge" className="mb-2 block font-semibold text-marine">{t("espece")}</label>
          <select id="espece-refuge" required value={espece} onChange={(e) => { setEspece(e.target.value); setReponse(null); }} className="w-full rounded-lg border border-border bg-white p-3">
            <option value="">{t("choisirEspece")}</option>
            {(["raton", "moufette", "renard", "coyote", "canide", "cerf", "autres"] as const).map((nom) => <option key={nom} value={nom}>{t(nom)}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="adresse-refuge" className="mb-2 block font-semibold text-marine">{t("adresse")}</label>
          <input id="adresse-refuge" required minLength={8} maxLength={180} value={adresse} onChange={(e) => { setAdresse(e.target.value); setReponse(null); }} placeholder={t("adresseExemple")} className="w-full rounded-lg border border-border bg-white p-3" />
        </div>
        <div>
          <label htmlFor="rive-refuge" className="mb-2 block font-semibold text-marine">{t("rive")}</label>
          <select id="rive-refuge" required value={rive} onChange={(e) => { setRive(e.target.value); setReponse(null); }} className="w-full rounded-lg border border-border bg-white p-3">
            <option value="">{t("choisirRive")}</option><option value="nord">{t("nord")}</option><option value="sud">{t("sud")}</option>
          </select>
          <p className="mt-2 text-sm text-muted">{t("riveAide")}</p>
        </div>
        <button disabled={charge} className="rounded-lg bg-marine px-6 py-3 font-bold text-white disabled:opacity-50">{charge ? t("recherche") : t("chercher")}</button>
      </form>

      <div aria-live="polite">
        {reponse?.erreur && <p className="rounded-lg bg-surface-2 p-4 text-marine">{t(`erreurs.${reponse.erreur}`)}</p>}
        {reponse?.interdiction && <div className="rounded-lg border border-border bg-surface-2 p-5 text-marine">
          <h3 className="font-[family-name:var(--font-titre)] text-xl font-bold uppercase">{t("interdictionTitre")}</h3>
          <p className="mt-2">{t("interdictionTexte", { ville: reponse.ville ?? "" })}</p>
          <a href={SOURCE_INTERDICTION} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-semibold text-ciel underline">{t("municipalites")}</a>
        </div>}
        {reponse?.refuges && <div>
          <h3 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase text-marine">{t("resultats")}</h3>
          <p className="mt-2 text-sm text-muted">{t("adresseTrouvee", { adresse: reponse.adresseTrouvee ?? "" })}</p>
          {reponse.refuges.length === 0 ? <p className="mt-5">{t("aucun")}</p> : <ul className="mt-5 space-y-4">
            {reponse.refuges.map((refuge) => <li key={refuge.nom} className="rounded-xl border border-border p-5">
              <h4 className="font-[family-name:var(--font-titre)] text-xl font-bold uppercase text-marine">{refuge.nom}</h4>
              <p className="mt-2">{refuge.adresse}</p>
              <p>{t("distance", { distance: refuge.distance })}</p>
              <p>{t("telephone")}: <a className="text-ciel underline" href={`tel:${refuge.telephone}`}>{refuge.telephone}</a></p>
              <a className="mt-2 inline-block text-ciel underline" href={`https://www.google.com/maps/search/?api=1&query=${refuge.latitude}%2C${refuge.longitude}`} target="_blank" rel="noopener noreferrer">{t("itineraire")}</a>
            </li>)}
          </ul>}
          <p className="mt-5 text-sm text-muted">{t("avantDeplacer")}</p>
        </div>}
      </div>
      <p className="text-sm text-muted">{t("sourceIntro")} <a href={SOURCE_REFUGES} target="_blank" rel="noopener noreferrer" className="underline">{t("sourceRefuges")}</a>. {t("sourceNote")} {t("sourceSansAdresse")}</p>
    </div>
  );
}

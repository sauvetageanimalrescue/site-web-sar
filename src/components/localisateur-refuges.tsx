"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { SOURCE_INTERDICTION, SOURCE_REFUGES, type Refuge } from "@/lib/refuges";

type Reponse = { adresseTrouvee?: string; ville?: string; rive?: "nord" | "sud"; refuges?: (Refuge & { distance: number })[]; interdiction?: boolean; erreur?: string };
type ElementGoogle = HTMLElement & { includedRegionCodes: string[]; placeholder: string };
type FenetreGoogle = Window & { google?: { maps: { importLibrary: (nom: string) => Promise<{ PlaceAutocompleteElement: new () => ElementGoogle }> } } };
type EvenementSelection = Event & { placePrediction: { toPlace: () => { fetchFields: (options: { fields: string[] }) => Promise<void>; formattedAddress?: string; location?: { lat: () => number; lng: () => number } } } };

export function LocalisateurRefuges({ cleGoogle }: { cleGoogle?: string }) {
  const t = useTranslations("localisateur");
  const [adresse, setAdresse] = useState("");
  const [pointGoogle, setPointGoogle] = useState<{ latitude: number; longitude: number } | null>(null);
  const [googlePret, setGooglePret] = useState(false);
  const [googleErreur, setGoogleErreur] = useState(false);
  const zoneGoogle = useRef<HTMLDivElement>(null);
  const [espece, setEspece] = useState("");
  const [charge, setCharge] = useState(false);
  const [reponse, setReponse] = useState<Reponse | null>(null);

  useEffect(() => {
    if (!cleGoogle || !googlePret || !zoneGoogle.current) return;
    const zone = zoneGoogle.current;
    let actif = true;
    let element: ElementGoogle | undefined;
    async function installer() {
      try {
        const fenetre = window as FenetreGoogle;
        if (!fenetre.google) throw new Error("Google Maps indisponible");
        const { PlaceAutocompleteElement } = await fenetre.google.maps.importLibrary("places");
        if (!actif) return;
        element = new PlaceAutocompleteElement();
        element.includedRegionCodes = ["ca"];
        element.placeholder = t("adresseExemple");
        element.setAttribute("aria-label", t("adresse"));
        element.style.width = "100%";
        element.addEventListener("input", () => { setAdresse(""); setPointGoogle(null); setReponse(null); });
        element.addEventListener("gmp-select", async (evenement) => {
          const place = (evenement as EvenementSelection).placePrediction.toPlace();
          await place.fetchFields({ fields: ["formattedAddress", "location"] });
          if (!actif || !place.location || !place.formattedAddress) return;
          setAdresse(place.formattedAddress);
          setPointGoogle({ latitude: place.location.lat(), longitude: place.location.lng() });
          setReponse(null);
        });
        zone.appendChild(element);
      } catch { if (actif) setGoogleErreur(true); }
    }
    void installer();
    return () => { actif = false; element?.remove(); };
  }, [cleGoogle, googlePret, t]);

  async function chercher(evenement: FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    setCharge(true);
    setReponse(null);
    try {
      const retour = await fetch("/api/localisateur-refuges", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adresse, espece, pointGoogle }),
      });
      setReponse(await retour.json() as Reponse);
    } catch { setReponse({ erreur: "geocodeur" }); }
    finally { setCharge(false); }
  }

  return (
    <div className="space-y-8">
      {cleGoogle && !googleErreur && <Script src={`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(cleGoogle)}&loading=async&v=weekly`} strategy="afterInteractive" onReady={() => setGooglePret(true)} onError={() => setGoogleErreur(true)} />}
      <form onSubmit={chercher} className="space-y-5">
        <div>
          <label htmlFor="espece-refuge" className="mb-2 block font-semibold text-marine">{t("espece")}</label>
          <select id="espece-refuge" required value={espece} onChange={(e) => { setEspece(e.target.value); setReponse(null); }} className="w-full rounded-lg border border-border bg-white p-3">
            <option value="">{t("choisirEspece")}</option>
            {(["raton", "moufette", "renardRoux", "renardGris", "coyote", "loup", "cerf"] as const).map((nom) => <option key={nom} value={nom}>{t(nom)}</option>)}
            <option disabled>{t("separateur")}</option>
            <option value="autres">{t("autres")}</option>
          </select>
          {["cerf", "coyote", "renardGris", "loup"].includes(espece) && <p className="mt-4 rounded-lg border border-border bg-white p-4 text-marine">{t("declaration")} <a href="https://www.quebec.ca/tourisme-loisirs-sport/activites-sportives-et-de-plein-air/chasse-sportive/regles-generales/animaux-declaration-obligatoire" target="_blank" rel="noopener noreferrer" className="font-semibold text-ciel underline">{t("declarationLien")}</a></p>}
        </div>
        <div>
          <label htmlFor={cleGoogle && !googleErreur ? undefined : "adresse-refuge"} className="mb-2 block font-semibold text-marine">{t("adresse")}</label>
          {cleGoogle && !googleErreur ? <>
            <div ref={zoneGoogle} />
            {adresse && <p className="mt-2 text-sm text-muted">{t("adresseChoisie", { adresse })}</p>}
          </> : <input id="adresse-refuge" required minLength={8} maxLength={180} value={adresse} onChange={(e) => { setAdresse(e.target.value); setPointGoogle(null); setReponse(null); }} placeholder={t("adresseExemple")} className="w-full rounded-lg border border-border bg-white p-3" />}
        </div>
        <button disabled={charge || (Boolean(cleGoogle) && !googleErreur && !pointGoogle)} className="rounded-lg bg-marine px-6 py-3 font-bold text-white disabled:opacity-50">{charge ? t("recherche") : t("chercher")}</button>
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
          <p className="mt-1 text-sm text-muted">{t("riveTrouvee", { rive: t(reponse.rive ?? "nord") })}</p>
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

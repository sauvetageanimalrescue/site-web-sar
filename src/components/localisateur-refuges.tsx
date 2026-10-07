"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Script from "next/script";
import { useLocale, useTranslations } from "next-intl";
import { SOURCE_REFUGES, type Refuge } from "@/lib/refuges";

type Reponse = { adresseTrouvee?: string; refuges?: (Refuge & { distance: number })[]; erreur?: string };
type ElementGoogle = HTMLElement & { includedRegionCodes: string[]; placeholder: string };
type FenetreGoogle = Window & { google?: { maps: { importLibrary: (nom: string) => Promise<{ PlaceAutocompleteElement: new () => ElementGoogle }> } } };
type EvenementSelection = Event & { placePrediction: { toPlace: () => { fetchFields: (options: { fields: string[] }) => Promise<void>; formattedAddress?: string; location?: { lat: () => number; lng: () => number } } } };

export function LocalisateurRefuges({ cleGoogle }: { cleGoogle?: string }) {
  const t = useTranslations("localisateur");
  const locale = useLocale();
  const [adresse, setAdresse] = useState("");
  const [pointGoogle, setPointGoogle] = useState<{ latitude: number; longitude: number } | null>(null);
  const [googlePret, setGooglePret] = useState(false);
  const [googleErreur, setGoogleErreur] = useState(false);
  const zoneGoogle = useRef<HTMLDivElement>(null);
  const versionAdresse = useRef(0);
  const [charge, setCharge] = useState(false);
  const [reponse, setReponse] = useState<Reponse | null>(null);

  useEffect(() => {
    if (!cleGoogle || !googlePret || googleErreur || !zoneGoogle.current) return;
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
        element.addEventListener("input", () => { versionAdresse.current++; setAdresse(""); setPointGoogle(null); setReponse(null); });
        element.addEventListener("gmp-error", () => { if (actif) setGoogleErreur(true); });
        element.addEventListener("gmp-select", async (evenement) => {
          const version = ++versionAdresse.current;
          setPointGoogle(null);
          setReponse(null);
          try {
            const place = (evenement as EvenementSelection).placePrediction.toPlace();
            await place.fetchFields({ fields: ["formattedAddress", "location"] });
            if (!actif || version !== versionAdresse.current) return;
            if (!place.location || !place.formattedAddress) throw new Error("Adresse imprécise");
            setAdresse(place.formattedAddress);
            setPointGoogle({ latitude: place.location.lat(), longitude: place.location.lng() });
          } catch { if (actif && version === versionAdresse.current) setReponse({ erreur: "adresse" }); }
        });
        zone.appendChild(element);
      } catch { if (actif) setGoogleErreur(true); }
    }
    void installer();
    return () => { actif = false; element?.remove(); };
  }, [cleGoogle, googlePret, googleErreur, t]);

  async function chercher(evenement: FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    if (charge || (cleGoogle && !googleErreur && !pointGoogle)) return;
    const version = versionAdresse.current;
    setCharge(true);
    setReponse(null);
    try {
      const retour = await fetch("/api/localisateur-refuges", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adresse, pointGoogle }),
        signal: AbortSignal.timeout(12000),
      });
      const resultat = await retour.json() as Reponse;
      if (version === versionAdresse.current) setReponse(resultat);
    } catch { if (version === versionAdresse.current) setReponse({ erreur: "geocodeur" }); }
    finally { setCharge(false); }
  }

  return (
    <div className="space-y-8">
      {cleGoogle && !googleErreur && <Script src={`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(cleGoogle)}&loading=async&v=weekly`} strategy="afterInteractive" onReady={() => setGooglePret(true)} onError={() => setGoogleErreur(true)} />}
      <form onSubmit={chercher} className="space-y-5">
        <div>
          <label htmlFor={cleGoogle && !googleErreur ? undefined : "adresse-refuge"} className="mb-2 block font-semibold text-marine">{t("adresse")}</label>
          {cleGoogle && !googleErreur ? <>
            <div ref={zoneGoogle} />
            <p className="mt-2 text-sm text-muted">{t(googlePret ? "adresseAide" : "googleChargement")}</p>
            {adresse && <p className="mt-2 text-sm text-muted">{t("adresseChoisie", { adresse })}</p>}
          </> : <>
            <input id="adresse-refuge" required minLength={8} maxLength={180} value={adresse} onChange={(e) => { versionAdresse.current++; setAdresse(e.target.value); setPointGoogle(null); setReponse(null); }} placeholder={t("adresseExemple")} className="w-full rounded-lg border border-border bg-white p-3" />
            <p className="mt-2 text-sm text-muted">{t("googleIndisponible")}</p>
          </>}
        </div>
        <button disabled={charge || (Boolean(cleGoogle) && !googleErreur && !pointGoogle)} className="rounded-lg bg-marine px-6 py-3 font-bold text-white disabled:opacity-50">{charge ? t("recherche") : t("chercher")}</button>
      </form>

      <div aria-live="polite">
        {reponse?.erreur && <p className="rounded-lg bg-surface-2 p-4 text-marine">{t(`erreurs.${reponse.erreur}`)}</p>}
        {reponse?.refuges && <div>
          <h3 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase text-marine">{t("resultats")}</h3>
          <p className="mt-2 text-sm text-muted">{t("adresseTrouvee", { adresse: reponse.adresseTrouvee ?? "" })}</p>
          {reponse.refuges.length === 0 ? <p className="mt-5">{t("aucun")}</p> : <ul className="mt-5 divide-y divide-gray-300">
            {reponse.refuges.map((refuge) => <li key={refuge.nom} className="space-y-2 py-6 break-words">
              <p className="text-lg font-bold text-marine">{t("distance", { distance: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(refuge.distance) })}</p>
              <h4 className="font-[family-name:var(--font-titre)] text-xl font-bold uppercase text-marine">{refuge.nom}</h4>
              <p className="mt-2">{refuge.adresse}</p>
              <p>{t("telephone")}: <a className="text-ciel underline" href={`tel:${refuge.telephone}`}>{refuge.telephone}</a></p>
              {refuge.courriel && <p>{t("courriel")}: <a className="text-ciel underline" href={`mailto:${refuge.courriel}`}>{refuge.courriel}</a></p>}
              {refuge.siteWeb && <p>{t("siteWeb")}: <a className="text-ciel underline" href={refuge.siteWeb} target="_blank" rel="noopener noreferrer">{refuge.siteWeb}</a></p>}
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

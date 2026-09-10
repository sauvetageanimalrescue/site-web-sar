"use client";

import { useActionState, useEffect, useState } from "react";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { demarrerFormation, type EtatPaiement } from "@/lib/actions/adhesion";
import type { FormationDisponible } from "@/lib/formations";

const CLASSE_CHAMP =
  "w-full rounded-md border border-border bg-surface px-3 py-2.5 text-foreground outline-none transition focus:border-ciel focus:ring-2 focus:ring-ciel/30";

function dateLongue(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("fr-CA", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

function disponibilite(restantes: number) {
  if (restantes === 0) return { classe: "bg-muted", texte: "Complet" };
  if (restantes <= 3) return { classe: "bg-urgence", texte: `${restantes} place${restantes > 1 ? "s" : ""} disponible${restantes > 1 ? "s" : ""}` };
  if (restantes <= 10) return { classe: "bg-amber-500", texte: `${restantes} places disponibles` };
  return { classe: "bg-emerald-600", texte: `${restantes} places disponibles` };
}

export function FormulaireFormation({ initiales }: { initiales: FormationDisponible[] }) {
  const [formations, setFormations] = useState(initiales);
  const [choix, setChoix] = useState(initiales[0]?.id ?? "");
  const [etat, action, enCours] = useActionState<EtatPaiement, FormData>(demarrerFormation, { etat: "inactif" });

  useEffect(() => {
    const actualiser = async () => {
      const reponse = await fetch("/api/formations", { cache: "no-store" });
      if (!reponse.ok) return;
      const prochaines = (await reponse.json()) as FormationDisponible[];
      setFormations(prochaines);
      setChoix((courant) => prochaines.some((f) => f.id === courant && f.restantes > 0)
        ? courant
        : prochaines.find((f) => f.restantes > 0)?.id ?? "");
    };
    const intervalle = window.setInterval(actualiser, 15000);
    return () => window.clearInterval(intervalle);
  }, []);

  const ouvertes = formations.filter((formation) => formation.restantes > 0);

  return (
    <form action={action} className="space-y-7">
      {etat.etat === "erreur" && (
        <p className="flex items-start gap-2 rounded-md border border-urgence bg-urgence-doux p-4 text-sm text-urgence">
          <IconAlertTriangleFilled className="mt-0.5 size-5 shrink-0" aria-hidden />
          {etat.motif === "complet" ? "Cette formation vient d’être remplie. Choisissez une autre date." : etat.motif === "champs" ? "Remplissez tous les champs obligatoires." : "Le paiement n’a pas pu être démarré. Réessayez dans un instant."}
        </p>
      )}

      <fieldset className="space-y-3">
        <legend className="font-semibold text-marine">Choisissez votre formation</legend>
        <div className="space-y-3">
          {formations.map((formation) => {
            const etatPlace = disponibilite(formation.restantes);
            const selectionnee = choix === formation.id;
            return (
              <label key={formation.id} className={`block rounded-md border p-4 transition ${formation.restantes > 0 ? "cursor-pointer border-border hover:border-ciel" : "cursor-not-allowed border-border opacity-60"} ${selectionnee ? "border-ciel bg-ciel/5" : ""}`}>
                <div className="flex items-start gap-3">
                  <input type="radio" name="formation" value={formation.id} checked={selectionnee} onChange={() => setChoix(formation.id)} disabled={formation.restantes === 0} className="mt-1 size-4" required />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-marine">{dateLongue(formation.date_debut)} et {dateLongue(formation.date_fin)}</span>
                    <span className="mt-1 block text-sm text-muted">10h à 18h les deux journées • 249,99$</span>
                    <span className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground"><span className={`size-2.5 rounded-full ${etatPlace.classe}`} aria-hidden />{etatPlace.texte}</span>
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="space-y-5 border-t border-border pt-6">
        <legend className="font-semibold text-marine">Vos coordonnées</legend>
        <p className="text-sm text-muted">Elles servent à confirmer votre inscription et à vous joindre au besoin avant la formation.</p>
        <div className="grid gap-5 sm:grid-cols-2"><Champ nom="prenom" libelle="Prénom" /><Champ nom="nom" libelle="Nom" /></div>
        <div className="grid gap-5 sm:grid-cols-2"><Champ nom="courriel" libelle="Courriel" type="email" /><Champ nom="telephone" libelle="Téléphone" type="tel" /></div>
      </fieldset>

      <button type="submit" disabled={enCours || !ouvertes.length} className="w-full rounded-md bg-marine px-6 py-3.5 font-semibold text-white transition hover:bg-marine-clair disabled:opacity-60">
        {enCours ? "Redirection vers le paiement..." : "Réserver ma place • 249,99$"}
      </button>
      <p className="text-center text-xs text-muted">Après le paiement, vous recevrez votre confirmation et toutes les consignes pratiques par courriel.</p>
    </form>
  );
}

function Champ({ nom, libelle, type = "text" }: { nom: string; libelle: string; type?: string }) {
  return <label className="block"><span className="mb-1 block text-sm font-medium">{libelle}</span><input name={nom} type={type} required className={CLASSE_CHAMP} /></label>;
}

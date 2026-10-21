-- À appliquer avant le code : Stripe peut confirmer une commande entièrement réduite.
alter table public.commandes drop constraint if exists commandes_montant_cents_check;
alter table public.commandes add constraint commandes_montant_cents_check check (montant_cents >= 0);
alter table public.commandes add column if not exists sous_total_cents int;
alter table public.commandes add column if not exists rabais_cents int;
alter table public.commandes add column if not exists taxes_cents int;

-- SECURITY INVOKER conserve les droits des tables et leur RLS existants.
-- Le verrou de commande sérialise les livraisons simultanées du webhook.
create or replace function public.confirmer_commande_formation(
  p_commande_id uuid, p_session_id text, p_formation_id uuid,
  p_montant_cents int, p_sous_total_cents int, p_rabais_cents int,
  p_taxes_cents int, p_paiement_id text
) returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  commande public.commandes%rowtype;
  inscription public.inscriptions_formation%rowtype;
  disponible boolean;
begin
  select * into commande from public.commandes where id = p_commande_id for update;
  if not found or commande.type <> 'formation'
      or commande.stripe_session_id is distinct from p_session_id
      or commande.metadonnees->>'formation_id' is distinct from p_formation_id::text then
    raise exception 'Commande de formation incompatible';
  end if;
  if p_montant_cents is null or p_montant_cents < 0
      or p_sous_total_cents is null or p_sous_total_cents < 0
      or p_rabais_cents is null or p_rabais_cents < 0
      or p_taxes_cents is null or p_taxes_cents < 0 then
    raise exception 'Montants invalides';
  end if;
  if commande.statut in ('remboursee', 'annulee') then
    return jsonb_build_object('nouvelle', false, 'statut', commande.statut);
  end if;
  select * into inscription from public.inscriptions_formation where commande_id = p_commande_id;
  if found then
    return jsonb_build_object('nouvelle', false, 'statut', inscription.statut);
  end if;

  update public.formations set places_vendues = places_vendues + 1
    where id = p_formation_id and publie and places_vendues < places;
  disponible := found;

  insert into public.inscriptions_formation
    (formation_id, commande_id, prenom, nom, courriel, telephone,
     manuel_imprime, carte_participation, langue, statut)
  values
    (p_formation_id, commande.id, commande.prenom, commande.nom, commande.courriel,
     coalesce(commande.metadonnees->>'telephone', ''),
     coalesce((commande.metadonnees->>'manuel_imprime')::boolean, false),
     coalesce((commande.metadonnees->>'carte_participation')::boolean, false),
     commande.langue, case when disponible then 'confirmee' else 'annulee' end);

  update public.commandes set statut = 'payee', payee_le = now(),
    montant_cents = p_montant_cents, sous_total_cents = p_sous_total_cents,
    rabais_cents = p_rabais_cents, taxes_cents = p_taxes_cents,
    stripe_paiement_id = p_paiement_id
    where id = commande.id;
  return jsonb_build_object('nouvelle', true, 'statut', case when disponible then 'confirmee' else 'annulee' end);
end;
$$;

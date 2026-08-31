-- Le responsable de la reservation peut etre different des participants.
-- Les renseignements ci-dessous conservent aussi la preuve d'autorisation
-- lorsqu'au moins un participant est mineur.
alter table public.inscriptions_stage
  add column if not exists scenario text,
  add column if not exists responsable_prenom text,
  add column if not exists responsable_nom text,
  add column if not exists participant1_prenom text,
  add column if not exists participant1_nom text,
  add column if not exists participant2_prenom text,
  add column if not exists participant2_nom text,
  add column if not exists autorisation_requise boolean not null default false,
  add column if not exists autorisation_signature text,
  add column if not exists autorisation_signee_le timestamptz,
  add column if not exists autorisation_texte text,
  add column if not exists billet1_jeton uuid,
  add column if not exists billet2_jeton uuid;

create unique index if not exists inscriptions_stage_commande_unique
  on public.inscriptions_stage (commande_id)
  where commande_id is not null;

create unique index if not exists inscriptions_stage_billet1_unique
  on public.inscriptions_stage (billet1_jeton)
  where billet1_jeton is not null;

create unique index if not exists inscriptions_stage_billet2_unique
  on public.inscriptions_stage (billet2_jeton)
  where billet2_jeton is not null;

-- Reserve une ou deux places en une seule operation atomique.
create or replace function public.reserver_places_stage(
  p_stage_id uuid,
  p_nombre_places int
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  mis_a_jour int;
begin
  if p_nombre_places not in (1, 2) then
    return false;
  end if;

  update public.stages
     set places_vendues = places_vendues + p_nombre_places
   where id = p_stage_id
     and places_vendues + p_nombre_places <= places;
  get diagnostics mis_a_jour = row_count;
  return mis_a_jour > 0;
end;
$$;

grant execute on function public.reserver_places_stage(uuid, int) to service_role;

-- Compatibilite avec les appels plus anciens.
create or replace function public.reserver_place_stage(p_stage_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select public.reserver_places_stage(p_stage_id, 1);
$$;

grant execute on function public.reserver_place_stage(uuid) to service_role;

-- Formations payantes : calendrier public, capacite et inscriptions.
-- Les reservations sont confirmees uniquement par le webhook Stripe.

alter table public.commandes drop constraint if exists commandes_type_check;
alter table public.commandes
  add constraint commandes_type_check
  check (type in ('carte_membre', 'don', 'don_mensuel', 'stage', 'partenariat', 'formation'));

create table if not exists public.formations (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  titre text not null,
  date_debut date not null,
  date_fin date not null,
  heure_debut time not null default '10:00',
  heure_fin time not null default '18:00',
  lieu text not null,
  places int not null default 25 check (places >= 0),
  places_vendues int not null default 0 check (places_vendues >= 0),
  prix_cents int not null check (prix_cents > 0),
  publie boolean not null default true,
  check (date_fin >= date_debut)
);

create table if not exists public.inscriptions_formation (
  id uuid primary key default gen_random_uuid(),
  cree_le timestamptz not null default now(),
  formation_id uuid not null references public.formations(id) on delete restrict,
  commande_id uuid references public.commandes(id) on delete set null,
  prenom text not null,
  nom text not null,
  courriel text not null,
  telephone text not null,
  manuel_imprime boolean not null default false,
  carte_participation boolean not null default false,
  langue text not null default 'fr' check (langue in ('fr', 'en', 'es')),
  statut text not null default 'confirmee'
    check (statut in ('confirmee', 'annulee', 'presente', 'absente'))
);

create index if not exists formations_dates_idx on public.formations (date_debut);
create index if not exists inscriptions_formation_idx on public.inscriptions_formation (formation_id);
create unique index if not exists inscriptions_formation_commande_unique
  on public.inscriptions_formation (commande_id)
  where commande_id is not null;

alter table public.formations enable row level security;
alter table public.inscriptions_formation enable row level security;

drop policy if exists "Les formations publiees sont lisibles" on public.formations;
create policy "Les formations publiees sont lisibles"
  on public.formations for select using (publie = true);

grant select on public.formations to anon, authenticated;
grant select, insert, update, delete on public.formations to service_role;
grant select, insert, update, delete on public.inscriptions_formation to service_role;

-- Une seule instruction atomique empeche de confirmer une 26e inscription.
create or replace function public.reserver_place_formation(p_formation_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  mis_a_jour int;
begin
  update public.formations
     set places_vendues = places_vendues + 1
   where id = p_formation_id
     and publie = true
     and places_vendues < places;
  get diagnostics mis_a_jour = row_count;
  return mis_a_jour > 0;
end;
$$;

grant execute on function public.reserver_place_formation(uuid) to service_role;

insert into public.formations
  (code, titre, date_debut, date_fin, heure_debut, heure_fin, lieu, places, prix_cents)
values
  ('PSA-2611', 'Premiers Secours Animal', '2026-11-28', '2026-11-29', '10:00', '18:00', 'College Ellis, campus de Montreal, 760 rue Saint-Zotique Est, Montreal (Quebec) H2S 1M5', 25, 24999),
  ('PSA-2702', 'Premiers Secours Animal', '2027-02-20', '2027-02-21', '10:00', '18:00', 'College Ellis, campus de Montreal, 760 rue Saint-Zotique Est, Montreal (Quebec) H2S 1M5', 25, 24999)
on conflict (code) do update set
  titre = excluded.titre,
  date_debut = excluded.date_debut,
  date_fin = excluded.date_fin,
  heure_debut = excluded.heure_debut,
  heure_fin = excluded.heure_fin,
  lieu = excluded.lieu,
  places = excluded.places,
  prix_cents = excluded.prix_cents,
  publie = true;

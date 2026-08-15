-- Stages d'observation : une date, un nombre de places, des inscriptions.
-- Remplace les « produits » Shopify créés à la main pour chaque date.

create table if not exists public.stages (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  date_stage date not null,
  heure_debut time not null default '10:00',
  heure_fin time not null default '18:00',
  lieu text not null default '5400, rue Jean-Talon Ouest, Montréal',
  places int not null default 1 check (places >= 0),
  places_vendues int not null default 0 check (places_vendues >= 0),
  prix_cents int not null default 22000,
  publie boolean not null default true
);

create index if not exists stages_date_idx on public.stages (date_stage);

create table if not exists public.inscriptions_stage (
  id uuid primary key default gen_random_uuid(),
  cree_le timestamptz not null default now(),
  stage_id uuid not null references public.stages(id) on delete restrict,
  commande_id uuid references public.commandes(id) on delete set null,

  prenom text not null,
  nom text not null,
  courriel text not null,
  telephone text not null,
  -- Le tarif couvre une ou deux personnes : le nom de l'accompagnateur est
  -- requis pour la décharge de responsabilité signée sur place.
  accompagnateur_nom text,
  langue text not null default 'fr' check (langue in ('fr', 'en', 'es')),
  statut text not null default 'confirmee'
    check (statut in ('confirmee', 'annulee', 'presente', 'absente'))
);

create index if not exists inscriptions_stage_idx on public.inscriptions_stage (stage_id);

alter table public.stages enable row level security;
alter table public.inscriptions_stage enable row level security;

-- Le calendrier des stages est public : dates, prix et places restantes.
drop policy if exists "Les stages publies sont lisibles" on public.stages;
create policy "Les stages publies sont lisibles"
  on public.stages for select
  using (publie = true);

grant select on public.stages to anon, authenticated;
grant select, insert, update, delete on public.stages to service_role;
grant select, insert, update, delete on public.inscriptions_stage to service_role;

-- Réservation d'une place, appelée par le webhook Stripe une fois le paiement
-- confirmé. La condition sur places_vendues empêche la survente en cas de
-- deux paiements simultanés sur la dernière place.
create or replace function public.reserver_place_stage(p_stage_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  mis_a_jour int;
begin
  update public.stages
     set places_vendues = places_vendues + 1
   where id = p_stage_id
     and places_vendues < places;
  get diagnostics mis_a_jour = row_count;
  return mis_a_jour > 0;
end;
$$;

grant execute on function public.reserver_place_stage(uuid) to service_role;

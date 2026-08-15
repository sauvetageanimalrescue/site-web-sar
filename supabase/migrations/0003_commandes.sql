-- Transactions Stripe : cartes de membre, dons, stages, partenariats.
-- Une commande est créée à l'ouverture de la session de paiement, puis
-- confirmée par le webhook Stripe. On garde la trace des deux états pour
-- pouvoir enquêter sur un paiement qui n'a jamais abouti.

create table if not exists public.commandes (
  id uuid primary key default gen_random_uuid(),
  cree_le timestamptz not null default now(),
  payee_le timestamptz,

  type text not null
    check (type in ('carte_membre', 'don', 'don_mensuel', 'stage', 'partenariat')),
  statut text not null default 'ouverte'
    check (statut in ('ouverte', 'payee', 'echouee', 'remboursee', 'annulee')),

  montant_cents int not null check (montant_cents > 0),
  devise text not null default 'cad',

  courriel text not null,
  prenom text,
  nom text,
  langue text not null default 'fr' check (langue in ('fr', 'en', 'es')),

  stripe_session_id text unique,
  stripe_paiement_id text,
  stripe_abonnement_id text,

  -- Rattachements optionnels selon le type de commande.
  membre_id uuid references public.membres(id) on delete set null,
  stage_id uuid,

  metadonnees jsonb not null default '{}'::jsonb
);

create index if not exists commandes_statut_idx on public.commandes (statut, cree_le desc);
create index if not exists commandes_courriel_idx on public.commandes (lower(courriel));

alter table public.commandes enable row level security;

grant select, insert, update, delete on public.commandes to service_role;

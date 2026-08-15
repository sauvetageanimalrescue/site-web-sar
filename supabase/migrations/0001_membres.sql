-- Base du site public sar.quebec (projet Supabase distinct du registre des
-- missions : les membres du public ne partagent pas la table auth.users des
-- intervenants).
--
-- Toutes les migrations de ce dossier sont collées à la main dans l'éditeur
-- SQL de Supabase, donc elles doivent rester idempotentes.

-- Numéro de membre séquentiel, format AAAA-NNNNN, réinitialisé chaque année.
create table if not exists public.membre_compteurs (
  annee smallint primary key,
  dernier_sequentiel int not null default 0
);

create or replace function public.generer_numero_membre(p_annee smallint)
returns text
language plpgsql
as $$
declare
  prochain_sequentiel int;
begin
  insert into public.membre_compteurs (annee, dernier_sequentiel)
  values (p_annee, 1)
  on conflict (annee) do update
    set dernier_sequentiel = public.membre_compteurs.dernier_sequentiel + 1
  returning dernier_sequentiel into prochain_sequentiel;

  return p_annee::text || '-' || lpad(prochain_sequentiel::text, 5, '0');
end;
$$;

create table if not exists public.membres (
  id uuid primary key default gen_random_uuid(),
  -- Lien vers le compte de connexion. Nul tant que la personne n'a pas activé
  -- son espace membre : on peut acheter une carte sans créer de compte.
  utilisateur_id uuid unique references auth.users(id) on delete set null,
  numero text unique not null,
  annee smallint not null,
  cree_le timestamptz not null default now(),
  expire_le date not null,

  prenom text not null,
  nom text not null,
  courriel text not null,
  telephone text,
  ville text,
  code_postal text,
  langue text not null default 'fr' check (langue in ('fr', 'en', 'es')),

  statut text not null default 'actif'
    check (statut in ('actif', 'expire', 'annule')),

  -- Stripe : client, paiement initial et abonnement de renouvellement.
  stripe_client_id text,
  stripe_paiement_id text,
  stripe_abonnement_id text,
  renouvellement_auto boolean not null default false,

  -- Jeton opaque du code QR de la carte : permet de vérifier une carte sans
  -- exposer l'identifiant interne ni le courriel du membre.
  jeton_verification text not null default encode(gen_random_bytes(16), 'hex'),

  carte_envoyee_le timestamptz
);

create index if not exists membres_courriel_idx on public.membres (lower(courriel));
create index if not exists membres_jeton_idx on public.membres (jeton_verification);
create index if not exists membres_annee_idx on public.membres (annee, statut);

alter table public.membres enable row level security;

-- Un membre connecté ne voit que sa propre fiche.
drop policy if exists "Un membre lit sa fiche" on public.membres;
create policy "Un membre lit sa fiche"
  on public.membres for select
  using (auth.uid() = utilisateur_id);

drop policy if exists "Un membre met a jour ses coordonnees" on public.membres;
create policy "Un membre met a jour ses coordonnees"
  on public.membres for update
  using (auth.uid() = utilisateur_id)
  with check (auth.uid() = utilisateur_id);

grant select, update on public.membres to authenticated;
grant select, insert, update, delete on public.membres to service_role;
grant select, insert, update on public.membre_compteurs to service_role;
grant execute on function public.generer_numero_membre(smallint) to service_role;

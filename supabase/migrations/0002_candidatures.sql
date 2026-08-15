-- Candidatures reçues par le formulaire de recrutement.

create table if not exists public.candidatures (
  id uuid primary key default gen_random_uuid(),
  cree_le timestamptz not null default now(),

  poste text not null
    check (poste in ('repartiteur', 'messager', 'eclaireur', 'patrouilleur', 'sauveteur')),
  statut text not null default 'nouvelle'
    check (statut in ('nouvelle', 'en_examen', 'entrevue', 'acceptee', 'refusee', 'archivee')),

  prenom text not null,
  nom text not null,
  courriel text not null,
  telephone text not null,
  ville text not null,
  code_postal text,
  date_naissance date,
  langue text not null default 'fr' check (langue in ('fr', 'en', 'es')),

  -- Conditions matérielles vérifiées à l'inscription : elles déterminent les
  -- postes réellement accessibles à la personne.
  a_vehicule boolean not null default false,
  a_permis boolean not null default false,
  disponibilites text[] not null default '{}',

  experience text,
  motivation text,
  reference text,

  notes_internes text,
  traite_le timestamptz
);

create index if not exists candidatures_statut_idx on public.candidatures (statut, cree_le desc);
create index if not exists candidatures_poste_idx on public.candidatures (poste);

alter table public.candidatures enable row level security;

-- Aucune politique de lecture publique : les candidatures ne sont consultées
-- que par le service_role, côté serveur.
grant select, insert, update, delete on public.candidatures to service_role;

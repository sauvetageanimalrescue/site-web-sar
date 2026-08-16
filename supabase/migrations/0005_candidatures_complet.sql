-- Aligne la table des candidatures sur le formulaire réellement utilisé par
-- l'organisation (JotForm « Recrutement »). Idempotente : elle peut être
-- collée plusieurs fois sans dommage.

alter table public.candidatures
  add column if not exists adresse_rue text,
  add column if not exists province text,
  add column if not exists occupation text,
  add column if not exists disponibilites_texte text,
  add column if not exists experience_animaux text[] not null default '{}',
  add column if not exists experience_connexe text[] not null default '{}',
  add column if not exists experience_connexe_texte text,
  add column if not exists photo_url text,
  add column if not exists confirme_selection boolean not null default false,
  add column if not exists confirme_majeur boolean not null default false;

-- « Patrouilleur » est devenu « Secouriste » ; « Éclaireur » est un grade et
-- non un poste. Les anciennes valeurs restent acceptées pour ne pas invalider
-- les candidatures déjà reçues.
alter table public.candidatures drop constraint if exists candidatures_poste_check;
alter table public.candidatures add constraint candidatures_poste_check
  check (poste in (
    'repartiteur', 'messager', 'secouriste', 'sauveteur',
    'eclaireur', 'patrouilleur'
  ));

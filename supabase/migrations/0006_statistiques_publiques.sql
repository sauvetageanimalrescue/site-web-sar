-- Statistiques publiques pour le site sar.quebec
--
-- Le site public a besoin de compteurs (jour / semaine / mois / année) sans
-- jamais voir une ligne de la table missions : aucune information sur le
-- demandeur, aucune adresse. On expose donc deux fonctions SECURITY DEFINER
-- qui ne retournent que des agrégats, et on les accorde au rôle anon.
--
-- Un animal est considéré « sauvé » quand la mission est fermée avec un code
-- de fin 10-70 à 10-75 (capturé, remis au propriétaire, libéré sur place,
-- relocalisé, remis au service animalier, remis au refuge). Les codes 10-76 à
-- 10-79 (enfui, inatteignable, disposé, décédé) et les codes 10-80+ (service
-- non requis) ne comptent pas.

create or replace function public.codes_fin_succes()
returns text[]
language sql
immutable
as $$
  select array['10-70', '10-71', '10-72', '10-73', '10-74', '10-75']::text[];
$$;

-- Nombre d'animaux effectivement sauvés dans une mission : les adultes et les
-- juvéniles pris en charge, moins ceux qui n'ont pas survécu.
--
-- Le décompte n'est pas toujours saisi sur le terrain. Quand aucun effectif
-- n'a été noté, une mission fermée avec un code de succès a forcément porté
-- sur au moins un animal : on compte 1 par défaut. Un décès noté ramène
-- quand même le résultat à 0, pour ne jamais gonfler le compteur.
create or replace function public.animaux_sauves(
  p_adultes smallint,
  p_juveniles smallint,
  p_deces smallint
)
returns int
language sql
immutable
as $$
  select greatest(
    case
      when coalesce(p_adultes, 0) + coalesce(p_juveniles, 0) = 0 then 1
      else coalesce(p_adultes, 0) + coalesce(p_juveniles, 0)
    end - coalesce(p_deces, 0),
    0
  );
$$;

create or replace function public.statistiques_publiques()
returns json
language sql
security definer
set search_path = public
as $$
  with reussies as (
    select
      m.fermee_at at time zone 'America/Toronto' as ferme_local,
      m.espece_code,
      public.animaux_sauves(m.nb_adultes, m.nb_juveniles, m.nb_deces) as sauves
    from public.missions m
    where m.statut = 'fermee'
      and m.fermee_at is not null
      and m.code_fin = any (public.codes_fin_succes())
  ),
  maintenant as (
    select (now() at time zone 'America/Toronto') as local
  )
  select json_build_object(
    'jour', (
      select coalesce(sum(sauves), 0) from reussies, maintenant
      where ferme_local >= date_trunc('day', local)
    ),
    'semaine', (
      select coalesce(sum(sauves), 0) from reussies, maintenant
      where ferme_local >= date_trunc('week', local)
    ),
    'mois', (
      select coalesce(sum(sauves), 0) from reussies, maintenant
      where ferme_local >= date_trunc('month', local)
    ),
    'annee', (
      select coalesce(sum(sauves), 0) from reussies, maintenant
      where ferme_local >= date_trunc('year', local)
    ),
    'total', (select coalesce(sum(sauves), 0) from reussies),
    'missions_annee', (
      select count(*) from reussies, maintenant
      where ferme_local >= date_trunc('year', local)
    ),
    -- Répartition par grande famille d'espèces. Le code espèce est à deux
    -- chiffres et la dizaine donne la famille (10 domestiques, 20 faune
    -- urbaine, 30 petite faune, 40 oiseaux sauvages, 50 ferme, 60 exotiques,
    -- 70 marins). Exception : « Déclaration obligatoire » couvre 80 à 99 d'un
    -- seul tenant, donc tout code >= 80 est ramené à la famille 80.
    'familles', (
      select coalesce(json_agg(f order by f.sauves desc), '[]'::json)
      from (
        select
          case
            when espece_code is null or espece_code !~ '^\d{2}$' then '00'
            when espece_code >= '80' then '80'
            else left(espece_code, 1) || '0'
          end as famille,
          sum(sauves)::int as sauves
        from reussies, maintenant
        where ferme_local >= date_trunc('year', local)
        group by 1
        having sum(sauves) > 0
      ) f
    ),
    -- Douze derniers mois glissants, pour le graphique de la page statistiques.
    'mensuel', (
      select coalesce(json_agg(m order by m.mois), '[]'::json)
      from (
        select
          to_char(date_trunc('month', ferme_local), 'YYYY-MM') as mois,
          sum(sauves)::int as sauves
        from reussies, maintenant
        where ferme_local >= date_trunc('month', local) - interval '11 months'
        group by 1
      ) m
    ),
    'genere_a', now()
  );
$$;

-- Fil des dernières interventions réussies, anonymisé : ni demandeur, ni
-- adresse, ni coordonnées. Seulement la ville, l'espèce et le moment.
create or replace function public.interventions_recentes(p_limite int default 8)
returns table (
  ferme_a timestamptz,
  ville text,
  espece_code text,
  code_fin text,
  sauves int
)
language sql
security definer
set search_path = public
as $$
  select
    m.fermee_at,
    m.ville,
    m.espece_code,
    m.code_fin,
    public.animaux_sauves(m.nb_adultes, m.nb_juveniles, m.nb_deces)
  from public.missions m
  where m.statut = 'fermee'
    and m.fermee_at is not null
    and m.code_fin = any (public.codes_fin_succes())
  order by m.fermee_at desc
  limit least(greatest(coalesce(p_limite, 8), 1), 50);
$$;

grant execute on function public.codes_fin_succes() to anon, authenticated;
grant execute on function public.animaux_sauves(smallint, smallint, smallint) to anon, authenticated;
grant execute on function public.statistiques_publiques() to anon, authenticated;
grant execute on function public.interventions_recentes(int) to anon, authenticated;

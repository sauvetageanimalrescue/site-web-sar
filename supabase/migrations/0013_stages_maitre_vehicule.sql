-- Chaque date de stage est maintenant rattachée à un maître de stage et à
-- son véhicule : la capacité (nombre de places) dépend de qui est présent
-- ce jour-là, pas d'une valeur fixe pour tous les stages.
alter table public.stages
  add column if not exists maitre_stage text,
  add column if not exists vehicule text;

-- La réservation à deux personnes garde le nom de l'accompagnateur, mais on
-- sépare maintenant prénom et nom, et on note si chaque personne est
-- mineure (un consentement parental signé est alors requis le jour même).
alter table public.inscriptions_stage
  add column if not exists accompagnateur_prenom text,
  add column if not exists personne1_mineure boolean not null default false,
  add column if not exists personne2_mineure boolean not null default false;

-- Dates d'avril à juillet 2026, toutes avec Eric Dussault au véhicule 0631
-- (Dodge Charger). D'autres dates avec Steven Amorosa (véhicule 0621, Ford
-- Explorer) s'ajouteront plus tard, une fois ses disponibilités connues.
insert into public.stages (code, date_stage, maitre_stage, vehicule, places, prix_cents)
select code, date_stage, 'Eric Dussault', '0631 - Dodge Charger', 2, 24999
from (values
  ('2622', date '2026-04-16'),
  ('2623', date '2026-04-17'),
  ('2624', date '2026-04-30'),
  ('2625', date '2026-05-01'),
  ('2626', date '2026-05-14'),
  ('2627', date '2026-05-15'),
  ('2628', date '2026-05-28'),
  ('2629', date '2026-05-29'),
  ('2630', date '2026-06-11'),
  ('2631', date '2026-06-12'),
  ('2632', date '2026-06-25'),
  ('2633', date '2026-06-26'),
  ('2634', date '2026-07-09'),
  ('2635', date '2026-07-10')
) as nouvelles_dates(code, date_stage)
where not exists (
  select 1 from public.stages where stages.code = nouvelles_dates.code
);

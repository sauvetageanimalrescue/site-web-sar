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

-- Treize dates d'avril à juillet 2027, toutes avec Éric Dussault au véhicule 0631
-- (Dodge Charger). D'autres dates avec Steven Amorosa (véhicule 0621, Ford
-- Explorer) s'ajouteront plus tard, une fois ses disponibilités connues.
insert into public.stages (code, date_stage, maitre_stage, vehicule, lieu, places, prix_cents)
select code, date_stage, 'Éric Dussault', '0631 - Dodge Charger',
  'Stationnement du Walmart, 5400, rue Jean-Talon Ouest, Montréal (Québec) H4P 2H1',
  2, 24999
from (values
  ('2701', date '2027-04-16'),
  ('2702', date '2027-04-17'),
  ('2703', date '2027-04-30'),
  ('2704', date '2027-05-01'),
  ('2705', date '2027-05-14'),
  ('2706', date '2027-05-15'),
  ('2707', date '2027-05-28'),
  ('2708', date '2027-05-29'),
  ('2709', date '2027-06-11'),
  ('2710', date '2027-06-12'),
  ('2711', date '2027-06-25'),
  ('2712', date '2027-06-26'),
  ('2713', date '2027-07-09')
) as nouvelles_dates(code, date_stage)
where not exists (
  select 1 from public.stages where stages.code = nouvelles_dates.code
);

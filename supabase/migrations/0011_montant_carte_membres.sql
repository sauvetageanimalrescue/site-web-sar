-- Colonne oubliée dans 0010 : le montant de la carte elle-même (30.00 pour
-- tout 2026), distinct de don_certificat et pourboire.
alter table public.membres add column if not exists montant_carte numeric(10, 2);

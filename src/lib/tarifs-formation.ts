export const PRIX_MANUEL_CENTS = 2999;
export const PRIX_CARTE_CENTS = 999;

export function totalFormation(prixCents: number, manuel: boolean, carte: boolean) {
  if (!Number.isSafeInteger(prixCents) || prixCents <= 0) {
    throw new Error("Tarif de formation invalide");
  }
  return prixCents + (manuel ? PRIX_MANUEL_CENTS : 0) + (carte ? PRIX_CARTE_CENTS : 0);
}

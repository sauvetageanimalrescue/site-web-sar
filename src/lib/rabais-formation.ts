import type Stripe from "stripe";

// Un identifiant stable distingue chaque occurrence, même si leurs titres sont identiques.
export async function obtenirProduitFormation(
  client: Stripe,
  formation: { id: string; titre: string; date_debut: string; date_fin: string },
) {
  const id = `sar_formation_${formation.id}`;
  try {
    const produit = await client.products.retrieve(id);
    if (produit.deleted || !produit.active) throw new Error("Produit de formation indisponible");
    return produit.id;
  } catch (erreur) {
    if ((erreur as { code?: string }).code !== "resource_missing") throw erreur;
    const produit = await client.products.create({
      id,
      name: `${formation.titre} - ${formation.date_debut} et ${formation.date_fin}`,
      metadata: { formation_id: formation.id },
    }, { idempotencyKey: `produit-formation-${formation.id}` });
    return produit.id;
  }
}

export function paiementConfirme(session: Stripe.Checkout.Session) {
  return session.status === "complete" && (
    session.payment_status === "paid" ||
    (session.payment_status === "no_payment_required" && session.amount_total === 0)
  );
}

export function bilanPaiement(session: Stripe.Checkout.Session) {
  if (!paiementConfirme(session) || session.currency !== "cad" ||
      !Number.isSafeInteger(session.amount_total) || session.amount_total! < 0) {
    throw new Error("Paiement non confirmé ou montant invalide");
  }
  return {
    montant_cents: session.amount_total!,
    sous_total_cents: session.amount_subtotal,
    rabais_cents: session.total_details?.amount_discount ?? 0,
    taxes_cents: session.total_details?.amount_tax ?? 0,
  };
}

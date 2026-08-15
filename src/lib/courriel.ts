import "server-only";

// Envoi transactionnel via l'API Resend, en fetch direct comme dans animALERTE.
// Un courriel raté ne doit jamais faire échouer un paiement déjà encaissé :
// toutes les fonctions retournent un booléen et n'émettent jamais d'exception.

type PieceJointe = { filename: string; content: string };

export async function envoyerCourriel({
  destinataire,
  sujet,
  html,
  pieces,
  repondreA,
}: {
  destinataire: string;
  sujet: string;
  html: string;
  pieces?: PieceJointe[];
  repondreA?: string;
}): Promise<boolean> {
  const cle = process.env.RESEND_API_KEY;
  if (!cle) return false;

  try {
    const reponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cle}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.COURRIEL_EXPEDITEUR ??
          "Sauvetage Animal Rescue <info@sar.quebec>",
        to: [destinataire],
        subject: sujet,
        html,
        ...(repondreA ? { reply_to: repondreA } : {}),
        ...(pieces?.length ? { attachments: pieces } : {}),
      }),
    });
    return reponse.ok;
  } catch {
    return false;
  }
}

// Gabarit commun : bandeau marine, corps blanc, pied discret. Les courriels
// doivent rester lisibles dans les clients qui ignorent les feuilles de style,
// donc tout est en attributs et styles en ligne.
export function gabaritCourriel({
  titre,
  corps,
  action,
}: {
  titre: string;
  corps: string;
  action?: { libelle: string; href: string };
}) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:Helvetica,Arial,sans-serif;color:#111d28;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #dae1e7;">
          <tr>
            <td style="background:#0b2338;padding:20px 24px;">
              <span style="color:#ffffff;font-size:18px;font-weight:bold;letter-spacing:0.06em;text-transform:uppercase;">Sauvetage Animal Rescue</span>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 24px;">
              <h1 style="margin:0 0 16px;font-size:22px;color:#0b2338;">${titre}</h1>
              ${corps}
              ${
                action
                  ? `<p style="margin:26px 0 0;"><a href="${action.href}" style="display:inline-block;background:#c9a227;color:#0b2338;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:6px;">${action.libelle}</a></p>`
                  : ""
              }
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;background:#f4f6f8;color:#5a6b78;font-size:12px;line-height:1.6;">
              Sauvetage Animal Rescue &bull; 2180, rue Sainte-Catherine Ouest, Montréal (Québec) H3H 1M7<br>
              Ligne de signalement 514-773-3911 &bull; <a href="https://sar.quebec" style="color:#2e86c1;">sar.quebec</a>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

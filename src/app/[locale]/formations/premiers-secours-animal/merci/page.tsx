import { setRequestLocale } from "next-intl/server";
import { EnTetePage, Section } from "@/components/ui";

export default async function MerciFormation({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <><EnTetePage titre="Inscription reçue" intro="Votre paiement est confirmé. Les détails complets de votre formation vous seront transmis par courriel." /><Section largeur="carte"><p className="paragraphe text-lg leading-relaxed text-foreground/90">Si vous ne voyez pas le courriel dans les prochaines minutes, vérifiez vos indésirables. Vous pouvez aussi écrire à e.dussault@sar.quebec.</p></Section></>;
}

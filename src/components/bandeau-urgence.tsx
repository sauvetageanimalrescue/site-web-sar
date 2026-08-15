import { useTranslations } from "next-intl";
import { IconPhoneFilled, IconAlertTriangleFilled } from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";
import { ORGANISATION, lienTelephone } from "@/lib/constantes";

// Bandeau permanent en haut de page : sur un site de secours, le numéro
// d'urgence ne doit jamais être à plus d'un coup d'oeil.
export function BandeauUrgence() {
  const t = useTranslations("urgence");

  return (
    <div className="bg-urgence text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-sm sm:justify-between">
        <span className="flex items-center gap-2 font-medium">
          <IconAlertTriangleFilled className="size-4 shrink-0" aria-hidden />
          {t("etiquette")}
        </span>
        <div className="flex items-center gap-4">
          <a
            href={lienTelephone(ORGANISATION.telephones.signalement)}
            className="flex items-center gap-2 font-semibold tracking-wide hover:underline"
          >
            <IconPhoneFilled className="size-4 shrink-0" aria-hidden />
            <span className="sr-only">{t("ligne")} : </span>
            {ORGANISATION.telephones.signalement}
          </a>
          <Link
            href="/signalement"
            className="hidden rounded-full bg-white/15 px-3 py-1 font-medium transition hover:bg-white/25 sm:inline-block"
          >
            {t("action")}
          </Link>
        </div>
      </div>
    </div>
  );
}

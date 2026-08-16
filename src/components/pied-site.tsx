import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconBrandPatreon,
  IconMail,
} from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";
import { MENU } from "@/lib/menu";
import { ORGANISATION, lienTelephone } from "@/lib/constantes";

const RESEAUX = [
  { href: ORGANISATION.reseaux.facebook, Icone: IconBrandFacebook, nom: "Facebook" },
  { href: ORGANISATION.reseaux.instagram, Icone: IconBrandInstagram, nom: "Instagram" },
  { href: ORGANISATION.reseaux.tiktok, Icone: IconBrandTiktok, nom: "TikTok" },
  { href: ORGANISATION.reseaux.youtube, Icone: IconBrandYoutube, nom: "YouTube" },
  { href: ORGANISATION.reseaux.patreon, Icone: IconBrandPatreon, nom: "Patreon" },
];

export function PiedSite() {
  const t = useTranslations("nav");
  const p = useTranslations("pied");
  const { adresse, telephones, courriels } = ORGANISATION;

  return (
    <footer className="mt-20 bg-marine text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-ecusson.png"
                alt=""
                width={56}
                height={56}
                className="size-14"
              />
              <span className="font-[family-name:var(--font-titre)] text-lg font-bold uppercase leading-[1.05] tracking-wide text-white">
                Sauvetage
                <br />
                Animal
                <br />
                Rescue
              </span>
            </div>
            {/* L'adresse postale a rejoint la colonne « Nous joindre » : elle
                appartient aux coordonnées, pas à la signature. */}
            <div className="mt-5 flex gap-2">
              {RESEAUX.map(({ href, Icone, nom }) => (
                <a
                  key={nom}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={nom}
                  className="rounded-md bg-white/10 p-2 transition hover:bg-lime hover:text-marine"
                >
                  <Icone className="size-5" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            {MENU.map((section) => (
              <div key={section.cle}>
                <p className="font-[family-name:var(--font-titre)] text-sm font-semibold uppercase tracking-wider text-lime">
                  {t(section.cle)}
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {section.liens.map((lien) => (
                    <li key={lien.href}>
                      <Link href={lien.href} className="transition hover:text-white">
                        {t(lien.cle)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <p className="font-[family-name:var(--font-titre)] text-sm font-semibold uppercase tracking-wider text-lime">
              {p("nousJoindre")}
            </p>
            <ul className="mt-3 space-y-3 text-sm">
              <li>
                <span className="block text-xs uppercase tracking-wide text-white/50">
                  {p("signalement")}
                </span>
                <a
                  href={lienTelephone(telephones.signalement)}
                  className="text-base font-semibold text-white hover:underline"
                >
                  {telephones.signalement}
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-wide text-white/50">
                  {p("sansFrais")}
                </span>
                <a
                  href={lienTelephone(telephones.sansFrais)}
                  className="hover:text-white"
                >
                  {telephones.sansFrais}
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-wide text-white/50">
                  {p("officier")}
                </span>
                <a
                  href={lienTelephone(telephones.officier)}
                  className="hover:text-white"
                >
                  {telephones.officier}
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-wide text-white/50">
                  {p("adresse")}
                </span>
                <span className="block leading-relaxed">
                  {adresse.rue}
                  <br />
                  {adresse.ville} ({adresse.province}) {adresse.codePostal}
                </span>
              </li>
              <li>
                <a
                  href={`mailto:${courriels.general}`}
                  className="flex items-center gap-2 hover:text-white"
                >
                  <IconMail className="size-4" aria-hidden />
                  {courriels.general}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {p("droits")}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/confidentialite" className="hover:text-white">
              {p("confidentialite")}
            </Link>
            <Link href="/conditions" className="hover:text-white">
              {p("conditions")}
            </Link>
            <Link href="/contact" className="hover:text-white">
              {t("contact")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

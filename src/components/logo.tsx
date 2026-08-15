import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ORGANISATION } from "@/lib/constantes";

// Deux traitements du nom, jamais coupé en deux moitiés de style différent :
// sur une seule ligne dans l'en-tête, superposé sur trois lignes ailleurs.
export function Logo({
  disposition = "ligne",
}: {
  disposition?: "ligne" | "empile" | "ecusson";
}) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/images/logo-ecusson.png"
        alt={ORGANISATION.nom}
        width={56}
        height={56}
        priority
        className="size-11 shrink-0 sm:size-14"
      />
      {disposition === "ligne" && (
        <span className="hidden whitespace-nowrap font-[family-name:var(--font-titre)] text-lg font-bold uppercase tracking-wide text-marine sm:inline">
          Sauvetage Animal Rescue
        </span>
      )}
      {disposition === "empile" && (
        <span className="font-[family-name:var(--font-titre)] text-lg font-bold uppercase leading-[1.05] tracking-wide text-marine">
          Sauvetage
          <br />
          Animal
          <br />
          Rescue
        </span>
      )}
    </Link>
  );
}

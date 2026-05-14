import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="min-h-screen flex items-center justify-center section-padding">
      <div className="text-center">
        <p className="font-display text-8xl font-black gradient-text mb-4">404</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">{t("title")}</h1>
        <p className="text-muted mb-8">{t("message")}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary
                     text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
        >
          {t("back")}
        </Link>
      </div>
    </div>
  );
}

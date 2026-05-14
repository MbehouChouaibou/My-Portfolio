import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Profile, Footer as FooterData } from "@/lib/content";

interface FooterProps {
  profile: Profile;
  footer: FooterData;
}

export function Footer({ profile, footer }: FooterProps) {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border/50 py-8 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {footer.copyright}. {t("allRights")}
        </p>

        <div className="flex items-center gap-1">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2.5 rounded-xl text-muted-foreground hover:text-primary
                       hover:bg-surface-2 transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2.5 rounded-xl text-muted-foreground hover:text-primary
                       hover:bg-surface-2 transition-colors"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={`mailto:${profile.social.email}`}
            aria-label="Email"
            className="p-2.5 rounded-xl text-muted-foreground hover:text-primary
                       hover:bg-surface-2 transition-colors"
          >
            <Mail size={16} />
          </a>
        </div>

        <p className="text-xs text-muted-foreground/60">{t("madeWith")}</p>
      </div>
    </footer>
  );
}

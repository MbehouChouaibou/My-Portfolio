"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, User, Code2, Briefcase, FolderOpen, Award,
  GraduationCap, FileText, BookOpen, Mail, Menu, X, Globe,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { NavItem, Profile } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const NAV_ICONS: Record<string, React.ElementType> = {
  home:            Home,
  about:           User,
  skills:          Code2,
  experience:      Briefcase,
  projects:        FolderOpen,
  certifications:  Award,
  education:       GraduationCap,
  resume:          FileText,
  blog:            BookOpen,
  contact:         Mail,
};

interface SidebarProps {
  locale: Locale;
  profile: Profile;
  nav: NavItem[];
}

export function Sidebar({ locale, profile, nav }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const t = useTranslations("nav");

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Track which section is in the viewport
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = ["home", ...nav.map(i => i.href.split("#")[1]).filter(Boolean)];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      // Trigger when the top 15% of a section crosses the middle of the viewport
      { rootMargin: "-10% 0px -80% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage, nav]);

  const resolveHref = (href: string) =>
    href === "/" ? `/${locale}` : `/${locale}${href}`;

  const isActive = (href: string) => {
    if (isHomePage) {
      if (href === "/") return activeSection === "home";
      const hash = href.split("#")[1];
      if (hash) return activeSection === hash;
    }
    const resolved = resolveHref(href);
    return pathname.startsWith(resolved.split("#")[0]);
  };

  function NavContent() {
    return (
      <nav className="flex flex-col h-full overflow-hidden">
        {/* Logo */}
        <div className="px-5 py-6 border-b border-border/50 shrink-0">
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl
                             bg-primary text-primary-foreground font-display font-black text-sm
                             shadow-lg shadow-primary/30 glow-primary shrink-0">
              {profile.initials}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground leading-tight truncate">
                {profile.name.split(" ").slice(0, 2).join(" ")}
              </p>
              <p className="text-[11px] text-muted leading-tight truncate">
                {profile.tagline}
              </p>
            </div>
          </Link>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto py-3 px-3">
          <ul className="space-y-0.5">
            {nav.map((item) => {
              const Icon = NAV_ICONS[item.key] ?? Home;
              const active = isActive(item.href);
              return (
                <li key={item.key}>
                  <Link
                    href={resolveHref(item.href)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                                 transition-colors duration-150 relative group
                                 ${active
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-foreground hover:bg-surface-2/60"
                                }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="sidebar-indicator"
                        className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                      />
                    )}
                    <Icon size={15} className="relative z-10 shrink-0" />
                    <span className="relative z-10">{t(item.key)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom: lang + theme */}
        <div className="px-4 py-4 border-t border-border/50 space-y-2 shrink-0">
          {/* Language switcher */}
          <div className="flex items-center gap-2">
            <Globe size={13} className="text-muted shrink-0" />
            <div className="flex items-center gap-1 flex-1">
              {(["en", "fr"] as const).map((lang) => {
                const swapped = pathname.replace(`/${locale}`, `/${lang}`);
                return (
                  <Link
                    key={lang}
                    href={swapped}
                    className={`flex-1 text-center text-[11px] py-1.5 rounded-lg font-bold transition-colors
                                 ${locale === lang
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted hover:text-foreground hover:bg-surface-2"
                                }`}
                  >
                    {lang.toUpperCase()}
                  </Link>
                );
              })}
            </div>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col sidebar-glass z-40">
        <NavContent />
      </aside>

      {/* Mobile: hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl
                   bg-surface border border-border shadow-lg text-foreground"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      {/* Mobile: overlay + drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-72 sidebar-glass z-50 flex flex-col"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-surface-2
                           transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

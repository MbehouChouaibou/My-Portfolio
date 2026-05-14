"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, ExternalLink, Download } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTypingEffect } from "@/lib/hooks";
import type { Profile } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const card = (delay = 0) => ({
  initial:    { opacity: 0, y: 24, scale: 0.97 },
  animate:    { opacity: 1, y: 0,  scale: 1    },
  transition: { duration: 0.55, ease: EASE, delay },
});

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: "smooth" });
};

export function Hero({ profile }: { profile: Profile }) {
  const t    = useTranslations("hero");
  const typed = useTypingEffect(profile.typingRoles);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-4 pb-12 overflow-hidden px-4 sm:px-6 lg:px-10">

      {/* Background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="blob-float        absolute -top-40  -left-20  w-[520px] h-[520px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="blob-float-slow   absolute -bottom-40 -right-10 w-[440px] h-[440px] rounded-full bg-accent/12  blur-[100px]" />
        <div className="blob-float-slower absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                           w-[260px] h-[260px] rounded-full bg-primary/8 blur-[80px]" />
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* ── Card 1: Name + typing + bio + CTAs ─────────────────────── */}
          <motion.div
            {...card(0)}
            className="md:col-span-2 glass-card-accent p-5 sm:p-7 md:p-8 flex flex-col justify-between
                       min-h-[300px] order-2 md:order-1"
          >
            <div>
              {/* Availability pill */}
              <div className="inline-flex items-center gap-2 text-[11px] font-bold
                               tracking-wide uppercase text-primary mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/70 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                {profile.availabilityLabel}
              </div>

              {/* Name */}
              <h1 className="font-display font-extrabold tracking-tight leading-[1.06] text-3xl sm:text-4xl md:text-5xl mb-2">
                <span className="text-muted text-base sm:text-lg font-semibold block mb-1">
                  {t("greeting")}
                </span>
                <span className="gradient-text">{profile.name}</span>
              </h1>

              {/* Typing role */}
              <div className="flex items-center gap-1 text-sm sm:text-base md:text-lg font-semibold
                               text-muted min-h-[1.75rem] mt-2 mb-3">
                <span>{typed}</span>
                <span className="w-0.5 h-5 bg-primary animate-blink rounded-full ml-0.5" />
              </div>

              {/* Bio */}
              <p className="text-sm text-muted leading-relaxed max-w-lg">
                {profile.bio[0]}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
              <button
                onClick={() => scrollTo("projects")}
                className="px-4 sm:px-6 py-2.5 rounded-xl bg-primary text-primary-foreground
                           font-semibold text-sm hover:opacity-90 transition-opacity glow-primary"
              >
                {t("viewProjects")}
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-4 sm:px-6 py-2.5 rounded-xl glass-card text-foreground font-semibold
                           text-sm hover:border-primary/40 hover:text-primary transition-colors"
              >
                {t("getInTouch")}
              </button>
              <a
                href={profile.resumeUrl}
                download
                className="px-4 sm:px-6 py-2.5 rounded-xl border border-border text-muted-foreground
                           font-semibold text-sm hover:border-primary/40 hover:text-primary
                           transition-colors inline-flex items-center gap-1.5"
              >
                <Download size={13} />
                {t("downloadResume")}
              </a>
            </div>
          </motion.div>

          {/* ── Card 2: Profile photo ────────────────────────────────────── */}
          <motion.div
            {...card(0.08)}
            className="glass-card overflow-hidden relative order-1 md:order-2 group
                       aspect-[3/4] md:aspect-auto md:min-h-[320px]"
          >
            {/* Spinning ring */}
            <div
              className="ring-spin absolute inset-0 z-10 rounded-2xl"
              style={{
                background:
                  "conic-gradient(from 0deg, #6366f1 0%, #818cf8 35%, transparent 55%, #6366f1 100%)",
                padding: "2px",
              }}
              aria-hidden
            >
              <div className="w-full h-full rounded-2xl" style={{ background: "rgb(var(--background))" }} />
            </div>

            {/* Photo */}
            <div className="absolute inset-0 z-20 rounded-2xl overflow-hidden">
              <Image
                src={profile.photoUrl}
                alt={profile.name}
                fill
                priority
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-background/80 to-transparent">
                <div className="glass-card px-3 py-2 text-center text-xs font-bold text-primary">
                  {profile.tagline} ⚡
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Card 3: Stats ─────────────────────────────────────────────── */}
          <motion.div
            {...card(0.14)}
            className="glass-card p-5 sm:p-6 order-3"
          >
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-4">
              {t("byTheNumbers")}
            </p>
            <div className="flex justify-between gap-2">
              {profile.stats.map((stat) => (
                <div key={stat.label} className="text-center flex-1">
                  <div className="font-display text-2xl sm:text-3xl font-black gradient-text leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-2 font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Card 4: Status + location + socials ─────────────────────── */}
          <motion.div
            {...card(0.2)}
            className="md:col-span-2 glass-card p-4 sm:p-5 flex flex-wrap items-center
                       justify-between gap-3 order-4"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
                </span>
                {t("openToWork")}
              </span>
              <span className="hidden sm:block w-px h-4 bg-border" />
              <span className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                <MapPin size={12} className="text-primary shrink-0" />
                {profile.location}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {(
                [
                  { key: "github",   href: profile.social.github,              Icon: Github,   label: "GitHub"   },
                  { key: "linkedin", href: profile.social.linkedin,            Icon: Linkedin, label: "LinkedIn" },
                  { key: "email",    href: `mailto:${profile.social.email}`,   Icon: Mail,     label: "Email"    },
                ] as const
              ).map(({ key, href, Icon, label }) => (
                <a
                  key={key}
                  href={href}
                  target={key !== "email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 sm:p-2.5 rounded-xl glass-card text-muted-foreground
                             hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

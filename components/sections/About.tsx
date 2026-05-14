"use client";

import {
  Code2, Cloud, Server, Database, GitBranch,
  Brain, Layers, Shield, type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import type { About as AboutData } from "@/lib/content";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2, Cloud, Server, Database, GitBranch, Brain, Layers, Shield,
};

export function About({ about }: { about: AboutData }) {
  const t = useTranslations("about");

  return (
    <SectionWrapper id="about">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 blur-3xl rounded-full" />
      </div>

      <div className="grid lg:grid-cols-2 gap-14 items-start">
        {/* Left: text */}
        <div>
          <SectionHeading label={t("label")} title={about.title} />
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-muted leading-relaxed text-base sm:text-lg">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Right: expertise grid */}
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-6
                         flex items-center gap-3">
            <span className="w-6 h-[2px] bg-primary rounded-full" />
            Core Expertise
          </p>
          <div className="grid grid-cols-2 gap-3">
            {about.expertise.map(({ label, icon }, i) => {
              const Icon = ICON_MAP[icon] ?? Code2;
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="glass-card p-4 flex items-center gap-3
                             hover:border-primary/30 hover:shadow-md hover:shadow-primary/5
                             transition-all group cursor-default"
                >
                  <span className="p-2 rounded-xl bg-primary/10 text-primary
                                   group-hover:bg-primary/20 transition-colors shrink-0">
                    <Icon size={14} />
                  </span>
                  <span className="text-sm font-semibold text-foreground leading-snug">
                    {label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

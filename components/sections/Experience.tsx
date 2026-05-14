"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import type { Experience as ExperienceData } from "@/lib/content";

export function Experience({ experiences }: { experiences: ExperienceData[] }) {
  const t = useTranslations("experience");

  return (
    <SectionWrapper id="experience">
      <SectionHeading label={t("label")} title="Work Experience" />

      <div className="relative">
        {/* Gradient spine */}
        <div
          className="absolute left-[19px] top-2 bottom-2 w-[2px] rounded-full hidden sm:block"
          style={{
            background:
              "linear-gradient(to bottom, rgb(var(--primary)), rgb(var(--accent) / 0.4), transparent)",
          }}
          aria-hidden
        />

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative sm:pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-5 hidden sm:flex items-center justify-center">
                {exp.current ? (
                  <span className="relative flex h-10 w-10">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/30" />
                    <span className="relative inline-flex h-10 w-10 rounded-full bg-primary/10
                                     border-2 border-primary items-center justify-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    </span>
                  </span>
                ) : (
                  <span className="h-10 w-10 rounded-full bg-surface-2 border-2 border-border
                                   flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                  </span>
                )}
              </div>

              {/* Card */}
              <div className="glass-card-accent p-6">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground leading-tight">
                      {exp.role}
                    </h3>
                    <p className="gradient-text font-bold text-base mt-0.5">{exp.company}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar size={11} />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin size={11} />
                      {exp.location}
                    </span>
                    {exp.current && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full
                                       bg-success/10 text-success border border-success/20">
                        {t("current")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bullet points */}
                <ul className="space-y-2 mb-4">
                  {exp.points.map((point, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-muted leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                {exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-semibold rounded-lg
                                   bg-primary/8 text-primary border border-primary/15"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

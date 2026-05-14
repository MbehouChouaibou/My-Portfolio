"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import type { Education as EducationData } from "@/lib/content";

export function Education({ education }: { education: EducationData[] }) {
  const t = useTranslations("education");

  return (
    <SectionWrapper id="education">
      <SectionHeading label={t("label")} title="Education" />

      <div className="space-y-5">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.45 }}
            className="glass-card-accent p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div className="flex gap-4 items-start">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground leading-tight">
                    {edu.degree}
                  </h3>
                  <p className="gradient-text font-bold text-sm mt-0.5">{edu.institution}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar size={11} /> {edu.period}</span>
                <span className="flex items-center gap-1"><MapPin size={11} /> {edu.location}</span>
              </div>
            </div>

            {edu.highlights.length > 0 && (
              <ul className="space-y-1.5 mt-3 pt-3 border-t border-border/50">
                {edu.highlights.map((h, j) => (
                  <li key={j} className="flex gap-2.5 text-sm text-muted leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

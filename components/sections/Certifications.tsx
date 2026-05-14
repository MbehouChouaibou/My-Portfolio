"use client";

import { motion } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import type { Certification } from "@/lib/content";

export function Certifications({ certifications }: { certifications: Certification[] }) {
  const t = useTranslations("certifications");

  return (
    <SectionWrapper id="certifications">
      <SectionHeading label={t("label")} title="Certifications" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="glass-card-accent p-5 flex gap-4 items-start
                       hover:border-primary/30 hover:shadow-md hover:shadow-primary/5
                       transition-all group"
          >
            {/* Icon */}
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0
                             group-hover:bg-primary/20 transition-colors">
              <Award size={18} />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-foreground leading-tight mb-1 truncate">
                {cert.name}
              </h3>
              <p className="text-xs text-muted mb-3">{cert.issuer} · {cert.date}</p>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold
                             text-primary hover:underline"
                >
                  <ExternalLink size={10} />
                  {t("verify")}
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

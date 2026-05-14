"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import type { Resume as ResumeData } from "@/lib/content";

export function Resume({ resume }: { resume: ResumeData }) {
  const t = useTranslations("resume");

  return (
    <SectionWrapper id="resume">
      <motion.div
        className="relative overflow-hidden glass-card-accent p-12 sm:p-16 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]
                     bg-primary/8 blur-3xl rounded-full pointer-events-none"
        />
        <div aria-hidden className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

        <div className="relative">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground
                          tracking-tight mb-4">
            {resume.heading}
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            {resume.description}
          </p>
          <a
            href={resume.url}
            download
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl
                       bg-primary text-primary-foreground font-bold text-base
                       hover:opacity-90 transition-opacity glow-primary"
          >
            <Download size={18} />
            {t("download")}
          </a>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

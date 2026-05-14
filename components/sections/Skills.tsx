"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import type { Skills as SkillsData } from "@/lib/content";

export function Skills({ skills }: { skills: SkillsData }) {
  const t = useTranslations("skills");

  const categories = ["All", ...Array.from(new Set(skills.technical.map((s) => s.category)))];
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? skills.technical
    : skills.technical.filter((s) => s.category === active);

  return (
    <SectionWrapper id="skills">
      <SectionHeading label={t("label")} title="Skills & Technologies" />

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              active === cat
                ? "bg-primary text-primary-foreground glow-primary"
                : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/30"
            }`}
          >
            {cat === "All" ? t("all") : cat}
          </button>
        ))}
      </div>

      {/* Skill bars */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {filtered.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            className="glass-card-accent p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-foreground">{skill.name}</span>
              <span className="text-xs font-bold text-primary">{skill.level}%</span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.04 + 0.2, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, rgb(var(--primary)), rgb(var(--accent)))",
                }}
              />
            </div>

            <div className="mt-2 text-[10px] text-muted-foreground font-medium">
              {skill.level >= 90 ? "Expert" : skill.level >= 75 ? "Advanced" : skill.level >= 60 ? "Intermediate" : "Familiar"}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Soft skills */}
      <div>
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4">
          {t("softSkills")}
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.soft.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl
                         bg-surface-2 text-muted-foreground border border-border
                         hover:border-primary/30 hover:text-primary transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

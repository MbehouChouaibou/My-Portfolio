"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import type { Project } from "@/lib/content";

function GradientPlaceholder({ title }: { title: string }) {
  const letter = title[0].toUpperCase();
  return (
    <div className="relative w-full h-full min-h-[180px] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgb(var(--primary)/0.15) 0%, rgb(var(--accent)/0.10) 50%, rgb(var(--surface-2)) 100%)",
        }}
      />
      <div className="dot-grid absolute inset-0 opacity-30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-7xl font-black opacity-[0.06] text-foreground select-none">
          {letter}
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project, locale }: { project: Project; locale: string }) {
  const t = useTranslations("projects");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="glass-card-accent flex flex-col overflow-hidden
                 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10
                 transition-all duration-300"
    >
      {/* Cover / placeholder */}
      <div className="relative h-44 overflow-hidden rounded-t-2xl">
        {project.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <GradientPlaceholder title={project.title} />
        )}

        {/* Impact badge */}
        {project.impact && (
          <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full
                           bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
            {project.impact}
          </span>
        )}

        {/* Category */}
        <span className="absolute bottom-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full
                         bg-background/80 text-muted-foreground backdrop-blur-sm border border-border/50">
          {project.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-base font-bold text-foreground mb-2 leading-tight">
          {project.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-semibold rounded-lg
                         bg-surface-2 text-muted-foreground border border-border/70"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-semibold rounded-lg
                             bg-surface-2 text-muted-foreground border border-border/70">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 pt-3 border-t border-border/50">
          {project.caseStudy && (
            <Link
              href={`/${locale}/projects/${project.slug}`}
              className="flex items-center gap-1.5 text-xs font-semibold text-primary
                         hover:underline"
            >
              <ArrowRight size={11} />
              {t("caseStudy")}
            </Link>
          )}
          <div className="flex items-center gap-1 ml-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("liveDemo")}
                className="p-2 rounded-lg text-muted-foreground hover:text-primary
                           hover:bg-surface-2 transition-colors"
              >
                <ExternalLink size={14} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("sourceCode")}
                className="p-2 rounded-lg text-muted-foreground hover:text-primary
                           hover:bg-surface-2 transition-colors"
              >
                <Github size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  const t      = useTranslations("projects");
  const params = useParams<{ locale: string }>();
  const locale = params.locale ?? "en";

  const featured  = projects.filter((p) => p.featured);
  const rest      = projects.filter((p) => !p.featured);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? projects : featured;

  return (
    <SectionWrapper id="projects">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <SectionHeading label={t("label")} title="Featured Projects" />
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </motion.div>
      </AnimatePresence>

      {rest.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl glass-card
                       text-sm font-semibold text-muted-foreground hover:text-primary
                       hover:border-primary/30 transition-colors"
          >
            {showAll ? (
              <><ChevronUp size={15} />{t("viewLess")}</>
            ) : (
              <><ChevronDown size={15} />{t("viewAll")}</>
            )}
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}

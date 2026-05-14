import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Tag, TrendingUp } from "lucide-react";
import { getPortfolioData } from "@/lib/content";
import { locales } from "@/lib/i18n";

export async function generateStaticParams() {
  const { projects } = getPortfolioData();
  return locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug }    = await params;
  const { projects } = getPortfolioData();
  const project      = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const { projects } = getPortfolioData();
  const project      = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="section-padding">
      <div className="container-max max-w-4xl">
        {/* Back */}
        <Link
          href={`/${locale}/#projects`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground
                     hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>

        {/* Hero */}
        <div className="glass-card-accent p-8 sm:p-10 mb-8">
          {/* Category + Impact */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3 py-1 text-xs font-bold rounded-full
                             bg-surface-2 text-muted-foreground border border-border">
              {project.category}
            </span>
            {project.impact && (
              <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full
                               bg-primary/10 text-primary border border-primary/20">
                <TrendingUp size={11} />
                {project.impact}
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground
                          tracking-tight mb-4 leading-tight">
            {project.title}
          </h1>

          <p className="text-muted text-lg leading-relaxed mb-7">{project.description}</p>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                           bg-primary text-primary-foreground font-semibold text-sm
                           hover:opacity-90 transition-opacity glow-primary"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                           glass-card text-foreground font-semibold text-sm
                           hover:border-primary/40 hover:text-primary transition-colors"
              >
                <Github size={14} />
                Source Code
              </a>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Case study content */}
          <div className="lg:col-span-2 space-y-6">
            {project.caseStudy ? (
              <div className="glass-card p-7">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  Case Study
                </h2>
                {project.caseStudy.split("\n").filter(Boolean).map((para, i) => (
                  <p key={i} className="text-muted leading-relaxed mb-3 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            ) : (
              <div className="glass-card p-7 text-center text-muted-foreground">
                Case study coming soon.
              </div>
            )}
          </div>

          {/* Sidebar: tech stack */}
          <div className="space-y-5">
            <div className="glass-card p-5">
              <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase
                              text-muted-foreground mb-4 flex items-center gap-2">
                <Tag size={11} />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg
                               bg-primary/8 text-primary border border-primary/15"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.impact && (
              <div className="glass-card-accent p-5 text-center">
                <TrendingUp size={20} className="text-primary mx-auto mb-2" />
                <p className="font-display text-2xl font-black gradient-text">{project.impact}</p>
                <p className="text-xs text-muted-foreground mt-1">Impact</p>
              </div>
            )}
          </div>
        </div>

        {/* Back button */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <Link
            href={`/${locale}/#projects`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl glass-card
                       text-sm font-semibold text-muted-foreground hover:text-primary
                       hover:border-primary/30 transition-colors"
          >
            <ArrowLeft size={14} />
            All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}

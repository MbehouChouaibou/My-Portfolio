import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getAllBlogPosts } from "@/lib/blog";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import { locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("label") };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t     = await getTranslations({ locale, namespace: "blog" });
  const posts = getAllBlogPosts();

  return (
    <SectionWrapper>
      <SectionHeading label={t("label")} title="Articles & Thoughts" />

      {posts.length === 0 ? (
        <div className="glass-card p-12 text-center text-muted">
          No posts yet — check back soon!
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="glass-card-accent p-6 flex flex-col gap-4 group
                         hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10
                         transition-all duration-300"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px]
                               font-semibold rounded-lg bg-primary/10 text-primary"
                  >
                    <Tag size={9} />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="font-display text-lg font-bold text-foreground leading-tight
                              group-hover:text-primary transition-colors">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-muted leading-relaxed flex-1">{post.excerpt}</p>

              {/* Meta */}
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    {new Date(post.date).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
                      year:  "numeric",
                      month: "short",
                      day:   "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {post.readTime} {t("minRead")}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-primary flex items-center gap-1
                                  group-hover:gap-2 transition-all">
                  {t("readMore")} <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}

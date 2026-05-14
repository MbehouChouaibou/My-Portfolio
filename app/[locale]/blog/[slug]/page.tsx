import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPost, getBlogSlugs } from "@/lib/blog";
import { locales } from "@/lib/i18n";

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogPost(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="section-padding">
      <div className="container-max max-w-3xl">
        {/* Back link */}
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground
                     hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px]
                           font-semibold rounded-lg bg-primary/10 text-primary"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground
                          tracking-tight leading-[1.1] mb-5">
            {post.title}
          </h1>

          <p className="text-muted text-lg leading-relaxed mb-6">{post.excerpt}</p>

          <div className="flex items-center gap-5 text-sm text-muted-foreground
                           pb-6 border-b border-border/50">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {post.readTime} min read
            </span>
          </div>
        </header>

        {/* MDX body */}
        <article
          className="prose prose-slate dark:prose-invert max-w-none
                     prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
                     prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10
                     prose-p:text-muted prose-p:leading-relaxed
                     prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                     prose-code:text-primary prose-code:bg-surface-2 prose-code:px-1.5 prose-code:py-0.5
                     prose-code:rounded prose-code:text-sm prose-code:font-mono
                     prose-pre:bg-surface prose-pre:border prose-pre:border-border
                     prose-pre:rounded-2xl prose-pre:text-sm
                     prose-blockquote:border-primary prose-blockquote:text-muted
                     prose-strong:text-foreground prose-li:text-muted"
        >
          <MDXRemote source={post.content} />
        </article>

        {/* Footer nav */}
        <div className="mt-14 pt-8 border-t border-border/50">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl glass-card
                       text-sm font-semibold text-muted-foreground hover:text-primary
                       hover:border-primary/30 transition-colors"
          >
            <ArrowLeft size={14} />
            All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}

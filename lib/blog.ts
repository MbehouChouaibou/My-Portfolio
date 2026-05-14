import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogMeta {
  slug:     string;
  title:    string;
  excerpt:  string;
  date:     string;
  readTime: number;
  tags:     string[];
}

export interface BlogPostFull extends BlogMeta {
  content: string;
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getBlogPost(slug: string): BlogPostFull | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw              = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title:    data.title    ?? "",
    excerpt:  data.excerpt   ?? "",
    date:     data.date     ?? "",
    readTime: data.readTime ?? 5,
    tags:     data.tags     ?? [],
    content,
  };
}

export function getAllBlogPosts(): BlogMeta[] {
  return getBlogSlugs()
    .map((slug) => {
      const post = getBlogPost(slug);
      if (!post) return null;
      const { content: _content, ...meta } = post;
      return meta;
    })
    .filter((p): p is BlogMeta => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

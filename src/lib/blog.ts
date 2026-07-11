import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  body: string;
  draft: boolean;
}

async function readBlogFile(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title || "",
      date: data.date || "",
      tags: data.tags || [],
      description: data.description || "",
      body: content,
      draft: data.draft || false,
    };
  } catch {
    return null;
  }
}

export async function getBlogPosts(includeDrafts = false): Promise<BlogPost[]> {
  try {
    const files = await fs.readdir(BLOG_DIR);
    const mdxFiles = files.filter((f) => f.endsWith(".mdx"));
    const posts: BlogPost[] = [];
    for (const file of mdxFiles) {
      const slug = file.replace(/\.mdx$/, "");
      const post = await readBlogFile(slug);
      if (post && (includeDrafts || !post.draft)) {
        posts.push(post);
      }
    }
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return readBlogFile(slug);
}

export async function writeBlogPost(post: BlogPost): Promise<void> {
  if (process.env.VERCEL === "1") {
    throw new Error("ADMIN_WRITES_DISABLED: writes not allowed in production");
  }
  const filePath = path.join(BLOG_DIR, `${post.slug}.mdx`);
  const frontmatter = {
    title: post.title,
    date: post.date,
    tags: post.tags,
    description: post.description,
    draft: post.draft,
  };
  const content = matter.stringify(post.body, frontmatter);
  const tmp = `${filePath}.${process.pid}.tmp`;
  await fs.writeFile(tmp, content, "utf8");
  await fs.rename(tmp, filePath);
}

export async function deleteBlogPost(slug: string): Promise<void> {
  if (process.env.VERCEL === "1") {
    throw new Error("ADMIN_WRITES_DISABLED: writes not allowed in production");
  }
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  try {
    await fs.unlink(filePath);
  } catch (err: unknown) {
    if (err instanceof Error && "code" in err && (err as { code: string }).code !== "ENOENT") throw err;
  }
}

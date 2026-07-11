import { NextResponse } from "next/server";
import { getSession } from "@/lib/admin/auth";
import { writeBlogPost, getBlogPostBySlug } from "@/lib/blog";
import { BlogSchema } from "@/lib/schemas/admin";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const parsed = BlogSchema.parse(body);
    const existing = await getBlogPostBySlug(parsed.slug);
    if (existing) {
      return NextResponse.json(
        { error: `Blog post ${parsed.slug} already exists` },
        { status: 409 }
      );
    }
    await writeBlogPost({
      slug: parsed.slug,
      title: parsed.title,
      date: parsed.date,
      tags: parsed.tags.split(",").map((t) => t.trim()).filter(Boolean),
      description: parsed.description,
      body: parsed.body,
      draft: parsed.draft,
    });
    return NextResponse.json({ ok: true, slug: parsed.slug });
  } catch (err: unknown) {
    if (err instanceof Error && "issues" in err) {
      return NextResponse.json({ error: "Validation failed", issues: (err as { issues: unknown }).issues }, { status: 400 });
    }
    if (err instanceof Error && err.message?.includes("ADMIN_WRITES_DISABLED")) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

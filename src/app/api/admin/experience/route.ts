import { NextResponse } from "next/server";
import { getSession } from "@/lib/admin/auth";
import { writeExperience, experienceExists } from "@/lib/content/writers";
import { ExperienceFileSchema } from "@/lib/content/schemas";
import { regenAfterExperienceChange } from "@/lib/content/regen";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const parsed = ExperienceFileSchema.parse(body);
    const exists = await experienceExists(parsed.id);
    if (exists) {
      return NextResponse.json(
        { error: `Experience ${parsed.id} already exists` },
        { status: 409 }
      );
    }
    await writeExperience(parsed);
    regenAfterExperienceChange().catch(() => {});
    return NextResponse.json({ ok: true, id: parsed.id });
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

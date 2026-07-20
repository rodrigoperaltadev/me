import { NextResponse } from "next/server";
import { getSession } from "@/lib/admin/auth";
import { writeExperience, writeExperienceEs, deleteExperience } from "@/lib/content/writers";
import { ExperienceFileSchema, ExperienceEsOverlaySchema } from "@/lib/content/schemas";
import { regenAfterExperienceChange } from "@/lib/content/regen";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const { esOverlay, ...baseData } = body;
    const parsed = ExperienceFileSchema.parse({ ...baseData, id });
    await writeExperience(parsed);
    if (esOverlay) {
      const overlayParsed = ExperienceEsOverlaySchema.parse(esOverlay);
      await writeExperienceEs(id, overlayParsed);
    }
    regenAfterExperienceChange().catch(() => {});
    return NextResponse.json({ ok: true });
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

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    await deleteExperience(id);
    regenAfterExperienceChange().catch(() => {});
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    if (err instanceof Error && err.message?.includes("ADMIN_WRITES_DISABLED")) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

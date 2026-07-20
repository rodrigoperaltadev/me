// Build-time metadata + a hand-bumped CV version.
// In dev/local, falls back to "local" / "dev" so the module is safe to import
// from any component without a thrown `process is not defined` etc.
export const SITE_VERSION: string =
  process.env.NEXT_PUBLIC_SITE_VERSION ?? "1.0.0";

export const BUILD_SHA: string =
  process.env.NEXT_PUBLIC_GIT_SHA ?? "local";

export const BUILD_DATE: string =
  process.env.NEXT_PUBLIC_BUILD_DATE ?? "dev";

// CV lifecycle marker. Start at "1.0" — bump minor (1.1, 1.2) for small
// additions to the CV (new certification, talk, side project) and major (2.0)
// for a meaningful career shift (new primary role, major repositioning).
// Independent from SITE_VERSION.
export const CV_VERSION: string = "1.0";

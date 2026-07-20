import { NextRequest, NextResponse } from "next/server";
import { clearSession } from "@/lib/admin/auth";

/**
 * Form POST from AdminNav lands on this URL in the browser.
 * Clear the session cookie and 303 to login (not JSON).
 */
export async function POST(request: NextRequest) {
  await clearSession();
  return NextResponse.redirect(new URL("/admin/login", request.url), 303);
}

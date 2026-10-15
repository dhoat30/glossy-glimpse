import { NextResponse } from "next/server";
import snapshot from "@/data/google-reviews.json";

export const dynamic = "force-static";

// Compatibility endpoint: reads the saved file and never contacts a provider.
export function GET() {
  return NextResponse.json({ success: true, ...snapshot });
}

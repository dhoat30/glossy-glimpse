import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { submitHubspotQuote } from "@/utils/hubspot/submitHubspotQuote";

export const runtime = "nodejs";

export async function POST(request) {
  let payload;
  try { payload = await request.json(); } catch {
    return NextResponse.json({ success: false, message: "Invalid enquiry details." }, { status: 400 });
  }
  const result = await submitHubspotQuote(payload, { context: payload?.hubspotContext || {} });
  return NextResponse.json({ success: result.success, message: result.message || "Enquiry received.", ...(result.success && { id: randomUUID() }) }, { status: result.status });
}

import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { prepareQuoteEnquiry } from "@/utils/quoteEnquiry";
import { submitQuote } from "@/utils/submitQuote";

export const runtime = "nodejs";
const attempts = new Map();

export async function POST(request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ success: false, message: "Please submit your request from our website." }, { status: 403 });
  }
  // Lightweight per-instance protection. Use host/WAF rate limits for distributed protection.
  const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const now = Date.now();
  for (const [key, value] of attempts) if (now - value.start > 600000) attempts.delete(key);
  const attempt = attempts.get(ip) || { start: now, count: 0 };
  if (attempt.count >= 8) return NextResponse.json({ success: false, message: "Too many requests. Please try again later or call 022 011 3022." }, { status: 429 });
  if (attempts.size >= 5000 && !attempts.has(ip)) attempts.delete(attempts.keys().next().value);
  attempt.count += 1; attempts.set(ip, attempt);
  let input;
  try {
    const raw = await request.text();
    if (raw.length > 12000) return NextResponse.json({ success: false, message: "Your enquiry is too long." }, { status: 413 });
    input = JSON.parse(raw);
  } catch {
    return NextResponse.json({ success: false, message: "Please check your enquiry details." }, { status: 400 });
  }
  const prepared = prepareQuoteEnquiry(input);
  if (prepared.error) return NextResponse.json({ success: false, message: prepared.error }, { status: 400 });
  const result = await submitQuote(prepared.payload, { context: input.hubspotContext || {} });
  return NextResponse.json({ ...result.body, ...(result.body.success && { id: randomUUID() }) }, { status: result.status });
}

import { NextResponse } from "next/server";
import { sendEnquiryEmails } from "@/utils/email/sendEnquiryEmails";

export const runtime = "nodejs";

export async function POST(request) {
  let payload;
  try { payload = await request.json(); } catch {
    return NextResponse.json({ success: false, message: "Invalid enquiry details." }, { status: 400 });
  }
  const result = await sendEnquiryEmails(payload);
  return NextResponse.json(result.body, { status: result.status });
}

import { NextResponse } from "next/server";
function retired() { return NextResponse.json({ success: false, message: "This integration is no longer used." }, { status: 410 }); }
export const POST = retired;
export const GET = retired;

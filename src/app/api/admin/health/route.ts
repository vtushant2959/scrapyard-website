export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[Health] MongoDB error:", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

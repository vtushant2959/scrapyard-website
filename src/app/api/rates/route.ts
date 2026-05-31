export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ScrapRate } from "@/models/ScrapRate";

export async function GET() {
  try {
    await connectDB();
    const rates = await ScrapRate.find({ isActive: true })
      .sort({ sortOrder: 1, category: 1, name: 1 })
      .lean();
    return NextResponse.json(rates);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

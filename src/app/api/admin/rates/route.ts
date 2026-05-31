export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ScrapRate } from "@/models/ScrapRate";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};
    if (category && category !== "All") query.category = category;

    const rates = await ScrapRate.find(query).sort({ category: 1, sortOrder: 1 }).lean();
    return NextResponse.json(rates);
  } catch {
    return NextResponse.json({ error: "Failed to fetch rates" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const rate = await ScrapRate.create(body);
    return NextResponse.json(rate, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create rate" }, { status: 500 });
  }
}

// Bulk update â€” replaces the "change" and "trend" for all rates at once
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body: Array<{ _id: string; rate: number; change: number; trend: "up" | "down" | "stable"; isActive?: boolean; name?: string; category?: string; unit?: string }> = await req.json();
    const ops = body.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { rate: item.rate, change: item.change, trend: item.trend, isActive: item.isActive, name: item.name, category: item.category, unit: item.unit, updatedBy: "admin" } },
      },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })) as any[];
    await ScrapRate.bulkWrite(ops);
    return NextResponse.json({ success: true, updated: body.length });
  } catch {
    return NextResponse.json({ error: "Bulk update failed" }, { status: 500 });
  }
}


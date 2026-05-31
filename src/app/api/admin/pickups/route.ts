export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Pickup } from "@/models/Pickup";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page   = parseInt(searchParams.get("page") ?? "1");
    const limit  = parseInt(searchParams.get("limit") ?? "20");
    const skip   = (page - 1) * limit;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};
    if (status && status !== "All") query.status = status;

    const [pickups, total] = await Promise.all([
      Pickup.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Pickup.countDocuments(query),
    ]);

    return NextResponse.json({ pickups, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const pickup = await Pickup.create(body);
    return NextResponse.json(pickup, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}


export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Review } from "@/models/Review";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") ?? "All";
    const page   = parseInt(searchParams.get("page") ?? "1");
    const limit  = parseInt(searchParams.get("limit") ?? "20");
    const skip   = (page - 1) * limit;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};
    if (status !== "All") query.status = status;

    const [reviews, total] = await Promise.all([
      Review.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Review.countDocuments(query),
    ]);

    return NextResponse.json({ reviews, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const { id, status, featured } = await req.json();
    const update: Record<string, unknown> = {};
    if (status !== undefined) update.status = status;
    if (featured !== undefined) update.featured = featured;
    await Review.findByIdAndUpdate(id, update);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { id } = await req.json();
    await Review.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

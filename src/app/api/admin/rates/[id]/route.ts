export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ScrapRate } from "@/models/ScrapRate";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    const rate = await ScrapRate.findByIdAndUpdate(
      params.id,
      { ...body, updatedBy: "admin" },
      { new: true }
    ).lean();
    if (!rate) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(rate);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await ScrapRate.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

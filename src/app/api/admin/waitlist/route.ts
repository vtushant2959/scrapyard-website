export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Waitlist } from "@/models/Waitlist";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page  = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "20");
    const skip  = (page - 1) * limit;

    const [entries, total] = await Promise.all([
      Waitlist.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Waitlist.countDocuments(),
    ]);

    return NextResponse.json({ entries, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { id } = await req.json();
    await Waitlist.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}


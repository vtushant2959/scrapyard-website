export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status  = searchParams.get("status");
    const city    = searchParams.get("city");
    const search  = searchParams.get("search");
    const page    = parseInt(searchParams.get("page") ?? "1");
    const limit   = parseInt(searchParams.get("limit") ?? "20");
    const skip    = (page - 1) * limit;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};
    if (status && status !== "All") query.status = status;
    if (city)   query.city = { $regex: city, $options: "i" };
    if (search) query.$or = [
      { name:  { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];

    const [leads, total] = await Promise.all([
      Lead.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Lead.countDocuments(query),
    ]);

    return NextResponse.json({ leads, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const lead = await Lead.create(body);
    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}


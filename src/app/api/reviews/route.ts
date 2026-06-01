export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Review } from "@/models/Review";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");
    const limit    = parseInt(searchParams.get("limit") ?? "20");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = { status: "approved" };
    if (featured === "true") query.featured = true;

    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, rating, review, city, scrapType, title, email, phone } = body;

    if (!name || !rating || !review) {
      return NextResponse.json({ error: "Name, rating and review are required" }, { status: 400 });
    }

    await Review.create({ name, rating, review, city, scrapType, title, email, phone, status: "pending" });
    return NextResponse.json({ success: true, message: "Thank you! Your review will be published after verification." });
  } catch {
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}

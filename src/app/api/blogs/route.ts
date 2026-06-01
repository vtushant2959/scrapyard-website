export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const page     = parseInt(searchParams.get("page") ?? "1");
    const limit    = parseInt(searchParams.get("limit") ?? "12");
    const skip     = (page - 1) * limit;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = { status: "published" };
    if (category && category !== "All") query.category = category;

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .select("title slug excerpt category author coverImage views createdAt updatedAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments(query),
    ]);

    return NextResponse.json({ blogs, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ blogs: [], total: 0, page: 1, pages: 1 });
  }
}

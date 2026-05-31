export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

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

    const [blogs, total] = await Promise.all([
      Blog.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Blog.countDocuments(query),
    ]);

    return NextResponse.json({ blogs, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    // auto-generate slug from title if not provided
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
    }
    const blog = await Blog.create(body);
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}


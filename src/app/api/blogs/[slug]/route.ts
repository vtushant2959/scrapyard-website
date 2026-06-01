export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const blog = await Blog.findOneAndUpdate(
      { slug: params.slug, status: "published" },
      { $inc: { views: 1 } },
      { new: true }
    ).lean();

    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

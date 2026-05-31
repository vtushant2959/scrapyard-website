export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { Pickup } from "@/models/Pickup";
import { Waitlist } from "@/models/Waitlist";
import { Blog } from "@/models/Blog";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));

    const [
      totalLeads,
      newLeadsToday,
      pickupsToday,
      pickupsCompleted,
      waitlistCount,
      publishedBlogs,
      recentLeads,
      leadsByStatus,
      revenueData,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ createdAt: { $gte: startOfToday } }),
      Pickup.countDocuments({ createdAt: { $gte: startOfToday } }),
      Pickup.countDocuments({ status: "Completed", createdAt: { $gte: startOfMonth } }),
      Waitlist.countDocuments(),
      Blog.countDocuments({ status: "published" }),
      Lead.find().sort({ createdAt: -1 }).limit(8).lean(),
      Lead.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Pickup.aggregate([
        { $match: { status: "Completed", createdAt: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
    ]);

    const revenue = revenueData[0]?.total ?? 0;

    return NextResponse.json({
      totalLeads,
      newLeadsToday,
      pickupsToday,
      pickupsCompleted,
      waitlistCount,
      publishedBlogs,
      revenue,
      recentLeads,
      leadsByStatus,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}


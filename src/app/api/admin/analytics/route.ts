export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { Pickup } from "@/models/Pickup";
import { Waitlist } from "@/models/Waitlist";

export async function GET() {
  await connectDB();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [
    leadsByStatus,
    leadsByCity,
    pickupsByStatus,
    leadsLast7Days,
    totalLeads,
    totalPickups,
    totalWaitlist,
    revenueAgg,
  ] = await Promise.all([
    Lead.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Lead.aggregate([{ $group: { _id: "$city", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 10 }]),
    Pickup.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Lead.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),
    Lead.countDocuments(),
    Pickup.countDocuments(),
    Waitlist.countDocuments(),
    Pickup.aggregate([
      { $match: { status: "Completed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]),
  ]);

  return NextResponse.json({
    leadsByStatus,
    leadsByCity,
    pickupsByStatus,
    leadsLast7Days,
    totalLeads,
    totalPickups,
    totalWaitlist,
    totalRevenue: revenueAgg[0]?.total ?? 0,
  });
}


export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Waitlist } from "@/models/Waitlist";
import { sendWaitlistAlert } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, city, userType } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    await connectDB();
    // upsert so duplicate emails just update instead of throwing
    await Waitlist.findOneAndUpdate(
      { email },
      { name, phone, city, userType },
      { upsert: true, new: true }
    );

    // Send email alert — non-blocking
    sendWaitlistAlert({ name, phone, email, city, userType }).catch(
      (err) => console.error("Waitlist email failed:", err)
    );

    return NextResponse.json({ success: true, message: "You're on the waitlist!" });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { sendLeadAlert } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, city, businessType, scrapType, message } = body;

    if (!name || !phone || !email || !message) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    await connectDB();
    await Lead.create({ name, phone, email, city, businessType, scrapType, message, source: "website" });

    // Send email alert - non-blocking so form doesn't fail if email fails
    sendLeadAlert({ name, phone, email, city, businessType, scrapType, message }).catch(
      (err) => console.error("Lead email failed:", err)
    );

    return NextResponse.json({ success: true, message: "We will contact you within 2 hours!" });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


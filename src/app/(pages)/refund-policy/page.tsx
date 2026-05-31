import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Refund Policy | SCRAPYARD",
  description: "SCRAPYARD Refund Policy — Our commitment to fair and transparent transactions.",
};

export default function RefundPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <h1 className="text-4xl font-black text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>Refund Policy</h1>
          <p className="text-text-muted text-sm mb-8">Last updated: May 30, 2026</p>
          <div className="space-y-4">
            {[
              { title: "Our Commitment", body: "SCRAPYARD is committed to fair and transparent transactions. Our digital weighing system ensures accurate measurements, and our pricing is based on live market rates." },
              { title: "Payment Disputes", body: "If you believe the payment amount is incorrect, raise a dispute within 24 hours by calling +91 85058 63220 or emailing info@scrapyard.co.in with your pickup reference number." },
              { title: "Weight Disputes", body: "All weighing is done on calibrated digital scales in front of the customer. If you dispute the weight, we will arrange a re-weighing at a certified weighbridge within 48 hours." },
              { title: "Cancellation Refunds", body: "If you pre-paid for any service and cancelled within the allowed period, refunds are processed within 3-5 business days to the original payment method." },
              { title: "Contact for Refunds", body: "Contact info@scrapyard.co.in or call +91 85058 63220 (24/7, always available) for all refund queries. Include your pickup reference number." },
            ].map((section) => (
              <div key={section.title} className="glass-card rounded-xl p-6">
                <h2 className="text-base font-bold text-white mb-3">{section.title}</h2>
                <p className="text-sm text-text-muted leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

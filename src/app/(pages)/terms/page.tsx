import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | SCRAPYARD",
  description: "SCRAPYARD Terms of Service — Usage terms, conditions, and your rights as a SCRAPYARD user.",
  alternates: { canonical: "https://scrapyard.co.in/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <h1 className="text-4xl font-black text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>Terms of Service</h1>
          <p className="text-text-muted text-sm mb-8">Last updated: May 30, 2026</p>
          <div className="space-y-4">
            {[
              { title: "1. Acceptance of Terms", body: "By using SCRAPYARD's website, app, or services, you agree to these Terms of Service. If you do not agree, please do not use our services." },
              { title: "2. Services Description", body: "SCRAPYARD is a digital scrap marketplace that facilitates the collection, sale, and recycling of scrap materials. We connect scrap sellers with verified buyers and provide logistics services." },
              { title: "3. User Obligations", body: "Users must provide accurate information, ensure scrap material is legally owned, cooperate with our collection team, and comply with all applicable laws and regulations." },
              { title: "4. Pricing and Payments", body: "Scrap prices are based on live market rates at the time of collection. Prices shown on the website are indicative. Final prices are determined after physical weighing and quality assessment." },
              { title: "5. Cancellation Policy", body: "Pickups can be cancelled up to 2 hours before the scheduled time without charge. Cancellations after this time or no-shows may incur a nominal convenience fee." },
              { title: "6. Liability Limitation", body: "SCRAPYARD's liability is limited to the value of the transaction. We are not liable for indirect, incidental, or consequential damages arising from the use of our services." },
              { title: "7. Dispute Resolution", body: "Disputes should be raised within 24 hours of the pickup. Contact info@scrapyard.co.in. We aim to resolve all disputes within 5 business days." },
              { title: "8. Changes to Terms", body: "We reserve the right to modify these terms. Changes will be communicated via email and website notification. Continued use constitutes acceptance." },
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

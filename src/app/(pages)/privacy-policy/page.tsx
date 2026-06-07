import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | SCRAPYARD",
  description: "SCRAPYARD Privacy Policy - How we collect, use, and protect your personal information.",
  alternates: { canonical: "https://scrapyard.co.in/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <h1 className="text-4xl font-black text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>Privacy Policy</h1>
          <p className="text-text-muted text-sm mb-8">Last updated: May 30, 2026</p>
          <div className="prose prose-invert prose-sm max-w-none space-y-6">
            {[
              { title: "1. Information We Collect", body: "We collect name, phone number, email address, city, business type, scrap details, and usage data when you use SCRAPYARD services or visit our website. We collect this information when you register, schedule a pickup, fill a contact form, or interact with our platform." },
              { title: "2. How We Use Your Information", body: "We use your information to: schedule and manage scrap pickups, process payments, send service updates and notifications, improve our platform, comply with legal requirements, and send marketing communications (with your consent)." },
              { title: "3. Information Sharing", body: "We share your information with verified scrap buyers to facilitate pickups, payment processors to process transactions, logistics partners to manage collections, and as required by law. We do not sell your personal information to third parties." },
              { title: "4. Data Security", body: "We implement industry-standard security measures including SSL encryption, secure payment processing, access controls, and regular security audits to protect your personal information." },
              { title: "5. Cookies", body: "We use cookies to improve your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences." },
              { title: "6. Your Rights", body: "You have the right to access, correct, or delete your personal information. Contact us at info@scrapyard.co.in to exercise these rights." },
              { title: "7. Contact Us", body: "For privacy-related queries, contact us at info@scrapyard.co.in or call +91 85058 63220." },
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

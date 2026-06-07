import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Sell Scrap Online in India — Step-by-Step Guide | SCRAPYARD",
  description: "Complete guide on how to sell scrap online in India. Book free doorstep pickup, get live market rates, and receive instant payment with SCRAPYARD.",
  keywords: ["how to sell scrap online", "sell scrap online India", "online scrap pickup", "sell kabadi online", "scrap selling guide India"],
  alternates: { canonical: "https://scrapyard.co.in/how-to-sell-scrap-online" },
};

const steps = [
  { step: "1", title: "Identify Your Scrap", desc: "Sort your scrap by type — metal, plastic, paper, e-waste, appliances. Sorted scrap gets 15–20% better rates than mixed scrap.", tip: "Tip: Keep iron separate from copper and aluminium." },
  { step: "2", title: "Check Live Rates", desc: "Visit scrapyard.co.in/scrap-rates to see today's market rates for your material. This gives you a fair expectation before booking.", tip: "Tip: Copper and aluminium rates change daily — sell when rates are high." },
  { step: "3", title: "Book Pickup Online", desc: "Fill our simple form on scrapyard.co.in/contact or call +91 8505863220. Mention your scrap type, city, and preferred time slot.", tip: "Tip: WhatsApp us for fastest response — +91 8505863220." },
  { step: "4", title: "Agent Arrives", desc: "Our uniformed agent arrives at your address with a certified digital weighing scale and mobile payment system. No charges for pickup.", tip: "Tip: Keep your scrap accessible — ground floor or lift access helps." },
  { step: "5", title: "Weighing & Pricing", desc: "Scrap is weighed on our certified scale in front of you. You see the exact weight and rate. No hidden deductions or bargaining.", tip: "Tip: You can verify weight on our scale yourself before payment." },
  { step: "6", title: "Instant Payment", desc: "Receive payment immediately via Cash, UPI (GPay/PhonePe/Paytm), or bank transfer. No waiting. No cheques.", tip: "Tip: UPI payments are instant. Bank transfers for large amounts (₹10k+)." },
];

const tips = [
  "Remove plastic/rubber attachments from metal — mixed material gets lower rates",
  "Strip insulation from copper wire to get bare copper rate (20% more)",
  "Sell in bulk — larger quantities get premium rates",
  "Keep your scrap dry — wet paper and cardboard get lower rates",
  "Separate old appliances from regular scrap — they get individual pricing",
  "Download the SCRAPYARD app to track today's rates daily",
];

export default function HowToSellScrapPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16" style={{ background: "#081018" }}>
        <section className="py-16 grid-bg" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(44,235,136,0.07) 0%, transparent 55%)" }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}>
              Step-by-Step Guide
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              How to <span style={{ color: "#2CEB88" }}>Sell Scrap Online</span> in India
            </h1>
            <p className="text-text-muted text-lg">From sorting to instant payment — everything you need to know about selling scrap online with SCRAPYARD.</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">

            {/* Steps */}
            <div className="space-y-4">
              {steps.map((s) => (
                <div key={s.step} className="glass-card rounded-2xl p-6 flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-accent-glow/20 flex items-center justify-center text-accent-glow font-black text-lg flex-shrink-0" style={{ fontFamily: "var(--font-syne)" }}>
                    {s.step}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">{s.title}</h3>
                    <p className="text-sm text-silver leading-relaxed mb-2">{s.desc}</p>
                    <p className="text-xs text-accent-glow/80 font-medium">{s.tip}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pro tips */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-black text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>
                Pro Tips to Get Maximum Value
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {tips.map((tip) => (
                  <div key={tip} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-glow flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-silver">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why online is better */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-black text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>
                Why Sell Scrap Online Instead of Local Kabadiwala?
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-dark-border">
                      <th className="text-left py-3 text-text-muted font-semibold">Factor</th>
                      <th className="text-center py-3 text-text-muted font-semibold">Kabadiwala</th>
                      <th className="text-center py-3 text-accent-glow font-semibold">SCRAPYARD Online</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Rates", "20–40% below market", "Live market rates"],
                      ["Weighing", "Spring scale (inaccurate)", "Certified digital scale"],
                      ["Payment", "Cash only, sometimes delayed", "Instant Cash/UPI/Bank"],
                      ["Timing", "Comes when he wants", "You choose the slot"],
                      ["Receipt", "None", "Itemised digital receipt"],
                      ["Booking", "Shout from balcony", "App/Website/WhatsApp"],
                    ].map(([factor, kab, sy]) => (
                      <tr key={factor} className="border-b border-dark-border/50">
                        <td className="py-3 text-silver font-medium">{factor}</td>
                        <td className="py-3 text-center text-red-400 text-xs">{kab}</td>
                        <td className="py-3 text-center text-accent-glow text-xs font-medium">{sy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA */}
            <div className="glass-card rounded-2xl p-8 text-center" style={{ border: "1px solid rgba(44,235,136,0.2)" }}>
              <h3 className="text-xl font-black text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>Start Selling Scrap Online Now</h3>
              <p className="text-text-muted text-sm mb-6">Free pickup · Best rates · Instant payment · Available 24/7 across 30+ cities</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact" className="btn-primary text-sm px-6 py-3 flex items-center gap-2">Book Free Pickup <ArrowRight className="w-4 h-4" /></Link>
                <a href="tel:+918505863220" className="btn-secondary text-sm px-6 py-3 flex items-center gap-2"><Phone className="w-4 h-4" />+91 8505863220</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "SCRAPYARD vs Traditional Kabadiwala — Who Gives Better Rate? | 2024",
  description: "Honest comparison: SCRAPYARD vs local kabadiwala. Who gives better scrap rates, accurate weighing, faster payment? Real example shows ₹1,000+ difference.",
  keywords: ["scrapyard vs kabadiwala", "online scrap vs kabadiwala", "kabadiwala alternative", "best scrap buyer India", "kabadi wala vs app"],
  alternates: { canonical: "https://scrapyard.co.in/scrapyard-vs-kabadiwala" },
};

const comparison = [
  { factor: "Scrap Rates",        sy: "Live market rates (up to 40% more)",     kab: "20–40% below market",           winner: "sy" },
  { factor: "Weighing Method",    sy: "Certified digital scale — 100% accurate", kab: "Spring scale — often inaccurate", winner: "sy" },
  { factor: "Payment Speed",      sy: "Instant via Cash/UPI/Bank",              kab: "Cash only, sometimes delayed",    winner: "sy" },
  { factor: "Timing",             sy: "You choose the slot, 24/7",              kab: "Comes when he wants",             winner: "sy" },
  { factor: "Booking",            sy: "App/Website/WhatsApp",                   kab: "Shout from balcony or wait",      winner: "sy" },
  { factor: "Documentation",      sy: "Itemised receipt, GST invoice available", kab: "No receipt, no record",          winner: "sy" },
  { factor: "Transparency",       sy: "100% — rate shown before pickup",        kab: "Zero — take it or leave it",      winner: "sy" },
  { factor: "Material Coverage",  sy: "All types including e-waste, appliances", kab: "Limited to basic scrap",         winner: "sy" },
  { factor: "E-Waste Compliance", sy: "CPCB-certified, certificate provided",   kab: "Illegal disposal, no compliance", winner: "sy" },
  { factor: "Service Area",       sy: "30+ cities across India",                kab: "Your street only",                winner: "sy" },
];

export default function ScrapyardVsKabadiPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16" style={{ background: "#081018" }}>
        <section className="py-16 grid-bg" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(44,235,136,0.07) 0%, transparent 55%)" }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}>
              Honest Comparison
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              SCRAPYARD vs <span style={{ color: "#2CEB88" }}>Kabadiwala</span>
            </h1>
            <p className="text-text-muted text-lg">An honest, data-backed comparison. Who actually gives you a better deal?</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">

            {/* Real example */}
            <div className="glass-card rounded-2xl p-8" style={{ border: "1px solid rgba(44,235,136,0.2)" }}>
              <h2 className="text-xl font-black text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>Real Example: 100kg of Iron Scrap</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                  <p className="text-red-400 font-bold text-sm mb-3">❌ Kabadiwala</p>
                  <div className="space-y-2 text-sm text-silver">
                    <p>Quoted rate: <strong className="text-white">₹22/kg</strong> <span className="text-text-muted">(market is ₹32)</span></p>
                    <p>Weighed on spring scale: <strong className="text-white">95 kg</strong> <span className="text-text-muted">(5kg "lost")</span></p>
                    <p>Payment: Cash, next day</p>
                    <div className="border-t border-dark-border pt-2 mt-2">
                      <p className="text-lg font-black text-red-400">₹2,090</p>
                      <p className="text-xs text-text-muted">₹22 × 95kg</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl" style={{ background: "rgba(44,235,136,0.06)", border: "1px solid rgba(44,235,136,0.2)" }}>
                  <p className="text-accent-glow font-bold text-sm mb-3">✅ SCRAPYARD</p>
                  <div className="space-y-2 text-sm text-silver">
                    <p>Live market rate: <strong className="text-white">₹32/kg</strong></p>
                    <p>Digital scale: <strong className="text-white">100 kg</strong> exact</p>
                    <p>Payment: Instant UPI</p>
                    <div className="border-t border-dark-border pt-2 mt-2">
                      <p className="text-lg font-black text-accent-glow">₹3,200</p>
                      <p className="text-xs text-text-muted">₹32 × 100kg</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 p-4 rounded-xl text-center" style={{ background: "rgba(44,235,136,0.08)" }}>
                <p className="text-accent-glow font-black text-lg">You earn ₹1,110 MORE with SCRAPYARD</p>
                <p className="text-text-muted text-xs mt-1">That&apos;s 53% more for the same scrap</p>
              </div>
            </div>

            {/* Full comparison table */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-dark-border">
                <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>Full Comparison</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-border bg-white/2">
                      <th className="text-left px-6 py-3 text-xs text-text-muted font-semibold">Factor</th>
                      <th className="text-center px-6 py-3 text-xs text-accent-glow font-semibold">SCRAPYARD</th>
                      <th className="text-center px-6 py-3 text-xs text-red-400 font-semibold">Kabadiwala</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row) => (
                      <tr key={row.factor} className="border-b border-dark-border/50 hover:bg-white/2 transition-colors">
                        <td className="px-6 py-4 text-sm text-silver font-medium">{row.factor}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center gap-2 justify-center">
                            <CheckCircle className="w-4 h-4 text-accent-glow flex-shrink-0" />
                            <span className="text-xs text-silver">{row.sy}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center gap-2 justify-center">
                            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                            <span className="text-xs text-silver">{row.kab}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* When kabadiwala is ok */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>When is Kabadiwala Still OK?</h2>
              <p className="text-silver text-sm leading-relaxed mb-4">We believe in being honest. The local kabadiwala still makes sense for:</p>
              <ul className="space-y-2">
                {["Very small quantities (1–3 kg) not worth booking a pickup for", "Immediate cash needed and no digital payment preferred", "Paper/cardboard where rate differences are small"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-silver">
                    <span className="text-text-muted mt-0.5">•</span>{item}
                  </li>
                ))}
              </ul>
              <p className="text-silver text-sm mt-4">For everything else — metals, e-waste, appliances, bulk quantities — SCRAPYARD gives you significantly better value every time.</p>
            </div>

            {/* CTA */}
            <div className="glass-card rounded-2xl p-8 text-center" style={{ border: "1px solid rgba(44,235,136,0.2)" }}>
              <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>Try SCRAPYARD Once. We&apos;ll Prove It.</h3>
              <p className="text-text-muted text-sm mb-6">Book your first free pickup. Compare what we pay vs your kabadiwala&apos;s last quote.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact" className="btn-primary text-sm px-6 py-3 flex items-center gap-2">Book Free Pickup <ArrowRight className="w-4 h-4" /></Link>
                <Link href="/scrap-rates" className="btn-secondary text-sm px-6 py-3">Check Today&apos;s Rates</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

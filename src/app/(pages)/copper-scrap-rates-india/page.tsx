import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, TrendingUp, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Copper Scrap Rates in India Today — Live Prices | SCRAPYARD",
  description: "Today's copper scrap rates in India. Live copper prices by city (Delhi, Mumbai, Bangalore). Bare bright ₹510-530/kg. Free pickup with instant payment.",
  keywords: ["copper scrap rate today", "copper scrap price India", "copper rate today", "tamba ka rate", "copper wire rate", "copper scrap buyer near me"],
  alternates: { canonical: "https://scrapyard.co.in/copper-scrap-rates-india" },
};

const rates = [
  { type: "Bare Bright Copper Wire",    rate: "₹510–530", desc: "Stripped, clean copper wire. No insulation." },
  { type: "Copper #1 (Thick pipe/wire)", rate: "₹490–510", desc: "Clean copper pipes, bus bars, heavy wire." },
  { type: "Copper #2 (Mixed wire)",      rate: "₹470–490", desc: "Mixed copper wire with some impurities." },
  { type: "Copper Motor Winding",        rate: "₹420–450", desc: "From motors, transformers, fans." },
  { type: "Copper Transformer Scrap",    rate: "₹380–420", desc: "Old transformer copper with insulation." },
  { type: "Brass (Copper alloy)",        rate: "₹280–320", desc: "Yellow/red brass fittings, taps, valves." },
  { type: "Copper Radiator",             rate: "₹200–280", desc: "Auto radiators — copper + aluminium." },
  { type: "Insulated Copper Wire",       rate: "₹250–350", desc: "Wire with plastic insulation intact." },
];

const cities = [
  { city: "Delhi", rate: "₹500–520" },
  { city: "Noida", rate: "₹498–518" },
  { city: "Gurgaon", rate: "₹498–516" },
  { city: "Mumbai", rate: "₹495–515" },
  { city: "Bangalore", rate: "₹490–510" },
  { city: "Hyderabad", rate: "₹488–508" },
  { city: "Chennai", rate: "₹485–505" },
  { city: "Pune", rate: "₹490–510" },
];

export default function CopperScrapRatesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16" style={{ background: "#081018" }}>
        <section className="py-16 grid-bg" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(44,235,136,0.07) 0%, transparent 55%)" }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}>
              <TrendingUp className="w-3.5 h-3.5" /> Live Prices
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Copper Scrap Rates <span style={{ color: "#2CEB88" }}>in India</span>
            </h1>
            <p className="text-text-muted text-lg mb-2">Live copper scrap prices updated daily across all major Indian cities.</p>
            <p className="text-xs text-text-muted font-mono">Rates are indicative. Call for today&apos;s exact quote: +91 8505863220</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">

            {/* Rate table */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-dark-border flex items-center justify-between">
                <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>Copper Scrap Price List</h2>
                <span className="text-xs text-accent-glow font-mono">Per kg · Delhi NCR</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-border bg-white/2">
                      <th className="text-left px-6 py-3 text-xs text-text-muted font-semibold">Type</th>
                      <th className="text-right px-6 py-3 text-xs text-text-muted font-semibold">Rate (₹/kg)</th>
                      <th className="text-left px-6 py-3 text-xs text-text-muted font-semibold hidden sm:table-cell">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rates.map((r) => (
                      <tr key={r.type} className="border-b border-dark-border/50 hover:bg-white/2 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-white">{r.type}</td>
                        <td className="px-6 py-4 text-right font-black text-accent-glow">{r.rate}</td>
                        <td className="px-6 py-4 text-xs text-text-muted hidden sm:table-cell">{r.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* City rates */}
            <div>
              <h2 className="text-xl font-black text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>Copper Rate by City (Bare Bright)</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {cities.map((c) => (
                  <div key={c.city} className="glass-card rounded-xl p-4 text-center">
                    <p className="text-xs text-text-muted mb-1">{c.city}</p>
                    <p className="text-lg font-black text-accent-glow" style={{ fontFamily: "var(--font-syne)" }}>{c.rate}</p>
                    <p className="text-xs text-text-muted">per kg</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-muted mt-3">* Rates are approximate for Bare Bright copper. Call for exact current rates.</p>
            </div>

            {/* Tips */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-black text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>How to Get Maximum Copper Rate</h2>
              <div className="space-y-3">
                {[
                  { tip: "Strip the insulation", detail: "Bare copper wire gets ₹150–180/kg more than insulated wire. Stripping takes time but is worth it for large quantities." },
                  { tip: "Separate copper grades", detail: "Don't mix thick pipe copper with thin wire copper. Sorted copper always gets grade-specific rates." },
                  { tip: "Remove solder and attachments", detail: "Solder (tin-lead) on copper reduces purity. Remove fittings, joints, and other metals before selling." },
                  { tip: "Sell in bulk", detail: "Quantities above 10kg get better rates. If you have multiple small lots, accumulate before selling." },
                ].map((item) => (
                  <div key={item.tip} className="flex gap-4 p-3 rounded-xl" style={{ background: "rgba(44,235,136,0.05)" }}>
                    <span className="text-accent-glow font-bold text-sm mt-0.5 flex-shrink-0">→</span>
                    <div>
                      <p className="text-sm font-bold text-white">{item.tip}</p>
                      <p className="text-xs text-silver mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="glass-card rounded-2xl p-8 text-center" style={{ border: "1px solid rgba(44,235,136,0.2)" }}>
              <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>Sell Your Copper Scrap Today</h3>
              <p className="text-text-muted text-sm mb-6">Get today&apos;s exact copper rate + free doorstep pickup + instant payment</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact" className="btn-primary text-sm px-6 py-3 flex items-center gap-2">Book Free Pickup <ArrowRight className="w-4 h-4" /></Link>
                <a href="tel:+918505863220" className="btn-secondary text-sm px-6 py-3 flex items-center gap-2"><Phone className="w-4 h-4" />Get Today&apos;s Rate</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "What is Scrap? Types, Uses & How to Sell Scrap in India | SCRAPYARD",
  description: "Learn what scrap is, types of scrap materials (metal, plastic, e-waste, paper), their value, and how to sell scrap at the best rates in India with SCRAPYARD.",
  keywords: ["what is scrap", "types of scrap", "scrap materials India", "scrap meaning", "scrap value India"],
  alternates: { canonical: "https://scrapyard.co.in/what-is-scrap" },
};

const types = [
  { name: "Metal Scrap", items: ["Iron & Steel", "Copper", "Aluminium", "Brass", "Zinc", "Lead"], color: "#C8CDD5", rate: "₹22–530/kg" },
  { name: "Plastic Scrap", items: ["PET Bottles", "HDPE", "PVC Pipes", "PP", "Mixed Plastic"], color: "#22C55E", rate: "₹8–22/kg" },
  { name: "Paper Scrap", items: ["Newspaper", "Cardboard", "Office Paper", "Books"], color: "#EAB308", rate: "₹10–20/kg" },
  { name: "E-Waste", items: ["Old Phones", "Laptops", "TVs", "Wires", "Batteries"], color: "#3B82F6", rate: "₹30–500/pc" },
  { name: "Appliances", items: ["AC", "Fridge", "Washing Machine", "Geyser", "Fan"], color: "#8B5CF6", rate: "₹300–6,500/pc" },
  { name: "Industrial", items: ["Factory Waste", "Machine Parts", "Rubber", "Glass"], color: "#F97316", rate: "Varies" },
];

export default function WhatIsScrapPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16" style={{ background: "#081018" }}>
        {/* Hero */}
        <section className="py-16 grid-bg" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(44,235,136,0.07) 0%, transparent 55%)" }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}>
              Scrap Guide
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              What is <span style={{ color: "#2CEB88" }}>Scrap</span>?
            </h1>
            <p className="text-text-muted text-lg">Complete guide to scrap materials, their types, value, and how to sell them in India.</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">

            {/* Definition */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>Definition of Scrap</h2>
              <p className="text-silver leading-relaxed mb-4">
                <strong className="text-white">Scrap</strong> refers to any material that has been used and is no longer needed in its current form, but still has value as a raw material for recycling or reprocessing. In India, scrap includes old metal items, discarded electronics, waste paper, plastic, and industrial by-products.
              </p>
              <p className="text-silver leading-relaxed">
                Unlike garbage (which has no value), scrap is a <strong className="text-white">valuable commodity</strong>. India&apos;s scrap industry is worth over ₹5 lakh crore and employs millions. Every piece of iron, copper wire, or old AC you sell gets recycled into new products - saving energy and natural resources.
              </p>
            </div>

            {/* Types */}
            <div>
              <h2 className="text-2xl font-black text-white mb-6" style={{ fontFamily: "var(--font-syne)" }}>Types of Scrap in India</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {types.map((t) => (
                  <div key={t.name} className="glass-card rounded-xl p-5" style={{ borderLeft: `3px solid ${t.color}20` }}>
                    <h3 className="text-sm font-bold text-white mb-1">{t.name}</h3>
                    <p className="text-xs text-accent-glow font-mono mb-3">{t.rate}</p>
                    <ul className="space-y-1">
                      {t.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-silver">
                          <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: t.color }} />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Why valuable */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>Why is Scrap Valuable?</h2>
              <div className="space-y-4 text-silver">
                <p className="leading-relaxed"><strong className="text-white">1. Resource Conservation:</strong> Recycling scrap metal uses 60–95% less energy than mining virgin ore. 1 tonne of recycled steel saves 1.1 tonnes of iron ore, 630kg of coal, and 55kg of limestone.</p>
                <p className="leading-relaxed"><strong className="text-white">2. Industrial Demand:</strong> Steel plants, copper refineries, and plastic recyclers constantly need raw material. Scrap is cheaper and more sustainable than mining, creating constant demand.</p>
                <p className="leading-relaxed"><strong className="text-white">3. Global Market:</strong> Scrap prices are linked to international commodity markets (LME). Copper scrap in India follows global copper prices - which is why rates change daily.</p>
                <p className="leading-relaxed"><strong className="text-white">4. Government Support:</strong> India&apos;s government actively promotes recycling through the E-Waste Management Rules 2022 and Metal Recycling Policy, making scrap a regulated and supported industry.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="glass-card rounded-2xl p-8 text-center" style={{ border: "1px solid rgba(44,235,136,0.2)" }}>
              <h3 className="text-xl font-black text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>Ready to Sell Your Scrap?</h3>
              <p className="text-text-muted text-sm mb-6">SCRAPYARD buys all types of scrap at live market rates. Free pickup across 30+ cities.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/scrap-rates" className="btn-primary text-sm px-6 py-3 flex items-center gap-2">Check Today&apos;s Rates <ArrowRight className="w-4 h-4" /></Link>
                <Link href="/contact" className="btn-secondary text-sm px-6 py-3">Book Free Pickup</Link>
              </div>
            </div>

            {/* Related */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Related Guides</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { href: "/how-to-sell-scrap-online", title: "How to Sell Scrap Online in India" },
                  { href: "/copper-scrap-rates-india", title: "Copper Scrap Rates in India" },
                  { href: "/scrapyard-vs-kabadiwala", title: "SCRAPYARD vs Kabadiwala" },
                  { href: "/scrap-rates", title: "Live Scrap Rates Today" },
                ].map((r) => (
                  <Link key={r.href} href={r.href} className="glass-card rounded-xl p-4 flex items-center justify-between hover:border-accent-glow/30 transition-all group">
                    <span className="text-sm text-silver group-hover:text-white transition-colors">{r.title}</span>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent-glow transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

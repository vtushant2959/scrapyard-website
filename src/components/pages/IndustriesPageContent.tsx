"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Factory, Hotel, Hammer, Warehouse, ShoppingBag, Heart, Cog, GraduationCap, ArrowRight, CheckCircle } from "lucide-react";

const industries = [
  {
    id: "factories",
    icon: Factory,
    title: "Factories & Manufacturing",
    desc: "Comprehensive factory scrap management — MS scrap, metal offcuts, copper cables, packaging waste, and more. Regular schedules, GST compliance, bulk pricing.",
    scrapTypes: ["MS Scrap", "Copper Cables", "Aluminium Offcuts", "Packaging Waste", "Machine Parts"],
    color: "#2CEB88",
    stat: "Avg. ₹2.5L/month savings",
  },
  {
    id: "hotels",
    icon: Hotel,
    title: "Hotels & Hospitality",
    desc: "Hotel waste management including kitchen scrap, cardboard, glass, old furniture, linen, and electrical equipment disposal with proper documentation.",
    scrapTypes: ["Kitchen Waste", "Cardboard", "Old Furniture", "Electronics", "Linen"],
    color: "#6F9E62",
    stat: "Zero-waste certification",
  },
  {
    id: "construction",
    icon: Hammer,
    title: "Construction & Builders",
    desc: "On-site collection for demolition and construction scrap — iron rods, electrical cables, aluminium fixtures, wood, and all building materials.",
    scrapTypes: ["Iron Rods", "Copper Wiring", "Aluminium Fixtures", "Wood", "Bricks"],
    color: "#FF6B35",
    stat: "Same-day site clearance",
  },
  {
    id: "warehouses",
    icon: Warehouse,
    title: "Warehouses & Logistics",
    desc: "Complete warehouse clearance — metal racks, packaging materials, old inventory, machines, and regular ongoing waste management programs.",
    scrapTypes: ["Metal Racks", "Packaging", "Old Inventory", "Equipment", "Pallets"],
    color: "#003C9E",
    stat: "Single-day clearance",
  },
  {
    id: "retail",
    icon: ShoppingBag,
    title: "Retail & Commercial",
    desc: "Retail store and mall waste management including fixtures, electronics, cardboard, plastic packaging, signage, and display materials.",
    scrapTypes: ["Store Fixtures", "Electronics", "Cardboard", "Plastic", "Signage"],
    color: "#9B59B6",
    stat: "Bi-weekly schedules",
  },
  {
    id: "hospitals",
    icon: Heart,
    title: "Hospitals & Healthcare",
    desc: "CPCB-compliant medical equipment disposal, e-waste recycling, metal scrap, and non-hazardous waste collection with proper certification.",
    scrapTypes: ["Medical Equipment", "Electronics", "Metal Scrap", "Cables", "Furniture"],
    color: "#E74C3C",
    stat: "CPCB certified disposal",
  },
  {
    id: "manufacturing",
    icon: Cog,
    title: "Auto & Engineering",
    desc: "Automotive and engineering industry scrap — vehicle parts, metal components, cables, batteries, and manufacturing waste at best rates.",
    scrapTypes: ["Vehicle Parts", "Metal Components", "Lead Batteries", "Cables", "Tools"],
    color: "#F39C12",
    stat: "Up to ₹8L/quarter",
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "Educational Institutions",
    desc: "Schools, colleges, and universities — computer labs e-waste, old furniture, paper recycling programs, and campus sustainability initiatives.",
    scrapTypes: ["Computers", "Lab Equipment", "Old Furniture", "Paper", "Cables"],
    color: "#27AE60",
    stat: "Campus sustainability",
  },
];

export function IndustriesPageContent() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <div ref={ref} className="pt-16">
      <section className="py-20 relative grid-bg" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,60,158,0.12) 0%, transparent 55%)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Industries We <span className="gradient-text">Serve</span>
            </h1>
            <p className="text-text-muted text-lg">Specialized scrap management solutions built for every sector.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {industries.map((ind, i) => (
              <motion.div key={ind.id} id={ind.id} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }}>
                <div className="glass-card rounded-2xl p-6 h-full flex gap-5 group hover:glow-border-green transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-1" style={{ background: `${ind.color}15`, border: `1px solid ${ind.color}30` }}>
                    <ind.icon className="w-6 h-6" style={{ color: ind.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>{ind.title}</h3>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: `${ind.color}15`, color: ind.color }}>{ind.stat}</span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed mb-3">{ind.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {ind.scrapTypes.map((s) => (
                        <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-text-muted">{s}</span>
                      ))}
                    </div>
                    <Link href="/contact" className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all" style={{ color: ind.color }}>
                      Get Industry Quote <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }} className="mt-12 glass-card rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
              Don&apos;t See Your Industry?
            </h3>
            <p className="text-text-muted mb-6">We work with all types of businesses. Contact us for a custom solution.</p>
            <Link href="/contact" className="btn-primary text-sm px-6 py-3 inline-flex">
              <CheckCircle className="w-4 h-4" />
              Contact Our Team
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

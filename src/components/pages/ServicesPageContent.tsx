"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Home, Building2, Factory, Warehouse, HardHat, Monitor, Recycle, Truck, CheckCircle, ArrowRight } from "lucide-react";

const services = [
  {
    id: "residential",
    icon: Home,
    title: "Residential Scrap Collection",
    desc: "Schedule a free doorstep pickup for household scrap — newspapers, bottles, old appliances, metal, and more. We weigh, pay instantly, and recycle responsibly.",
    color: "#2CEB88",
    features: ["Free doorstep service", "Digital weighing", "Instant UPI payment", "All scrap types", "WhatsApp booking"],
    badge: "Most Popular",
  },
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial Scrap Collection",
    desc: "End-to-end scrap management for offices, retail shops, and commercial properties. We handle furniture, electronics, paper, and all commercial waste.",
    color: "#6F9E62",
    features: ["GST invoicing", "Scheduled pickups", "Volume pricing", "Certified recycling", "Account manager"],
    badge: "Best Value",
  },
  {
    id: "industrial",
    icon: Factory,
    title: "Factory Scrap Disposal",
    desc: "Comprehensive industrial scrap management for factories and manufacturing units. Metal scrap, MS scrap, copper cables, and all production waste.",
    color: "#003C9E",
    features: ["Bulk pricing", "Compliance docs", "Regular schedules", "Custom reporting", "24/7 support"],
    badge: "Enterprise",
  },
  {
    id: "warehouse",
    icon: Warehouse,
    title: "Warehouse Clearance",
    desc: "Complete warehouse liquidation and clearance services. We handle everything from metal racks to packaging waste, old inventory, and equipment.",
    color: "#FF6B35",
    features: ["Single-day clearance", "Large volume capacity", "Liquidation pricing", "Full documentation", "Equipment removal"],
    badge: "Specialized",
  },
  {
    id: "demolition",
    icon: HardHat,
    title: "Demolition Scrap Management",
    desc: "Professional demolition scrap collection and recycling. Iron rods, copper wiring, aluminium fixtures, concrete, and all construction materials.",
    color: "#9B59B6",
    features: ["Construction materials", "On-site collection", "Bulk quantities", "Environmental compliance", "Site cleanup"],
    badge: "Specialized",
  },
  {
    id: "ewaste",
    icon: Monitor,
    title: "E-Waste Recycling",
    desc: "CPCB-authorized e-waste recycling for laptops, computers, mobiles, PCBs, batteries, and all electronic equipment. Proper documentation provided.",
    color: "#E74C3C",
    features: ["CPCB certified", "Recycling certificate", "Data destruction", "All electronics", "Compliance reports"],
    badge: "Certified",
  },
  {
    id: "metal",
    icon: Recycle,
    title: "Metal Recycling",
    desc: "Specialized metal recycling for iron, steel, copper, aluminium, brass, and all ferrous/non-ferrous metals at the best market rates.",
    color: "#C8CDD5",
    features: ["Best metal rates", "Daily rate updates", "Instant weighing", "All metal types", "Volume bonuses"],
    badge: "Best Rates",
  },
];

export function ServicesPageContent() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <div ref={ref} className="pt-16">
      <section className="py-20 relative grid-bg" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(44,235,136,0.08) 0%, transparent 55%)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}>
              Our Services
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Complete <span className="gradient-text">Scrap Solutions</span>
            </h1>
            <p className="text-text-muted text-lg">From single households to large factories — we handle all types of scrap with professionalism.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={svc.id}
                id={svc.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <div className="glass-card rounded-2xl p-6 h-full flex flex-col relative overflow-hidden group hover:glow-border-green transition-all duration-300">
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${svc.color}15`, color: svc.color }}>{svc.badge}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${svc.color}15`, border: `1px solid ${svc.color}30` }}>
                    <svc.icon className="w-6 h-6" style={{ color: svc.color }} />
                  </div>
                  <h3 className="text-base font-black text-white mb-3 pr-16" style={{ fontFamily: "var(--font-syne)" }}>{svc.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">{svc.desc}</p>
                  <ul className="space-y-1.5 mb-5">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-silver">
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: svc.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color: svc.color }}>
                    Book This Service
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center gradient-border">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                Need a Custom <span className="gradient-text">Solution?</span>
              </h3>
              <p className="text-text-muted mb-6">We work with enterprises to create custom scrap management programs that fit your specific needs and scale.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact" className="btn-primary text-sm px-6 py-3"><Truck className="w-4 h-4" />Get Enterprise Quote</Link>
                <a href="tel:+918505863220" className="btn-secondary text-sm px-6 py-3">Call Us Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

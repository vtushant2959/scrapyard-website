"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Building2, Warehouse, Hotel, Coffee, Hammer, Factory, ArrowRight, CheckCircle } from "lucide-react";

const industries = [
  { icon: Factory, label: "Factories", desc: "Regular scrap management" },
  { icon: Warehouse, label: "Warehouses", desc: "Clearance & liquidation" },
  { icon: Hotel, label: "Hotels", desc: "Hospitality waste" },
  { icon: Coffee, label: "Offices", desc: "Electronics & furniture" },
  { icon: Hammer, label: "Builders", desc: "Construction debris" },
  { icon: Building2, label: "Manufacturing", desc: "Industrial waste" },
];

const benefits = [
  "Dedicated account manager",
  "Regular pickup schedules",
  "GST-compliant invoices",
  "Recycling certificates",
  "Volume-based pricing",
  "Priority response",
];

export function EnterpriseSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,60,158,0.06) 0%, rgba(8,16,24,0) 40%, rgba(44,235,136,0.04) 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="gradient-border">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
              >
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
                  style={{ background: "rgba(0,60,158,0.15)", border: "1px solid rgba(0,60,158,0.3)", color: "#6699ff" }}
                >
                  🏢 Enterprise Solutions
                </div>

                <h2
                  className="text-3xl md:text-4xl font-black text-white mb-4"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Scale Your Scrap{" "}
                  <span className="gradient-text-blue">Management</span>
                </h2>

                <p className="text-text-muted leading-relaxed mb-6">
                  From small offices to large manufacturing plants - our enterprise platform handles scrap at any scale with full compliance, documentation, and dedicated support.
                </p>

                <div className="grid grid-cols-2 gap-2 mb-8">
                  {benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-sm text-silver">
                      <CheckCircle className="w-4 h-4 text-accent-glow flex-shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-blue text-sm px-6 py-3">
                    Get Enterprise Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/industries" className="btn-secondary text-sm px-6 py-3">
                    View Industries
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              >
                {industries.map((ind, i) => (
                  <motion.div
                    key={ind.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    className="p-4 rounded-xl text-center group hover:bg-accent-glow/8 transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center mx-auto mb-2 group-hover:bg-accent-glow/15 transition-colors">
                      <ind.icon className="w-5 h-5 text-silver group-hover:text-accent-glow transition-colors" />
                    </div>
                    <p className="text-xs font-bold text-white">{ind.label}</p>
                    <p className="text-xs text-text-muted mt-0.5">{ind.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

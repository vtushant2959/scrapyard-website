"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { IndianRupee, Zap, Shield, CreditCard, Globe, Leaf } from "lucide-react";

const reasons = [
  {
    icon: IndianRupee,
    title: "Best Market Rates",
    description: "Get up to 20% higher than local dealers. Our algorithm ensures you always get fair market price.",
    color: "#2CEB88",
    stat: "20% Higher",
  },
  {
    icon: Zap,
    title: "Fast Pickup",
    description: "Same-day pickup in most cities. Our fleet is always ready — no more waiting for days.",
    color: "#6F9E62",
    stat: "Same Day",
  },
  {
    icon: Shield,
    title: "Verified Buyers",
    description: "Every buyer is background-verified, licensed, and GST-compliant. 100% trustworthy network.",
    color: "#003C9E",
    stat: "100% Verified",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Instant UPI transfers, bank deposits, or cash — your choice, your security.",
    color: "#2CEB88",
    stat: "Instant UPI",
  },
  {
    icon: Globe,
    title: "Nationwide Network",
    description: "Operating in 50+ cities with 200+ verified collection partners across India.",
    color: "#FF6B35",
    stat: "50+ Cities",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Every kg recycled saves CO₂ emissions. We&apos;re committed to a greener India.",
    color: "#27AE60",
    stat: "Certified Green",
  },
];

export function WhyChoose() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,60,158,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}
          >
            Our Advantage
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Why Choose{" "}
            <span className="gradient-text">SCRAPYARD</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            We&apos;re not just another scrap dealer. We&apos;re a technology company that happens to buy scrap.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <div className="glass-card rounded-2xl p-6 h-full group hover:glow-border-green transition-all duration-300 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at 0% 0%, ${reason.color}08, transparent 60%)`,
                  }}
                />

                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${reason.color}15`,
                      border: `1px solid ${reason.color}30`,
                    }}
                  >
                    <reason.icon className="w-6 h-6" style={{ color: reason.color }} />
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${reason.color}12`,
                      color: reason.color,
                    }}
                  >
                    {reason.stat}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-accent-glow transition-colors" style={{ fontFamily: "var(--font-syne)" }}>
                  {reason.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

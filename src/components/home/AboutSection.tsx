"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight, Target, Eye, Zap } from "lucide-react";

export function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}
            >
              About SCRAPYARD
            </div>

            <h2
              className="text-3xl md:text-4xl font-black text-white mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Reinventing India&apos;s{" "}
              <span className="gradient-text">₹5 Trillion</span>{" "}
              Scrap Industry
            </h2>

            <p className="text-text-muted leading-relaxed mb-5">
              India generates over 60 million tonnes of waste annually. Yet the scrap industry remains fragmented, opaque, and technologically backward. SCRAPYARD exists to fix that.
            </p>

            <p className="text-text-muted leading-relaxed mb-8">
              We&apos;ve built a technology platform that connects scrap sellers directly with verified buyers, eliminates middlemen, ensures transparent pricing, and creates a sustainable recycling ecosystem across India.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Target, label: "Our Mission", text: "Make scrap selling effortless, fair, and rewarding for every Indian" },
                { icon: Eye, label: "Our Vision", text: "Build India's most trusted waste-to-value technology ecosystem" },
                { icon: Zap, label: "Our Approach", text: "Tech-first, transparency-always, sustainability at core" },
              ].map(({ icon: Icon, label, text }) => (
                <div
                  key={label}
                  className="p-4 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <Icon className="w-5 h-5 text-accent-glow mb-2" />
                  <p className="text-xs font-bold text-white mb-1">{label}</p>
                  <p className="text-xs text-text-muted leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-secondary text-sm px-6 py-3 inline-flex">
              Read Our Story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at top right, rgba(0,60,158,0.4), transparent 60%)",
                }}
              />

              <div className="relative z-10">
                {/* Brand values */}
                <h3 className="text-base font-bold text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>
                  Core Brand Values
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Trust", emoji: "🤝", color: "#2CEB88" },
                    { label: "Transparency", emoji: "🔍", color: "#6F9E62" },
                    { label: "Technology", emoji: "⚡", color: "#003C9E" },
                    { label: "Sustainability", emoji: "🌱", color: "#27AE60" },
                    { label: "Speed", emoji: "🚀", color: "#2CEB88" },
                    { label: "Better Pricing", emoji: "💰", color: "#F39C12" },
                  ].map((val) => (
                    <div
                      key={val.label}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-105"
                      style={{
                        background: `${val.color}10`,
                        border: `1px solid ${val.color}25`,
                      }}
                    >
                      <span className="text-xl">{val.emoji}</span>
                      <span className="text-sm font-semibold text-white">{val.label}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-6 p-4 rounded-xl"
                  style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.15)" }}
                >
                  <p className="text-xs text-text-muted mb-1">Sustainability Commitment</p>
                  <p className="text-sm text-white font-medium leading-relaxed">
                    By 2027, we aim to divert 100,000 MT of waste from landfills and reduce 50,000 tonnes of CO₂ annually through our recycling network.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

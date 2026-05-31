"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const impacts = [
  {
    value: 2400,
    suffix: " MT",
    label: "CO₂ Reduced",
    emoji: "🌍",
    description: "Tonnes of carbon emissions prevented",
    color: "#27AE60",
  },
  {
    value: 8500,
    suffix: " MT",
    label: "Materials Recycled",
    emoji: "♻️",
    description: "Tonnes of material given new life",
    color: "#2CEB88",
  },
  {
    value: 15000,
    suffix: "+",
    label: "Trees Saved",
    emoji: "🌳",
    description: "Equivalent trees saved from paper recycling",
    color: "#6F9E62",
  },
  {
    value: 3200,
    suffix: " MT",
    label: "Waste Diverted",
    emoji: "🗑️",
    description: "From landfills to recycling facilities",
    color: "#003C9E",
  },
];

export function ImpactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      className="section-padding relative overflow-hidden"
      ref={ref}
      style={{
        background:
          "linear-gradient(180deg, rgba(8,16,24,0) 0%, rgba(27,60,27,0.08) 50%, rgba(8,16,24,0) 100%)",
      }}
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(44,235,136,0.06), transparent)",
            left: "20%",
            top: "10%",
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,60,158,0.08), transparent)",
            right: "15%",
            bottom: "10%",
          }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(39,174,96,0.1)", border: "1px solid rgba(39,174,96,0.3)", color: "#27AE60" }}
          >
            🌱 Sustainability Impact
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Our Planet,{" "}
            <span style={{ color: "#27AE60", textShadow: "0 0 20px rgba(39,174,96,0.4)" }}>
              Our Responsibility
            </span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Every scrap collection creates a measurable positive impact on our environment. Here&apos;s what we&apos;ve achieved together.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {impacts.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.15, type: "spring", damping: 20 }}
            >
              <div
                className="relative rounded-2xl p-6 text-center overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${item.color}10, rgba(8,16,24,0.8))`,
                  border: `1px solid ${item.color}25`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at center, ${item.color}10, transparent 70%)`,
                  }}
                />

                <div className="text-5xl mb-3">{item.emoji}</div>

                <div
                  className="text-3xl md:text-4xl font-black mb-1"
                  style={{ fontFamily: "var(--font-syne)", color: item.color }}
                >
                  {inView ? (
                    <CountUp end={item.value} duration={2.5} delay={i * 0.2} separator="," suffix={item.suffix} />
                  ) : (
                    `0${item.suffix}`
                  )}
                </div>

                <p className="text-sm font-bold text-white mb-1">{item.label}</p>
                <p className="text-xs text-text-muted">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {[
            { emoji: "🌿", label: "ISO 14001 Compliant", color: "#27AE60" },
            { emoji: "♻️", label: "E-Waste Authorized", color: "#2CEB88" },
            { emoji: "🏆", label: "CPCB Registered", color: "#6F9E62" },
            { emoji: "✅", label: "GST Compliant", color: "#003C9E" },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
              style={{
                background: `${badge.color}10`,
                border: `1px solid ${badge.color}30`,
                color: badge.color,
              }}
            >
              <span>{badge.emoji}</span>
              {badge.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

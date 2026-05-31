"use client";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  { value: 1000, suffix: "+", label: "Businesses Served", icon: "🏢", description: "Factories, offices & homes" },
  { value: 5000, suffix: "+", label: "Collections Done", icon: "🚛", description: "Successful pickups" },
  { value: 50, suffix: "+", label: "Cities Covered", icon: "🌆", description: "Pan India network" },
  { value: 100, suffix: "%", label: "Verified Buyers", icon: "✅", description: "Trusted & certified" },
];

export function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="py-16 relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,60,158,0.05) 0%, rgba(8,16,24,0) 50%, rgba(8,16,24,0) 100%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="glass-card rounded-2xl p-6 text-center relative overflow-hidden group hover:glow-border-green transition-all duration-300">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(44,235,136,0.06) 0%, transparent 70%)",
                  }}
                />
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="stat-number text-4xl md:text-5xl mb-1">
                  {inView ? (
                    <CountUp
                      end={stat.value}
                      duration={2}
                      delay={i * 0.2}
                      suffix={stat.suffix}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>
                <p className="text-sm font-semibold text-white mb-1">{stat.label}</p>
                <p className="text-xs text-text-muted">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

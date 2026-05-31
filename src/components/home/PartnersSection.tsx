"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle } from "lucide-react";

const partners = [
  { name: "Sunrise Metals", type: "Verified Buyer", emoji: "🏭" },
  { name: "RecycleIndia", type: "Recycling Partner", emoji: "♻️" },
  { name: "GreenWaste Co.", type: "E-Waste Partner", emoji: "💻" },
  { name: "MetalHub", type: "Metal Buyer", emoji: "⚙️" },
  { name: "PaperRecycle", type: "Paper Buyer", emoji: "📄" },
  { name: "EcoSolutions", type: "Sustainability", emoji: "🌱" },
];

export function PartnersSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-16 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <p className="text-xs text-text-muted tracking-widest uppercase font-semibold mb-2">
            Trusted Partner Network
          </p>
          <h3
            className="text-2xl font-black text-white"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Verified <span className="gradient-text">Buyer Network</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
            >
              <div className="glass-card rounded-xl p-4 text-center hover:glow-border-green transition-all duration-300 group">
                <div className="text-3xl mb-2">{partner.emoji}</div>
                <p className="text-xs font-bold text-white group-hover:text-accent-glow transition-colors">
                  {partner.name}
                </p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <CheckCircle className="w-3 h-3 text-accent-glow" />
                  <p className="text-xs text-text-muted">{partner.type}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

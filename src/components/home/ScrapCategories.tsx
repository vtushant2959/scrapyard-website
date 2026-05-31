"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  { id: "metal", name: "Metal Scrap", emoji: "⚙️", color: "#C8CDD5", desc: "Iron, copper, aluminium, brass & more", rate: "From ₹22/kg" },
  { id: "plastic", name: "Plastic Scrap", emoji: "🧴", color: "#2CEB88", desc: "PET, HDPE, PP, PVC & all polymers", rate: "From ₹12/kg" },
  { id: "paper", name: "Paper Scrap", emoji: "📄", color: "#6F9E62", desc: "Newspaper, cardboard, books", rate: "From ₹10/kg" },
  { id: "electronics", name: "E-Waste", emoji: "💻", color: "#003C9E", desc: "Laptops, mobiles, PCBs, batteries", rate: "From ₹80/pc" },
  { id: "furniture", name: "Old Furniture", emoji: "🪑", color: "#8B6914", desc: "Office & home furniture disposal", rate: "Best rates" },
  { id: "industrial", name: "Industrial Waste", emoji: "🏭", color: "#FF6B35", desc: "Factory & manufacturing waste", rate: "Custom rates" },
  { id: "construction", name: "Construction Scrap", emoji: "🏗️", color: "#9B59B6", desc: "Demolition & building material", rate: "Custom rates" },
  { id: "vehicle", name: "Vehicle Scrap", emoji: "🚗", color: "#E74C3C", desc: "Old vehicles, parts, tyres", rate: "Best rates" },
  { id: "cable", name: "Cable & Wire", emoji: "🔌", color: "#F39C12", desc: "Electrical cables, copper wire", rate: "From ₹180/kg" },
];

export function ScrapCategories() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(0,60,158,0.07) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}
          >
            All Scrap Types
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            We Buy <span className="gradient-text">Everything</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            From household scrap to industrial waste — we handle it all at the best market rates.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <Link
                href={`/scrap-rates#${cat.id}`}
                className="category-card glass-card rounded-2xl p-6 flex flex-col gap-3 group block relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${cat.color}10, transparent 60%)`,
                  }}
                />

                <div
                  className="text-3xl sm:text-4xl w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${cat.color}12`,
                    border: `1px solid ${cat.color}25`,
                    filter: "drop-shadow(0 0 8px rgba(0,0,0,0.3))",
                  }}
                >
                  {cat.emoji}
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1 group-hover:text-accent-glow transition-colors" style={{ fontFamily: "var(--font-syne)" }}>
                    {cat.name}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed hidden sm:block">{cat.desc}</p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span
                    className="text-xs font-bold"
                    style={{ color: cat.color }}
                  >
                    {cat.rate}
                  </span>
                  <ArrowRight
                    className="w-4 h-4 text-text-muted group-hover:text-accent-glow group-hover:translate-x-1 transition-all duration-200"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <Link href="/scrap-rates" className="btn-secondary text-sm px-6 py-3 inline-flex">
            View All Scrap Rates
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

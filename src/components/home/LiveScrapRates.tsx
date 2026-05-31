"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TrendingUp, TrendingDown, Minus, RefreshCw, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Rate {
  _id: string;
  name: string;
  category: string;
  rate: number;
  unit: string;
  change: number;
  trend: "up" | "down" | "stable";
}

export function LiveScrapRates() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [rates, setRates]           = useState<Rate[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading]       = useState(true);

  const fetchRates = useCallback(async (showSpinner = false) => {
    if (showSpinner) setRefreshing(true);
    try {
      const res  = await fetch("/api/rates");
      const data = await res.json();
      const arr  = Array.isArray(data) ? data : [];
      setRates(arr);
      // Build unique category list
      const cats = ["All", ...Array.from(new Set(arr.map((r: Rate) => r.category))) as string[]];
      setCategories(cats);
      setLastUpdated(new Date());
    } catch { /* silent */ }
    setLoading(false);
    if (showSpinner) setRefreshing(false);
  }, []);

  useEffect(() => { fetchRates(); }, [fetchRates]);

  const filtered = activeCategory === "All"
    ? rates
    : rates.filter((r) => r.category === activeCategory);

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(44,235,136,0.05) 0%, transparent 55%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
              style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-glow animate-pulse" />
              Live Market Rates
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Today&apos;s <span className="gradient-text">Scrap Rates</span>
            </h2>
            <p className="text-text-muted text-sm mt-1">
              {lastUpdated
                ? `Updated: ${lastUpdated.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} IST`
                : "Loading rates…"}
            </p>
          </div>
          <button
            onClick={() => fetchRates(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-text-muted hover:text-accent-glow border border-dark-border hover:border-accent-glow/30 transition-all duration-200"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh Rates
          </button>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-accent-glow text-background"
                  : "bg-white/5 text-text-muted hover:text-white hover:bg-white/8 border border-dark-border"
              }`}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Rates table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Material</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider hidden sm:table-cell">Category</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Rate</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Change</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider hidden md:table-cell">Trend</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? [...Array(6)].map((_, i) => (
                      <tr key={i} className="border-b border-dark-border/50">
                        {[...Array(5)].map((__, j) => (
                          <td key={j} className="px-6 py-4">
                            <div className="h-3 bg-white/5 rounded animate-pulse" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : filtered.length === 0
                  ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-text-muted text-sm">
                          No rates available yet. Add rates from the admin panel.
                        </td>
                      </tr>
                    )
                  : filtered.slice(0, 12).map((item, i) => (
                      <motion.tr key={item._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-dark-border/50 hover:bg-white/2 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-white group-hover:text-accent-glow transition-colors">{item.name}</span>
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                          <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-text-muted">{item.category}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-bold text-white">₹{item.rate}/{item.unit}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`text-xs font-mono font-semibold ${
                            item.trend === "up" ? "text-accent-glow" : item.trend === "down" ? "text-red-400" : "text-text-muted"
                          }`}>
                            {item.change > 0 ? "+" : ""}{item.change}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right hidden md:table-cell">
                          {item.trend === "up"
                            ? <TrendingUp className="w-4 h-4 text-accent-glow ml-auto" />
                            : item.trend === "down"
                            ? <TrendingDown className="w-4 h-4 text-red-400 ml-auto" />
                            : <Minus className="w-4 h-4 text-text-muted ml-auto" />}
                        </td>
                      </motion.tr>
                    ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-dark-border flex items-center justify-between">
            <p className="text-xs text-text-muted">Rates are indicative. Actual rates depend on quality &amp; quantity.</p>
            <Link href="/scrap-rates" className="flex items-center gap-1.5 text-xs font-semibold text-accent-glow hover:underline">
              View All Rates <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

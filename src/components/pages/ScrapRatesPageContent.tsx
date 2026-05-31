"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, RefreshCw, Info, Truck, Search } from "lucide-react";
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

export function ScrapRatesPageContent() {
  const [rates, setRates]           = useState<Rate[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch]         = useState("");
  const [loading, setLoading]       = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchRates = useCallback(async (showSpinner = false) => {
    if (showSpinner) setRefreshing(true);
    try {
      const res  = await fetch("/api/rates");
      const data = await res.json();
      const arr  = Array.isArray(data) ? data : [];
      setRates(arr);
      const cats = ["All", ...Array.from(new Set(arr.map((r: Rate) => r.category))) as string[]];
      setCategories(cats);
      setLastUpdated(new Date());
    } catch { /* silent */ }
    setLoading(false);
    if (showSpinner) setRefreshing(false);
  }, []);

  useEffect(() => { fetchRates(); }, [fetchRates]);

  const filtered = rates.filter((r) => {
    const matchCat    = activeCategory === "All" || r.category === activeCategory;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
                        r.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-16 relative grid-bg" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,60,158,0.12) 0%, transparent 55%)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-glow animate-pulse" />
              Live Market Rates
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Today&apos;s <span className="gradient-text">Scrap Rates</span>
            </h1>
            <p className="text-text-muted text-lg mb-2">
              Live scrap prices updated daily across India. All rates in ₹/kg unless specified.
            </p>
            <p className="text-xs text-text-muted font-mono">
              {lastUpdated
                ? `Last updated: ${lastUpdated.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })} IST`
                : "Loading rates…"}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Info banner */}
          <div className="glass-card-blue rounded-xl p-4 flex items-start gap-3 mb-8">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-silver">
              Rates shown are indicative market prices. Actual rates may vary based on material quality, quantity, and location.{" "}
              <Link href="/contact" className="text-accent-glow hover:underline font-medium">
                Get an exact quote for your scrap →
              </Link>
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search scrap type..."
                className="form-input pl-9 w-full"
              />
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-accent-glow text-background"
                      : "bg-white/5 text-text-muted hover:text-white border border-dark-border"
                  }`}>
                  {cat}
                </button>
              ))}
              <button onClick={() => fetchRates(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-text-muted border border-dark-border hover:text-accent-glow hover:border-accent-glow/30 transition-all ml-auto">
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="glass-card rounded-2xl overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-border bg-white/2">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">#</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Material</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider hidden sm:table-cell">Category</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Rate</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Today</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider hidden md:table-cell">Trend</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? [...Array(8)].map((_, i) => (
                        <tr key={i} className="border-b border-dark-border/50">
                          {[...Array(7)].map((__, j) => (
                            <td key={j} className="px-6 py-4">
                              <div className="h-3 bg-white/5 rounded animate-pulse" />
                            </td>
                          ))}
                        </tr>
                      ))
                    : filtered.length === 0
                    ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-16 text-center">
                            <p className="text-text-muted text-sm">
                              {rates.length === 0
                                ? "No scrap rates have been added yet. Check back soon!"
                                : `No rates found for "${search}"`}
                            </p>
                          </td>
                        </tr>
                      )
                    : filtered.map((item, i) => (
                        <motion.tr key={item._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.03 }}
                          className="border-b border-dark-border/50 hover:bg-white/2 transition-colors group"
                        >
                          <td className="px-6 py-4 text-xs text-text-muted font-mono">{String(i + 1).padStart(2, "0")}</td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-medium text-white group-hover:text-accent-glow transition-colors">
                              {item.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-text-muted">{item.category}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-base font-black text-white">₹{item.rate}</span>
                            <span className="text-xs text-text-muted ml-1">/{item.unit}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className={`text-xs font-mono font-bold ${
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
                          <td className="px-6 py-4 text-right">
                            <Link href="/contact" className="text-xs font-semibold text-accent-glow hover:underline flex items-center gap-1 justify-end">
                              <Truck className="w-3.5 h-3.5" />
                              Sell Now
                            </Link>
                          </td>
                        </motion.tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="gradient-border">
            <div className="glass-card rounded-2xl p-6 md:p-8 text-center">
              <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                Get The <span className="gradient-text">Best Rate For Your Scrap</span>
              </h3>
              <p className="text-text-muted mb-6">
                Our team will assess your scrap and offer you the best market price. Free pickup, instant payment.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact" className="btn-primary text-sm px-6 py-3">
                  <Truck className="w-4 h-4" />
                  Schedule Free Pickup
                </Link>
                <a href="tel:+918505863220" className="btn-secondary text-sm px-6 py-3">
                  Call for Best Rate
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

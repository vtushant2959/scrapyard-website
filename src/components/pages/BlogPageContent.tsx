"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, Tag, ArrowRight, Search } from "lucide-react";

const categories = ["All", "Recycling", "Metal Prices", "Industrial Waste", "Sustainability", "E-Waste", "Business Recycling"];

const posts = [
  { id: 1, title: "Copper Scrap Prices Hit 3-Month High — What Sellers Need to Know", category: "Metal Prices", date: "May 28, 2026", readTime: "4 min", excerpt: "Copper prices surge to ₹490/kg driven by global demand. Here's how to maximize your returns during the price spike.", featured: true },
  { id: 2, title: "How to Dispose of E-Waste Responsibly in India: Complete Guide 2026", category: "E-Waste", date: "May 25, 2026", readTime: "7 min", excerpt: "A complete guide to e-waste disposal in India — legal requirements, CPCB guidelines, and how to get paid for it.", featured: false },
  { id: 3, title: "Warehouse Scrap Management: How Large Facilities Save ₹5 Lakh Annually", category: "Business Recycling", date: "May 20, 2026", readTime: "6 min", excerpt: "Real case study: How a 50,000 sq ft warehouse in Faridabad generates ₹5 lakh/year from systematic scrap management.", featured: true },
  { id: 4, title: "Top 10 Industrial Waste Management Strategies for Indian Factories", category: "Industrial Waste", date: "May 15, 2026", readTime: "8 min", excerpt: "Proven strategies that help factories reduce waste disposal costs, stay compliant, and earn from industrial scrap.", featured: false },
  { id: 5, title: "India's Recycling Rate Is 30% — Here's Why SCRAPYARD Is Changing That", category: "Sustainability", date: "May 10, 2026", readTime: "5 min", excerpt: "Why India lags in recycling and how technology platforms like SCRAPYARD are bridging the gap.", featured: false },
  { id: 6, title: "How to Get the Best Price for Iron Scrap: Insider Tips from Buyers", category: "Metal Prices", date: "May 5, 2026", readTime: "5 min", excerpt: "Expert tips on timing, quantity bundling, and quality preparation to get maximum value for your iron scrap.", featured: false },
  { id: 7, title: "Paper Recycling Business Opportunity: Complete Guide for Entrepreneurs", category: "Business Recycling", date: "Apr 28, 2026", readTime: "9 min", excerpt: "The paper recycling market in India is worth ₹12,000 crore. Here's how to tap into this growing opportunity.", featured: false },
  { id: 8, title: "E-Waste Laws in India: What Every Business Must Know in 2026", category: "E-Waste", date: "Apr 20, 2026", readTime: "6 min", excerpt: "Updated E-Waste (Management) Rules and how they affect your business. Penalties, compliance requirements, and solutions.", featured: false },
];

export function BlogPageContent() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = posts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <div ref={ref} className="pt-16">
      <section className="py-16 relative grid-bg" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(44,235,136,0.07) 0%, transparent 55%)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Scrap & <span className="gradient-text">Recycling Insights</span>
            </h1>
            <p className="text-text-muted text-lg mb-8">Industry news, metal prices, sustainability guides, and more.</p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..." className="form-input pl-9 w-full" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeCategory === cat ? "bg-accent-glow text-background" : "bg-white/5 text-text-muted hover:text-white border border-dark-border"}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Featured */}
          {featured.length > 0 && (
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {featured.map((post, i) => (
                <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
                  <div className="blog-card glass-card rounded-2xl overflow-hidden h-full flex flex-col">
                    <div className="h-48 relative" style={{ background: `linear-gradient(135deg, rgba(44,235,136,0.1), rgba(0,60,158,0.15))` }}>
                      <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">📰</div>
                      <div className="absolute top-4 left-4">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent-glow text-background">Featured</span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary-green/15 text-primary-green">{post.category}</span>
                        <span className="text-xs text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} read</span>
                      </div>
                      <h2 className="text-base font-bold text-white mb-2 flex-1 hover:text-accent-glow transition-colors" style={{ fontFamily: "var(--font-syne)" }}>
                        <a href="#">{post.title}</a>
                      </h2>
                      <p className="text-xs text-text-muted leading-relaxed mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-text-muted">{post.date}</span>
                        <a href="#" className="text-xs font-semibold text-accent-glow flex items-center gap-1 hover:gap-2 transition-all">
                          Read More <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Regular posts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {regular.map((post, i) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.08 }}>
                <div className="blog-card glass-card rounded-xl p-5 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-3.5 h-3.5 text-accent-glow" />
                    <span className="text-xs text-accent-glow font-medium">{post.category}</span>
                    <span className="text-xs text-text-muted ml-auto flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 flex-1 hover:text-accent-glow transition-colors" style={{ fontFamily: "var(--font-syne)" }}>
                    <a href="#">{post.title}</a>
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">{post.date}</span>
                    <a href="#" className="text-xs text-accent-glow font-semibold hover:underline">Read →</a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-text-muted">No articles found for your search.</div>
          )}
        </div>
      </section>
    </div>
  );
}

"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, Tag, ArrowRight, Search, RefreshCw, Eye } from "lucide-react";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  coverImage: string;
  views: number;
  createdAt: string;
}

const CATEGORIES = ["All", "Recycling", "Metal Prices", "Industrial Waste", "Sustainability", "E-Waste", "Business Recycling", "General"];

function readTime(excerpt: string) {
  return Math.max(2, Math.round(excerpt.split(" ").length / 30)) + " min";
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function BlogPageContent() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [blogs, setBlogs]             = useState<Blog[]>([]);
  const [loading, setLoading]         = useState(true);
  const [activeCategory, setCategory] = useState("All");
  const [search, setSearch]           = useState("");
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "12" });
      if (activeCategory !== "All") params.set("category", activeCategory);
      const res  = await fetch(`/api/blogs?${params}`);
      const data = await res.json();
      setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
      setTotalPages(data.pages ?? 1);
    } catch { setBlogs([]); }
    setLoading(false);
  }, [page, activeCategory]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [activeCategory]);

  const filtered = search
    ? blogs.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase()))
    : blogs;

  const featured = filtered.slice(0, 2);
  const regular  = filtered.slice(2);

  return (
    <div ref={ref} className="pt-16">
      {/* Hero */}
      <section className="py-16 relative grid-bg" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(44,235,136,0.07) 0%, transparent 55%)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-glow animate-pulse" />
              Fresh Insights
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Scrap & <span className="gradient-text">Recycling Insights</span>
            </h1>
            <p className="text-text-muted text-lg mb-8">Industry news, metal prices, sustainability guides, and more.</p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles…" className="form-input pl-9 w-full" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8 items-center">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeCategory === cat ? "bg-accent-glow text-background" : "bg-white/5 text-text-muted hover:text-white border border-dark-border"}`}>
                {cat}
              </button>
            ))}
            <button onClick={load} className="ml-auto p-2 text-text-muted border border-dark-border rounded-xl hover:text-accent-glow transition-all">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                {[0, 1].map((i) => (
                  <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-48 bg-white/5" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 bg-white/5 rounded w-24" />
                      <div className="h-5 bg-white/8 rounded w-full" />
                      <div className="h-5 bg-white/8 rounded w-3/4" />
                      <div className="h-3 bg-white/5 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="glass-card rounded-xl p-5 animate-pulse space-y-3">
                    <div className="h-3 bg-white/5 rounded w-20" />
                    <div className="h-4 bg-white/8 rounded w-full" />
                    <div className="h-4 bg-white/8 rounded w-2/3" />
                    <div className="h-3 bg-white/5 rounded w-full" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {!loading && filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-text-muted text-lg mb-2">No articles found</p>
              <p className="text-text-muted text-sm">{search ? `No results for "${search}"` : "No published posts yet - check back soon!"}</p>
            </div>
          )}

          {/* Featured posts */}
          {!loading && featured.length > 0 && (
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {featured.map((post, i) => (
                <motion.article key={post._id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col hover:glow-border-green transition-all duration-300 group">
                      {/* Cover image or gradient placeholder */}
                      <div className="h-52 relative overflow-hidden">
                        {post.coverImage
                          ? <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          : <div className="w-full h-full flex items-center justify-center text-5xl" style={{ background: "linear-gradient(135deg, rgba(44,235,136,0.1), rgba(0,60,158,0.15))" }}>♻️</div>
                        }
                        <div className="absolute top-4 left-4">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent-glow text-background">Featured</span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent-glow/15 text-accent-glow font-medium">{post.category}</span>
                          <span className="text-xs text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" />{readTime(post.excerpt)}</span>
                          {post.views > 0 && <span className="text-xs text-text-muted flex items-center gap-1"><Eye className="w-3 h-3" />{post.views}</span>}
                        </div>
                        <h2 className="text-base font-bold text-white mb-2 flex-1 group-hover:text-accent-glow transition-colors" style={{ fontFamily: "var(--font-syne)" }}>
                          {post.title}
                        </h2>
                        <p className="text-xs text-text-muted leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xs text-text-muted">{formatDate(post.createdAt)}</span>
                          <span className="text-xs font-semibold text-accent-glow flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read More <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {/* Regular posts */}
          {!loading && regular.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {regular.map((post, i) => (
                <motion.article key={post._id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.08 }}>
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="glass-card rounded-xl overflow-hidden h-full flex flex-col hover:glow-border-green transition-all duration-300 group">
                      {post.coverImage && (
                        <div className="h-36 overflow-hidden">
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Tag className="w-3.5 h-3.5 text-accent-glow" />
                          <span className="text-xs text-accent-glow font-medium">{post.category}</span>
                          <span className="text-xs text-text-muted ml-auto flex items-center gap-1"><Clock className="w-3 h-3" />{readTime(post.excerpt)}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white mb-2 flex-1 group-hover:text-accent-glow transition-colors line-clamp-2" style={{ fontFamily: "var(--font-syne)" }}>
                          {post.title}
                        </h3>
                        <p className="text-xs text-text-muted leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-text-muted">{formatDate(post.createdAt)}</span>
                          <span className="text-xs text-accent-glow font-semibold group-hover:underline">Read →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-10">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="px-4 py-2 rounded-xl text-sm border border-dark-border text-text-muted hover:text-white disabled:opacity-40 transition-all">
                ← Prev
              </button>
              <span className="px-4 py-2 text-sm text-text-muted">Page {page} of {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-4 py-2 rounded-xl text-sm border border-dark-border text-text-muted hover:text-white disabled:opacity-40 transition-all">
                Next →
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, Tag, Eye, ArrowLeft, Share2, Phone } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  coverImage: string;
  views: number;
  createdAt: string;
  metaTitle?: string;
  metaDescription?: string;
}

function readTime(content: string) {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogPostPage() {
  const params  = useParams();
  const slug    = params?.slug as string;
  const [blog, setBlog]       = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blogs/${slug}`)
      .then((r) => { if (r.status === 404) { setNotFound(true); return null; } return r.json(); })
      .then((d) => { if (d) setBlog(d); })
      .finally(() => setLoading(false));
  }, [slug]);

  if (notFoundState) notFound();

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: blog?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen" style={{ background: "#081018" }}>
        {loading ? (
          <div className="max-w-3xl mx-auto px-4 py-16 space-y-4 animate-pulse">
            <div className="h-4 bg-white/5 rounded w-32" />
            <div className="h-10 bg-white/8 rounded w-full" />
            <div className="h-10 bg-white/8 rounded w-3/4" />
            <div className="h-64 bg-white/5 rounded-2xl" />
            {[...Array(8)].map((_, i) => <div key={i} className="h-3 bg-white/5 rounded" style={{ width: `${70 + Math.random() * 30}%` }} />)}
          </div>
        ) : blog ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            {/* Hero */}
            <div className="relative py-12 grid-bg" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(44,235,136,0.07) 0%, transparent 60%)" }}>
              <div className="max-w-3xl mx-auto px-4">
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-glow transition-colors mb-6">
                  <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-accent-glow/15 text-accent-glow font-semibold flex items-center gap-1">
                    <Tag className="w-3 h-3" />{blog.category}
                  </span>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" />{readTime(blog.content)} min read
                  </span>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Eye className="w-3 h-3" />{blog.views} views
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
                  {blog.title}
                </h1>
                {blog.excerpt && (
                  <p className="text-text-muted text-lg leading-relaxed mb-6">{blog.excerpt}</p>
                )}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent-glow/20 flex items-center justify-center text-xs font-bold text-accent-glow">
                      {blog.author.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{blog.author}</p>
                      <p className="text-xs text-text-muted">{new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                    </div>
                  </div>
                  <button onClick={share} className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-text-muted border border-dark-border hover:text-accent-glow hover:border-accent-glow/30 transition-all">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                </div>
              </div>
            </div>

            {/* Cover image */}
            {blog.coverImage && (
              <div className="max-w-3xl mx-auto px-4 mb-2">
                <img src={blog.coverImage} alt={blog.title} className="w-full h-64 md:h-80 object-cover rounded-2xl border border-dark-border" />
              </div>
            )}

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 py-10">
              <div className="glass-card rounded-2xl p-6 md:p-10 prose-scrapyard">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => <h1 className="text-2xl font-black text-white mt-8 mb-4" style={{ fontFamily: "var(--font-syne)" }}>{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-black text-white mt-6 mb-3" style={{ fontFamily: "var(--font-syne)" }}>{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-bold text-white mt-5 mb-2">{children}</h3>,
                    p:  ({ children }) => <p className="text-silver leading-relaxed mb-4">{children}</p>,
                    ul: ({ children }) => <ul className="space-y-1.5 mb-4 ml-4">{children}</ul>,
                    ol: ({ children }) => <ol className="space-y-1.5 mb-4 ml-4 list-decimal">{children}</ol>,
                    li: ({ children }) => <li className="text-silver text-sm flex gap-2"><span className="text-accent-glow mt-1 flex-shrink-0">→</span><span>{children}</span></li>,
                    strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
                    a:  ({ children, href }) => <a href={href} className="text-accent-glow hover:underline">{children}</a>,
                    blockquote: ({ children }) => <blockquote className="border-l-4 border-accent-glow pl-4 my-4 italic text-text-muted">{children}</blockquote>,
                    code: ({ children }) => <code className="bg-white/8 text-accent-glow px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-6">
                        <table className="w-full border-collapse text-sm">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => <thead className="border-b border-dark-border">{children}</thead>,
                    th: ({ children }) => <th className="text-left px-4 py-2 text-xs font-semibold text-text-muted uppercase">{children}</th>,
                    td: ({ children }) => <td className="px-4 py-2 text-silver border-b border-dark-border/30">{children}</td>,
                    tr: ({ children }) => <tr className="hover:bg-white/2 transition-colors">{children}</tr>,
                    hr: () => <hr className="border-dark-border my-8" />,
                  }}
                >
                  {blog.content}
                </ReactMarkdown>
              </div>

              {/* CTA */}
              <div className="mt-10 glass-card rounded-2xl p-8 text-center" style={{ border: "1px solid rgba(44,235,136,0.2)" }}>
                <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                  Ready to Sell Your Scrap?
                </h3>
                <p className="text-text-muted text-sm mb-5">Free pickup · Best rates · Instant payment · Available 24/7</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link href="/contact" className="btn-primary text-sm px-6 py-3">Book Free Pickup</Link>
                  <a href="tel:+918505863220" className="btn-secondary text-sm px-6 py-3 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> +91 8505863220
                  </a>
                </div>
              </div>

              {/* Back */}
              <div className="mt-8 text-center">
                <Link href="/blog" className="text-sm text-text-muted hover:text-accent-glow transition-colors flex items-center gap-2 justify-center">
                  <ArrowLeft className="w-4 h-4" /> Back to all articles
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </main>
      <Footer />
    </>
  );
}

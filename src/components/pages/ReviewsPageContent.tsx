"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Send, ExternalLink, CheckCircle, Quote } from "lucide-react";
import toast from "react-hot-toast";

interface Review {
  _id: string;
  name: string;
  city: string;
  rating: number;
  title: string;
  review: string;
  scrapType: string;
  createdAt: string;
  featured: boolean;
}

function StarRating({ rating, onChange, size = "md" }: { rating: number; onChange?: (r: number) => void; size?: "sm" | "md" | "lg" }) {
  const [hover, setHover] = useState(0);
  const sz = size === "lg" ? "w-8 h-8" : size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} type="button"
          onClick={() => onChange?.(s)}
          onMouseEnter={() => onChange && setHover(s)}
          onMouseLeave={() => onChange && setHover(0)}
          className={onChange ? "cursor-pointer" : "cursor-default"}
        >
          <Star className={`${sz} transition-colors ${(hover || rating) >= s ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`} />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review, i }: { review: Review; i: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
      <div className={`glass-card rounded-2xl p-6 h-full flex flex-col ${review.featured ? "border border-accent-glow/25" : ""}`}>
        {review.featured && (
          <div className="flex items-center gap-1.5 mb-3">
            <CheckCircle className="w-3.5 h-3.5 text-accent-glow" />
            <span className="text-xs text-accent-glow font-semibold">Verified Review</span>
          </div>
        )}
        <Quote className="w-5 h-5 text-accent-glow/30 mb-3" />
        {review.title && <h3 className="text-sm font-bold text-white mb-2">{review.title}</h3>}
        <p className="text-sm text-silver leading-relaxed flex-1 mb-4">{review.review}</p>
        <div className="mt-auto space-y-2">
          <StarRating rating={review.rating} size="sm" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{review.name}</p>
              <p className="text-xs text-text-muted">
                {review.city}{review.scrapType ? ` · ${review.scrapType}` : ""}
              </p>
            </div>
            <p className="text-xs text-text-muted">{new Date(review.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ReviewsPageContent() {
  const [reviews, setReviews]     = useState<Review[]>([]);
  const [loading, setLoading]     = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", rating: 5, title: "", review: "", scrapType: "" });

  useEffect(() => {
    fetch("/api/reviews?limit=50")
      .then((r) => r.json())
      .then((d) => setReviews(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.review || form.rating === 0) { toast.error("Name, rating and review are required"); return; }
    setSubmitting(true);
    try {
      const res  = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success(data.message);
      setSubmitted(true);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to submit");
    }
    setSubmitting(false);
  };

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "5.0";

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-16 grid-bg" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(44,235,136,0.07) 0%, transparent 55%)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}>
              <Star className="w-3.5 h-3.5 fill-current" /> Verified Customer Reviews
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              What Our <span className="gradient-text">Customers Say</span>
            </h1>
            <p className="text-text-muted text-lg mb-6">Real reviews from real customers across India</p>

            {/* Rating summary */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="text-center">
                <p className="text-5xl font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>{avg}</p>
                <StarRating rating={Math.round(Number(avg))} size="md" />
                <p className="text-xs text-text-muted mt-1">{reviews.length} reviews</p>
              </div>
              <a href="https://g.page/r/scrapyard-india/review" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-white text-gray-800 hover:bg-gray-100 transition-all shadow-lg">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                Review us on Google
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Reviews grid */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 animate-pulse space-y-3 h-48">
                  <div className="h-3 bg-white/5 rounded w-24" />
                  <div className="h-3 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/5 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16 mb-16">
              <Star className="w-12 h-12 text-accent-glow/30 mx-auto mb-4" />
              <p className="text-text-muted">No reviews yet — be the first to review!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
              {reviews.map((r, i) => <ReviewCard key={r._id} review={r} i={i} />)}
            </div>
          )}

          {/* Write a review */}
          <div className="max-w-2xl mx-auto">
            <div className="glass-card rounded-2xl p-8" style={{ border: "1px solid rgba(44,235,136,0.15)" }}>
              <h2 className="text-2xl font-black text-white mb-2 text-center" style={{ fontFamily: "var(--font-syne)" }}>
                Share Your <span className="gradient-text">Experience</span>
              </h2>
              <p className="text-text-muted text-sm text-center mb-8">Your review helps others make informed decisions and helps us improve.</p>

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-accent-glow mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-text-muted text-sm">Your review has been submitted and will be published after verification (usually within 24 hours).</p>
                  <a href="https://g.page/r/scrapyard-india/review" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-gray-800 hover:bg-gray-100 transition-all">
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                    Also review us on Google
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  {/* Star rating */}
                  <div className="text-center">
                    <p className="text-sm text-text-muted mb-3">Your Rating *</p>
                    <div className="flex justify-center">
                      <StarRating rating={form.rating} onChange={(r) => setForm({ ...form, rating: r })} size="lg" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-text-muted mb-1 block">Your Name *</label>
                      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Rahul Sharma" className="form-input w-full" required />
                    </div>
                    <div>
                      <label className="text-xs text-text-muted mb-1 block">City</label>
                      <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="Delhi" className="form-input w-full" />
                    </div>
                    <div>
                      <label className="text-xs text-text-muted mb-1 block">Phone</label>
                      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98765 43210" className="form-input w-full" />
                    </div>
                    <div>
                      <label className="text-xs text-text-muted mb-1 block">Scrap Type Sold</label>
                      <input value={form.scrapType} onChange={(e) => setForm({ ...form, scrapType: e.target.value })}
                        placeholder="Iron, Copper, E-Waste…" className="form-input w-full" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-text-muted mb-1 block">Review Title</label>
                    <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. Great service, got best rate!" className="form-input w-full" />
                  </div>

                  <div>
                    <label className="text-xs text-text-muted mb-1 block">Your Review *</label>
                    <textarea value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })}
                      rows={4} placeholder="Tell us about your experience with SCRAPYARD…"
                      className="form-input w-full resize-none" required />
                  </div>

                  <button type="submit" disabled={submitting}
                    className="btn-primary w-full justify-center py-3 text-sm font-bold disabled:opacity-60">
                    {submitting
                      ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-background/40 border-t-background rounded-full animate-spin" />Submitting…</span>
                      : <span className="flex items-center gap-2"><Send className="w-4 h-4" />Submit Review</span>}
                  </button>

                  <p className="text-xs text-text-muted text-center">
                    Reviews are verified and published within 24 hours. You can also{" "}
                    <a href="https://g.page/r/scrapyard-india/review" target="_blank" rel="noopener noreferrer" className="text-accent-glow hover:underline">
                      review us directly on Google
                    </a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

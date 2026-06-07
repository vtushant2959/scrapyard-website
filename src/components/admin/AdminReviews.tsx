"use client";
import { useEffect, useState, useCallback } from "react";
import { RefreshCw, Check, X, Star, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

interface Review {
  _id: string;
  name: string;
  city: string;
  phone: string;
  email: string;
  rating: number;
  title: string;
  review: string;
  scrapType: string;
  status: "pending" | "approved" | "rejected";
  featured: boolean;
  createdAt: string;
}

const statusColor: Record<string, string> = {
  pending:  "bg-yellow-500/15 text-yellow-400",
  approved: "bg-green-500/15 text-green-400",
  rejected: "bg-red-500/15 text-red-400",
};

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => <Star key={s} className={`w-3.5 h-3.5 ${n >= s ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`} />)}
    </div>
  );
}

export function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal]     = useState(0);
  const [page, setPage]       = useState(1);
  const [pages, setPages]     = useState(1);
  const [loading, setLoading] = useState(true);
  const [status, setStatus]   = useState("All");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "15" });
      if (status !== "All") params.set("status", status);
      const res  = await fetch(`/api/admin/reviews?${params}`);
      const data = await res.json();
      setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      setTotal(data.total ?? 0);
      setPages(data.pages ?? 1);
    } catch { toast.error("Failed to load"); }
    setLoading(false);
  }, [page, status]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [status]);

  const update = async (id: string, patch: object) => {
    try {
      await fetch("/api/admin/reviews", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...patch }) });
      toast.success("Updated");
      load();
    } catch { toast.error("Failed"); }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    try {
      await fetch("/api/admin/reviews", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      toast.success("Deleted");
      load();
    } catch { toast.error("Failed"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>Customer Reviews</h2>
          <p className="text-xs text-text-muted">{total} total reviews</p>
        </div>
        <button onClick={load} className="p-2 rounded-xl text-text-muted border border-dark-border hover:text-accent-glow hover:border-accent-glow/30 transition-all">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Status filter */}
      <div className="flex gap-2">
        {["All", "pending", "approved", "rejected"].map((s) => (
          <button key={s} onClick={() => setStatus(s)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${status === s ? "bg-accent-glow text-background" : "bg-white/5 text-text-muted border border-dark-border hover:text-white"}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border bg-white/2">
                {["Customer", "Rating", "Review", "Scrap", "Status", "Featured", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-text-muted font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [...Array(6)].map((_, i) => (
                    <tr key={i} className="border-b border-dark-border/50">
                      {[...Array(7)].map((__, j) => <td key={j} className="px-4 py-3"><div className="h-3 bg-white/5 rounded animate-pulse" /></td>)}
                    </tr>
                  ))
                : reviews.map((r) => (
                    <tr key={r._id} className="border-b border-dark-border/50 hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium text-white">{r.name}</p>
                        <p className="text-xs text-text-muted">{r.city}</p>
                        {r.phone && <p className="text-xs text-text-muted font-mono">{r.phone}</p>}
                      </td>
                      <td className="px-4 py-3"><Stars n={r.rating} /></td>
                      <td className="px-4 py-3 max-w-xs">
                        {r.title && <p className="text-xs font-medium text-white mb-0.5">{r.title}</p>}
                        <p className="text-xs text-text-muted line-clamp-2">{r.review}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-silver">{r.scrapType || "-"}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColor[r.status]}`}>{r.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => update(r._id, { featured: !r.featured })}
                          className={`text-xs px-2 py-0.5 rounded-full font-medium transition-all ${r.featured ? "bg-accent-glow/20 text-accent-glow" : "bg-white/5 text-text-muted hover:text-white"}`}>
                          {r.featured ? "★ Featured" : "Feature"}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {r.status !== "approved" && (
                            <button onClick={() => update(r._id, { status: "approved" })} title="Approve"
                              className="p-1.5 text-text-muted hover:text-green-400 rounded-lg hover:bg-green-400/10 transition-all">
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {r.status !== "rejected" && (
                            <button onClick={() => update(r._id, { status: "rejected" })} title="Reject"
                              className="p-1.5 text-text-muted hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-all">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button onClick={() => del(r._id)} title="Delete"
                            className="p-1.5 text-text-muted hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-all">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        {pages > 1 && (
          <div className="px-4 py-3 border-t border-dark-border flex items-center justify-between">
            <span className="text-xs text-text-muted">Page {page} of {pages}</span>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="p-1.5 rounded-lg border border-dark-border text-text-muted hover:text-white disabled:opacity-40">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}
                className="p-1.5 rounded-lg border border-dark-border text-text-muted hover:text-white disabled:opacity-40">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

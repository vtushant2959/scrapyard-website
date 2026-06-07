"use client";
import { useEffect, useState, useCallback } from "react";
import { RefreshCw, Trash2, ChevronLeft, ChevronRight, Download } from "lucide-react";
import toast from "react-hot-toast";

interface WaitlistEntry {
  _id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  userType: string;
  notified: boolean;
  createdAt: string;
}

export function AdminWaitlist() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [total, setTotal]     = useState(0);
  const [page, setPage]       = useState(1);
  const [pages, setPages]     = useState(1);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "20" });
      const res  = await fetch(`/api/admin/waitlist?${params}`);
      const data = await res.json();
      setEntries(Array.isArray(data.entries) ? data.entries : []);
      setTotal(data.total);
      setPages(data.pages);
    } catch { toast.error("Failed to load"); }
    setLoading(false);
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const deleteEntry = async (id: string) => {
    if (!confirm("Remove from waitlist?")) return;
    try {
      await fetch("/api/admin/waitlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast.success("Removed");
      load();
    } catch { toast.error("Failed"); }
  };

  const exportCSV = () => {
    const header = "Name,Phone,Email,City,User Type,Date\n";
    const rows = entries.map((e) =>
      `"${e.name}","${e.phone}","${e.email}","${e.city}","${e.userType}","${new Date(e.createdAt).toLocaleDateString("en-IN")}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "waitlist.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>App Waitlist</h2>
          <p className="text-xs text-text-muted">{total} signed up</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-xl text-text-muted border border-dark-border hover:text-accent-glow hover:border-accent-glow/30 transition-all">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={exportCSV} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 text-silver border border-dark-border hover:text-white transition-all">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border bg-white/2">
                {["Name", "Phone", "Email", "City", "User Type", "Signed Up", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-text-muted font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [...Array(8)].map((_, i) => (
                    <tr key={i} className="border-b border-dark-border/50">
                      {[...Array(7)].map((__, j) => (
                        <td key={j} className="px-4 py-3"><div className="h-3 bg-white/5 rounded animate-pulse" /></td>
                      ))}
                    </tr>
                  ))
                : entries.map((e) => (
                    <tr key={e._id} className="border-b border-dark-border/50 hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3 text-xs font-medium text-white">{e.name}</td>
                      <td className="px-4 py-3 text-xs text-text-muted font-mono">{e.phone}</td>
                      <td className="px-4 py-3 text-xs text-silver">{e.email || "-"}</td>
                      <td className="px-4 py-3 text-xs text-silver">{e.city || "-"}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent-glow/10 text-accent-glow font-medium capitalize">
                          {e.userType || "General"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-text-muted whitespace-nowrap">
                        {new Date(e.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => deleteEntry(e._id)}
                          className="p-1.5 text-text-muted hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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

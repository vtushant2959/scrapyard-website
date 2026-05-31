"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, RefreshCw, X, ChevronLeft,
  ChevronRight, Phone, Mail, MapPin,
  MessageCircle, Trash2, Edit3, Check,
} from "lucide-react";
import toast from "react-hot-toast";

interface Lead {
  _id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  businessType: string;
  scrapType: string;
  message: string;
  status: string;
  notes: string;
  source: string;
  createdAt: string;
}

const STATUSES = ["All", "New", "Contacted", "Scheduled", "Completed", "Cancelled"];

const statusColor: Record<string, string> = {
  New:       "bg-accent-glow/15 text-accent-glow border-accent-glow/20",
  Contacted: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  Scheduled: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Completed: "bg-green-500/15 text-green-400 border-green-500/20",
  Cancelled: "bg-red-500/15 text-red-400 border-red-500/20",
};

export function AdminLeads() {
  const [leads, setLeads]       = useState<Lead[]>([]);
  const [total, setTotal]       = useState(0);
  const [page, setPage]         = useState(1);
  const [pages, setPages]       = useState(1);
  const [loading, setLoading]   = useState(true);
  const [status, setStatus]     = useState("All");
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [editNote, setEditNote] = useState("");
  const [saving, setSaving]     = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "15" });
      if (status !== "All") params.set("status", status);
      if (search) params.set("search", search);
      const res  = await fetch(`/api/admin/leads?${params}`);
      const data = await res.json();
      setLeads(Array.isArray(data.leads) ? data.leads : []);
      setTotal(data.total);
      setPages(data.pages);
    } catch { toast.error("Failed to load leads"); }
    setLoading(false);
  }, [page, status, search]);

  useEffect(() => { load(); }, [load]);
  // reset page on filter change
  useEffect(() => { setPage(1); }, [status, search]);

  const updateStatus = async (id: string, newStatus: string) => {
    setSaving(true);
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      toast.success("Status updated");
      load();
      if (selected?._id === id) setSelected({ ...selected, status: newStatus });
    } catch { toast.error("Failed to update"); }
    setSaving(false);
  };

  const saveNote = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await fetch(`/api/admin/leads/${selected._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: editNote }),
      });
      toast.success("Note saved");
      setSelected({ ...selected, notes: editNote });
      load();
    } catch { toast.error("Failed"); }
    setSaving(false);
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    try {
      await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      toast.success("Lead deleted");
      setSelected(null);
      load();
    } catch { toast.error("Failed to delete"); }
  };

  const openLead = (lead: Lead) => {
    setSelected(lead);
    setEditNote(lead.notes ?? "");
  };

  return (
    <div className="flex gap-5 h-full">
      {/* List panel */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, phone, email…"
              className="form-input pl-9 w-full text-sm"
            />
          </div>
          <button onClick={load} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-text-muted border border-dark-border hover:text-accent-glow hover:border-accent-glow/30 transition-all flex-shrink-0">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Status tabs */}
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button key={s} onClick={() => setStatus(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${status === s ? "bg-accent-glow text-background" : "bg-white/5 text-text-muted border border-dark-border hover:text-white"}`}>
              {s}
            </button>
          ))}
          <span className="ml-auto text-xs text-text-muted self-center">{total} leads</span>
        </div>

        {/* Table */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border bg-white/2">
                  {["Name", "Phone", "City", "Scrap", "Status", "Date", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-text-muted font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? [...Array(8)].map((_, i) => (
                      <tr key={i} className="border-b border-dark-border/50">
                        {[...Array(7)].map((__, j) => (
                          <td key={j} className="px-4 py-3">
                            <div className="h-3 bg-white/5 rounded animate-pulse" style={{ width: `${50 + j * 10}%` }} />
                          </td>
                        ))}
                      </tr>
                    ))
                  : leads.map((lead) => (
                      <tr
                        key={lead._id}
                        onClick={() => openLead(lead)}
                        className={`border-b border-dark-border/50 hover:bg-white/3 transition-colors cursor-pointer ${selected?._id === lead._id ? "bg-accent-glow/5" : ""}`}
                      >
                        <td className="px-4 py-3 text-xs font-medium text-white">{lead.name}</td>
                        <td className="px-4 py-3 text-xs text-text-muted font-mono">{lead.phone}</td>
                        <td className="px-4 py-3 text-xs text-silver">{lead.city}</td>
                        <td className="px-4 py-3 text-xs text-silver max-w-[100px] truncate">{lead.scrapType || "—"}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${statusColor[lead.status] ?? "bg-white/5 text-silver border-white/10"}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-text-muted whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteLead(lead._id); }}
                            className="p-1.5 text-text-muted hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="px-4 py-3 border-t border-dark-border flex items-center justify-between">
              <span className="text-xs text-text-muted">Page {page} of {pages}</span>
              <div className="flex gap-2">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-1.5 rounded-lg border border-dark-border text-text-muted hover:text-white disabled:opacity-40 transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}
                  className="p-1.5 rounded-lg border border-dark-border text-text-muted hover:text-white disabled:opacity-40 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.2 }}
            className="w-80 flex-shrink-0 space-y-4"
          >
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-sm font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>{selected.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium border mt-1 inline-block ${statusColor[selected.status] ?? "bg-white/5 text-silver border-white/10"}`}>
                    {selected.status}
                  </span>
                </div>
                <button onClick={() => setSelected(null)} className="p-1.5 text-text-muted hover:text-white rounded-lg hover:bg-white/5">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Contact buttons */}
              <div className="flex gap-2 mb-4">
                <a href={`tel:${selected.phone}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-accent-glow/10 text-accent-glow hover:bg-accent-glow/20 transition-colors">
                  <Phone className="w-3.5 h-3.5" /> Call
                </a>
                <a href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
                <a href={`mailto:${selected.email}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              </div>

              {/* Info grid */}
              <div className="space-y-2 mb-4">
                {[
                  { icon: Phone,   label: "Phone",    value: selected.phone },
                  { icon: Mail,    label: "Email",    value: selected.email },
                  { icon: MapPin,  label: "City",     value: selected.city },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-2.5 text-xs">
                    <Icon className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                    <span className="text-text-muted w-12">{label}</span>
                    <span className="text-silver truncate">{value}</span>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2 rounded-lg bg-white/3 border border-dark-border">
                    <p className="text-xs text-text-muted">Type</p>
                    <p className="text-xs font-medium text-white mt-0.5">{selected.businessType || "—"}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/3 border border-dark-border">
                    <p className="text-xs text-text-muted">Scrap</p>
                    <p className="text-xs font-medium text-white mt-0.5">{selected.scrapType || "—"}</p>
                  </div>
                </div>
                {selected.message && (
                  <div className="p-2.5 rounded-lg bg-white/3 border border-dark-border">
                    <p className="text-xs text-text-muted mb-1">Message</p>
                    <p className="text-xs text-silver leading-relaxed">{selected.message}</p>
                  </div>
                )}
              </div>

              {/* Change status */}
              <div className="mb-4">
                <p className="text-xs text-text-muted mb-2">Update Status</p>
                <div className="flex flex-wrap gap-1.5">
                  {["New", "Contacted", "Scheduled", "Completed", "Cancelled"].map((s) => (
                    <button key={s} disabled={saving || s === selected.status}
                      onClick={() => updateStatus(selected._id, s)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium border transition-all ${
                        s === selected.status
                          ? `${statusColor[s]} opacity-60`
                          : "bg-white/5 text-text-muted border-dark-border hover:border-accent-glow/30 hover:text-white"
                      }`}>
                      {s === selected.status && <Check className="w-3 h-3 inline mr-1" />}
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <p className="text-xs text-text-muted mb-1.5 flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5" /> Internal Notes
                </p>
                <textarea
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  rows={3}
                  placeholder="Add notes about this lead…"
                  className="form-input text-xs w-full resize-none"
                />
                <button onClick={saveNote} disabled={saving}
                  className="mt-2 w-full btn-primary justify-center py-2 text-xs disabled:opacity-60">
                  {saving ? "Saving…" : "Save Note"}
                </button>
              </div>

              <p className="text-xs text-text-muted mt-3 text-center">
                Added {new Date(selected.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

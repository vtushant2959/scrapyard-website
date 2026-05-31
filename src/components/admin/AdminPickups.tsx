"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, X, Truck, Phone, MapPin, ChevronLeft, ChevronRight, Plus, Check } from "lucide-react";
import toast from "react-hot-toast";

interface Pickup {
  _id: string;
  name: string;
  phone: string;
  city: string;
  scheduledDate: string;
  scheduledSlot: string;
  scrapType: string;
  actualWeight: number;
  actualRate: number;
  totalAmount: number;
  paymentStatus: string;
  status: string;
  agentName: string;
  notes: string;
  createdAt: string;
}

const STATUSES  = ["All", "Scheduled", "En Route", "Arrived", "Completed", "Cancelled"];
const statusColor: Record<string, string> = {
  Scheduled: "bg-blue-500/15 text-blue-400",
  "En Route": "bg-yellow-500/15 text-yellow-400",
  Arrived:   "bg-purple-500/15 text-purple-400",
  Completed: "bg-green-500/15 text-green-400",
  Cancelled: "bg-red-500/15 text-red-400",
};

export function AdminPickups() {
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [total, setTotal]     = useState(0);
  const [page, setPage]       = useState(1);
  const [pages, setPages]     = useState(1);
  const [loading, setLoading] = useState(true);
  const [status, setStatus]   = useState("All");
  const [selected, setSelected] = useState<Pickup | null>(null);
  const [saving, setSaving]   = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm]       = useState({ name: "", phone: "", city: "", scrapType: "", scheduledDate: "", scheduledSlot: "", agentName: "" });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "15" });
      if (status !== "All") params.set("status", status);
      const res  = await fetch(`/api/admin/pickups?${params}`);
      const data = await res.json();
      setPickups(Array.isArray(data.pickups) ? data.pickups : []);
      setTotal(data.total);
      setPages(data.pages);
    } catch { toast.error("Failed"); }
    setLoading(false);
  }, [page, status]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [status]);

  const updateStatus = async (id: string, newStatus: string) => {
    setSaving(true);
    try {
      await fetch(`/api/admin/pickups/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      toast.success("Status updated");
      load();
      if (selected?._id === id) setSelected({ ...selected, status: newStatus });
    } catch { toast.error("Failed"); }
    setSaving(false);
  };

  const updateField = async (id: string, field: string, value: string | number) => {
    try {
      await fetch(`/api/admin/pickups/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
    } catch { /* silent */ }
  };

  const addPickup = async () => {
    if (!form.name || !form.phone || !form.city) { toast.error("Name, phone, city required"); return; }
    setSaving(true);
    try {
      await fetch("/api/admin/pickups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      toast.success("Pickup created");
      setShowAdd(false);
      setForm({ name: "", phone: "", city: "", scrapType: "", scheduledDate: "", scheduledSlot: "", agentName: "" });
      load();
    } catch { toast.error("Failed"); }
    setSaving(false);
  };

  return (
    <div className="flex gap-5 h-full">
      {/* List */}
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>Pickup Requests</h2>
            <p className="text-xs text-text-muted">{total} total pickups</p>
          </div>
          <div className="flex gap-2">
            <button onClick={load} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-text-muted border border-dark-border hover:text-accent-glow hover:border-accent-glow/30 transition-all">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 text-silver border border-dark-border hover:text-white transition-all">
              <Plus className="w-3.5 h-3.5" /> Add Pickup
            </button>
          </div>
        </div>

        {/* Add form */}
        {showAdd && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-4">Schedule New Pickup</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { key: "name",          placeholder: "Customer name *",  type: "text" },
                { key: "phone",         placeholder: "Phone *",          type: "text" },
                { key: "city",          placeholder: "City *",           type: "text" },
                { key: "scrapType",     placeholder: "Scrap type",       type: "text" },
                { key: "scheduledDate", placeholder: "Scheduled date",   type: "date" },
                { key: "scheduledSlot", placeholder: "Time slot",        type: "text" },
                { key: "agentName",     placeholder: "Assign agent",     type: "text" },
              ].map(({ key, placeholder, type }) => (
                <input key={key} type={type} value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder} className="form-input text-xs" />
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={addPickup} disabled={saving} className="btn-primary text-xs px-4 py-2 disabled:opacity-60">
                {saving ? "Creating…" : "Create Pickup"}
              </button>
              <button onClick={() => setShowAdd(false)} className="btn-secondary text-xs px-4 py-2">Cancel</button>
            </div>
          </motion.div>
        )}

        {/* Status tabs */}
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button key={s} onClick={() => setStatus(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${status === s ? "bg-accent-glow text-background" : "bg-white/5 text-text-muted border border-dark-border hover:text-white"}`}>
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
                  {["Customer", "Phone", "City", "Scrap", "Date / Slot", "Agent", "Amount", "Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-text-muted font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? [...Array(6)].map((_, i) => (
                      <tr key={i} className="border-b border-dark-border/50">
                        {[...Array(8)].map((__, j) => (
                          <td key={j} className="px-4 py-3"><div className="h-3 bg-white/5 rounded animate-pulse" /></td>
                        ))}
                      </tr>
                    ))
                  : pickups.map((p) => (
                      <tr key={p._id} onClick={() => setSelected(p === selected ? null : p)}
                        className={`border-b border-dark-border/50 hover:bg-white/3 transition-colors cursor-pointer ${selected?._id === p._id ? "bg-accent-glow/5" : ""}`}>
                        <td className="px-4 py-3 text-xs font-medium text-white">{p.name}</td>
                        <td className="px-4 py-3 text-xs text-text-muted font-mono">{p.phone}</td>
                        <td className="px-4 py-3 text-xs text-silver">{p.city}</td>
                        <td className="px-4 py-3 text-xs text-silver">{p.scrapType || "—"}</td>
                        <td className="px-4 py-3 text-xs text-text-muted">
                          {p.scheduledDate ? new Date(p.scheduledDate).toLocaleDateString("en-IN") : "—"}
                          {p.scheduledSlot && <span className="ml-1 text-text-muted/60">{p.scheduledSlot}</span>}
                        </td>
                        <td className="px-4 py-3 text-xs text-silver">{p.agentName || "—"}</td>
                        <td className="px-4 py-3 text-xs font-bold text-white">
                          {p.totalAmount ? `₹${p.totalAmount.toLocaleString("en-IN")}` : "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[p.status] ?? "bg-white/5 text-silver"}`}>
                            {p.status}
                          </span>
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

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.2 }}
            className="w-72 flex-shrink-0">
            <div className="glass-card rounded-xl p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>{selected.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${statusColor[selected.status] ?? "bg-white/5 text-silver"}`}>
                    {selected.status}
                  </span>
                </div>
                <button onClick={() => setSelected(null)} className="p-1.5 text-text-muted hover:text-white rounded-lg hover:bg-white/5">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { icon: Phone,  v: selected.phone },
                  { icon: MapPin, v: selected.city },
                  { icon: Truck,  v: selected.scrapType || "—" },
                ].map(({ icon: Icon, v }) => (
                  <div key={v} className="flex items-center gap-2 text-silver">
                    <Icon className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                    {v}
                  </div>
                ))}
              </div>

              {/* Completion fields */}
              <div className="space-y-2">
                <p className="text-xs text-text-muted font-semibold">Completion Details</p>
                {[
                  { label: "Actual Weight (kg)", field: "actualWeight", type: "number" },
                  { label: "Rate (₹/kg)",        field: "actualRate",   type: "number" },
                  { label: "Total Amount (₹)",   field: "totalAmount",  type: "number" },
                  { label: "Agent Name",          field: "agentName",   type: "text" },
                ].map(({ label, field, type }) => (
                  <div key={field}>
                    <p className="text-xs text-text-muted mb-1">{label}</p>
                    <input
                      type={type}
                      defaultValue={((selected as unknown) as Record<string, unknown>)[field] as string ?? ""}
                      onBlur={(e) => updateField(selected._id, field, type === "number" ? Number(e.target.value) : e.target.value)}
                      className="form-input text-xs w-full"
                    />
                  </div>
                ))}
              </div>

              {/* Status updates */}
              <div>
                <p className="text-xs text-text-muted mb-2 font-semibold">Move Status</p>
                <div className="space-y-1.5">
                  {["Scheduled", "En Route", "Arrived", "Completed", "Cancelled"].map((s) => (
                    <button key={s} disabled={saving || s === selected.status}
                      onClick={() => updateStatus(selected._id, s)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        s === selected.status
                          ? `${statusColor[s]} opacity-70`
                          : "bg-white/5 text-text-muted border border-dark-border hover:border-accent-glow/30 hover:text-white"
                      }`}>
                      {s === selected.status && <Check className="w-3 h-3" />}
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

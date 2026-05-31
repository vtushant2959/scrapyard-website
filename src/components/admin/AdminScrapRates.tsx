"use client";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, TrendingDown, Minus, Save,
  Plus, Trash2, RefreshCw, AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";

interface Rate {
  _id: string;
  name: string;
  category: string;
  rate: number;
  unit: string;
  change: number;
  trend: "up" | "down" | "stable";
  isActive: boolean;
  updatedAt: string;
}

const CATEGORIES = ["All", "Metal", "Plastic", "Paper", "Electronics", "Industrial", "Other"];

const categoryColor: Record<string, string> = {
  Metal:       "text-silver",
  Plastic:     "text-green-400",
  Paper:       "text-yellow-400",
  Electronics: "text-blue-400",
  Industrial:  "text-orange-400",
  Other:       "text-text-muted",
};

const blankRate = { name: "", category: "Metal", rate: 0, unit: "kg", change: 0, trend: "stable" as const, isActive: true };

export function AdminScrapRates() {
  const [rates, setRates]           = useState<Rate[]>([]);
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [filter, setFilter]         = useState("All");
  const [edited, setEdited]         = useState<Record<string, Partial<Rate>>>({});
  const [showAdd, setShowAdd]       = useState(false);
  const [newRate, setNewRate]       = useState({ ...blankRate });
  const [lastSaved, setLastSaved]   = useState<Date | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/rates");
      const data = await res.json();
      setRates(Array.isArray(data) ? data : []);
      setEdited({});
    } catch (e: unknown) { toast.error(e instanceof Error ? e.message : "Failed to load rates"); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const visible = (Array.isArray(rates) ? rates : []).filter((r) => filter === "All" || r.category === filter);
  const dirtyIds = Object.keys(edited);
  const hasChanges = dirtyIds.length > 0;

  const patch = (id: string, key: keyof Rate, value: string | number | boolean) => {
    setEdited((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? {}), [key]: value },
    }));
  };

  const calcTrend = (change: number): "up" | "down" | "stable" =>
    change > 0 ? "up" : change < 0 ? "down" : "stable";

  // Save all dirty rows via bulk PATCH
  const saveAll = async () => {
    setSaving(true);
    try {
      const payload = dirtyIds.map((id) => {
        const original = rates.find((r) => r._id === id)!;
        const changes  = edited[id];
        const rate     = changes.rate  ?? original.rate;
        const change   = changes.change ?? original.change;
        return {
          _id:    id,
          rate:   Number(rate),
          change: Number(change),
          trend:  changes.trend ?? calcTrend(Number(change)),
          isActive: changes.isActive ?? original.isActive,
          name:   changes.name ?? original.name,
          category: changes.category ?? original.category,
          unit:   changes.unit ?? original.unit,
        };
      });
      const res = await fetch("/api/admin/rates", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Server error");
      }
      toast.success(`${dirtyIds.length} rate(s) saved!`);
      setLastSaved(new Date());
      load();
    } catch { toast.error("Failed to save"); }
    setSaving(false);
  };

  const addRate = async () => {
    if (!newRate.name || newRate.rate <= 0) {
      toast.error("Name and rate are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newRate, trend: calcTrend(newRate.change) }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Server error");
      }
      toast.success("Rate added");
      setShowAdd(false);
      setNewRate({ ...blankRate });
      load();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Failed to add rate");
    }
    setSaving(false);
  };

  const deleteRate = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await fetch(`/api/admin/rates/${id}`, { method: "DELETE" });
      toast.success("Deleted");
      load();
    } catch { toast.error("Failed"); }
  };

  const getCurrent = (rate: Rate, key: keyof Rate) =>
    edited[rate._id]?.[key] !== undefined ? edited[rate._id][key] : rate[key];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>Scrap Rates</h2>
          <p className="text-xs text-text-muted mt-0.5">
            {lastSaved ? `Last saved: ${lastSaved.toLocaleTimeString("en-IN")}` : "Edit rates in the table and hit Save All"}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={load} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-text-muted border border-dark-border hover:text-accent-glow hover:border-accent-glow/30 transition-all">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 text-silver border border-dark-border hover:text-white transition-all">
            <Plus className="w-3.5 h-3.5" />
            Add Rate
          </button>
          {hasChanges && (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={saveAll}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-accent-glow text-background disabled:opacity-60 transition-all hover:shadow-glow-green"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "Saving…" : `Save ${dirtyIds.length} Change${dirtyIds.length > 1 ? "s" : ""}`}
            </motion.button>
          )}
        </div>
      </div>

      {/* Unsaved changes warning */}
      {hasChanges && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-yellow-400 bg-yellow-500/10 border border-yellow-500/20">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          {dirtyIds.length} unsaved change{dirtyIds.length > 1 ? "s" : ""}. Click &quot;Save All&quot; to publish to website.
        </div>
      )}

      {/* Add rate form */}
      {showAdd && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5">
          <h4 className="text-sm font-bold text-white mb-4">Add New Scrap Rate</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <input value={newRate.name} onChange={(e) => setNewRate({ ...newRate, name: e.target.value })}
              placeholder="Material name *" className="form-input text-xs col-span-2" />
            <select value={newRate.category} onChange={(e) => setNewRate({ ...newRate, category: e.target.value })}
              className="form-input text-xs">
              {CATEGORIES.slice(1).map((c) => <option key={c}>{c}</option>)}
            </select>
            <input type="number" value={newRate.rate} onChange={(e) => setNewRate({ ...newRate, rate: Number(e.target.value) })}
              placeholder="Rate *" className="form-input text-xs" />
            <input value={newRate.unit} onChange={(e) => setNewRate({ ...newRate, unit: e.target.value })}
              placeholder="Unit (kg/pc)" className="form-input text-xs" />
            <input type="number" value={newRate.change} onChange={(e) => setNewRate({ ...newRate, change: Number(e.target.value) })}
              placeholder="Change today" className="form-input text-xs" />
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={addRate} disabled={saving} className="btn-primary text-xs px-4 py-2 disabled:opacity-60">
              {saving ? "Adding…" : "Add Rate"}
            </button>
            <button onClick={() => setShowAdd(false)} className="btn-secondary text-xs px-4 py-2">Cancel</button>
          </div>
        </motion.div>
      )}

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${filter === c ? "bg-accent-glow text-background" : "bg-white/5 text-text-muted border border-dark-border hover:text-white"}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Rates table — inline editable */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border bg-white/2">
                {["Material", "Category", "Rate (₹)", "Unit", "Today's Change", "Trend", "Active", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-text-muted font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [...Array(8)].map((_, i) => (
                    <tr key={i} className="border-b border-dark-border/50">
                      {[...Array(8)].map((__, j) => (
                        <td key={j} className="px-4 py-3"><div className="h-3 bg-white/5 rounded animate-pulse" /></td>
                      ))}
                    </tr>
                  ))
                : visible.map((rate) => {
                    const isDirty = !!edited[rate._id];
                    const curRate   = Number(getCurrent(rate, "rate"));
                    const curChange = Number(getCurrent(rate, "change"));
                    const curTrend  = getCurrent(rate, "trend") as string;
                    const curActive = getCurrent(rate, "isActive") as boolean;

                    return (
                      <tr key={rate._id}
                        className={`border-b border-dark-border/50 hover:bg-white/2 transition-colors ${isDirty ? "bg-accent-glow/4" : ""}`}>
                        {/* Name */}
                        <td className="px-4 py-2.5">
                          <input
                            defaultValue={rate.name}
                            onChange={(e) => patch(rate._id, "name", e.target.value)}
                            className="bg-transparent text-xs font-medium text-white w-full outline-none border-b border-transparent focus:border-accent-glow/40 pb-0.5 transition-colors"
                          />
                        </td>
                        {/* Category */}
                        <td className="px-4 py-2.5">
                          <span className={`text-xs font-semibold ${categoryColor[rate.category] ?? "text-text-muted"}`}>
                            {rate.category}
                          </span>
                        </td>
                        {/* Rate */}
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-text-muted">₹</span>
                            <input
                              type="number"
                              value={curRate}
                              onChange={(e) => {
                                const v = Number(e.target.value);
                                patch(rate._id, "rate", v);
                                const diff = v - rate.rate;
                                patch(rate._id, "change", diff);
                                patch(rate._id, "trend", calcTrend(diff));
                              }}
                              className="bg-transparent text-xs font-black text-white w-16 outline-none border-b border-transparent focus:border-accent-glow/40 pb-0.5 transition-colors"
                            />
                          </div>
                        </td>
                        {/* Unit */}
                        <td className="px-4 py-2.5">
                          <input
                            defaultValue={rate.unit}
                            onChange={(e) => patch(rate._id, "unit", e.target.value)}
                            className="bg-transparent text-xs text-text-muted w-10 outline-none border-b border-transparent focus:border-accent-glow/40 pb-0.5 transition-colors"
                          />
                        </td>
                        {/* Change */}
                        <td className="px-4 py-2.5">
                          <input
                            type="number"
                            value={curChange}
                            onChange={(e) => {
                              const v = Number(e.target.value);
                              patch(rate._id, "change", v);
                              patch(rate._id, "trend", calcTrend(v));
                            }}
                            className={`bg-transparent text-xs font-mono font-bold w-14 outline-none border-b border-transparent focus:border-accent-glow/40 pb-0.5 transition-colors ${
                              curChange > 0 ? "text-accent-glow" : curChange < 0 ? "text-red-400" : "text-text-muted"
                            }`}
                          />
                        </td>
                        {/* Trend */}
                        <td className="px-4 py-2.5">
                          {curTrend === "up"
                            ? <TrendingUp  className="w-4 h-4 text-accent-glow" />
                            : curTrend === "down"
                            ? <TrendingDown className="w-4 h-4 text-red-400" />
                            : <Minus       className="w-4 h-4 text-text-muted" />}
                        </td>
                        {/* Active toggle */}
                        <td className="px-4 py-2.5">
                          <button
                            onClick={() => patch(rate._id, "isActive", !curActive)}
                            className={`w-9 h-5 rounded-full relative transition-colors ${curActive ? "bg-accent-glow" : "bg-white/15"}`}
                          >
                            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${curActive ? "left-4" : "left-0.5"}`} />
                          </button>
                        </td>
                        {/* Delete */}
                        <td className="px-4 py-2.5">
                          <button onClick={() => deleteRate(rate._id, rate.name)}
                            className="p-1.5 text-text-muted hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-all">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-dark-border flex items-center justify-between">
          <p className="text-xs text-text-muted">{visible.length} materials • Rates shown on public website instantly after save</p>
          {hasChanges && (
            <button onClick={saveAll} disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-accent-glow text-background disabled:opacity-60">
              <Save className="w-3.5 h-3.5" />
              {saving ? "Saving…" : `Save All (${dirtyIds.length})`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

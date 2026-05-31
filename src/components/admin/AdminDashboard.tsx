"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Truck, TrendingUp, Smartphone,
  ArrowUp, ArrowDown, FileText, RefreshCw,
} from "lucide-react";

interface Stats {
  totalLeads: number;
  newLeadsToday: number;
  pickupsToday: number;
  pickupsCompleted: number;
  waitlistCount: number;
  publishedBlogs: number;
  revenue: number;
  recentLeads: Lead[];
  leadsByStatus: { _id: string; count: number }[];
}

interface Lead {
  _id: string;
  name: string;
  phone: string;
  city: string;
  businessType: string;
  scrapType: string;
  status: string;
  createdAt: string;
}

const statusColor: Record<string, string> = {
  New:       "bg-accent-glow/15 text-accent-glow",
  Contacted: "bg-yellow-500/15 text-yellow-400",
  Scheduled: "bg-blue-500/15 text-blue-400",
  Completed: "bg-green-500/15 text-green-400",
  Cancelled: "bg-red-500/15 text-red-400",
};

export function AdminDashboard({ onNav }: { onNav: (v: string) => void }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch { /* empty */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const cards = stats
    ? [
        { label: "Total Leads",     value: stats.totalLeads,       sub: `+${stats.newLeadsToday} today`,  icon: Users,      up: true  },
        { label: "Pickups Today",   value: stats.pickupsToday,     sub: `${stats.pickupsCompleted} done this month`, icon: Truck, up: true },
        { label: "Revenue (MTD)",   value: `₹${(stats.revenue / 100000).toFixed(1)}L`, sub: "Completed pickups", icon: TrendingUp, up: true },
        { label: "App Waitlist",    value: stats.waitlistCount,    sub: "Signed up",          icon: Smartphone, up: true  },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>Overview</h2>
          <p className="text-xs text-text-muted mt-0.5">Real-time data from MongoDB</p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-text-muted border border-dark-border hover:text-accent-glow hover:border-accent-glow/30 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {loading
          ? [...Array(4)].map((_, i) => (
              <div key={i} className="glass-card rounded-xl p-4 animate-pulse h-24" />
            ))
          : cards.map((c, i) => (
              <motion.div key={c.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <div className="glass-card rounded-xl p-4 hover:glow-border-green transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-accent-glow/10 flex items-center justify-center">
                      <c.icon className="w-4 h-4 text-accent-glow" />
                    </div>
                    <span className={`text-xs font-semibold flex items-center gap-0.5 ${c.up ? "text-accent-glow" : "text-red-400"}`}>
                      {c.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    </span>
                  </div>
                  <p className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>{c.value}</p>
                  <p className="text-xs font-medium text-silver mt-0.5">{c.label}</p>
                  <p className="text-xs text-text-muted">{c.sub}</p>
                </div>
              </motion.div>
            ))}
      </div>

      {/* Lead status breakdown */}
      {stats && stats.leadsByStatus?.length > 0 && (
        <div className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Leads by Status</h3>
          <div className="flex flex-wrap gap-3">
            {stats.leadsByStatus.map((s) => (
              <button
                key={s._id}
                onClick={() => onNav("Leads")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${statusColor[s._id] ?? "bg-white/5 text-silver"}`}
              >
                {s._id}
                <span className="font-black">{s.count}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent leads */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-dark-border flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Recent Leads</h3>
          <button onClick={() => onNav("Leads")} className="text-xs text-accent-glow hover:underline">
            View all →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border bg-white/2">
                {["Name", "Phone", "City", "Scrap Type", "Status", "Date"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-text-muted font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b border-dark-border/50">
                      <td colSpan={6} className="px-4 py-3">
                        <div className="h-3 bg-white/5 rounded animate-pulse w-full" />
                      </td>
                    </tr>
                  ))
                : stats?.recentLeads?.map((lead) => (
                    <tr key={lead._id} className="border-b border-dark-border/50 hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3 text-xs font-medium text-white">{lead.name}</td>
                      <td className="px-4 py-3 text-xs text-text-muted font-mono">{lead.phone}</td>
                      <td className="px-4 py-3 text-xs text-silver">{lead.city}</td>
                      <td className="px-4 py-3 text-xs text-silver">{lead.scrapType || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[lead.status] ?? "bg-white/5 text-silver"}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-text-muted">
                        {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom stat row */}
      {stats && (
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>{stats.publishedBlogs}</p>
              <p className="text-xs text-text-muted">Published Blogs</p>
            </div>
          </div>
          <div className="glass-card rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent-glow/10 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-accent-glow" />
            </div>
            <div>
              <p className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>{stats.pickupsCompleted}</p>
              <p className="text-xs text-text-muted">Pickups This Month</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { RefreshCw, TrendingUp, Users, Truck, Smartphone } from "lucide-react";

interface AnalyticsData {
  leadsByStatus: { _id: string; count: number }[];
  leadsByCity: { _id: string; count: number }[];
  pickupsByStatus: { _id: string; count: number }[];
  leadsLast7Days: { _id: string; count: number }[];
  totalLeads: number;
  totalPickups: number;
  totalWaitlist: number;
  totalRevenue: number;
}

const statusColor: Record<string, string> = {
  New:       "#2CEB88",
  Contacted: "#EAB308",
  Scheduled: "#3B82F6",
  Completed: "#22C55E",
  Cancelled: "#EF4444",
  Scheduled2: "#8B5CF6",
  "En Route": "#EAB308",
  Arrived:   "#8B5CF6",
};

function MiniBar({ label, value, max, color = "#2CEB88" }: { label: string; value: number; max: number; color?: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-silver w-24 truncate flex-shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-xs font-bold text-white w-6 text-right">{value}</span>
    </div>
  );
}

export function AdminAnalytics() {
  const [data, setData]     = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/analytics");
      const json = await res.json();
      setData(json);
    } catch { /* silent */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  if (loading) return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-5 w-32 bg-white/5 rounded animate-pulse" />
          <div className="h-3 w-48 bg-white/5 rounded animate-pulse mt-1" />
        </div>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="glass-card rounded-xl p-4 animate-pulse h-24" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="glass-card rounded-xl p-5 animate-pulse h-48" />)}
      </div>
    </div>
  );

  const kpis = data ? [
    { label: "Total Leads",    value: data.totalLeads,    icon: Users,      color: "text-accent-glow", bg: "bg-accent-glow/10" },
    { label: "Total Pickups",  value: data.totalPickups,  icon: Truck,      color: "text-blue-400",    bg: "bg-blue-500/10"   },
    { label: "Revenue (all)",  value: `₹${((data.totalRevenue || 0) / 1000).toFixed(0)}K`, icon: TrendingUp, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { label: "App Waitlist",   value: data.totalWaitlist, icon: Smartphone, color: "text-purple-400",  bg: "bg-purple-500/10" },
  ] : [];

  const maxLeadStatus = Math.max(...(data?.leadsByStatus.map((s) => s.count) ?? [1]));
  const maxCity       = Math.max(...(data?.leadsByCity.map((c) => c.count) ?? [1]));
  const maxPickup     = Math.max(...(data?.pickupsByStatus.map((s) => s.count) ?? [1]));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>Analytics</h2>
          <p className="text-xs text-text-muted">Summary of all platform activity</p>
        </div>
        <button onClick={load}
          className="p-2 rounded-xl text-text-muted border border-dark-border hover:text-accent-glow hover:border-accent-glow/30 transition-all">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="glass-card rounded-xl p-4">
            <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center mb-3`}>
              <k.icon className={`w-4 h-4 ${k.color}`} />
            </div>
            <p className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>{k.value}</p>
            <p className="text-xs text-text-muted mt-0.5">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Leads by Status */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Leads by Status</h3>
          <div className="space-y-3">
            {data?.leadsByStatus.map((s) => (
              <MiniBar key={s._id} label={s._id} value={s.count} max={maxLeadStatus} color={statusColor[s._id] ?? "#C8CDD5"} />
            ))}
          </div>
        </div>

        {/* Leads by City */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Leads by City (Top 10)</h3>
          <div className="space-y-3">
            {data?.leadsByCity.slice(0, 10).map((c) => (
              <MiniBar key={c._id} label={c._id || "Unknown"} value={c.count} max={maxCity} color="#3B82F6" />
            ))}
          </div>
        </div>

        {/* Pickups by Status */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Pickups by Status</h3>
          <div className="space-y-3">
            {data?.pickupsByStatus.map((s) => (
              <MiniBar key={s._id} label={s._id} value={s.count} max={maxPickup} color={statusColor[s._id] ?? "#C8CDD5"} />
            ))}
          </div>
        </div>

        {/* Leads last 7 days */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">New Leads — Last 7 Days</h3>
          {data?.leadsLast7Days && data.leadsLast7Days.length > 0 ? (
            <div className="flex items-end gap-2 h-32">
              {(() => {
                const maxVal = Math.max(...data.leadsLast7Days.map((d) => d.count), 1);
                return data.leadsLast7Days.map((d) => (
                  <div key={d._id} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-text-muted">{d.count}</span>
                    <div
                      className="w-full rounded-t-sm bg-accent-glow/60 transition-all duration-700"
                      style={{ height: `${(d.count / maxVal) * 80}px`, minHeight: "4px" }}
                    />
                    <span className="text-xs text-text-muted" style={{ fontSize: "10px" }}>
                      {new Date(d._id).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                ));
              })()}
            </div>
          ) : (
            <p className="text-xs text-text-muted">No data yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

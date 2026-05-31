"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  LayoutDashboard, Users, Truck, TrendingUp, FileText,
  Smartphone, BarChart3, Settings, Menu, X, LogOut,
} from "lucide-react";

import { AdminDashboard }   from "@/components/admin/AdminDashboard";
import { AdminLeads }       from "@/components/admin/AdminLeads";
import { AdminPickups }     from "@/components/admin/AdminPickups";
import { AdminScrapRates }  from "@/components/admin/AdminScrapRates";
import { AdminBlogs }       from "@/components/admin/AdminBlogs";
import { AdminWaitlist }    from "@/components/admin/AdminWaitlist";
import { AdminAnalytics }   from "@/components/admin/AdminAnalytics";

/* ─── nav config ─────────────────────────────────────────────── */
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users,           label: "Leads"      },
  { icon: Truck,           label: "Pickups"    },
  { icon: TrendingUp,      label: "Scrap Rates"},
  { icon: FileText,        label: "Blogs"      },
  { icon: Smartphone,      label: "Waitlist"   },
  { icon: BarChart3,       label: "Analytics"  },
];

/* ─── settings stub ──────────────────────────────────────────── */
function AdminSettings() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>Settings</h2>
        <p className="text-xs text-text-muted">Platform configuration</p>
      </div>
      <div className="glass-card rounded-xl p-6 space-y-4">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
          <Settings className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-white">Settings module coming soon</p>
            <p className="text-xs text-text-muted mt-1">
              Future settings: admin password change, email notification preferences, SMTP configuration,
              business info (address, working hours), API keys management.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-text-muted mb-1.5 block">Business Name</label>
            <input defaultValue="SCRAPYARD" className="form-input w-full" disabled />
          </div>
          <div>
            <label className="text-xs text-text-muted mb-1.5 block">Contact Email</label>
            <input defaultValue="info@scrapyard.co.in" className="form-input w-full" disabled />
          </div>
          <div>
            <label className="text-xs text-text-muted mb-1.5 block">Contact Phone</label>
            <input defaultValue="+91 8505863220" className="form-input w-full" disabled />
          </div>
          <div>
            <label className="text-xs text-text-muted mb-1.5 block">Primary City</label>
            <input defaultValue="Delhi NCR" className="form-input w-full" disabled />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── main ───────────────────────────────────────────────────── */
export default function AdminPage() {
  const [activeNav, setActiveNav]     = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dbStatus, setDbStatus]       = useState<"checking" | "ok" | "error">("checking");
  const [dbError, setDbError]         = useState("");

  useEffect(() => {
    fetch("/api/admin/health")
      .then((r) => r.json())
      .then((d) => { setDbStatus(d.ok ? "ok" : "error"); setDbError(d.error ?? ""); })
      .catch(() => { setDbStatus("error"); setDbError("Cannot reach server"); });
  }, []);

  const navigate = (v: string) => setActiveNav(v);

  return (
    <div className="min-h-screen flex" style={{ background: "#050d14" }}>

      {/* ── Sidebar ── */}
      <motion.aside
        animate={{ width: sidebarOpen ? 220 : 64 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="flex-shrink-0 border-r border-dark-border flex flex-col"
        style={{ background: "#081018", overflow: "hidden" }}
      >
        {/* Logo row */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-dark-border min-h-[57px]">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
            <Image src="/scrapyard-logo-w-bg.png" alt="SCRAPYARD" width={32} height={32} className="w-full h-full object-contain" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="font-bold text-white text-sm whitespace-nowrap"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Admin Panel
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
          {navItems.map((item) => {
            const active = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.label)}
                title={!sidebarOpen ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-accent-glow/12 text-accent-glow"
                    : "text-text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </nav>

        {/* Settings + logout at bottom */}
        <div className="px-2 pb-4 space-y-0.5 border-t border-dark-border pt-3">
          <button
            onClick={() => navigate("Settings")}
            title={!sidebarOpen ? "Settings" : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeNav === "Settings"
                ? "bg-accent-glow/12 text-accent-glow"
                : "text-text-muted hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={async () => {
              if (!confirm("Sign out?")) return;
              await fetch("/api/admin/login", { method: "DELETE" });
              window.location.href = "/admin/login";
            }}
            title={!sidebarOpen ? "Sign Out" : undefined}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-red-400 hover:bg-red-400/8 transition-all duration-200"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header
          className="h-14 border-b border-dark-border flex items-center justify-between px-4 sm:px-6 flex-shrink-0"
          style={{ background: "#081018" }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="p-1.5 text-text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <h1 className="text-sm font-bold text-white">{activeNav}</h1>
          </div>
          <div className="flex items-center gap-2">
            {dbStatus === "checking" && (
              <>
                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-xs text-yellow-400 hidden sm:block">Connecting…</span>
              </>
            )}
            {dbStatus === "ok" && (
              <>
                <div className="w-2 h-2 rounded-full bg-accent-glow animate-pulse" />
                <span className="text-xs text-accent-glow hidden sm:block">DB Connected</span>
              </>
            )}
            {dbStatus === "error" && (
              <span title={dbError} className="text-xs text-red-400 hidden sm:block cursor-help border border-red-400/30 px-2 py-0.5 rounded-full max-w-xs truncate">
                ⚠ {dbError || "DB Error — check .env.local"}
              </span>
            )}
            <div className="w-7 h-7 rounded-full bg-accent-glow/20 flex items-center justify-center text-xs font-bold text-accent-glow ml-2">
              A
            </div>
            <span className="text-sm text-silver hidden sm:block">Admin</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNav}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="h-full"
            >
              {activeNav === "Dashboard"   && <AdminDashboard onNav={navigate} />}
              {activeNav === "Leads"       && <AdminLeads />}
              {activeNav === "Pickups"     && <AdminPickups />}
              {activeNav === "Scrap Rates" && <AdminScrapRates />}
              {activeNav === "Blogs"       && <AdminBlogs />}
              {activeNav === "Waitlist"    && <AdminWaitlist />}
              {activeNav === "Analytics"   && <AdminAnalytics />}
              {activeNav === "Settings"    && <AdminSettings />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

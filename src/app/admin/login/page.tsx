"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, LogIn } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [show, setShow]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);

    try {
      const res  = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Invalid password");
        setLoading(false);
        return;
      }

      toast.success("Welcome back!");
      router.push("/admin");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#050d14" }}>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(44,235,136,0.06) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm mx-4"
      >
        {/* Card */}
        <div className="glass-card rounded-2xl p-8"
          style={{ border: "1px solid rgba(44,235,136,0.15)" }}>

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl overflow-hidden mb-4 shadow-lg"
              style={{ boxShadow: "0 0 30px rgba(44,235,136,0.2)" }}>
              <Image src="/scrapyard-logo-w-bg.png" alt="SCRAPYARD" width={64} height={64}
                className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Admin Panel
            </h1>
            <p className="text-xs text-text-muted mt-1">SCRAPYARD — Restricted Access</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-text-muted mb-1.5 block font-medium">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="form-input w-full pl-9 pr-10"
                  autoFocus
                />
                <button type="button" onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading || !password}
              className="btn-primary w-full justify-center py-3 text-sm font-bold disabled:opacity-50">
              {loading
                ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-background/40 border-t-background rounded-full animate-spin" />Signing in…</span>
                : <span className="flex items-center gap-2"><LogIn className="w-4 h-4" />Sign In</span>}
            </button>
          </form>

          <p className="text-center text-xs text-text-muted mt-6">
            🔒 Secured · SCRAPYARD Admin v1.0
          </p>
        </div>
      </motion.div>
    </div>
  );
}

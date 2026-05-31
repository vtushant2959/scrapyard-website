"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { MapPin, TrendingUp, Banknote, Shield, Clock, Star, Download } from "lucide-react";

const features = [
  { icon: MapPin, label: "Track Pickup", desc: "Real-time GPS tracking" },
  { icon: TrendingUp, label: "Live Rates", desc: "Instant market rates" },
  { icon: Banknote, label: "Instant Pay", desc: "UPI in 60 seconds" },
  { icon: Shield, label: "Verified Buyers", desc: "Background checked" },
  { icon: Clock, label: "Schedule Pickup", desc: "Book in 30 seconds" },
  { icon: Star, label: "Rate & Review", desc: "Transparent feedback" },
];

export function AppShowcase() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,60,158,0.08) 0%, rgba(8,16,24,0) 50%, rgba(44,235,136,0.05) 100%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-[3rem] blur-3xl"
                style={{ background: "rgba(44,235,136,0.12)" }}
              />

              {/* Phone */}
              <div
                className="relative w-64 rounded-[2.5rem] overflow-hidden shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #0f1e2e, #081018)",
                  border: "2px solid rgba(44,235,136,0.2)",
                  boxShadow: "0 0 60px rgba(44,235,136,0.15)",
                }}
              >
                {/* Notch */}
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-20 h-1 rounded-full bg-dark-border" />
                </div>

                {/* App UI mockup */}
                <div className="px-4 pb-6 pt-2">
                  {/* Status bar */}
                  <div className="flex items-center justify-between mb-4 px-1">
                    <span className="text-xs font-mono text-text-muted">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 rounded-sm bg-accent-glow" />
                    </div>
                  </div>

                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-text-muted">Good morning,</p>
                      <p className="text-sm font-bold text-white">Rahul Kumar 👋</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-accent-glow/20 flex items-center justify-center">
                      <span className="text-sm">🏅</span>
                    </div>
                  </div>

                  {/* Stats mini */}
                  <div
                    className="rounded-xl p-3 mb-3"
                    style={{ background: "linear-gradient(135deg, rgba(44,235,136,0.15), rgba(0,60,158,0.15))" }}
                  >
                    <p className="text-xs text-text-muted mb-1">Total Earned</p>
                    <p className="text-xl font-black text-white">₹12,840</p>
                    <p className="text-xs text-accent-glow">+₹2,400 this month</p>
                  </div>

                  {/* Quick actions */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[
                      { emoji: "🚛", label: "Book Pickup" },
                      { emoji: "📊", label: "My Rates" },
                      { emoji: "💰", label: "Payments" },
                      { emoji: "📍", label: "Track" },
                    ].map((action) => (
                      <div
                        key={action.label}
                        className="rounded-xl p-2.5 flex flex-col items-center gap-1"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <span className="text-lg">{action.emoji}</span>
                        <span className="text-xs text-text-muted">{action.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Live rate ticker */}
                  <div
                    className="rounded-xl p-2.5"
                    style={{ background: "rgba(0,60,158,0.2)", border: "1px solid rgba(0,60,158,0.3)" }}
                  >
                    <p className="text-xs text-text-muted mb-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-glow animate-pulse" />
                      Live Iron Rate
                    </p>
                    <p className="text-sm font-bold text-white">₹28/kg</p>
                    <p className="text-xs text-accent-glow">↑ +₹2 today</p>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -right-12 top-12 glass-card rounded-xl px-3 py-2 shadow-xl"
              >
                <p className="text-xs text-text-muted">Rating</p>
                <p className="text-sm font-bold text-white flex items-center gap-1">
                  4.9 <span className="text-yellow-400">★</span>
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -left-12 bottom-20 glass-card rounded-xl px-3 py-2 shadow-xl"
              >
                <p className="text-xs text-text-muted">Downloads</p>
                <p className="text-sm font-bold text-accent-glow">50K+</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: "rgba(0,60,158,0.15)", border: "1px solid rgba(0,60,158,0.3)", color: "#6699ff" }}
            >
              📱 Mobile App Coming Soon
            </div>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Scrap in Your{" "}
              <span className="gradient-text">Pocket</span>
            </h2>

            <p className="text-text-muted text-base leading-relaxed mb-8">
              The SCRAPYARD app is your complete scrap management companion. Book pickups, track collections, get live rates, and receive instant payments — all in one place.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="w-8 h-8 rounded-lg bg-accent-glow/10 flex items-center justify-center flex-shrink-0">
                    <feat.icon className="w-4 h-4 text-accent-glow" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{feat.label}</p>
                    <p className="text-xs text-text-muted">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(44,235,136,0.08)",
                  border: "1px solid rgba(44,235,136,0.2)",
                  color: "#C8CDD5",
                }}
              >
                <span className="text-2xl">▶</span>
                <div className="text-left">
                  <p className="text-xs text-text-muted leading-none">Get it on</p>
                  <p className="text-sm font-bold text-white">Google Play</p>
                </div>
              </a>

              <Link
                href="/app-page"
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm btn-secondary"
              >
                <Download className="w-4 h-4" />
                Join Waitlist
              </Link>
            </div>

            <p className="text-xs text-text-muted mt-4">
              🎁 First 10,000 users get ₹500 bonus on first pickup.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

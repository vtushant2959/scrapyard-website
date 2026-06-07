"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { MapPin, TrendingUp, Banknote, Shield, Clock, Bell, Star, Download, CheckCircle, Smartphone } from "lucide-react";
import Link from "next/link";

const PLAY_STORE = "https://play.google.com/store/apps/details?id=com.scrapyardindia.app";

const features = [
  { icon: MapPin,      title: "Real-Time Tracking",  desc: "Track your pickup agent live on map",      status: "live" },
  { icon: TrendingUp,  title: "Live Scrap Rates",    desc: "Daily updated market rates",                status: "live" },
  { icon: Banknote,    title: "Instant Payments",    desc: "UPI transfer in 60 seconds",               status: "live" },
  { icon: Shield,      title: "Verified Buyers",     desc: "Only certified scrap buyers",              status: "live" },
  { icon: Clock,       title: "Easy Scheduling",     desc: "Book pickup in 30 seconds",                status: "live" },
  { icon: Bell,        title: "Rate Alerts",         desc: "Get notified on rate changes",             status: "live" },
];

const stats = [
  { value: "10K+",  label: "Downloads" },
  { value: "4.8★",  label: "Rating" },
  { value: "30+",   label: "Cities" },
  { value: "24/7",  label: "Support" },
];

const roadmap = [
  { q: "2025",    event: "App Launched",        desc: "SCRAPYARD app live on Google Play",          status: "done"     },
  { q: "Q1 2026", event: "iOS Launch",           desc: "App Store release for iPhone users",         status: "active"   },
  { q: "Q3 2026", event: "AI Scrap Valuation",  desc: "Photo-based scrap estimation with AI",       status: "upcoming" },
  { q: "2027",    event: "IoT Integration",      desc: "Smart bins & automated collection",          status: "upcoming" },
];

export function AppPageContent() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <div ref={ref} className="pt-16">
      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden grid-bg"
        style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(0,60,158,0.2) 0%, transparent 60%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6"
                style={{ background: "rgba(44,235,136,0.12)", border: "1px solid rgba(44,235,136,0.3)", color: "#2CEB88" }}>
                <span className="w-2 h-2 rounded-full bg-accent-glow animate-pulse" />
                ✅ Now Live on Google Play
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: "var(--font-syne)" }}>
                Scrap Management<br />
                <span className="gradient-text">In Your Pocket</span>
              </h1>
              <p className="text-lg text-text-muted leading-relaxed mb-8 max-w-lg">
                The SCRAPYARD app is live! Book pickups, track collections, get live scrap rates, and receive instant payments — all from your phone. Download now and get the best scrap rates in India.
              </p>

              {/* App store buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-glow-green"
                  style={{ background: "linear-gradient(135deg, rgba(44,235,136,0.15), rgba(44,235,136,0.05))", border: "1.5px solid rgba(44,235,136,0.4)" }}>
                  <span className="text-3xl">▶</span>
                  <div className="text-left">
                    <p className="text-xs text-text-muted leading-none mb-0.5">Download on</p>
                    <p className="text-base font-black text-white">Google Play</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl opacity-60"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.1)" }}>
                  <span className="text-3xl"></span>
                  <div className="text-left">
                    <p className="text-xs text-text-muted leading-none mb-0.5">Coming Soon</p>
                    <p className="text-base font-black text-white">App Store</p>
                  </div>
                </div>
              </div>

              {/* Rating + stats */}
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <span className="text-sm font-bold text-white">4.8</span>
                  <span className="text-xs text-text-muted">(1.2k reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-accent-glow" />
                  <span className="text-xs text-silver">10,000+ downloads</span>
                </div>
              </div>
            </motion.div>

            {/* Phone mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-[3rem] blur-3xl" style={{ background: "rgba(44,235,136,0.18)" }} />
                <div className="relative w-72 rounded-[2.5rem] overflow-hidden shadow-2xl"
                  style={{ background: "linear-gradient(135deg, #0f1e2e, #081018)", border: "2px solid rgba(44,235,136,0.3)" }}>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden">
                        <Image src="/scrapyard-logo-w-bg.png" alt="SCRAPYARD" width={64} height={64} className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                        style={{ background: "rgba(44,235,136,0.15)", color: "#2CEB88" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-glow animate-pulse" />
                        Live on Play Store
                      </div>
                    </div>
                    <div className="space-y-2">
                      {features.slice(0, 4).map((f) => (
                        <div key={f.title} className="flex items-center gap-3 p-2.5 rounded-xl"
                          style={{ background: "rgba(255,255,255,0.04)" }}>
                          <f.icon className="w-4 h-4 text-accent-glow flex-shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-white">{f.title}</p>
                            <p className="text-xs text-text-muted">{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-background"
                      style={{ background: "linear-gradient(135deg, #2CEB88, #1db870)" }}>
                      <Download className="w-3.5 h-3.5" /> Download Free
                    </a>
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                      <span className="text-xs text-text-muted ml-1">4.8 (1.2k)</span>
                    </div>
                  </div>
                </div>
                <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -right-14 top-16 glass-card rounded-xl px-3 py-2">
                  <p className="text-xs text-text-muted">Downloads</p>
                  <p className="text-sm font-bold text-accent-glow">10K+</p>
                </motion.div>
                <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute -left-14 bottom-24 glass-card rounded-xl px-3 py-2">
                  <p className="text-xs text-text-muted">Rating</p>
                  <p className="text-sm font-bold text-yellow-400">4.8 ★</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-8 border-y border-dark-border" style={{ background: "rgba(44,235,136,0.03)" }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-accent-glow" style={{ fontFamily: "var(--font-syne)" }}>{s.value}</p>
                <p className="text-xs text-text-muted mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white text-center mb-3" style={{ fontFamily: "var(--font-syne)" }}>
            Everything You Need in <span className="gradient-text">One App</span>
          </h2>
          <p className="text-text-muted text-center mb-10">All features live and working on Android</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
                <div className="glass-card rounded-xl p-5 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-accent-glow/10 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-accent-glow" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-white">{f.title}</h4>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-accent-glow/15 text-accent-glow">Live</span>
                    </div>
                    <p className="text-xs text-text-muted">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Roadmap */}
          <h2 className="text-3xl font-black text-white text-center mt-16 mb-10" style={{ fontFamily: "var(--font-syne)" }}>
            What&apos;s <span className="gradient-text">Coming Next</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmap.map((r, i) => (
              <motion.div key={r.q} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
                <div className={`rounded-xl p-5 h-full`}
                  style={{ background: r.status === "done" ? "rgba(44,235,136,0.08)" : r.status === "active" ? "rgba(0,60,158,0.12)" : "rgba(255,255,255,0.03)", border: r.status === "done" ? "1px solid rgba(44,235,136,0.25)" : r.status === "active" ? "1px solid rgba(0,60,158,0.3)" : "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-xs font-mono font-bold" style={{ color: r.status === "done" ? "#2CEB88" : r.status === "active" ? "#6699ff" : "#4a6070" }}>{r.q}</span>
                  <h4 className="text-sm font-bold text-white mt-2 mb-1">{r.event}</h4>
                  <p className="text-xs text-text-muted">{r.desc}</p>
                  <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${r.status === "done" ? "bg-accent-glow/15 text-accent-glow" : r.status === "active" ? "bg-blue-500/15 text-blue-400" : "bg-white/5 text-text-muted"}`}>
                    {r.status === "done" ? "✅ Live" : r.status === "active" ? "In Progress" : "Coming Soon"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="mt-16 glass-card rounded-2xl p-8 text-center" style={{ border: "1px solid rgba(44,235,136,0.2)" }}>
            <Smartphone className="w-12 h-12 text-accent-glow mx-auto mb-4" />
            <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
              Download the <span className="gradient-text">SCRAPYARD App</span> Now
            </h3>
            <p className="text-text-muted mb-6">Free to download. Available on Android. iOS coming soon.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, rgba(44,235,136,0.15), rgba(44,235,136,0.05))", border: "1.5px solid rgba(44,235,136,0.4)" }}>
                <span className="text-2xl">▶</span>
                <div className="text-left">
                  <p className="text-xs text-text-muted">Download on</p>
                  <p className="text-sm font-black text-white">Google Play</p>
                </div>
              </a>
              <Link href="/contact" className="btn-secondary text-sm px-8 py-4">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

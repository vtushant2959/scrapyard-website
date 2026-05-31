"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { MapPin, TrendingUp, Banknote, Shield, Clock, Bell, CheckCircle, Smartphone, Star } from "lucide-react";
import Link from "next/link";

const waitlistSchema = z.object({
  name: z.string().min(2, "Name required"),
  phone: z.string().min(10, "Valid phone required"),
  email: z.string().email("Valid email required"),
  city: z.string().min(2, "City required"),
  userType: z.string().min(1, "Select type"),
});

type WaitlistData = z.infer<typeof waitlistSchema>;

const features = [
  { icon: MapPin, title: "Real-Time Tracking", desc: "Track your pickup agent live on map", status: "ready" },
  { icon: TrendingUp, title: "Live Scrap Rates", desc: "Daily updated market rates", status: "ready" },
  { icon: Banknote, title: "Instant Payments", desc: "UPI transfer in 60 seconds", status: "ready" },
  { icon: Shield, title: "Verified Buyers", desc: "Only certified scrap buyers", status: "ready" },
  { icon: Clock, title: "Easy Scheduling", desc: "Book pickup in 30 seconds", status: "ready" },
  { icon: Bell, title: "Rate Alerts", desc: "Get notified on rate changes", status: "coming" },
];

const roadmap = [
  { q: "Q2 2026", event: "App Beta Launch", desc: "Android beta available for waitlist users", status: "active" },
  { q: "Q3 2026", event: "Public Launch", desc: "Full release on Google Play & App Store", status: "upcoming" },
  { q: "Q4 2026", event: "AI Scrap Valuation", desc: "Photo-based scrap estimation with AI", status: "upcoming" },
  { q: "2027", event: "IoT Integration", desc: "Smart bins & automated collection scheduling", status: "upcoming" },
];

export function AppPageContent() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<WaitlistData>({ resolver: zodResolver(waitlistSchema) });

  const onSubmit = async (data: WaitlistData) => {
    try {
      await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setSubmitted(true);
      reset();
      toast.success("You're on the waitlist! 🎉");
    } catch {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div ref={ref} className="pt-16">
      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden grid-bg"
        style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(0,60,158,0.2) 0%, transparent 60%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 badge-glow" style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.25)", color: "#2CEB88" }}>
                <span className="w-2 h-2 rounded-full bg-accent-glow animate-pulse" />
                🚀 Launching Q2 2026
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: "var(--font-syne)" }}>
                Scrap Management<br />
                <span className="gradient-text">In Your Pocket</span>
              </h1>
              <p className="text-lg text-text-muted leading-relaxed mb-8 max-w-lg">
                The SCRAPYARD app transforms how India manages scrap. Book pickups, track collections, get live rates, and receive payments — all from your phone.
              </p>
              {/* Waitlist form */}
              {!submitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="glass-card rounded-2xl p-6">
                  <h3 className="text-base font-bold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                    🎁 Join Waitlist — Get ₹500 Bonus!
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <input {...register("name")} placeholder="Your name" className="form-input text-sm" />
                      {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <input {...register("phone")} placeholder="Phone number" className="form-input text-sm" />
                      {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <input {...register("email")} type="email" placeholder="Email address" className="form-input text-sm" />
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <input {...register("city")} placeholder="Your city" className="form-input text-sm" />
                    </div>
                    <div className="sm:col-span-2">
                      <select {...register("userType")} className="form-input text-sm">
                        <option value="">I am a... *</option>
                        <option>Household User</option>
                        <option>Business/Office</option>
                        <option>Factory/Industrial</option>
                        <option>Scrap Dealer</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3 text-sm">
                    <Smartphone className="w-4 h-4" />
                    {isSubmitting ? "Joining..." : "Join Waitlist & Get ₹500 Bonus"}
                  </button>
                  <p className="text-xs text-text-muted mt-2 text-center">First 10,000 users only. No spam.</p>
                </form>
              ) : (
                <div className="glass-card rounded-2xl p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-accent-glow mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">You&apos;re on the list! 🎉</h3>
                  <p className="text-sm text-text-muted">We&apos;ll notify you as soon as the app launches. Your ₹500 bonus is reserved!</p>
                </div>
              )}
            </motion.div>

            {/* Phone visual */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-[3rem] blur-3xl" style={{ background: "rgba(44,235,136,0.15)" }} />
                <div className="relative w-72 rounded-[2.5rem] overflow-hidden shadow-2xl" style={{ background: "linear-gradient(135deg, #0f1e2e, #081018)", border: "2px solid rgba(44,235,136,0.25)" }}>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden">
                        <Image
                          src="/scrapyard-logo-w-bg.png"
                          alt="SCRAPYARD"
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(44,235,136,0.15)", color: "#2CEB88" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-glow animate-pulse" />
                        Coming Soon
                      </div>
                    </div>
                    <div className="space-y-2">
                      {features.slice(0, 4).map((f) => (
                        <div key={f.title} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                          <f.icon className="w-4 h-4 text-accent-glow flex-shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-white">{f.title}</p>
                            <p className="text-xs text-text-muted">{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 p-2 rounded-xl text-center" style={{ background: "rgba(44,235,136,0.1)", border: "1px solid rgba(44,235,136,0.2)" }}>
                        <div className="text-lg mb-0.5">▶</div>
                        <p className="text-xs text-text-muted">Google Play</p>
                      </div>
                      <div className="flex-1 p-2 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <div className="text-lg mb-0.5"></div>
                        <p className="text-xs text-text-muted">App Store</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                      <span className="text-xs text-text-muted ml-1">4.9 (1.2k)</span>
                    </div>
                  </div>
                </div>
                <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -right-12 top-16 glass-card rounded-xl px-3 py-2">
                  <p className="text-xs text-text-muted">Waitlist</p>
                  <p className="text-sm font-bold text-accent-glow">8,432 Joined</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white text-center mb-10" style={{ fontFamily: "var(--font-syne)" }}>
            App <span className="gradient-text">Features</span>
          </h2>
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
                      {f.status === "coming" && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-400">Soon</span>
                      )}
                    </div>
                    <p className="text-xs text-text-muted">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Roadmap */}
          <h2 className="text-3xl font-black text-white text-center mt-16 mb-10" style={{ fontFamily: "var(--font-syne)" }}>
            App <span className="gradient-text">Roadmap</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmap.map((r, i) => (
              <motion.div key={r.q} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
                <div className={`rounded-xl p-5 ${r.status === "active" ? "glow-border-green" : ""}`} style={{ background: r.status === "active" ? "rgba(44,235,136,0.08)" : "rgba(255,255,255,0.03)", border: r.status === "active" ? "1px solid rgba(44,235,136,0.25)" : "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-xs font-mono font-bold" style={{ color: r.status === "active" ? "#2CEB88" : "#4a6070" }}>{r.q}</span>
                  <h4 className="text-sm font-bold text-white mt-2 mb-1">{r.event}</h4>
                  <p className="text-xs text-text-muted">{r.desc}</p>
                  {r.status === "active" && (
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-accent-glow/15 text-accent-glow">In Progress</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="btn-primary text-sm px-8 py-3.5">
              <Smartphone className="w-4 h-4" />
              Join App Waitlist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

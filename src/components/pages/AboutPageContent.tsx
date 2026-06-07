"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Target, Eye, Leaf, Users, Award, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const team = [
  { name: "Aas Mohmmad Khan", role: "Founder", initials: "AK", email: "aasmohmmadkhan@scrapyard.co.in", description: "Visionary behind SCRAPYARD. Building India's smartest digital scrap ecosystem from the ground up." },
  { name: "Sahil Khan", role: "Director & CEO", initials: "SK", email: null, description: "Leading SCRAPYARD's growth strategy, operations, and business development across India." },
  { name: "Nizamuddin Khan", role: "Director", initials: "NK", email: null, description: "Overseeing business strategy, partnerships, and expansion into new markets." },
  { name: "Virender Sitoria", role: "COO", initials: "VS", email: null, description: "Driving operational excellence, logistics, and on-ground pickup execution across all cities." },
  { name: "Tushant Verma", role: "CTO", initials: "TV", email: "tushantverma@scrapyard.co.in", description: "Architecting SCRAPYARD's technology platform, digital infrastructure, and product innovation." },
];

const milestones = [
  { year: "2024", event: "SCRAPYARD Founded", desc: "Incorporated with a vision to transform India's scrap industry" },
  { year: "2024", event: "Pilot Launch", desc: "Launched in Delhi NCR with 50 residential & commercial clients" },
  { year: "2024", event: "Series A Fundraise", desc: "Raised seed funding to expand operations" },
  { year: "2025", event: "50 Cities", desc: "Expanded to 50+ cities with 200+ verified collection partners" },
  { year: "2025", event: "1000+ Businesses", desc: "Reached 1,000+ business clients across India" },
  { year: "2025", event: "App Launch", desc: "SCRAPYARD app launched on Google Play - 10,000+ downloads" },
];

export function AboutPageContent() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <div ref={ref} className="pt-16">
      {/* Hero */}
      <section
        className="relative py-20 md:py-28 overflow-hidden grid-bg"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,60,158,0.15) 0%, transparent 60%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}>
              Our Story
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6" style={{ fontFamily: "var(--font-syne)" }}>
              Transforming India&apos;s{" "}
              <span className="gradient-text">Scrap Economy</span>
            </h1>
            <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
              India generates 62 million tonnes of waste annually. We built SCRAPYARD to turn that challenge into an opportunity - for citizens, businesses, and the planet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Target, title: "Our Mission", color: "#2CEB88", text: "To make scrap selling effortless, transparent, and rewarding for every Indian - from households to factories - while building a sustainable recycling ecosystem that benefits our planet." },
              { icon: Eye, title: "Our Vision", color: "#003C9E", text: "To become India's most trusted technology-driven waste-to-value platform, processing 1 million tonnes of recyclable material annually by 2030 across every major Indian city." },
              { icon: Leaf, title: "Sustainability", color: "#27AE60", text: "Every action we take is guided by our commitment to a greener India. We work with CPCB-certified recyclers, follow e-waste regulations, and track our environmental impact with full transparency." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 }}>
                <div className="glass-card rounded-2xl p-7 h-full" style={{ borderColor: `${item.color}20` }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-lg font-black text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>{item.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* The problem we solve */}
          <div className="glass-card rounded-3xl p-8 md:p-12 mb-16">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-black text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>
                  The Problem We <span className="gradient-text">Solve</span>
                </h2>
                <p className="text-text-muted leading-relaxed mb-4">
                  The traditional scrap industry in India is riddled with inefficiency. Local kabadiwalas offer below-market rates, use inaccurate weighing methods, and delay payments. Businesses have no reliable partner for regular waste management.
                </p>
                <p className="text-text-muted leading-relaxed mb-6">
                  SCRAPYARD eliminates all these pain points with a technology-first approach: digital weighing, live market rates, instant UPI payments, and a verified network of buyers who compete for your scrap.
                </p>
                <div className="space-y-2">
                  {["Transparent digital weighing", "Live market-based pricing", "Instant payment guarantee", "Professional, verified team", "Legal documentation & GST"].map((point) => (
                    <div key={point} className="flex items-center gap-2 text-sm text-silver">
                      <CheckCircle className="w-4 h-4 text-accent-glow flex-shrink-0" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Market Size", value: "₹5T+", desc: "India scrap industry", color: "#2CEB88" },
                  { label: "Annual Waste", value: "62M MT", desc: "Generated in India", color: "#003C9E" },
                  { label: "Recycling Rate", value: "~30%", desc: "Current India rate", color: "#FF6B35" },
                  { label: "Our Target", value: "95%+", desc: "Proper recycling goal", color: "#27AE60" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl text-center" style={{ background: `${stat.color}10`, border: `1px solid ${stat.color}25` }}>
                    <p className="text-2xl font-black" style={{ fontFamily: "var(--font-syne)", color: stat.color }}>{stat.value}</p>
                    <p className="text-xs font-bold text-white mt-1">{stat.label}</p>
                    <p className="text-xs text-text-muted">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-black text-white mb-3 text-center" style={{ fontFamily: "var(--font-syne)" }}>
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <p className="text-text-muted text-center mb-10">The people building India&apos;s smartest scrap platform.</p>
            {/* First row - Founder centred */}
            <div className="flex justify-center mb-5">
              {team.slice(0, 1).map((member, i) => (
                <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="w-full max-w-xs">
                  <div className="glass-card rounded-2xl p-6 text-center hover:glow-border-green transition-all duration-300 border border-accent-glow/20">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-black text-accent-glow mx-auto mb-4"
                      style={{ background: "linear-gradient(135deg, rgba(44,235,136,0.2), rgba(0,60,158,0.2))", fontFamily: "var(--font-syne)" }}>
                      {member.initials}
                    </div>
                    <h4 className="text-lg font-black text-white mb-1" style={{ fontFamily: "var(--font-syne)" }}>{member.name}</h4>
                    <p className="text-sm text-accent-glow font-bold mb-2">{member.role}</p>
                    <p className="text-xs text-text-muted leading-relaxed mb-3">{member.description}</p>
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-xs text-accent-glow/70 hover:text-accent-glow transition-colors font-mono">
                        {member.email}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Remaining 4 members */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {team.slice(1).map((member, i) => (
                <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 + i * 0.1 }}>
                  <div className="glass-card rounded-2xl p-6 text-center hover:glow-border-green transition-all duration-300">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-black text-accent-glow mx-auto mb-4"
                      style={{ background: "linear-gradient(135deg, rgba(44,235,136,0.15), rgba(0,60,158,0.15))", fontFamily: "var(--font-syne)" }}>
                      {member.initials}
                    </div>
                    <h4 className="text-base font-bold text-white mb-1" style={{ fontFamily: "var(--font-syne)" }}>{member.name}</h4>
                    <p className="text-xs text-accent-glow font-semibold mb-2">{member.role}</p>
                    <p className="text-xs text-text-muted leading-relaxed mb-2">{member.description}</p>
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-xs text-accent-glow/70 hover:text-accent-glow transition-colors font-mono break-all">
                        {member.email}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-black text-white mb-10 text-center" style={{ fontFamily: "var(--font-syne)" }}>
              Our <span className="gradient-text">Journey</span>
            </h2>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-dark-border" />
              <div className="space-y-6">
                {milestones.map((m, i) => (
                  <div key={i} className={`flex gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="md:w-1/2" />
                    <div className="relative flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                      <div className="w-8 h-8 rounded-full bg-accent-glow flex items-center justify-center text-background font-bold text-xs ml-0 md:ml-0">
                        {i + 1}
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.1 }}
                      className="md:w-1/2 pl-10 md:pl-0 md:pr-8"
                    >
                      <div className="glass-card rounded-xl p-4">
                        <span className="text-xs font-mono text-accent-glow">{m.year}</span>
                        <h4 className="text-sm font-bold text-white mt-1">{m.event}</h4>
                        <p className="text-xs text-text-muted mt-1">{m.desc}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Join the <span className="gradient-text">Scrapyard Revolution</span>
            </h3>
            <p className="text-text-muted mb-6">Be part of India&apos;s sustainable future. Schedule your first pickup today.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="btn-primary text-sm px-6 py-3">Schedule Pickup <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/careers" className="btn-secondary text-sm px-6 py-3">Join Our Team</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

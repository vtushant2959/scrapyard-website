"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Clock, ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";

const openings = [
  { title: "Senior React Developer", dept: "Technology", type: "Full-time", location: "Remote / Delhi", exp: "3-5 years" },
  { title: "Backend Engineer (Node.js)", dept: "Technology", type: "Full-time", location: "Remote", exp: "2-4 years" },
  { title: "City Operations Manager", dept: "Operations", type: "Full-time", location: "Mumbai / Delhi", exp: "3+ years" },
  { title: "Enterprise Sales Manager", dept: "Sales", type: "Full-time", location: "Bangalore / Mumbai", exp: "4+ years" },
  { title: "Logistics Coordinator", dept: "Logistics", type: "Full-time", location: "Delhi NCR", exp: "1-3 years" },
  { title: "Growth Marketing Manager", dept: "Marketing", type: "Full-time", location: "Remote / Delhi", exp: "3+ years" },
  { title: "Data Analyst", dept: "Analytics", type: "Full-time", location: "Remote", exp: "2+ years" },
  { title: "Collection Team Lead", dept: "Field Operations", type: "Full-time", location: "Multiple Cities", exp: "1+ years" },
];

const values = [
  { emoji: "🚀", title: "Move Fast", desc: "We ship, learn, and iterate rapidly" },
  { emoji: "🤝", title: "Trust First", desc: "Transparency in everything we do" },
  { emoji: "🌱", title: "Grow Together", desc: "Your growth is our growth" },
  { emoji: "🌍", title: "Impact Driven", desc: "Real work with real environmental impact" },
];

export function CareersPageContent() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <div ref={ref} className="pt-16">
      <section className="py-20 relative grid-bg" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(44,235,136,0.08) 0%, transparent 55%)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}>
              🚀 We&apos;re Hiring!
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Build the Future of <span className="gradient-text">Sustainable India</span>
            </h1>
            <p className="text-text-muted text-lg">Join a mission-driven team changing how India manages waste. Competitive salaries, equity, and real impact.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Values */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
                <div className="glass-card rounded-xl p-5 text-center">
                  <div className="text-3xl mb-2">{v.emoji}</div>
                  <h4 className="text-sm font-bold text-white mb-1">{v.title}</h4>
                  <p className="text-xs text-text-muted">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Job listings */}
          <h2 className="text-2xl font-black text-white mb-6" style={{ fontFamily: "var(--font-syne)" }}>
            Open <span className="gradient-text">Positions</span>
          </h2>
          <div className="space-y-3">
            {openings.map((job, i) => (
              <motion.div key={job.title} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.06 }}>
                <div className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:glow-border-green transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-accent-glow/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-accent-glow" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white group-hover:text-accent-glow transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-blue/20 text-blue-300">{job.dept}</span>
                      <span className="text-xs text-text-muted flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="text-xs text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                      <span className="text-xs text-text-muted">{job.exp}</span>
                    </div>
                  </div>
                  <Link href="/contact" className="btn-secondary text-xs px-4 py-2 flex-shrink-0 flex items-center gap-1">
                    Apply Now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 glass-card rounded-2xl p-8 text-center">
            <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>Don&apos;t See Your Role?</h3>
            <p className="text-text-muted text-sm mb-4">Send us your resume — we&apos;re always looking for exceptional talent.</p>
            <a href="mailto:info@scrapyard.co.in" className="btn-primary text-sm px-6 py-3 inline-flex">
              Send Your Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

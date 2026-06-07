"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Truck, Download, Zap, Shield, ArrowRight, Play } from "lucide-react";

const floatingElements = [
  { emoji: "⚙️", x: "10%", y: "20%", delay: 0, size: "text-3xl" },
  { emoji: "♻️", x: "85%", y: "15%", delay: 1, size: "text-4xl" },
  { emoji: "🏗️", x: "5%", y: "70%", delay: 0.5, size: "text-2xl" },
  { emoji: "🔩", x: "90%", y: "65%", delay: 1.5, size: "text-2xl" },
  { emoji: "⚡", x: "75%", y: "40%", delay: 0.8, size: "text-xl" },
  { emoji: "🏭", x: "15%", y: "45%", delay: 2, size: "text-xl" },
];

const words = ["Metal", "Plastic", "Paper", "E-Waste", "Industrial"];

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const [wordIndex, setWordIndex] = useState(0);
  const [displayWord, setDisplayWord] = useState(words[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(words[0].length);

  // Typewriter effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      const word = words[wordIndex];
      if (!isDeleting) {
        if (charIndex < word.length) {
          setDisplayWord(word.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (charIndex > 0) {
          setDisplayWord(word.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    }, isDeleting ? 60 : 120);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
      style={{ paddingTop: "64px" }}
    >
      {/* Background layers */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,60,158,0.2) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(44,235,136,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full opacity-20"
            style={{ top: `${15 + i * 14}%`, background: "linear-gradient(90deg, transparent, rgba(44,235,136,0.3), transparent)" }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear", delay: i * 1.2 }}
          />
        ))}
      </div>

      {/* Floating elements */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute pointer-events-none select-none ${el.size} hidden lg:block`}
          style={{ left: el.x, top: el.y, filter: "drop-shadow(0 0 8px rgba(44,235,136,0.4))" }}
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: el.delay }}
        >
          {el.emoji}
        </motion.div>
      ))}

      {/* Particle dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              opacity: Math.random() * 0.4 + 0.1,
            }}
            animate={{ opacity: [0.1, 0.6, 0.1], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 badge-glow"
              style={{
                background: "rgba(44,235,136,0.08)",
                border: "1px solid rgba(44,235,136,0.25)",
                color: "#2CEB88",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-glow animate-pulse" />
              📱 SCRAPYARD App is Live - Download Now
              <ArrowRight className="w-3 h-3" />
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] mb-6"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                <span className="text-white">India&apos;s</span>
                <br />
                <span className="gradient-text">Smartest</span>
                <br />
                <span className="text-white">Scrap</span>{" "}
                <span className="text-silver/60">Market</span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="text-sm font-mono text-text-muted">Selling</span>
              <span className="text-sm font-mono text-accent-glow font-bold">
                {displayWord}
                <span className="cursor-blink">|</span>
              </span>
              <span className="text-sm font-mono text-text-muted">at Best Rates</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg text-text-muted leading-relaxed mb-8 max-w-lg"
            >
              Transform waste into value with India&apos;s next-generation scrap buying and recycling platform. Instant pickup, transparent pricing, verified buyers.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {[
                { icon: Zap, text: "Same Day Pickup" },
                { icon: Shield, text: "Verified Buyers" },
                { icon: ArrowRight, text: "Instant Payment" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    background: "rgba(13,24,37,0.8)",
                    border: "1px solid rgba(44,235,136,0.12)",
                    color: "#C8CDD5",
                  }}
                >
                  <Icon className="w-3.5 h-3.5 text-accent-glow" />
                  {text}
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/contact" className="btn-primary text-sm px-6 py-3.5">
                <Truck className="w-4 h-4" />
                Get Scrap Pickup
              </Link>
              <a href="https://play.google.com/store/apps/details?id=com.scrapyardindia.app" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm px-6 py-3.5 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download App
              </a>
              <Link
                href="#how-it-works"
                className="flex items-center gap-2 px-4 py-3.5 text-sm text-text-muted hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                  <Play className="w-3 h-3 ml-0.5" />
                </div>
                How it works
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-6 mt-8 pt-8 border-t border-dark-border"
            >
              <div className="text-center">
                <p className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>1000+</p>
                <p className="text-xs text-text-muted">Businesses</p>
              </div>
              <div className="w-px h-10 bg-dark-border" />
              <div className="text-center">
                <p className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>50+</p>
                <p className="text-xs text-text-muted">Cities</p>
              </div>
              <div className="w-px h-10 bg-dark-border" />
              <div className="text-center">
                <p className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>5000+</p>
                <p className="text-xs text-text-muted">Collections</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Main card */}
              <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: "radial-gradient(ellipse at top right, rgba(44,235,136,0.3), transparent 70%)" }}
                />

                {/* Recycling animation */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="text-8xl"
                    style={{ filter: "drop-shadow(0 0 20px rgba(44,235,136,0.6))" }}
                  >
                    ♻️
                  </motion.div>
                </div>

                {/* Truck */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{ x: [-8, 8, -8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-6xl"
                    style={{ filter: "drop-shadow(0 0 12px rgba(0,60,158,0.6))" }}
                  >
                    🚛
                  </motion.div>
                </div>

                {/* Live rate indicator */}
                <div className="glass-card-blue rounded-2xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-text-muted font-mono">LIVE RATES</span>
                    <span className="text-xs font-mono text-accent-glow flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-accent-glow rounded-full animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  {[
                    { name: "Iron Scrap", rate: "₹28/kg", change: "+₹2", up: true },
                    { name: "Copper Wire", rate: "₹480/kg", change: "-₹5", up: false },
                    { name: "Aluminium", rate: "₹110/kg", change: "+₹3", up: true },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                      <span className="text-xs text-silver">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{item.rate}</span>
                        <span className={`text-xs font-mono ${item.up ? "text-accent-glow" : "text-red-400"}`}>
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pickup CTA card */}
                <div
                  className="rounded-xl p-4 flex items-center justify-between"
                  style={{ background: "linear-gradient(135deg, rgba(44,235,136,0.15), rgba(0,60,158,0.15))" }}
                >
                  <div>
                    <p className="text-xs text-text-muted">Today&apos;s Pickups</p>
                    <p className="text-sm font-bold text-white">48 Scheduled</p>
                  </div>
                  <Link href="/contact" className="btn-primary text-xs px-4 py-2">
                    Book Yours
                  </Link>
                </div>
              </div>

              {/* Floating stats */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -left-8 top-16 glass-card rounded-xl p-3 shadow-2xl"
              >
                <p className="text-xs text-text-muted">Avg Payout</p>
                <p className="text-xl font-black text-accent-glow">₹2,400</p>
                <p className="text-xs text-text-muted">per collection</p>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -right-4 bottom-20 glass-card rounded-xl p-3 shadow-2xl"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-accent-glow animate-pulse" />
                  <span className="text-xs text-text-muted">Active Now</span>
                </div>
                <p className="text-xl font-black text-white">238</p>
                <p className="text-xs text-text-muted">Pickups Today</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 rounded-full border border-accent-glow/30 flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2 rounded-full bg-accent-glow"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

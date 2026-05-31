"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 600);
          return 100;
        }
        return prev + Math.random() * 12 + 4;
      });
    }, 80);

    const phaseTimer = setInterval(() => {
      setPhase((p) => Math.min(p + 1, 3));
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(phaseTimer);
    };
  }, []);

  const phases = ["Connecting...", "Loading Rates...", "Almost Ready..."];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: "#081018" }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(44,235,136,0.08) 0%, transparent 65%)",
            }}
          />

          {/* Orbiting ring */}
          <div className="absolute">
            <motion.div
              className="w-64 h-64 rounded-full border border-accent-glow/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="absolute">
            <motion.div
              className="w-44 h-44 rounded-full border border-primary-green/15"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ borderStyle: "dashed" }}
            />
          </div>

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-8 px-8">
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", damping: 20 }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden relative">
                {/* Pulsing glow overlay */}
                <motion.div
                  className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(44,235,136,0.15), transparent)",
                  }}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Image
                  src="/scrapyard-logo-w-bg.png"
                  alt="SCRAPYARD"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              {/* Glow dot */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-glow"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ boxShadow: "0 0 10px rgba(44,235,136,1)" }}
              />
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <h1
                className="text-4xl font-black tracking-wider text-white"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                SCRAP<span className="text-accent-glow">YARD</span>
              </h1>
              <p className="text-xs text-text-muted mt-1 tracking-widest uppercase">
                India&apos;s Smartest Scrap Marketplace
              </p>
            </motion.div>

            {/* Recycle animation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="text-3xl"
              style={{ filter: "drop-shadow(0 0 8px rgba(44,235,136,0.6))" }}
            >
              ♻️
            </motion.div>

            {/* Progress bar */}
            <div className="w-full max-w-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-text-muted font-mono">
                  {phases[phase] || "Ready"}
                </span>
                <span className="text-xs font-mono text-accent-glow">
                  {Math.min(Math.round(progress), 100)}%
                </span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full loader-progress"
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 text-xs font-mono text-accent-glow/30">
            v2.0.0
          </div>
          <div className="absolute bottom-8 right-8 text-xs font-mono text-text-muted/30">
            scrapyard.co.in
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

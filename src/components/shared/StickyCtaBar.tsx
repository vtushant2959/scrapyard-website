"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Truck, X } from "lucide-react";

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 600 && !dismissed) setVisible(true);
      else if (window.scrollY <= 600) setVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="glass-card border-t border-accent-glow/20 px-4 py-3 flex items-center gap-3">
            <div className="flex-1">
              <p className="text-xs text-text-muted">Ready to sell scrap?</p>
              <p className="text-sm font-bold text-white">Schedule Free Pickup</p>
            </div>
            <a
              href="tel:+918505863220"
              className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              Book Now
            </a>
            <button
              onClick={() => { setDismissed(true); setVisible(false); }}
              className="p-1.5 text-text-muted hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

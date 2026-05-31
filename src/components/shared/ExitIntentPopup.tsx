"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let triggered = false;
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered && !sessionStorage.getItem("exit-popup")) {
        triggered = true;
        setShow(true);
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", onMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("exit-popup", "1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    sessionStorage.setItem("exit-popup", "1");
    setTimeout(() => setShow(false), 2000);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(8,16,24,0.85)", backdropFilter: "blur(8px)" }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="glass-card rounded-2xl p-8 max-w-md w-full relative glow-border-green"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="w-14 h-14 rounded-2xl bg-accent-glow/10 flex items-center justify-center mb-4">
                  <Gift className="w-7 h-7 text-accent-glow" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                  Get ₹500 Bonus on First Pickup!
                </h3>
                <p className="text-text-muted text-sm mb-6">
                  Join 5000+ happy customers. Subscribe to get exclusive scrap rate alerts and a special bonus on your first pickup.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="form-input"
                    required
                  />
                  <button type="submit" className="btn-primary w-full justify-center py-3">
                    Claim My Bonus →
                  </button>
                </form>
                <p className="text-xs text-text-muted mt-3 text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-xl font-bold text-white mb-2">You&apos;re In!</h3>
                <p className="text-text-muted text-sm">Check your email for your ₹500 bonus code.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

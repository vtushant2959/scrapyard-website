"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const phone = "918505863220";
  const message = "Hi SCRAPYARD! I'd like to schedule a scrap pickup.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="glass-card rounded-2xl p-4 w-64 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">SCRAPYARD Support</p>
                <p className="text-xs text-accent-glow flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-accent-glow rounded-full inline-block animate-pulse" />
                  Online Now
                </p>
              </div>
            </div>
            <p className="text-xs text-text-muted mb-3">
              Hi there! How can we help you today? Schedule a pickup or get live scrap rates.
            </p>
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
            >
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative"
        style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
        aria-label="WhatsApp Chat"
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "rgba(37,211,102,0.3)" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

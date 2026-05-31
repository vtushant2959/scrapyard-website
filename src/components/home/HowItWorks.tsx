"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Truck, Scale, Banknote, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Calendar,
    title: "Schedule Pickup",
    description:
      "Book a free doorstep pickup in under 60 seconds via app, website, or WhatsApp. Choose your preferred slot.",
    color: "#2CEB88",
    badge: "Free of Cost",
  },
  {
    step: "02",
    icon: Truck,
    title: "Collection Team Arrives",
    description:
      "Our uniformed, background-verified team arrives at your location with all necessary equipment.",
    color: "#6F9E62",
    badge: "Same Day",
  },
  {
    step: "03",
    icon: Scale,
    title: "Instant Weight Verification",
    description:
      "Transparent digital weighing at your doorstep. You see the weight, we show the calculation — no surprises.",
    color: "#003C9E",
    badge: "Transparent",
  },
  {
    step: "04",
    icon: Banknote,
    title: "Instant Payment",
    description:
      "Get paid instantly via UPI, bank transfer, or cash. No delays, no excuses — payment in 60 seconds.",
    color: "#2CEB88",
    badge: "Instant UPI",
  },
];

export function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(44,235,136,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}>
            Simple Process
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            From scheduling to payment in 4 simple steps. Built for maximum simplicity.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px z-0"
            style={{ background: "linear-gradient(90deg, transparent, rgba(44,235,136,0.2) 20%, rgba(44,235,136,0.2) 80%, transparent)" }} />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className="glass-card rounded-2xl p-6 relative group hover:glow-border-green transition-all duration-300">
                  {/* Step number */}
                  <div
                    className="absolute -top-4 left-6 text-xs font-mono font-bold px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(8,16,24,0.9)",
                      border: `1px solid ${step.color}40`,
                      color: step.color,
                    }}
                  >
                    STEP {step.step}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mt-3"
                    style={{
                      background: `${step.color}15`,
                      border: `1px solid ${step.color}30`,
                    }}
                  >
                    <step.icon className="w-7 h-7" style={{ color: step.color }} />
                  </div>

                  {/* Badge */}
                  <div
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mb-3"
                    style={{ background: `${step.color}12`, color: step.color }}
                  >
                    {step.badge}
                  </div>

                  <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">{step.description}</p>

                  {/* Arrow connector */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-16 w-6 h-6 rounded-full bg-background border border-dark-border items-center justify-center z-20">
                      <ArrowRight className="w-3 h-3 text-accent-glow" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <a href="/contact" className="btn-primary text-sm px-8 py-4 inline-flex">
            <Truck className="w-4 h-4" />
            Schedule My Free Pickup Now
          </a>
          <p className="text-xs text-text-muted mt-3">
            No registration required. Book in under 60 seconds.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

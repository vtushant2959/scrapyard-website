"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Plant Manager",
    company: "Steel Fab Industries, Faridabad",
    avatar: "RS",
    rating: 5,
    text: "SCRAPYARD transformed how we handle factory scrap. We used to wait weeks for buyers, now we get same-day collection and instant payment. The rate transparency is excellent — no more haggling.",
    amount: "₹2.4 Lakh",
    period: "monthly",
    color: "#2CEB88",
  },
  {
    name: "Priya Agarwal",
    role: "Admin Manager",
    company: "TechBridge Solutions, Noida",
    avatar: "PA",
    rating: 5,
    text: "We had 200+ old laptops and office furniture to dispose. SCRAPYARD sent a professional team, gave us the best rate in the market, and transferred payment via UPI within the hour. Absolutely seamless.",
    amount: "₹85,000",
    period: "one-time",
    color: "#6F9E62",
  },
  {
    name: "Mohammed Irfan",
    role: "Contractor",
    company: "Irfan Constructions, Delhi",
    avatar: "MI",
    rating: 5,
    text: "For our demolition projects, SCRAPYARD is a game-changer. Their team handles all demolition scrap professionally, and the rates for iron and steel are always market-best. Highly reliable.",
    amount: "₹1.8 Lakh",
    period: "per project",
    color: "#003C9E",
  },
  {
    name: "Sunita Reddy",
    role: "Housewife",
    company: "Hyderabad",
    avatar: "SR",
    rating: 5,
    text: "I was skeptical at first, but SCRAPYARD is genuinely trustworthy. The weighing was done in front of me on a digital scale, the prices were better than local kabadiwala, and money came to my account instantly!",
    amount: "₹3,200",
    period: "pickup",
    color: "#2CEB88",
  },
  {
    name: "Amit Verma",
    role: "Warehouse Director",
    company: "LogiPrime Warehousing, Mumbai",
    avatar: "AV",
    rating: 5,
    text: "Managing warehouse clearance used to be a headache. With SCRAPYARD's enterprise solution, we now have scheduled monthly clearances with detailed reports. Perfect for our compliance needs.",
    amount: "₹5.2 Lakh",
    period: "quarterly",
    color: "#6F9E62",
  },
  {
    name: "Dr. Kavitha Nair",
    role: "Hospital Administrator",
    company: "Healwell Hospital, Bangalore",
    avatar: "KN",
    rating: 5,
    text: "Medical equipment disposal requires certified processes. SCRAPYARD handles our e-waste with proper documentation and environmentally compliant recycling. Very professional team.",
    amount: "₹45,000",
    period: "monthly",
    color: "#003C9E",
  },
];

export function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const visible = [
    testimonials[current % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(44,235,136,0.06) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}
          >
            ⭐ Customer Stories
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Real customers, real results. Here&apos;s what our community says about SCRAPYARD.
          </p>
        </motion.div>

        {/* Desktop: 3 cards */}
        <div className="hidden lg:grid grid-cols-3 gap-5 mb-8">
          {visible.map((testimonial, i) => (
            <motion.div
              key={`${testimonial.name}-${current}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group"
            >
              <div
                className="absolute top-0 right-0 w-20 h-20 opacity-10"
                style={{ background: `radial-gradient(circle, ${testimonial.color}, transparent)` }}
              />
              <Quote
                className="w-8 h-8 mb-4 opacity-30"
                style={{ color: testimonial.color }}
              />
              <p className="text-sm text-silver leading-relaxed mb-5 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-dark-border">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: `${testimonial.color}20`, color: testimonial.color }}
                >
                  {testimonial.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{testimonial.name}</p>
                  <p className="text-xs text-text-muted truncate">{testimonial.role} · {testimonial.company}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold" style={{ color: testimonial.color }}>{testimonial.amount}</p>
                  <p className="text-xs text-text-muted">{testimonial.period}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: single card */}
        <div className="lg:hidden mb-6">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-2xl p-6"
          >
            <Quote className="w-8 h-8 mb-4 text-accent-glow opacity-40" />
            <p className="text-sm text-silver leading-relaxed mb-4 italic">
              &ldquo;{testimonials[current].text}&rdquo;
            </p>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(testimonials[current].rating)].map((_, j) => (
                <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-dark-border">
              <div className="w-10 h-10 rounded-full bg-accent-glow/15 flex items-center justify-center text-xs font-bold text-accent-glow">
                {testimonials[current].avatar}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{testimonials[current].name}</p>
                <p className="text-xs text-text-muted">{testimonials[current].role}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-dark-border flex items-center justify-center text-silver hover:text-accent-glow hover:border-accent-glow/30 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "w-6 h-2 bg-accent-glow" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-dark-border flex items-center justify-center text-silver hover:text-accent-glow hover:border-accent-glow/30 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

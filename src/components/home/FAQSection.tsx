"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What is SCRAPYARD and how does it work?",
    a: "SCRAPYARD is India's smartest digital scrap marketplace. You schedule a free pickup, our verified team arrives at your location, weighs your scrap on a digital scale, and transfers payment instantly via UPI or bank transfer. No waiting, no bargaining.",
  },
  {
    q: "What types of scrap does SCRAPYARD collect?",
    a: "We collect all types of scrap including metal (iron, copper, aluminium, brass), plastic (PET, HDPE, PP, PVC), paper (newspaper, cardboard, books), e-waste (laptops, mobiles, PCBs), furniture, industrial waste, construction debris, cables, and vehicle scrap.",
  },
  {
    q: "How is the scrap weighed and priced?",
    a: "We use calibrated digital weighing scales at your doorstep. The weight is shown on a display both the customer and our team can see. Pricing follows live market rates updated daily. You receive a digital receipt with complete breakdown.",
  },
  {
    q: "When will I receive payment?",
    a: "Payment is transferred within 60 seconds of weight verification via UPI. Bank transfers are completed within 4 hours. Cash payment is also available if preferred.",
  },
  {
    q: "Is there a minimum weight requirement for pickup?",
    a: "For residential pickups, there is no minimum requirement. For commercial/industrial pickups, we recommend a minimum of 50 kg for optimal efficiency, though we accommodate smaller quantities as well.",
  },
  {
    q: "Are SCRAPYARD's buyers verified?",
    a: "Yes, all buyers in our network undergo strict background verification, GST compliance checks, pollution control board certifications, and quality audits. We maintain a 100% verified buyer network.",
  },
  {
    q: "How far in advance should I schedule a pickup?",
    a: "You can schedule same-day pickups in most cities (before 2 PM). For remote locations, 24 hours' notice ensures availability. Enterprise clients can set up recurring weekly or monthly schedules.",
  },
  {
    q: "Does SCRAPYARD serve businesses and factories?",
    a: "Absolutely. We have dedicated enterprise solutions for factories, warehouses, offices, hotels, construction companies, and manufacturing units. We provide regular collection schedules, GST invoices, and detailed recycling reports.",
  },
  {
    q: "What cities does SCRAPYARD operate in?",
    a: "SCRAPYARD currently operates in 50+ cities including Delhi, Mumbai, Faridabad, Noida, Gurgaon, Ghaziabad, Bangalore, Hyderabad, Chennai, and Pune. We are rapidly expanding to new cities.",
  },
  {
    q: "Is SCRAPYARD's pricing transparent?",
    a: "100% transparent. Our live scrap rate page shows current market rates updated daily. We show the exact weight, rate per kg, and total amount before completing any transaction. No hidden fees or deductions.",
  },
  {
    q: "Can I track my pickup in real time?",
    a: "Yes, through our mobile app (launching soon), you can track your pickup agent's location, ETA, and get live notifications. Via WhatsApp, we send you updates at every stage.",
  },
  {
    q: "How does SCRAPYARD handle e-waste responsibly?",
    a: "E-waste is handled by CPCB (Central Pollution Control Board) authorized recyclers only. We provide certificate of responsible recycling and ensure no e-waste reaches landfills. Businesses receive recycling certificates for compliance.",
  },
  {
    q: "What documents will I receive after pickup?",
    a: "You receive a digital receipt with your name, date, scrap type, weight, rate, and payment details via WhatsApp and email. Business clients receive GST-compliant invoices and recycling certificates.",
  },
  {
    q: "Does SCRAPYARD help with office/warehouse clearance?",
    a: "Yes, we specialize in complete office and warehouse clearance including furniture, electronics, files, metal racks, and more. Our team handles the entire clearance process end-to-end.",
  },
  {
    q: "How is SCRAPYARD different from a local kabadiwala?",
    a: "SCRAPYARD offers technology-driven operations with digital weighing (no cheating), live market rates (up to 20% better), instant digital payments, professional uniformed teams, legal documentation, and eco-certified recycling — a complete upgrade.",
  },
  {
    q: "Is there an app for SCRAPYARD?",
    a: "The SCRAPYARD app is launching soon on Android and iOS. Join the waitlist on our App page to be among the first users and get a ₹500 bonus on your first pickup.",
  },
  {
    q: "Can I get scrap picked up from a construction site?",
    a: "Yes, construction and demolition scrap is one of our core services. We handle iron rods, bricks, wood, cables, wiring, and all demolition materials with proper documentation.",
  },
  {
    q: "How do I become a verified scrap buyer on SCRAPYARD?",
    a: "Interested buyers can apply through our website. We verify GST registration, CPCB authorizations, business credentials, and conduct quality audits before onboarding any buyer into our network.",
  },
  {
    q: "Does SCRAPYARD offer bulk pickup discounts?",
    a: "Yes, enterprise and bulk clients get preferential rates and dedicated account managers. Contact our enterprise team for custom pricing on consignments above 500 kg.",
  },
  {
    q: "What are SCRAPYARD's operating hours?",
    a: "Our customer support is available 9 AM to 8 PM, 7 days a week. Pickups are scheduled between 8 AM and 7 PM. Emergency enterprise pickups can be arranged 24/7 through our dedicated business line.",
  },
];

export function FAQSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}
          >
            💬 FAQ
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-text-muted text-lg">
            Everything you need to know about SCRAPYARD.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: Math.min(i * 0.03, 0.5) }}
            >
              <div
                className={`glass-card rounded-xl overflow-hidden border transition-all duration-300 ${
                  openIndex === i
                    ? "border-accent-glow/20 glow-border-green"
                    : "border-transparent hover:border-dark-border"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 p-5 text-left"
                >
                  <span
                    className={`text-sm font-semibold leading-relaxed transition-colors duration-200 ${
                      openIndex === i ? "text-accent-glow" : "text-white"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                      openIndex === i
                        ? "bg-accent-glow text-background"
                        : "bg-white/8 text-text-muted"
                    }`}
                  >
                    {openIndex === i ? (
                      <Minus className="w-3 h-3" />
                    ) : (
                      <Plus className="w-3 h-3" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="px-5 pb-5">
                        <div className="h-px bg-dark-border mb-4" />
                        <p className="text-sm text-text-muted leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Schema markup for FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone required").max(13),
  email: z.string().email("Valid email required"),
  city: z.string().min(2, "City is required"),
  businessType: z.string().min(1, "Business type is required"),
  scrapType: z.string().min(1, "Scrap type is required"),
  message: z.string().min(10, "Message is too short"),
});

type FormData = z.infer<typeof schema>;

const businessTypes = ["Household", "Office/Commercial", "Factory/Industrial", "Warehouse", "Construction/Builder", "Hospital", "Hotel", "Other"];
const scrapTypes = ["Metal Scrap", "Plastic Scrap", "Paper Scrap", "E-Waste/Electronics", "Furniture", "Industrial Waste", "Construction Scrap", "Vehicle Scrap", "Mixed/Multiple", "Other"];

export function ContactPageContent() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
      reset();
      toast.success("We'll contact you within 2 hours!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div ref={ref} className="pt-16">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden grid-bg" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,60,158,0.12) 0%, transparent 55%)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}>
              Get In Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Schedule Your <span className="gradient-text">Free Pickup</span>
            </h1>
            <p className="text-text-muted text-lg">
              Fill the form or contact us directly. We respond within 2 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="space-y-5"
            >
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>Contact Us</h3>
                <div className="space-y-4">
                  <a href="tel:+918505863220" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-accent-glow/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-accent-glow" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">Phone</p>
                      <p className="text-sm font-medium text-white group-hover:text-accent-glow transition-colors">+91 85058 63220</p>
                    </div>
                  </a>
                  <a href="mailto:info@scrapyard.co.in" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-primary-blue/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">Email</p>
                      <p className="text-sm font-medium text-white group-hover:text-accent-glow transition-colors">info@scrapyard.co.in</p>
                    </div>
                  </a>
                  <a href={`https://wa.me/918505863220`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-green-600/20 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">WhatsApp</p>
                      <p className="text-sm font-medium text-white group-hover:text-accent-glow transition-colors">Chat with us</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-glow/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-accent-glow" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">Office</p>
                      <p className="text-sm text-white">Pan India Operations</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h4 className="text-sm font-bold text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>Business Hours</h4>
                <div className="space-y-2 text-sm">
                  {[
                    { day: "Mon – Fri", time: "8 AM – 8 PM" },
                    { day: "Saturday", time: "9 AM – 6 PM" },
                    { day: "Sunday", time: "10 AM – 4 PM" },
                  ].map((h) => (
                    <div key={h.day} className="flex justify-between">
                      <span className="text-text-muted">{h.day}</span>
                      <span className="text-white font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-accent-glow">
                  <span className="w-2 h-2 rounded-full bg-accent-glow animate-pulse" />
                  Enterprise 24/7 Support Available
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden h-48 border border-dark-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.206025273066!2d77.27570891153293!3d28.352620196635012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cd9a4b9c3529d%3A0xe83041a62cee3e4a!2sSunrise%20Metals!5e0!3m2!1sen!2sin!4v1780149914613!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              {submitted ? (
                <div className="glass-card rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    <CheckCircle className="w-16 h-16 text-accent-glow mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>Request Received!</h3>
                  <p className="text-text-muted mb-6">Our team will contact you within 2 hours to confirm your pickup schedule.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-primary text-sm px-6 py-3">Submit Another</button>
                </div>
              ) : (
                <div className="glass-card rounded-2xl p-6 md:p-8">
                  <h3 className="text-xl font-black text-white mb-6" style={{ fontFamily: "var(--font-syne)" }}>Schedule Pickup / Get Quote</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="text-xs text-text-muted mb-1.5 block">Full Name *</label>
                      <input {...register("name")} placeholder="Rahul Sharma" className="form-input" />
                      {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                    </div>
                    {/* Phone */}
                    <div>
                      <label className="text-xs text-text-muted mb-1.5 block">Phone Number *</label>
                      <input {...register("phone")} placeholder="+91 85058 63220" className="form-input" />
                      {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
                    </div>
                    {/* Email */}
                    <div>
                      <label className="text-xs text-text-muted mb-1.5 block">Email Address *</label>
                      <input {...register("email")} type="email" placeholder="yourname@email.com" className="form-input" />
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                    </div>
                    {/* City */}
                    <div>
                      <label className="text-xs text-text-muted mb-1.5 block">City *</label>
                      <input {...register("city")} placeholder="Delhi, Mumbai, Bangalore..." className="form-input" />
                      {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city.message}</p>}
                    </div>
                    {/* Business Type */}
                    <div>
                      <label className="text-xs text-text-muted mb-1.5 block">Business Type *</label>
                      <select {...register("businessType")} className="form-input">
                        <option value="">Select type...</option>
                        {businessTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.businessType && <p className="text-xs text-red-400 mt-1">{errors.businessType.message}</p>}
                    </div>
                    {/* Scrap Type */}
                    <div>
                      <label className="text-xs text-text-muted mb-1.5 block">Scrap Type *</label>
                      <select {...register("scrapType")} className="form-input">
                        <option value="">Select scrap...</option>
                        {scrapTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.scrapType && <p className="text-xs text-red-400 mt-1">{errors.scrapType.message}</p>}
                    </div>
                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label className="text-xs text-text-muted mb-1.5 block">Message / Requirements *</label>
                      <textarea {...register("message")} rows={4} placeholder="Describe your scrap quantity, location, and preferred pickup time..." className="form-input resize-none" />
                      {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
                    </div>
                    {/* Submit */}
                    <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3">
                      <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 justify-center py-3.5 text-sm disabled:opacity-70">
                        <Send className="w-4 h-4" />
                        {isSubmitting ? "Sending..." : "Submit Request"}
                      </button>
                      <a href={`https://wa.me/918505863220?text=Hi SCRAPYARD! I'd like to schedule a scrap pickup.`} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 justify-center py-3.5 text-sm inline-flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp Instead
                      </a>
                    </div>
                  </form>
                  <p className="text-xs text-text-muted mt-3">
                    By submitting, you agree to our Privacy Policy. We never share your data.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Instagram, Facebook, Linkedin, Youtube,
  MapPin, Phone, Mail, ArrowRight,
  Twitter, Send
} from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "Residential Pickup", href: "/services#residential" },
    { label: "Commercial Scrap", href: "/services#commercial" },
    { label: "Industrial Scrap", href: "/services#industrial" },
    { label: "E-Waste Recycling", href: "/services#ewaste" },
    { label: "Demolition Scrap", href: "/services#demolition" },
  ],
  "Scrap Types": [
    { label: "Metal Scrap", href: "/scrap-rates#metal" },
    { label: "Plastic Scrap", href: "/scrap-rates#plastic" },
    { label: "Paper Scrap", href: "/scrap-rates#paper" },
    { label: "Electronics", href: "/scrap-rates#electronics" },
    { label: "Industrial Waste", href: "/scrap-rates#industrial" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Sitemap", href: "/sitemap.xml" },
  ],
};

const cities = [
  "Delhi", "Mumbai", "Faridabad", "Noida", "Gurgaon",
  "Ghaziabad", "Bangalore", "Hyderabad", "Chennai", "Pune",
];

const socials = [
  { icon: Instagram, href: "#", label: "Instagram", color: "#E1306C" },
  { icon: Facebook, href: "#", label: "Facebook", color: "#1877F2" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "#0A66C2" },
  { icon: Youtube, href: "#", label: "YouTube", color: "#FF0000" },
  { icon: Twitter, href: "#", label: "Twitter", color: "#1DA1F2" },
  { icon: Send, href: "#", label: "Telegram", color: "#229ED9" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-dark-border">
      {/* Background */}
      <div className="absolute inset-0 metal-bg" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(0,60,158,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(44,235,136,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="/scrapyard-logo-w-bg.png"
                  alt="SCRAPYARD Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span
                className="text-xl font-black text-white"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                SCRAP<span className="text-accent-glow">YARD</span>
              </span>
            </Link>

            <p className="text-sm text-text-muted leading-relaxed mb-6 max-w-xs">
              India&apos;s smartest digital scrap marketplace. Transforming waste into value with technology, transparency, and trust.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 mb-6">
              <a href="tel:+918505863220" className="flex items-center gap-2.5 text-sm text-silver hover:text-accent-glow transition-colors group">
                <Phone className="w-4 h-4 text-accent-glow flex-shrink-0" />
                +91 85058 63220
              </a>
              <a href="mailto:info@scrapyard.co.in" className="flex items-center gap-2.5 text-sm text-silver hover:text-accent-glow transition-colors">
                <Mail className="w-4 h-4 text-accent-glow flex-shrink-0" />
                info@scrapyard.co.in
              </a>
              <div className="flex items-start gap-2.5 text-sm text-silver">
                <MapPin className="w-4 h-4 text-accent-glow flex-shrink-0 mt-0.5" />
                <span>India - Pan India Operations</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all duration-200 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <s.icon className="w-3.5 h-3.5 text-silver" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold text-silver tracking-widest uppercase mb-4">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-muted hover:text-accent-glow transition-colors duration-200 flex items-center gap-1 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Cities section */}
        <div className="border-t border-dark-border pt-8 mb-8">
          <p className="text-xs text-text-muted mb-3 tracking-widest uppercase font-semibold">
            We Operate In
          </p>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link
                key={city}
                href={`/cities/${city.toLowerCase()}`}
                className="px-3 py-1.5 rounded-lg text-xs text-text-muted bg-white/4 hover:bg-accent-glow/8 hover:text-accent-glow border border-dark-border hover:border-accent-glow/20 transition-all duration-200"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="glass-card rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h4 className="text-base font-bold text-white mb-1" style={{ fontFamily: "var(--font-syne)" }}>
              Get Live Scrap Rate Alerts
            </h4>
            <p className="text-xs text-text-muted">
              Daily rates, pickup offers, and industry insights in your inbox.
            </p>
          </div>
          <form className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="form-input flex-1 sm:w-56 text-xs py-2.5"
            />
            <button type="submit" className="btn-primary px-4 py-2.5 text-xs whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} SCRAPYARD. All rights reserved. Built in India with 💚
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-xs text-text-muted hover:text-accent-glow transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-text-muted hover:text-accent-glow transition-colors">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="text-xs text-text-muted hover:text-accent-glow transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

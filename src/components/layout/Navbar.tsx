"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Truck, Phone } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    label: "Services",
    children: [
      { href: "/services", label: "All Services" },
      { href: "/services#residential", label: "Residential Pickup" },
      { href: "/services#commercial", label: "Commercial Scrap" },
      { href: "/services#industrial", label: "Industrial Scrap" },
      { href: "/services#ewaste", label: "E-Waste Recycling" },
    ],
  },
  {
    label: "Industries",
    children: [
      { href: "/industries", label: "All Industries" },
      { href: "/industries#factories", label: "Factories" },
      { href: "/industries#hotels", label: "Hotels & Hospitality" },
      { href: "/industries#construction", label: "Construction" },
      { href: "/industries#warehouses", label: "Warehouses" },
    ],
  },
  { href: "/scrap-rates", label: "Scrap Rates" },
  { href: "/app-page", label: "App" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-dark-border shadow-2xl"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src="/scrapyard-logo-w-bg.png"
                alt="SCRAPYARD Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-lg font-black text-white tracking-wider group-hover:text-accent-glow transition-colors duration-300"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                SCRAP<span className="text-accent-glow">YARD</span>
              </span>
              <span className="text-[9px] text-text-muted font-mono tracking-widest uppercase hidden sm:block">
                Smart Scrap Platform
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-silver hover:text-accent-glow transition-colors duration-200">
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        openDropdown === item.label ? "rotate-180" : ""
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-52 glass-card rounded-xl py-1.5 shadow-2xl border border-dark-border"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-silver hover:text-accent-glow hover:bg-accent-glow/5 transition-colors duration-150"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                    pathname === item.href
                      ? "text-accent-glow bg-accent-glow/8"
                      : "text-silver hover:text-accent-glow"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="tel:+918505863220"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-accent-glow transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span className="font-mono text-xs">+91 85058 63220</span>
            </a>
            <Link
              href="/contact"
              className="btn-primary text-xs px-4 py-2.5 flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5" />
              Book Pickup
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-silver hover:text-accent-glow hover:bg-accent-glow/5 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-dark-border bg-background/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        )
                      }
                      className="mobile-nav-item w-full justify-between text-silver"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          openDropdown === item.label ? "rotate-180" : ""
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="mobile-nav-item text-text-muted"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className={cn(
                      "mobile-nav-item",
                      pathname === item.href
                        ? "text-accent-glow bg-accent-glow/8"
                        : "text-silver"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="pt-3 border-t border-dark-border flex flex-col gap-2">
                <Link href="/contact" className="btn-primary justify-center py-3 text-sm">
                  <Truck className="w-4 h-4" />
                  Book Free Pickup
                </Link>
                <a
                  href="tel:+918505863220"
                  className="btn-secondary justify-center py-3 text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Call Us Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

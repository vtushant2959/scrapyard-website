import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Star, Download, CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Scrap Buying App in India 2024 - SCRAPYARD App Review",
  description: "SCRAPYARD is India's best scrap buying app. Book free pickup, get live rates, instant UPI payment. Available on Google Play. 10,000+ downloads, 4.8★ rating.",
  keywords: ["best scrap buying app India", "scrap app India", "kabadi app", "online scrap app", "scrap pickup app", "scrapyard app"],
  alternates: { canonical: "https://scrapyard.co.in/best-scrap-buying-app-india" },
};

const PLAY_STORE = "https://play.google.com/store/apps/details?id=com.scrapyardindia.app";

const features = [
  { title: "Book Pickup in 30 Seconds", desc: "Select scrap type, choose time slot, confirm - done. No phone calls needed." },
  { title: "Live Scrap Rates", desc: "Today's rates for all scrap types updated daily. Know exactly what you'll get before booking." },
  { title: "Real-Time Agent Tracking", desc: "Track your pickup agent on map just like Zomato/Swiggy. Know exactly when they'll arrive." },
  { title: "Instant UPI Payment", desc: "Get paid in 60 seconds via UPI, GPay, PhonePe, or Paytm. Right at your doorstep." },
  { title: "Digital Receipt", desc: "Itemised receipt with weight, rate, and amount sent instantly to WhatsApp and email." },
  { title: "Rate Alerts", desc: "Get notified when copper, aluminium, or iron rates hit a high. Sell at the perfect time." },
];

const compare = [
  { app: "SCRAPYARD", rating: "4.8★", cities: "30+", payment: "Instant UPI", rates: "Live market", pickup: "Free", available: true },
  { app: "App B", rating: "3.2★", cities: "5", payment: "Cash only", rates: "Fixed (low)", pickup: "Charges apply", available: false },
  { app: "App C", rating: "3.8★", cities: "8", payment: "Next day", rates: "Below market", pickup: "Free", available: false },
];

export default function BestScrapAppPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16" style={{ background: "#081018" }}>
        <section className="py-16 grid-bg" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,60,158,0.15) 0%, transparent 55%)" }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}>
              ✅ Live on Google Play
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Best <span style={{ color: "#2CEB88" }}>Scrap Buying App</span> in India
            </h1>
            <p className="text-text-muted text-lg mb-6">Why 10,000+ Indians trust SCRAPYARD to sell their scrap - and why you should too.</p>
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                <span className="text-white font-bold">4.8</span>
                <span className="text-text-muted text-sm">(1,200 reviews)</span>
              </div>
              <span className="text-text-muted">·</span>
              <span className="text-silver text-sm">10,000+ downloads</span>
              <span className="text-text-muted">·</span>
              <span className="text-silver text-sm">30+ cities</span>
            </div>
            <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, rgba(44,235,136,0.15), rgba(44,235,136,0.05))", border: "1.5px solid rgba(44,235,136,0.4)" }}>
              <span className="text-2xl">▶</span>
              <div className="text-left">
                <p className="text-xs text-text-muted">Download Free on</p>
                <p className="text-sm font-black text-white">Google Play</p>
              </div>
            </a>
          </div>
        </section>

        <section className="section-padding">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">

            {/* Features */}
            <div>
              <h2 className="text-2xl font-black text-white mb-6" style={{ fontFamily: "var(--font-syne)" }}>App Features</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((f) => (
                  <div key={f.title} className="glass-card rounded-xl p-5 flex gap-3">
                    <CheckCircle className="w-5 h-5 text-accent-glow flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white">{f.title}</p>
                      <p className="text-xs text-silver mt-1 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why #1 */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-black text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>Why SCRAPYARD is India&apos;s #1 Scrap App</h2>
              <div className="space-y-4 text-silver">
                <p className="leading-relaxed"><strong className="text-white">Live Market Rates:</strong> Most scrap apps show fixed, below-market rates. SCRAPYARD updates rates daily based on actual LME prices and local market conditions. You always get the real rate.</p>
                <p className="leading-relaxed"><strong className="text-white">Certified Digital Weighing:</strong> Our agents carry government-certified digital scales. No spring scales. No cheating. You see the weight on the screen.</p>
                <p className="leading-relaxed"><strong className="text-white">Fastest Payment in India:</strong> UPI payment in under 60 seconds after weighing. No waiting for the agent to "come back tomorrow with cash."</p>
                <p className="leading-relaxed"><strong className="text-white">Available 24/7:</strong> Book a pickup at 2 AM if you want. Our system accepts bookings round the clock for next-day or same-day service.</p>
                <p className="leading-relaxed"><strong className="text-white">30+ Cities:</strong> Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Noida, Gurgaon, Faridabad, Jaipur, and 20+ more cities - with new cities added every month.</p>
              </div>
            </div>

            {/* Download CTA */}
            <div className="glass-card rounded-2xl p-8 text-center" style={{ border: "1px solid rgba(44,235,136,0.2)" }}>
              <Download className="w-12 h-12 text-accent-glow mx-auto mb-4" />
              <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>Download SCRAPYARD App Free</h3>
              <p className="text-text-muted text-sm mb-6">Available on Android · iOS coming soon · Free to download · No subscription</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all hover:scale-105"
                  style={{ background: "rgba(44,235,136,0.12)", border: "1.5px solid rgba(44,235,136,0.35)" }}>
                  <span className="text-xl">▶</span>
                  <div className="text-left">
                    <p className="text-xs text-text-muted">Download on</p>
                    <p className="text-sm font-black text-white">Google Play</p>
                  </div>
                </a>
                <Link href="/contact" className="btn-secondary text-sm px-6 py-4 flex items-center gap-2">
                  Book Without App <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

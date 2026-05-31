import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Truck, CheckCircle } from "lucide-react";

const validCities: Record<string, { name: string; state: string; areas: string[] }> = {
  delhi: { name: "Delhi", state: "Delhi", areas: ["Connaught Place", "Saket", "Dwarka", "Rohini", "Lajpat Nagar"] },
  mumbai: { name: "Mumbai", state: "Maharashtra", areas: ["Andheri", "Bandra", "Thane", "Navi Mumbai", "Dadar"] },
  faridabad: { name: "Faridabad", state: "Haryana", areas: ["Sector 12", "NIT", "Ballabhgarh", "Old Faridabad"] },
  noida: { name: "Noida", state: "Uttar Pradesh", areas: ["Sector 18", "Sector 62", "Greater Noida", "Sector 137"] },
  gurgaon: { name: "Gurgaon", state: "Haryana", areas: ["DLF Phase 1-5", "Golf Course Road", "Sector 29", "Cyber City"] },
  ghaziabad: { name: "Ghaziabad", state: "Uttar Pradesh", areas: ["Indirapuram", "Vaishali", "Raj Nagar", "Kaushambi"] },
  bangalore: { name: "Bangalore", state: "Karnataka", areas: ["Whitefield", "Koramangala", "Indiranagar", "Marathahalli"] },
  hyderabad: { name: "Hyderabad", state: "Telangana", areas: ["Hitech City", "Gachibowli", "Banjara Hills", "Kondapur"] },
  chennai: { name: "Chennai", state: "Tamil Nadu", areas: ["Anna Nagar", "T Nagar", "Velachery", "Adyar"] },
  pune: { name: "Pune", state: "Maharashtra", areas: ["Kothrud", "Wakad", "Hinjewadi", "Viman Nagar"] },
};

export function generateStaticParams() {
  return Object.keys(validCities).map((city) => ({ city }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const cityData = validCities[params.city];
  if (!cityData) return {};
  return {
    title: `Scrap Pickup in ${cityData.name} — Best Rates, Free Collection | SCRAPYARD`,
    description: `SCRAPYARD offers free doorstep scrap pickup in ${cityData.name}. Get best rates for metal, plastic, paper, e-waste. Same-day pickup available in ${cityData.areas.slice(0, 3).join(", ")}, and more areas.`,
    alternates: { canonical: `https://scrapyard.co.in/cities/${params.city}` },
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const cityData = validCities[params.city];
  if (!cityData) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: `SCRAPYARD ${cityData.name}`,
          description: `Scrap collection and recycling services in ${cityData.name}`,
          url: `https://scrapyard.co.in/cities/${params.city}`,
          areaServed: { "@type": "City", name: cityData.name, addressRegion: cityData.state, addressCountry: "IN" },
          address: { "@type": "PostalAddress", addressLocality: cityData.name, addressRegion: cityData.state, addressCountry: "IN" },
          telephone: "+918505863220",
          openingHours: "Mo-Sa 08:00-20:00",
        }) }} />

        <section className="py-20 relative grid-bg" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(44,235,136,0.1) 0%, transparent 55%)" }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}>
              <MapPin className="w-3.5 h-3.5" />
              Now Active in {cityData.name}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Scrap Pickup in <span className="gradient-text">{cityData.name}</span>
            </h1>
            <p className="text-text-muted text-lg mb-8">
              Free doorstep scrap collection in {cityData.name}, {cityData.state}. Best rates for metal, plastic, paper, e-waste, and industrial scrap. Same-day pickup available.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="btn-primary text-sm px-6 py-3">
                <Truck className="w-4 h-4" />
                Book Free Pickup in {cityData.name}
              </Link>
              <a href="tel:+918505863220" className="btn-secondary text-sm px-6 py-3">Call Now</a>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                  Areas We Cover in {cityData.name}
                </h2>
                <ul className="space-y-2">
                  {cityData.areas.map((area) => (
                    <li key={area} className="flex items-center gap-2 text-sm text-silver">
                      <CheckCircle className="w-4 h-4 text-accent-glow flex-shrink-0" />
                      {area}
                    </li>
                  ))}
                  <li className="flex items-center gap-2 text-sm text-text-muted">
                    <CheckCircle className="w-4 h-4 text-text-muted flex-shrink-0" />
                    + All other areas in {cityData.name}
                  </li>
                </ul>
              </div>
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                  Our Services in {cityData.name}
                </h2>
                <ul className="space-y-2">
                  {["Metal Scrap Pickup", "Plastic Scrap Collection", "Paper & Cardboard", "E-Waste Recycling", "Furniture Disposal", "Industrial Scrap", "Office Clearance", "Same-Day Pickup"].map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-silver">
                      <CheckCircle className="w-4 h-4 text-accent-glow flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 glass-card rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                Ready to Sell Scrap in <span className="gradient-text">{cityData.name}</span>?
              </h3>
              <p className="text-text-muted mb-6">Schedule a free pickup or call us. Our team is ready in {cityData.name}.</p>
              <Link href="/contact" className="btn-primary text-sm px-8 py-3.5 inline-flex">
                <Truck className="w-4 h-4" />
                Schedule Free Pickup Today
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Truck, CheckCircle } from "lucide-react";

const validCities: Record<string, { name: string; state: string; areas: string[] }> = {
  delhi:      { name: "Delhi",      state: "Delhi",          areas: ["Connaught Place", "Saket", "Dwarka", "Rohini", "Lajpat Nagar", "Karol Bagh", "Pitampura"] },
  mumbai:     { name: "Mumbai",     state: "Maharashtra",    areas: ["Andheri", "Bandra", "Thane", "Navi Mumbai", "Dadar", "Kurla", "Powai"] },
  faridabad:  { name: "Faridabad",  state: "Haryana",        areas: ["Sector 12", "NIT", "Ballabhgarh", "Old Faridabad", "Sector 31", "Sector 46"] },
  noida:      { name: "Noida",      state: "Uttar Pradesh",  areas: ["Sector 18", "Sector 62", "Greater Noida", "Sector 137", "Sector 63", "Noida Extension"] },
  gurgaon:    { name: "Gurgaon",    state: "Haryana",        areas: ["DLF Phase 1-5", "Golf Course Road", "Sector 29", "Cyber City", "Sohna Road", "MG Road"] },
  ghaziabad:  { name: "Ghaziabad",  state: "Uttar Pradesh",  areas: ["Indirapuram", "Vaishali", "Raj Nagar", "Kaushambi", "Vasundhara", "Crossings Republik"] },
  bangalore:  { name: "Bangalore",  state: "Karnataka",      areas: ["Whitefield", "Koramangala", "Indiranagar", "Marathahalli", "HSR Layout", "Electronic City"] },
  hyderabad:  { name: "Hyderabad",  state: "Telangana",      areas: ["Hitech City", "Gachibowli", "Banjara Hills", "Kondapur", "Madhapur", "Secunderabad"] },
  chennai:    { name: "Chennai",    state: "Tamil Nadu",     areas: ["Anna Nagar", "T Nagar", "Velachery", "Adyar", "Porur", "Ambattur"] },
  pune:       { name: "Pune",       state: "Maharashtra",    areas: ["Kothrud", "Wakad", "Hinjewadi", "Viman Nagar", "Hadapsar", "Pimpri-Chinchwad"] },
  jaipur:     { name: "Jaipur",     state: "Rajasthan",      areas: ["Malviya Nagar", "Vaishali Nagar", "Mansarovar", "C-Scheme", "Jagatpura", "Tonk Road"] },
  jodhpur:    { name: "Jodhpur",    state: "Rajasthan",      areas: ["Ratanada", "Shastri Nagar", "Sardarpura", "Paota", "Chopasni Housing Board"] },
  meerut:     { name: "Meerut",     state: "Uttar Pradesh",  areas: ["Shastri Nagar", "Pallavpuram", "Garh Road", "Kanker Khera", "Partapur"] },
  lucknow:    { name: "Lucknow",    state: "Uttar Pradesh",  areas: ["Hazratganj", "Gomti Nagar", "Aliganj", "Indira Nagar", "Mahanagar"] },
  ahmedabad:  { name: "Ahmedabad",  state: "Gujarat",        areas: ["Navrangpura", "Bopal", "Satellite", "Vastrapur", "Maninagar", "Chandkheda"] },
  surat:      { name: "Surat",      state: "Gujarat",        areas: ["Adajan", "Vesu", "Katargam", "Athwa", "Udhna", "Piplod"] },
  kanpur:     { name: "Kanpur",     state: "Uttar Pradesh",  areas: ["Civil Lines", "Kidwai Nagar", "Govind Nagar", "Armapur", "Kalyanpur"] },
  nagpur:     { name: "Nagpur",     state: "Maharashtra",    areas: ["Dharampeth", "Sitabuldi", "Sadar", "Ramdaspeth", "Wardhaman Nagar"] },
  indore:     { name: "Indore",     state: "Madhya Pradesh", areas: ["Vijay Nagar", "Palasia", "Bhawarkua", "Scheme 54", "Rau"] },
  bhopal:     { name: "Bhopal",     state: "Madhya Pradesh", areas: ["MP Nagar", "Arera Colony", "Kolar Road", "Hoshangabad Road", "Shivaji Nagar"] },
};

export function generateStaticParams() {
  return Object.keys(validCities).map((city) => ({ city }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const cityData = validCities[params.city];
  if (!cityData) return {};
  return {
    title: `Scrap Pickup in ${cityData.name} — Free Doorstep Collection, Best Rates | SCRAPYARD`,
    description: `SCRAPYARD offers FREE doorstep scrap pickup in ${cityData.name}. Best rates for iron, copper, aluminium, e-waste, plastic & all scrap. Instant payment. Available in ${cityData.areas.slice(0, 3).join(", ")} & all areas. Call +91 8505863220.`,
    keywords: [
      `scrap pickup ${cityData.name}`,
      `kabadiwala ${cityData.name}`,
      `scrap dealer ${cityData.name}`,
      `sell scrap ${cityData.name}`,
      `iron scrap rate ${cityData.name}`,
      `copper scrap buyer ${cityData.name}`,
      `e-waste pickup ${cityData.name}`,
      `free scrap pickup ${cityData.name}`,
      `scrap buyer near me ${cityData.name}`,
    ],
    alternates: { canonical: `https://scrapyard.co.in/cities/${params.city}` },
    openGraph: {
      title: `Scrap Pickup in ${cityData.name} | SCRAPYARD`,
      description: `Free doorstep scrap pickup in ${cityData.name}. Best rates, instant payment. Call +91 8505863220.`,
      url: `https://scrapyard.co.in/cities/${params.city}`,
    },
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
          description: `Free doorstep scrap pickup in ${cityData.name}. Best rates for iron, copper, aluminium, e-waste, plastic. Instant payment. Available 24/7.`,
          url: `https://scrapyard.co.in/cities/${params.city}`,
          telephone: "+918505863220",
          email: "info@scrapyard.co.in",
          openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "00:00", closes: "23:59" },
          areaServed: { "@type": "City", name: cityData.name, addressRegion: cityData.state, addressCountry: "IN" },
          address: { "@type": "PostalAddress", addressLocality: cityData.name, addressRegion: cityData.state, addressCountry: "IN" },
          priceRange: "₹",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "120" },
        }) }} />

        {/* Hero */}
        <section className="py-20 relative grid-bg" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(44,235,136,0.1) 0%, transparent 55%)" }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(44,235,136,0.08)", border: "1px solid rgba(44,235,136,0.2)", color: "#2CEB88" }}>
              <MapPin className="w-3.5 h-3.5" />
              Serving {cityData.name}, {cityData.state} — 24/7
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Scrap Pickup in <span className="gradient-text">{cityData.name}</span>
            </h1>
            <p className="text-text-muted text-lg mb-3">
              Free doorstep scrap collection in {cityData.name}. Best rates for iron, copper, aluminium, e-waste, plastic & all scrap. Instant payment via Cash or UPI.
            </p>
            <p className="text-sm text-silver mb-8">
              Available across {cityData.areas.slice(0, 4).join(", ")} & all areas of {cityData.name}.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="btn-primary text-sm px-6 py-3">
                <Truck className="w-4 h-4" />
                Book Free Pickup in {cityData.name}
              </Link>
              <a href="tel:+918505863220" className="btn-secondary text-sm px-6 py-3">
                📞 Call +91 8505863220
              </a>
              <a href="https://wa.me/918505863220" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm px-6 py-3">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 border-y border-dark-border" style={{ background: "rgba(44,235,136,0.03)" }}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "24/7", label: "Available" },
                { value: "Free", label: "Pickup" },
                { value: "Instant", label: "Payment" },
                { value: "Best", label: "Rates" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-black text-accent-glow" style={{ fontFamily: "var(--font-syne)" }}>{s.value}</p>
                  <p className="text-xs text-text-muted mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">

            {/* Areas + Services */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                  Areas We Cover in {cityData.name}
                </h2>
                <ul className="space-y-2">
                  {cityData.areas.map((area) => (
                    <li key={area} className="flex items-center gap-2 text-sm text-silver">
                      <CheckCircle className="w-4 h-4 text-accent-glow flex-shrink-0" />{area}
                    </li>
                  ))}
                  <li className="flex items-center gap-2 text-sm text-text-muted">
                    <CheckCircle className="w-4 h-4 text-text-muted flex-shrink-0" />+ All other areas in {cityData.name}
                  </li>
                </ul>
              </div>
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-black text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                  What We Buy in {cityData.name}
                </h2>
                <ul className="space-y-2">
                  {["Iron & Steel Scrap", "Copper Scrap", "Aluminium Scrap", "Brass Scrap", "E-Waste & Electronics", "Paper & Cardboard", "Plastic Scrap", "Old Appliances (AC, Fridge)", "Industrial Scrap", "Office Clearance"].map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-silver">
                      <CheckCircle className="w-4 h-4 text-accent-glow flex-shrink-0" />{s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* How it works */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-black text-white mb-6 text-center" style={{ fontFamily: "var(--font-syne)" }}>
                How Scrap Pickup Works in {cityData.name}
              </h2>
              <div className="grid sm:grid-cols-4 gap-4">
                {[
                  { step: "1", title: "Book Online", desc: `Fill our form or call +91 8505863220 to book pickup in ${cityData.name}` },
                  { step: "2", title: "We Arrive", desc: `Our agent arrives at your location in ${cityData.name} within 24 hours` },
                  { step: "3", title: "Weigh & Check", desc: "Scrap is weighed on certified digital scale in front of you" },
                  { step: "4", title: "Instant Payment", desc: "Get paid immediately via Cash, UPI, or bank transfer" },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-10 h-10 rounded-full bg-accent-glow/20 flex items-center justify-center text-accent-glow font-black text-lg mx-auto mb-3">{item.step}</div>
                    <p className="text-sm font-bold text-white mb-1">{item.title}</p>
                    <p className="text-xs text-text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="glass-card rounded-2xl p-8 text-center" style={{ border: "1px solid rgba(44,235,136,0.2)" }}>
              <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                Sell Your Scrap in <span className="gradient-text">{cityData.name}</span> Today
              </h3>
              <p className="text-text-muted mb-2">Free pickup · Best rates · Instant payment · Available 24/7</p>
              <p className="text-sm text-silver mb-6">Serving {cityData.areas.slice(0, 3).join(", ")} & all {cityData.name} areas</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact" className="btn-primary text-sm px-8 py-3.5 inline-flex">
                  <Truck className="w-4 h-4" />Schedule Free Pickup
                </Link>
                <a href="tel:+918505863220" className="btn-secondary text-sm px-6 py-3">Call Now</a>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

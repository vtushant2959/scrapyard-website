import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutPageContent } from "@/components/pages/AboutPageContent";

export const metadata: Metadata = {
  title: "About SCRAPYARD — India's Next-Gen Scrap Marketplace",
  description:
    "Learn about SCRAPYARD's mission to revolutionize India's scrap industry with technology, transparency, and sustainability. Our story, team, and vision for the future.",
  alternates: { canonical: "https://scrapyard.co.in/about" },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutPageContent />
      </main>
      <Footer />
    </>
  );
}

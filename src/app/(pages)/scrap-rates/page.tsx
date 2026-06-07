import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrapRatesPageContent } from "@/components/pages/ScrapRatesPageContent";

export const metadata: Metadata = {
  title: "Today's Live Scrap Rates in India 2025 - Metal, Plastic, Paper & E-Waste",
  description:
    "Check today's live scrap rates in India. Updated daily scrap prices for metal, copper, iron, aluminium, plastic, paper, e-waste and industrial scrap across all cities.",
  alternates: { canonical: "https://scrapyard.co.in/scrap-rates" },
};

export default function ScrapRatesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ScrapRatesPageContent />
      </main>
      <Footer />
    </>
  );
}

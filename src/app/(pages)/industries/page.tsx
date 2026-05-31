import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IndustriesPageContent } from "@/components/pages/IndustriesPageContent";

export const metadata: Metadata = {
  title: "Industries We Serve — Factories, Hotels, Warehouses & More | SCRAPYARD",
  description:
    "SCRAPYARD provides specialized scrap management solutions for factories, hotels, construction companies, warehouses, hospitals, educational institutions, and more.",
  alternates: { canonical: "https://scrapyard.co.in/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main><IndustriesPageContent /></main>
      <Footer />
    </>
  );
}

import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicesPageContent } from "@/components/pages/ServicesPageContent";

export const metadata: Metadata = {
  title: "Scrap Collection Services — Residential, Commercial & Industrial | SCRAPYARD",
  description:
    "SCRAPYARD offers residential scrap pickup, commercial scrap management, factory waste disposal, warehouse clearance, e-waste recycling, and demolition scrap collection across India.",
  alternates: { canonical: "https://scrapyard.co.in/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main><ServicesPageContent /></main>
      <Footer />
    </>
  );
}

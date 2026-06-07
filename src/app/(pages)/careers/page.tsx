import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CareersPageContent } from "@/components/pages/CareersPageContent";

export const metadata: Metadata = {
  title: "Careers at SCRAPYARD - Join India's Fastest Growing Scrap Startup",
  description:
    "Join SCRAPYARD and help build India's smartest scrap marketplace. Open positions in technology, operations, sales, and logistics.",
  alternates: { canonical: "https://scrapyard.co.in/careers" },
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main><CareersPageContent /></main>
      <Footer />
    </>
  );
}

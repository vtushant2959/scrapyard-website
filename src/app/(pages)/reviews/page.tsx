import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReviewsPageContent } from "@/components/pages/ReviewsPageContent";

export const metadata: Metadata = {
  title: "Customer Reviews — SCRAPYARD | Trusted Scrap Pickup Service",
  description: "Read genuine customer reviews for SCRAPYARD. See what our customers say about our scrap pickup service, rates, and instant payment across India.",
  alternates: { canonical: "https://scrapyard.co.in/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <Navbar />
      <main><ReviewsPageContent /></main>
      <Footer />
    </>
  );
}

import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlogPageContent } from "@/components/pages/BlogPageContent";

export const metadata: Metadata = {
  title: "Scrap & Recycling Blog — Metal Prices, Industry News, Tips | SCRAPYARD",
  description:
    "Latest scrap metal prices, recycling tips, industrial waste management insights, e-waste guidelines, and sustainability news from SCRAPYARD India.",
  alternates: { canonical: "https://scrapyard.co.in/blog" },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main><BlogPageContent /></main>
      <Footer />
    </>
  );
}

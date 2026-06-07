import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageLoader } from "@/components/shared/PageLoader";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ScrapCategories } from "@/components/home/ScrapCategories";
import { LiveScrapRates } from "@/components/home/LiveScrapRates";
import { AppShowcase } from "@/components/home/AppShowcase";
import { EnterpriseSection } from "@/components/home/EnterpriseSection";
import { WhyChoose } from "@/components/home/WhyChoose";
import { ImpactSection } from "@/components/home/ImpactSection";
import { Testimonials } from "@/components/home/Testimonials";
import { PartnersSection } from "@/components/home/PartnersSection";
import { FAQSection } from "@/components/home/FAQSection";

export const metadata: Metadata = {
  title: "SCRAPYARD - India's Smartest Scrap Marketplace | Free Doorstep Pickup",
  description:
    "Schedule free scrap pickup, get live scrap rates, and sell metal, plastic, paper, e-waste & industrial scrap at best prices. Trusted by 1000+ businesses across 50+ Indian cities.",
  alternates: { canonical: "https://scrapyard.co.in" },
};

export default function HomePage() {
  return (
    <>
      <PageLoader />
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <HowItWorks />
        <ScrapCategories />
        <LiveScrapRates />
        <AppShowcase />
        <EnterpriseSection />
        <WhyChoose />
        <ImpactSection />
        <Testimonials />
        <PartnersSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

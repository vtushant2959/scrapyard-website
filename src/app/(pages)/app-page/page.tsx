import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppPageContent } from "@/components/pages/AppPageContent";

export const metadata: Metadata = {
  title: "SCRAPYARD App — Coming Soon on Android & iOS | Join Waitlist",
  description:
    "The SCRAPYARD mobile app is launching soon. Schedule pickups, track collections, get live scrap rates, and receive instant payments. Join the waitlist and get ₹500 bonus.",
  alternates: { canonical: "https://scrapyard.co.in/app" },
};

export default function AppPage() {
  return (
    <>
      <Navbar />
      <main>
        <AppPageContent />
      </main>
      <Footer />
    </>
  );
}

import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppPageContent } from "@/components/pages/AppPageContent";

export const metadata: Metadata = {
  title: "SCRAPYARD App — Download Now on Google Play | Best Scrap App India",
  description:
    "Download the SCRAPYARD app free on Google Play. Book scrap pickup, track agent live, get live scrap rates, and receive instant UPI payment — all from your phone. 10,000+ downloads.",
  alternates: { canonical: "https://scrapyard.co.in/app-page" },
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

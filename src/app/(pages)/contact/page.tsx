import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactPageContent } from "@/components/pages/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact SCRAPYARD - Schedule Scrap Pickup or Get a Quote",
  description:
    "Contact SCRAPYARD to schedule a free doorstep scrap pickup, get enterprise quotes, or reach our support team. Available across 50+ Indian cities.",
  alternates: { canonical: "https://scrapyard.co.in/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactPageContent />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp";
import { AIChatWidget } from "@/components/shared/AIChatWidget";
import { StickyCtaBar } from "@/components/shared/StickyCtaBar";
import { ExitIntentPopup } from "@/components/shared/ExitIntentPopup";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://scrapyard.co.in"),
  title: {
    default: "SCRAPYARD - India's Smartest Scrap Marketplace | Buy, Sell & Recycle Scrap",
    template: "%s | SCRAPYARD",
  },
  description:
    "SCRAPYARD is India's next-generation digital scrap marketplace. Schedule free doorstep scrap pickup, get best rates for metal, plastic, paper, e-waste & industrial scrap. Trusted by 1000+ businesses across 50+ cities.",
  keywords: [
    "scrap marketplace India",
    "scrap buyer",
    "scrap collection",
    "metal scrap",
    "plastic scrap",
    "e-waste recycling",
    "industrial scrap",
    "scrap pickup",
    "scrap rates",
    "recycling India",
    "kabadiwala",
    "online scrap",
    "scrap management",
    "factory scrap",
    "warehouse clearance",
    "SCRAPYARD",
  ],
  authors: [{ name: "SCRAPYARD", url: "https://scrapyard.co.in" }],
  creator: "SCRAPYARD",
  publisher: "SCRAPYARD",
  category: "Recycling & Waste Management",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://scrapyard.co.in",
    siteName: "SCRAPYARD",
    title: "SCRAPYARD - India's Smartest Scrap Marketplace",
    description:
      "Transform waste into value. Schedule free scrap pickup, get live scrap rates, and connect with verified buyers across India.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SCRAPYARD - India's Smartest Scrap Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ScrapyardIndia",
    creator: "@ScrapyardIndia",
    title: "SCRAPYARD - India's Smartest Scrap Marketplace",
    description: "Transform waste into value with India's next-generation scrap platform.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://scrapyard.co.in",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? "",
  },
};

export const viewport: Viewport = {
  themeColor: "#081018",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/scrapyard-logo-w-bg.png" type="image/png" />
        <link rel="apple-touch-icon" href="/scrapyard-logo-w-bg.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SCRAPYARD",
              alternateName: "Scrapyard India",
              url: "https://scrapyard.co.in",
              logo: "https://scrapyard.co.in/logo.png",
              description:
                "India's smartest digital scrap marketplace connecting scrap sellers with verified buyers across India.",
              foundingDate: "2024",
              foundingLocation: "India",
              areaServed: "IN",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91-8505863220",
                  contactType: "customer service",
                  availableLanguage: ["English", "Hindi"],
                },
              ],
              sameAs: [
                "https://www.instagram.com/scrapyard.co.in",
                "https://www.facebook.com/scrapyard.co.in",
                "https://www.linkedin.com/company/scrapyard-india",
                "https://www.youtube.com/@scrapyardindia",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
            }),
          }}
        />
      </head>
      <body className="bg-background text-silver antialiased">
        <SmoothScroll>
          <CustomCursor />
          {children}
          <FloatingWhatsApp />
          <AIChatWidget />
          <StickyCtaBar />
          <ExitIntentPopup />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#0f1e2e",
                color: "#C8CDD5",
                border: "1px solid rgba(44,235,136,0.2)",
                borderRadius: "12px",
              },
            }}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}

import { MetadataRoute } from "next";

const baseUrl = "https://scrapyard.co.in";

const cities = [
  "delhi", "mumbai", "faridabad", "noida", "gurgaon", "ghaziabad",
  "bangalore", "hyderabad", "chennai", "pune", "jaipur", "jodhpur",
  "meerut", "lucknow", "ahmedabad", "surat", "kanpur", "nagpur",
  "indore", "bhopal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const seoPages = [
    "what-is-scrap",
    "how-to-sell-scrap-online",
    "copper-scrap-rates-india",
    "best-scrap-buying-app-india",
    "scrapyard-vs-kabadiwala",
    "reviews",
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/industries`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/scrap-rates`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.95 },
    { url: `${baseUrl}/app-page`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/reviews`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/refund-policy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const cityPages = cities.map((city) => ({
    url: `${baseUrl}/cities/${city}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticPages, ...seoPages, ...cityPages];
}

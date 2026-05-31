export interface ScrapItem {
  id: string;
  name: string;
  category: string;
  rate: number;
  unit: string;
  change: number;
  trend: "up" | "down" | "stable";
}

export const scrapRates: ScrapItem[] = [
  // Metal
  { id: "iron", name: "Iron / Steel", category: "Metal", rate: 28, unit: "kg", change: 2, trend: "up" },
  { id: "copper", name: "Copper Wire", category: "Metal", rate: 480, unit: "kg", change: -5, trend: "down" },
  { id: "aluminium", name: "Aluminium", category: "Metal", rate: 110, unit: "kg", change: 3, trend: "up" },
  { id: "brass", name: "Brass", category: "Metal", rate: 310, unit: "kg", change: 1, trend: "stable" },
  { id: "stainless", name: "Stainless Steel", category: "Metal", rate: 68, unit: "kg", change: 0, trend: "stable" },
  { id: "cast-iron", name: "Cast Iron", category: "Metal", rate: 22, unit: "kg", change: 1, trend: "up" },
  { id: "lead", name: "Lead", category: "Metal", rate: 95, unit: "kg", change: -2, trend: "down" },
  { id: "zinc", name: "Zinc", category: "Metal", rate: 85, unit: "kg", change: 4, trend: "up" },
  // Plastic
  { id: "pet", name: "PET Bottles", category: "Plastic", rate: 18, unit: "kg", change: 1, trend: "up" },
  { id: "hdpe", name: "HDPE Plastic", category: "Plastic", rate: 22, unit: "kg", change: 0, trend: "stable" },
  { id: "pp", name: "Polypropylene (PP)", category: "Plastic", rate: 16, unit: "kg", change: -1, trend: "down" },
  { id: "pvc", name: "PVC Pipes", category: "Plastic", rate: 12, unit: "kg", change: 0, trend: "stable" },
  // Paper
  { id: "newspaper", name: "Newspaper", category: "Paper", rate: 14, unit: "kg", change: 2, trend: "up" },
  { id: "cardboard", name: "Cardboard / OCC", category: "Paper", rate: 12, unit: "kg", change: 1, trend: "up" },
  { id: "white-paper", name: "White Paper", category: "Paper", rate: 18, unit: "kg", change: 0, trend: "stable" },
  { id: "books", name: "Books / Magazines", category: "Paper", rate: 10, unit: "kg", change: 0, trend: "stable" },
  // Electronics
  { id: "laptop", name: "Laptop / Desktop", category: "Electronics", rate: 350, unit: "pc", change: 15, trend: "up" },
  { id: "mobile", name: "Mobile Phone", category: "Electronics", rate: 80, unit: "pc", change: 5, trend: "up" },
  { id: "pcb", name: "PCB Board", category: "Electronics", rate: 280, unit: "kg", change: 10, trend: "up" },
  { id: "battery", name: "Lead Acid Battery", category: "Electronics", rate: 110, unit: "kg", change: -3, trend: "down" },
  // Industrial
  { id: "ms-scrap", name: "MS Scrap", category: "Industrial", rate: 30, unit: "kg", change: 3, trend: "up" },
  { id: "motor", name: "Electric Motor", category: "Industrial", rate: 55, unit: "kg", change: 2, trend: "up" },
  { id: "cable-wire", name: "Cable & Wire", category: "Industrial", rate: 180, unit: "kg", change: 5, trend: "up" },
];

export const scrapCategories = ["All", "Metal", "Plastic", "Paper", "Electronics", "Industrial"];

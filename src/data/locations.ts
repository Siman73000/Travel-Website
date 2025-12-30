export type LocationEntry = {
  slug: string;
  name: string;
  country: string;
  region: "North America" | "Central America" | "South America" | "Europe" | "Africa" | "Asia" | "Oceania";
  dateRange: string;
  summary: string;
  highlights: string[];
  photos?: string[]; // file names inside /public/photos/<slug>/
};

export const locations: LocationEntry[] = [
  {
    slug: "cancun",
    name: "Cancún",
    country: "Mexico",
    region: "Central America",
    dateRange: "July 2024",
    summary: "Cold air, bright skyline, and late-night deep dish.",
    highlights: ["Riverwalk photos", "Museum day", "Skyline at dusk", "Deep-dish pizza", "Broadway show", "Museum of Art"],
},
  {
    slug: "costarica",
    name: "Playa Hermosa",
    country: "Costa Rica",
    region: "Central America",
    dateRange: "Jun 2025",
    summary: "Sunrise walks and tiny cafés.",
    highlights: ["Montmartre", "Louvre (night)", "Seine sunset"],
},
  {
    slug: "munich",
    name: "Munich",
    country: "Germany",
    region: "Europe",
    dateRange: "March 2025",
    summary: "Neon streets and quiet shrines.",
    highlights: ["Shibuya crossing", "Meiji Shrine", "Ramen hunt"],
},
];

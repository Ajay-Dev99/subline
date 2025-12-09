import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artwork4 from "@/assets/artwork-4.jpg";
import artwork5 from "@/assets/artwork-5.jpg";
import artwork6 from "@/assets/artwork-6.jpg";

export interface Artwork {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  medium: string;
  size: string;
}

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Contemplation",
    category: "Portraits",
    image: artwork1,
    description: "A detailed pencil portrait capturing a moment of quiet introspection. The interplay of light and shadow brings depth to the subject's expression.",
    medium: "Pencil on Paper",
    size: "18 × 24 inches"
  },
  {
    id: "2",
    title: "Organic Forms",
    category: "Abstract",
    image: artwork2,
    description: "An exploration of geometric and organic shapes in harmony. This abstract piece invites viewers to find their own meaning in the flowing forms.",
    medium: "Mixed Media",
    size: "24 × 18 inches"
  },
  {
    id: "3",
    title: "Botanical Study",
    category: "Nature",
    image: artwork3,
    description: "A meticulous study of natural forms, showcasing the intricate beauty found in botanical subjects through precise line work.",
    medium: "Graphite",
    size: "16 × 20 inches"
  },
  {
    id: "4",
    title: "Dreamscape",
    category: "Concept Art",
    image: artwork4,
    description: "A surreal conceptual piece blending reality and imagination. This work explores themes of fantasy, architecture, and the subconscious mind.",
    medium: "Ink and Pencil",
    size: "20 × 16 inches"
  },
  {
    id: "5",
    title: "Figure in Motion",
    category: "Portraits",
    image: artwork5,
    description: "A dynamic figure study emphasizing movement and form. Expressive lines capture the energy and grace of the human body.",
    medium: "Charcoal and Ink",
    size: "24 × 18 inches"
  },
  {
    id: "6",
    title: "Urban Perspective",
    category: "Architecture",
    image: artwork6,
    description: "A detailed architectural drawing exploring perspective and urban design. Clean lines convey the structured beauty of city spaces.",
    medium: "Technical Pen",
    size: "22 × 16 inches"
  }
];

export const categories = ["All", "Portraits", "Abstract", "Nature", "Concept Art", "Architecture"];

import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artwork4 from "@/assets/artwork-4.jpg";
import artwork5 from "@/assets/artwork-5.jpg";
import artwork6 from "@/assets/artwork-6.jpg";
import artwork7 from "@/assets/artwork-7.jpg";
import artwork8 from "@/assets/artwork-8.jpg";
import artwork9 from "@/assets/artwork-9.jpg";
import artwork10 from "@/assets/artwork-10.jpg";
import artwork11 from "@/assets/artwork-11.jpg";
import artwork12 from "@/assets/artwork-12.jpg";
import artwork13 from "@/assets/artwork-13.jpg";
import artwork14 from "@/assets/artwork-14.jpg";
import artwork15 from "@/assets/artwork-15.jpg";
import artwork16 from "@/assets/artwork-16.jpg";
import artwork17 from "@/assets/artwork-17.jpg";
import artwork18 from "@/assets/artwork-18.jpg";
import artwork19 from "@/assets/artwork-19.jpg";
import artwork20 from "@/assets/artwork-20.jpg";

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
    title: "The Writer's Smile",
    category: "Portraits",
    image: artwork1,
    description: "A colorful caricature portrait of a woman in traditional attire, captured mid-smile while writing at a small desk.",
    medium: "Watercolor and Ink",
    size: "A4"
  },
  {
    id: "2",
    title: "Classic Pencil Portrait",
    category: "Portraits",
    image: artwork2,
    description: "A monochrome graphite portrait of a young woman, highlighting delicate shading and texture in the hair and dress.",
    medium: "Pencil on Paper",
    size: "A4"
  },
  {
    id: "3",
    title: "Digital Artist Caricature",
    category: "Portraits",
    image: artwork3,
    description: "A playful caricature of a woman working at a keyboard, drawn with ink and colored with yellow pencil strokes for a dynamic effect.",
    medium: "Ink and Color Pencil",
    size: "A5"
  },
  {
    id: "4",
    title: "The Family Line",
    category: "Concept Art",
    image: artwork4,
    description: "A minimalist, abstract sketch of a seated family of four, focusing on form and color wash to convey relationship and posture.",
    medium: "Ink and Watercolor Wash",
    size: "A3"
  },
  {
    id: "5",
    title: "Aqua Bloom",
    category: "Abstract",
    image: artwork5,
    description: "A vibrant acrylic painting of a nude figure underwater, surrounded by bubbles and grasping a pink, lotus-like bloom. Rich deep blue and black textures dominate.",
    medium: "Acrylic on Canvas",
    size: "18 × 24 inches"
  },
  {
    id: "6",
    title: "Caricature of a Man",
    category: "Portraits",
    image: artwork6,
    description: "A detailed black and white ink sketch caricature of a man with large hair and a beard, wearing a plaid shirt.",
    medium: "Ink on Paper",
    size: "A4"
  },
  {
    id: "7",
    title: "Filmmaker's Whim",
    category: "Portraits",
    image: artwork7,
    description: "A playful caricature featuring a man with a film reel motif surrounding him, rendered in black and white ink sketch style.",
    medium: "Ink on Paper",
    size: "A4"
  },
  {
    id: "8",
    title: "Gentle Smile",
    category: "Portraits",
    image: artwork8,
    description: "A soft, monochrome ink wash portrait of a smiling woman in a headscarf, characterized by fluid lines and deep shading.",
    medium: "Ink Wash on Paper",
    size: "A4"
  },
  {
    id: "9",
    title: "Riverside Commute",
    category: "Nature",
    image: artwork9,
    description: "A bright watercolor landscape scene depicting people on a path near palm trees, with one person riding a bicycle. Features vibrant green, purple, and red hues.",
    medium: "Watercolor",
    size: "A3"
  },
  {
    id: "10",
    title: "Hometown Street",
    category: "Architecture",
    image: artwork10,
    description: "An expressive watercolor landscape focusing on an old village street lined with houses, using a mix of earth tones and strong brushwork.",
    medium: "Watercolor",
    size: "A3"
  }
];

export const categories = ["All", "Portraits", "Abstract", "Nature", "Concept Art", "Architecture"];
import { useState } from "react";
import Navigation from "@/components/Navigation";
import ArtworkCard from "@/components/ArtworkCard";
import { artworks, categories } from "@/data/artworks";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredArtworks = selectedCategory === "All" 
    ? artworks 
    : artworks.filter(artwork => artwork.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Gallery</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A curated collection of drawings and illustrations spanning various styles and subjects
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredArtworks.map((artwork, index) => (
              <div 
                key={artwork.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ArtworkCard {...artwork} />
              </div>
            ))}
          </div>
          
          {filteredArtworks.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No artworks found in this category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Gallery;

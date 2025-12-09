import { useState } from "react"
import { Link } from "react-router-dom"
import Navigation from "@/components/Navigation"
import ArtworkCard from "@/components/ArtworkCard"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGallery, useCategories } from "@/hooks"

const GalleryPublic = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  // Use React Query hooks
  const {
    data: galleryData,
    isLoading: galleryLoading,
    error: galleryError,
  } = useGallery(selectedCategory)

  const { data: categoriesData, isLoading: categoriesLoading } = useCategories()

  const artworks = galleryData?.data || []
  const categories = categoriesData?.data || []

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of artworks across various categories
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {artworks.length} {artworks.length === 1 ? "artwork" : "artworks"}
            </p>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              disabled={categoriesLoading}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {galleryError ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">
                Failed to load gallery items
              </p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : galleryLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : artworks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No artworks found in this category
              </p>
              <Button onClick={() => setSelectedCategory("")}>View All</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {artworks.map((artwork, index) => (
                <div
                  key={artwork._id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ArtworkCard
                    id={artwork._id}
                    title={artwork.title}
                    category={artwork.category.name}
                    image={artwork.image}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Linesofpaar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default GalleryPublic

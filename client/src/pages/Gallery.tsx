import { useState } from "react"
import Navigation from "@/components/Navigation"
import ArtworkCard from "@/components/ArtworkCard"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useGallery, useCategories } from "@/hooks"

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("")

  // Fetch data from API using React Query
  const { data: galleryData, isLoading: galleryLoading } =
    useGallery(selectedCategory)
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories()

  const artworks = galleryData?.data || []
  const categories = categoriesData?.data || []

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A curated collection of drawings and illustrations spanning
              various styles and subjects
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <Button
              variant={selectedCategory === "" ? "default" : "outline"}
              onClick={() => setSelectedCategory("")}
              className="animate-fade-in"
            >
              All
            </Button>
            {categoriesLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              categories.map((category, index) => (
                <Button
                  key={category?._id}
                  variant={
                    selectedCategory === category?._id ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category?._id)}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {category?.name}
                </Button>
              ))
            )}
          </div>

          {/* Gallery Grid */}
          {galleryLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-80 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : artworks.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                No artworks found in this category.
              </p>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory("")}
                className="mt-4"
              >
                View All Artworks
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {artworks.map((artwork, index) => (
                <div
                  key={artwork._id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ArtworkCard
                    id={artwork?._id}
                    title={artwork?.title}
                    category={artwork?.category?.name}
                    image={artwork?.image}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Gallery

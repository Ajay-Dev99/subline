import { Link } from "react-router-dom"
import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import ArtworkCard from "@/components/ui/ArtworkCard"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useGallery } from "@/hooks"

const Home = () => {
  // Fetch gallery items from API
  const { data, isLoading } = useGallery()

  // Show first 3 artworks as featured
  const allArtworks = data?.data || []
  const featuredArtworks = allArtworks.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Featured Works Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Featured Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A selection of recent pieces exploring various themes and
              techniques
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-80 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {featuredArtworks.map((artwork, index) => (
                <div
                  key={artwork?._id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
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

          <div className="text-center">
            <Link to="/gallery">
              <Button size="lg" variant="outline">
                View Full Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              The Art of Observation
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Every piece begins with a moment of seeing—truly seeing. Through
              careful observation and patient execution, I transform fleeting
              impressions into lasting works that invite contemplation and
              connection.
            </p>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More About My Process
              </Button>
            </Link>
          </div>
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

export default Home

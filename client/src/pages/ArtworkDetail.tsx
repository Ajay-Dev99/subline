import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGalleryItem, useGallery } from "@/hooks";

const ArtworkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Fetch current artwork
  const { data: artworkData, isLoading, error } = useGalleryItem(id || "");
  
  // Fetch all artworks for navigation
  const { data: allArtworksData } = useGallery();
  
  const artwork = artworkData?.data;
  const allArtworks = allArtworksData?.data || [];
  
  // Find current index for navigation
  const currentIndex = allArtworks.findIndex(a => a?._id === id);
  const prevArtwork = currentIndex > 0 ? allArtworks[currentIndex - 1] : null;
  const nextArtwork = currentIndex < allArtworks.length - 1 ? allArtworks[currentIndex + 1] : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <Skeleton className="h-8 w-32 mb-8" />
              <div className="grid lg:grid-cols-2 gap-12">
                <Skeleton className="h-96 w-full" />
                <div className="space-y-6">
                  <Skeleton className="h-12 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Artwork not found</h2>
          <Link to="/gallery">
            <Button>Return to Gallery</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Link to="/gallery" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Gallery
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Artwork Image */}
              <div className="relative group animate-fade-in">
                <div className="bg-muted rounded-sm overflow-hidden">
                  <img 
                    src={artwork?.image} 
                    alt={artwork?.title}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              
              {/* Artwork Details */}
              <div className="space-y-8 animate-fade-in lg:pt-12" style={{ animationDelay: '0.2s' }}>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-3">
                    {artwork?.category?.name}
                  </p>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                    {artwork?.title}
                  </h1>
                  {artwork?.description && (
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {artwork?.description}
                    </p>
                  )}
                </div>
                
                <div className="border-t border-border pt-8 space-y-4">
                  {artwork?.medium && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Medium</span>
                      <span className="font-medium">{artwork?.medium}</span>
                    </div>
                  )}
                  {artwork?.size && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size</span>
                      <span className="font-medium">{artwork?.size}</span>
                    </div>
                  )}
                </div>
                
                {/* Navigation */}
                <div className="flex gap-4 pt-8">
                  {prevArtwork && (
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/artwork/${prevArtwork?._id}`)}
                      className="flex-1"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  {nextArtwork && (
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/artwork/${nextArtwork?._id}`)}
                      className="flex-1"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtworkDetail;

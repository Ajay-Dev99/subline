import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen mt-5 pt-5 pb-5 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 "
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15
        }}
      />
      
      {/* Content */}
      <div className="mt-5 pt-5 container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-balance">
            Lines. Emotions. Stories.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance font-light">
            A journey through contemporary art expressed through sketches, illustrations, and drawings
          </p>
          
          <div className="pt-6">
            <Link to="/gallery">
              <Button 
                size="lg" 
                className="px-8 py-6 mt-5 text-base font-medium hover:scale-105 transition-transform"
              >
                Explore Gallery
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-11 left-1/2 -translate-x-1/2 animate-bounce mb-5 pb-5">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-2 bg-foreground/30 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

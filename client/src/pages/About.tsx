import Navigation from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">About the Artist</h1>
            </div>
            
            <div className="space-y-8 text-lg leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-muted-foreground">
                Welcome to my creative journey. I am a contemporary artist specializing in pencil drawings, 
                illustrations, and mixed media works that explore the intersection of emotion, form, and narrative.
              </p>
              
              <p className="text-muted-foreground">
                My work is driven by a fascination with the human experience and the natural world. Through 
                meticulous line work and careful attention to light and shadow, I seek to capture moments of 
                contemplation, beauty, and wonder that might otherwise go unnoticed.
              </p>
              
              <p className="text-muted-foreground">
                Each piece begins with observation and evolves through a process of exploration and refinement. 
                I believe that art has the power to connect us with deeper truths about ourselves and the world 
                around us, creating bridges between the seen and unseen, the known and the imagined.
              </p>
              
              <div className="pt-8 border-t border-border">
                <h2 className="text-2xl font-serif font-semibold mb-4">Education & Exhibitions</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>• BFA in Fine Arts, Contemporary Drawing Emphasis</p>
                  <p>• Featured in multiple group exhibitions</p>
                  <p>• Works held in private collections</p>
                  <p>• Ongoing exploration of new techniques and mediums</p>
                </div>
              </div>
              
              <div className="pt-8">
                <h2 className="text-2xl font-serif font-semibold mb-4">Philosophy</h2>
                <p className="text-muted-foreground italic">
                  "Art is not what you see, but what you make others see. Through my drawings, I invite 
                  viewers to pause, reflect, and discover their own stories within the lines and shadows."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;

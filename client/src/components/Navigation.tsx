import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-semibold tracking-tight hover:opacity-70 transition-opacity">
            Artist Portfolio
          </Link>
          
          <ul className="flex items-center gap-8">
            <li>
              <Link 
                to="/" 
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive('/') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/gallery" 
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive('/gallery') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive('/about') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive('/contact') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

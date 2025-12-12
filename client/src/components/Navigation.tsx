import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { Menu, X, Play, Pause } from "lucide-react"
import musicFile from "../assets/music/dark-ambient.mp3"
// 1. Create the audio instance OUTSIDE the component. 
// This prevents it from being destroyed/reset when you change pages.
const backgroundMusic = new Audio(musicFile);
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const [isPlaying, setIsPlaying] = useState(!backgroundMusic.paused)

  const isActive = (path: string) => location.pathname === path

  useEffect(() => {

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    backgroundMusic.addEventListener('play', handlePlay);
    backgroundMusic.addEventListener('pause', handlePause);

 
    return () => {
      backgroundMusic.removeEventListener('play', handlePlay);
      backgroundMusic.removeEventListener('pause', handlePause);
    }
  }, [])

  const toggleMusic = () => {
    if (isPlaying) {
      backgroundMusic.pause();
    } else {
      backgroundMusic.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-serif font-semibold tracking-tight hover:opacity-70 transition-opacity"
          >
            Lines of Paar
          </Link>

          <div className="flex items-center gap-4">
            
            {/* Music Toggle Button */}
            <button
              onClick={toggleMusic}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/10 hover:bg-secondary/20 transition-all text-sm font-medium text-muted-foreground hover:text-foreground"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span className="hidden md:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span className="hidden md:inline">Play Music</span>
                </>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Navigation Links */}
            <ul
              className={`
                ${isMenuOpen ? "flex flex-col absolute top-full left-0 right-0 w-full bg-background/95 backdrop-blur-sm border-b border-border shadow-lg" : "hidden"}
                md:flex md:items-center md:static md:w-auto md:bg-transparent md:shadow-none md:border-none md:p-0 md:flex-row gap-8
              `}
            >
              <li className="px-6 py-3 md:p-0" onClick={() => setIsMenuOpen(false)}>
                <Link
                  to="/"
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    isActive("/")
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li className="px-6 py-3 md:p-0" onClick={() => setIsMenuOpen(false)}>
                <Link
                  to="/gallery"
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    isActive("/gallery")
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Gallery
                </Link>
              </li>
              <li className="px-6 py-3 md:p-0" onClick={() => setIsMenuOpen(false)}>
                <Link
                  to="/about"
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    isActive("/about")
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  About
                </Link>
              </li>
              <li className="px-6 py-3 md:p-0" onClick={() => setIsMenuOpen(false)}>
                <Link
                  to="/contact"
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    isActive("/contact")
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
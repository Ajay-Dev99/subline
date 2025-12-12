import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

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

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

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
    </nav>
  )
}

export default Navigation
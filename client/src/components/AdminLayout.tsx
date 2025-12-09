import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home, Image, FolderTree } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <nav className="flex gap-2 ml-8">
                <Link to="/admin/categories">
                  <Button
                    variant={
                      isActive("/admin/categories") ? "default" : "ghost"
                    }
                    size="sm"
                  >
                    <FolderTree className="w-4 h-4 mr-2" />
                    Categories
                  </Button>
                </Link>
                <Link to="/admin/gallery">
                  <Button
                    variant={isActive("/admin/gallery") ? "default" : "ghost"}
                    size="sm"
                  >
                    <Image className="w-4 h-4 mr-2" />
                    Gallery
                  </Button>
                </Link>
              </nav>
            </div>
            <Link to="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  )
}

export default AdminLayout

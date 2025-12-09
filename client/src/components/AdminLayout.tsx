import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home, Image, FolderTree, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { admin, logout } = useAuth()

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

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
            <div className="flex items-center gap-3">
              {admin && (
                <span className="text-sm text-muted-foreground">
                  {admin.username}
                </span>
              )}
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Site
                </Button>
              </Link>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  )
}

export default AdminLayout

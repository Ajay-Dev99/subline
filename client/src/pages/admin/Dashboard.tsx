import { Link } from "react-router-dom"
import AdminLayout from "@/components/AdminLayout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderTree, Image, ArrowRight } from "lucide-react"

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your art portfolio content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FolderTree className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Categories</CardTitle>
                  <CardDescription>Manage artwork categories</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Create, edit, and organize categories for your artwork
                collection.
              </p>
              <Link to="/admin/categories">
                <Button className="w-full">
                  Manage Categories
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Image className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Gallery</CardTitle>
                  <CardDescription>Manage your artworks</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Upload, edit, and manage your artwork gallery with images and
                details.
              </p>
              <Link to="/admin/gallery">
                <Button className="w-full">
                  Manage Gallery
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium">Create Categories First</p>
                <p className="text-sm text-muted-foreground">
                  Set up your categories before adding artworks to organize your
                  gallery effectively.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium">Image Optimization</p>
                <p className="text-sm text-muted-foreground">
                  Images are automatically optimized and compressed when
                  uploaded to Cloudinary.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium">Automatic Cleanup</p>
                <p className="text-sm text-muted-foreground">
                  Old images are automatically deleted from Cloudinary when you
                  update or delete artworks.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export default Dashboard

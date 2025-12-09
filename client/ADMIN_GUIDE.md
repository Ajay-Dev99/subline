# Admin Panel Guide

## Overview

The admin panel provides a complete content management system for your art portfolio. Manage categories and gallery items through an intuitive interface.

## Access Admin Panel

Navigate to: `http://localhost:5173/admin`

## Admin Routes

- `/admin` - Dashboard with overview and quick access
- `/admin/categories` - Manage artwork categories
- `/admin/gallery` - Manage gallery items and images

## Features

### 📁 Category Management

**Location:** `/admin/categories`

**Features:**

- ✅ Create new categories
- ✅ Edit existing categories
- ✅ Delete categories
- ✅ View all categories in a table
- ✅ Real-time updates

**Actions:**

1. **Create Category:** Click "Add Category" button, enter name, and save
2. **Edit Category:** Click edit icon, modify name, and save
3. **Delete Category:** Click delete icon, confirm deletion

### 🎨 Gallery Management

**Location:** `/admin/gallery`

**Features:**

- ✅ Upload artwork images to Cloudinary
- ✅ Create gallery items with full details
- ✅ Edit existing artworks
- ✅ Delete artworks (auto-removes images from Cloudinary)
- ✅ Image preview before upload
- ✅ Card-based gallery view
- ✅ Category filtering

**Form Fields:**

- **Title\*** - Artwork title (required)
- **Category\*** - Select from existing categories (required)
- **Image\*** - Upload image file (required)
- **Description** - Detailed artwork description
- **Medium** - Art medium (e.g., "Oil on Canvas")
- **Size** - Dimensions (e.g., "24 × 36 inches")

**Actions:**

1. **Add Artwork:**

   - Click "Add Artwork" button
   - Fill in the form
   - Select image file (auto-previews)
   - Click "Create" (image uploads to Cloudinary)

2. **Edit Artwork:**

   - Click "Edit" on any artwork card
   - Modify fields as needed
   - Optionally upload new image (old one auto-deleted)
   - Click "Update"

3. **Delete Artwork:**
   - Click "Delete" on artwork card
   - Confirm deletion
   - Image automatically removed from Cloudinary

## Setup Instructions

### 1. Configure API Connection

Create `.env` file in the Client folder:

```env
VITE_API_URL=http://localhost:3000/api
```

### 2. Ensure Backend is Running

Make sure your backend server is running with Cloudinary configured:

```bash
cd server
npm start
```

### 3. Start Frontend

```bash
cd Client
npm run dev
```

### 4. Access Admin Panel

Open browser and navigate to:

```
http://localhost:5173/admin
```

## Image Upload Process

### Automatic Optimization

All uploaded images are automatically:

- Compressed with `quality: auto:good`
- Converted to optimal format (WebP for modern browsers)
- Resized to max 2000x2000px (maintains aspect ratio)
- Limited to 5MB file size

### Upload Flow

1. User selects image file
2. Preview shown immediately
3. On form submit, image uploads to Cloudinary
4. Cloudinary URL returned
5. Gallery item created with image URL

### Cleanup

- **On Update:** If new image uploaded, old image deleted from Cloudinary
- **On Delete:** Gallery item and associated image both deleted

## Best Practices

### Categories

1. Create all categories before adding artworks
2. Use clear, descriptive category names
3. Keep category count manageable (5-10 recommended)

### Gallery Items

1. Use high-quality images (but under 5MB)
2. Write descriptive titles and descriptions
3. Include medium and size for context
4. Preview images before uploading

### Performance

1. Compress large images before upload when possible
2. Use appropriate image dimensions (2000px max)
3. Avoid uploading same image multiple times

## Keyboard Shortcuts

- **Enter** in category name field: Creates/updates category
- **Escape**: Closes dialogs

## Error Handling

The admin panel includes comprehensive error handling:

- Form validation messages
- Upload progress indicators
- Success/error toast notifications
- Network error handling

## Common Operations

### Adding Multiple Artworks

1. Navigate to `/admin/gallery`
2. Click "Add Artwork" for each piece
3. Upload optimized images
4. Fill in all required fields
5. Images automatically organized by category

### Updating Category for Artwork

1. Edit the artwork
2. Select new category from dropdown
3. Save changes

### Replacing Artwork Image

1. Edit the artwork
2. Select new image file
3. Old image automatically deleted on save
4. New image uploaded to Cloudinary

## Data Structure

### Category

```typescript
{
  _id: string
  name: string
  createdAt: string
  updatedAt: string
}
```

### Gallery Item

```typescript
{
  _id: string;
  title: string;
  category: {
    _id: string;
    name: string;
  };
  image: string; // Cloudinary URL
  description?: string;
  medium?: string;
  size?: string;
  createdAt: string;
  updatedAt: string;
}
```

## Troubleshooting

### Images Not Uploading

- Check Cloudinary credentials in backend `.env`
- Verify file size is under 5MB
- Ensure file is valid image format

### Categories Not Loading

- Confirm backend server is running
- Check API URL in frontend `.env`
- Verify MongoDB connection

### Changes Not Appearing

- Check browser console for errors
- Verify API responses in Network tab
- Ensure data validation passes

## Security Notes

> **Important:** This admin panel currently has no authentication. In production, you should:
>
> - Add authentication (JWT, OAuth, etc.)
> - Implement authorization/roles
> - Secure admin routes
> - Add CSRF protection
> - Rate limit API endpoints

## Future Enhancements

Potential improvements:

- [ ] Authentication system
- [ ] Bulk upload for multiple images
- [ ] Image cropping/editing tools
- [ ] Drag-and-drop reordering
- [ ] Analytics dashboard
- [ ] Search and filtering
- [ ] Export/import functionality

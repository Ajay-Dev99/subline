const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'subline-gallery',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        transformation: [
            {
                width: 2000,
                height: 2000,
                crop: 'limit',
                quality: 'auto:good',
                fetch_format: 'auto'
            }
        ]
    }
});

// Multer upload instance
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Helper function to delete image from Cloudinary
const deleteImage = async (imageUrl) => {
    try {
        // Extract public_id from Cloudinary URL
        const urlParts = imageUrl.split('/');
        const fileWithExtension = urlParts[urlParts.length - 1];
        const publicId = `subline-gallery/${fileWithExtension.split('.')[0]}`;

        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
};

// Helper function to get optimized image URL
const getOptimizedUrl = (publicId, options = {}) => {
    const defaultOptions = {
        quality: 'auto:good',
        fetch_format: 'auto',
        ...options
    };

    return cloudinary.url(publicId, defaultOptions);
};

module.exports = {
    cloudinary,
    upload,
    deleteImage,
    getOptimizedUrl
};


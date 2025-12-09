const { deleteImage } = require('../config/cloudinary');
const Gallery = require('../models/Gallery');

// Upload single image
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: {
                url: req.file.path,
                filename: req.file.filename,
                size: req.file.size
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error uploading image',
            error: error.message
        });
    }
};

// Upload multiple images
exports.uploadMultipleImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No image files provided'
            });
        }

        const uploadedImages = req.files.map(file => ({
            url: file.path,
            filename: file.filename,
            size: file.size
        }));

        res.status(200).json({
            success: true,
            message: `${uploadedImages.length} images uploaded successfully`,
            data: uploadedImages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error uploading images',
            error: error.message
        });
    }
};

// Delete image from Cloudinary
exports.deleteImage = async (req, res) => {
    try {
        const { imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                message: 'Image URL is required'
            });
        }

        const result = await deleteImage(imageUrl);

        res.status(200).json({
            success: true,
            message: 'Image deleted successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting image',
            error: error.message
        });
    }
};

// Delete old image when updating gallery item
exports.replaceGalleryImage = async (galleryId, newImageUrl) => {
    try {
        const gallery = await Gallery.findById(galleryId);

        if (gallery && gallery.image) {
            // Delete old image from Cloudinary
            await deleteImage(gallery.image);
        }

        return true;
    } catch (error) {
        console.error('Error replacing gallery image:', error);
        return false;
    }
};


const Gallery = require('../models/Gallery');

// Get all gallery items
exports.getAllGallery = async (req, res) => {
    try {
        const { category } = req.query;

        let query = {};
        if (category) {
            query.category = category;
        }

        const gallery = await Gallery.find(query)
            .populate('category', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: gallery.length,
            data: gallery
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching gallery items',
            error: error.message
        });
    }
};

// Get single gallery item
exports.getGalleryById = async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id)
            .populate('category', 'name');

        if (!gallery) {
            return res.status(404).json({
                success: false,
                message: 'Gallery item not found'
            });
        }

        res.status(200).json({
            success: true,
            data: gallery
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching gallery item',
            error: error.message
        });
    }
};

// Create gallery item
exports.createGallery = async (req, res) => {
    try {
        const { title, category, image, description, medium, size } = req.body;

        if (!title || !category || !image) {
            return res.status(400).json({
                success: false,
                message: 'Title, category, and image are required'
            });
        }

        const gallery = await Gallery.create({
            title,
            category,
            image,
            description,
            medium,
            size
        });

        const populatedGallery = await Gallery.findById(gallery._id)
            .populate('category', 'name');

        res.status(201).json({
            success: true,
            data: populatedGallery
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating gallery item',
            error: error.message
        });
    }
};

// Update gallery item
exports.updateGallery = async (req, res) => {
    try {
        const { title, category, image, description, medium, size } = req.body;

        const gallery = await Gallery.findByIdAndUpdate(
            req.params.id,
            { title, category, image, description, medium, size },
            { new: true, runValidators: true }
        ).populate('category', 'name');

        if (!gallery) {
            return res.status(404).json({
                success: false,
                message: 'Gallery item not found'
            });
        }

        res.status(200).json({
            success: true,
            data: gallery
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating gallery item',
            error: error.message
        });
    }
};

// Delete gallery item
exports.deleteGallery = async (req, res) => {
    try {
        const gallery = await Gallery.findByIdAndDelete(req.params.id);

        if (!gallery) {
            return res.status(404).json({
                success: false,
                message: 'Gallery item not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Gallery item deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting gallery item',
            error: error.message
        });
    }
};


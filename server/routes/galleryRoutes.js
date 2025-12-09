const express = require('express');
const router = express.Router();
const {
    getAllGallery,
    getGalleryById,
    createGallery,
    updateGallery,
    deleteGallery
} = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getAllGallery);
router.get('/:id', getGalleryById);

// Protected routes (admin only)
router.post('/', protect, createGallery);
router.put('/:id', protect, updateGallery);
router.delete('/:id', protect, deleteGallery);

module.exports = router;


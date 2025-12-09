const express = require('express');
const router = express.Router();
const {
    getAllGallery,
    getGalleryById,
    createGallery,
    updateGallery,
    deleteGallery
} = require('../controllers/galleryController');

// GET all gallery items (with optional category filter: ?category=categoryId)
router.get('/', getAllGallery);

// GET single gallery item
router.get('/:id', getGalleryById);

// POST create gallery item
router.post('/', createGallery);

// PUT update gallery item
router.put('/:id', updateGallery);

// DELETE gallery item
router.delete('/:id', deleteGallery);

module.exports = router;


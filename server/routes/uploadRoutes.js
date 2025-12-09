const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const {
    uploadImage,
    uploadMultipleImages,
    deleteImage
} = require('../controllers/uploadController');

// Upload single image
router.post('/single', upload.single('image'), uploadImage);

// Upload multiple images (max 10)
router.post('/multiple', upload.array('images', 10), uploadMultipleImages);

// Delete image
router.delete('/', deleteImage);

module.exports = router;


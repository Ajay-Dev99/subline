const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const {
    uploadImage,
    uploadMultipleImages,
    deleteImage
} = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');

// All upload routes are protected (admin only)
router.post('/single', protect, upload.single('image'), uploadImage);
router.post('/multiple', protect, upload.array('images', 10), uploadMultipleImages);
router.delete('/', protect, deleteImage);

module.exports = router;


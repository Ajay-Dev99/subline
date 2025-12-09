const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Subline Art Portfolio API',
        endpoints: {
            auth: '/api/auth',
            categories: '/api/categories',
            gallery: '/api/gallery',
            upload: '/api/upload'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes (to be created later)
// const authRoutes = require('./routes/auth');
// const channelRoutes = require('./routes/channels');
// const contentRoutes = require('./routes/content');
// const analyticsRoutes = require('./routes/analytics');

// Initialize Express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Logging
app.use(cors()); // CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to YouTube Otomasyon Sistemi API' });
});

// Use routes (to be implemented)
// app.use('/api/auth', authRoutes);
// app.use('/api/channels', channelRoutes);
// app.use('/api/content', contentRoutes);
// app.use('/api/analytics', analyticsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

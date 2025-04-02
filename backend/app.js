const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import database and redis connections
const { sequelize, testConnection: testDbConnection } = require('./config/database');
const { testConnection: testRedisConnection } = require('./config/redis');

// Import routes
const authRoutes = require('./routes/auth');
// Diğer rotalar kullanıma hazır olduğunda eklenecek
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

// Test database and redis connections
testDbConnection();
testRedisConnection();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'YouTube Otomasyon Sistemi API - Çalışıyor' });
});

// Use routes
app.use('/api/auth', authRoutes);
// app.use('/api/channels', channelRoutes);
// app.use('/api/content', contentRoutes);
// app.use('/api/analytics', analyticsRoutes);

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint bulunamadı' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Sunucu hatası',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

module.exports = app;

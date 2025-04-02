const Bull = require('bull');
const dotenv = require('dotenv');
const winston = require('winston');

// Load environment variables
dotenv.config();

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/worker-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/worker-combined.log' })
  ]
});

// Redis connection configuration
const redisConfig = {
  redis: {
    host: process.env.REDIS_HOST || 'redis',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD
  }
};

// Define job queues
const contentPlanningQueue = new Bull('content-planning', redisConfig);
const contentCreationQueue = new Bull('content-creation', redisConfig);
const thumbnailGenerationQueue = new Bull('thumbnail-generation', redisConfig);
const videoUploadQueue = new Bull('video-upload', redisConfig);
const analyticsQueue = new Bull('analytics', redisConfig);
const competitorAnalysisQueue = new Bull('competitor-analysis', redisConfig);
const notificationQueue = new Bull('notification', redisConfig);

// Import job processors (to be implemented)
// const contentPlanningProcessor = require('./processors/contentPlanning');
// const contentCreationProcessor = require('./processors/contentCreation');
// const thumbnailGenerationProcessor = require('./processors/thumbnailGeneration');
// const videoUploadProcessor = require('./processors/videoUpload');
// const analyticsProcessor = require('./processors/analytics');
// const competitorAnalysisProcessor = require('./processors/competitorAnalysis');
// const notificationProcessor = require('./processors/notification');

// Process jobs
// contentPlanningQueue.process(contentPlanningProcessor);
// contentCreationQueue.process(contentCreationProcessor);
// thumbnailGenerationQueue.process(thumbnailGenerationProcessor);
// videoUploadQueue.process(videoUploadProcessor);
// analyticsQueue.process(analyticsProcessor);
// competitorAnalysisQueue.process(competitorAnalysisProcessor);
// notificationQueue.process(notificationProcessor);

// Event listeners for all queues
const queues = [
  contentPlanningQueue,
  contentCreationQueue,
  thumbnailGenerationQueue,
  videoUploadQueue,
  analyticsQueue,
  competitorAnalysisQueue,
  notificationQueue
];

queues.forEach(queue => {
  queue.on('completed', (job) => {
    logger.info(`Job ${job.id} completed in queue ${queue.name}`);
  });

  queue.on('failed', (job, err) => {
    logger.error(`Job ${job.id} failed in queue ${queue.name}: ${err.message}`);
  });

  queue.on('error', (error) => {
    logger.error(`Error in queue ${queue.name}: ${error.message}`);
  });
});

logger.info('Worker service started');
logger.info('Job queues initialized and listening for jobs');

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down worker gracefully');
  
  // Close all queues
  await Promise.all(queues.map(queue => queue.close()));
  
  logger.info('Worker shutdown complete');
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down worker gracefully');
  
  // Close all queues
  await Promise.all(queues.map(queue => queue.close()));
  
  logger.info('Worker shutdown complete');
  process.exit(0);
});

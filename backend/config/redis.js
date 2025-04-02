const Redis = require('ioredis');
const dotenv = require('dotenv');

dotenv.config();

// Redis bağlantı bilgileri
const redisConfig = {
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || 'ytautoredis',
  retryStrategy: (times) => {
    // Yeniden bağlanma stratejisi
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
};

// Redis istemcisi oluşturma
const redisClient = new Redis(redisConfig);

// Redis bağlantısını test etme
const testConnection = async () => {
  try {
    await redisClient.ping();
    console.log('Redis bağlantısı başarıyla kuruldu.');
  } catch (error) {
    console.error('Redis\'e bağlanılamadı:', error);
  }
};

redisClient.on('error', (err) => {
  console.error('Redis bağlantı hatası:', err);
});

redisClient.on('connect', () => {
  console.log('Redis\'e bağlandı');
});

module.exports = {
  redisClient,
  redisConfig,
  testConnection
};

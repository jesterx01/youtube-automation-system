const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// PostgreSQL bağlantı bilgileri
const sequelize = new Sequelize(
  process.env.DB_NAME || 'youtube_automation',
  process.env.DB_USER || 'ytauto',
  process.env.DB_PASSWORD || 'ytautopass',
  {
    host: process.env.DB_HOST || 'postgres',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Veritabanı bağlantısını test etme
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Veritabanı bağlantısı başarıyla kuruldu.');
  } catch (error) {
    console.error('Veritabanına bağlanılamadı:', error);
  }
};

module.exports = {
  sequelize,
  testConnection
};

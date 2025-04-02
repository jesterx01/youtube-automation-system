// Config index file to export all configurations
const database = require('./database');
const redis = require('./redis');
const jwt = require('./jwt');

module.exports = {
  database,
  redis,
  jwt
};

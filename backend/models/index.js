const { sequelize } = require('../config/database');
const User = require('./User');
const Channel = require('./Channel');
const UserChannel = require('./UserChannel');

// İlişkileri tanımlama

// User ve Channel arasında çoktan çoğa ilişki (UserChannel ile)
User.belongsToMany(Channel, { through: UserChannel, foreignKey: 'user_id' });
Channel.belongsToMany(User, { through: UserChannel, foreignKey: 'channel_id' });

// UserChannel'ın asıl modellere referansları
UserChannel.belongsTo(User, { foreignKey: 'user_id' });
UserChannel.belongsTo(Channel, { foreignKey: 'channel_id' });

// Tüm modelleri dışa aktar
module.exports = {
  sequelize,
  User,
  Channel,
  UserChannel
};

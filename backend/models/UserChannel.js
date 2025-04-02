const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserChannel = sequelize.define('UserChannel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  channel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'channels',
      key: 'id'
    }
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'editor',
    validate: {
      isIn: [['owner', 'admin', 'editor', 'viewer']]
    }
  },
  permissions: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  tableName: 'user_channels',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'channel_id']
    }
  ]
});

module.exports = UserChannel;

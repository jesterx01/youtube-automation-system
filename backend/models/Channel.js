const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Channel = sequelize.define('Channel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  channel_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  thumbnail_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  google_sheets_id: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  youtube_api_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  google_sheets_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  subscriber_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  video_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'active',
    validate: {
      isIn: [['active', 'inactive', 'suspended']]
    }
  },
  upload_schedule: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  settings: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  tableName: 'channels',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Channel;

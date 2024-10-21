// backend/config/config.js
require('dotenv').config();

module.exports = {
    CONDUCTOR_URL: process.env.CONDUCTOR_URL || 'http://localhost:5000/api/metadata/',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/workflow-designer',
};

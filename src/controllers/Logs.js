const LogsModel = require('../models/Logs');
require('dotenv').config();

module.exports = {
  async getAll(request, response) {
    try {
      const result = await LogsModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Logs getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};

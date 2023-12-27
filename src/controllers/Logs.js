const LogsModel = require('../models/Logs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

module.exports = {
  async create(request, response) {
    try {
      const log = request.body;
      log.id = uuidv4();

      await LogsModel.create(log);
      return response.status(201).json({ id: log.id });
    } catch (err) {
      console.error(`Log creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

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

  async getByResponsavel(request, response) {
    try {
      const { responsavel } = request.params;
      const result = await LogsModel.getByResponsavel(responsavel);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Log getByResponsavel failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await LogsModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Log getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await LogsModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Log getByFields failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const log = request.body;
      const stillExistFieldsToUpdate = Object.values(log).length > 0;
      if (stillExistFieldsToUpdate) {
        await LogsModel.updateById(id, log);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`Log update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await LogsModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Log delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};

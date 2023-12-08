const ModalidadeModel = require('../models/Modalidade');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

module.exports = {
  async create(request, response) {
    try {
      const modalidade = request.body;
      modalidade.id = uuidv4();

      await ModalidadeModel.create(modalidade);
      return response.status(201).json({ id: modalidade.id });
    } catch (err) {
      console.error(`Modalidade creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await ModalidadeModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Modalidade getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await ModalidadeModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Modalidade getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const modalidade = request.body;
      const stillExistFieldsToUpdate = Object.values(modalidade).length > 0;
      if (stillExistFieldsToUpdate) {
        await ModalidadeModel.updateById(id, modalidade);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`Modalidade update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await ModalidadeModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Modalidade delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};

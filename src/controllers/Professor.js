const ProfessorModel = require('../models/Professor');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

module.exports = {
  async create(request, response) {
    try {
      const professor = request.body;
      professor.id = uuidv4();

      await ProfessorModel.create(professor);
      return response.status(201).json({ id: professor.id });
    } catch (err) {
      console.error(`Professor creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await ProfessorModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Professor getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByUsuario(request, response) {
    try {
      const { usuario } = request.params;
      const result = await ProfessorModel.getByUsuario(usuario);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Professor getByUsuario failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { usuario } = request.params;
      const professor = request.body;
      const stillExistFieldsToUpdate = Object.values(professor).length > 0;
      if (stillExistFieldsToUpdate) {
        await ProfessorModel.updateByUsuario(usuario, professor);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`Professor update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { usuario } = request.params;
      await ProfessorModel.deleteByUsuario(usuario);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Professor delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};

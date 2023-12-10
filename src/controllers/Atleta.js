const AtletaModel = require('../models/Atleta');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

module.exports = {
  async create(request, response) {
    try {
      const atleta = request.body;
      atleta.id = uuidv4();

      await AtletaModel.create(atleta);
      return response.status(201).json({ id: atleta.id });
    } catch (err) {
      console.error(`Atleta creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await AtletaModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Atleta getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByUsuario(request, response) {
    try {
      const { usuario } = request.params;
      const result = await AtletaModel.getByUsuario(usuario);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Atleta getByUsuario failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await AtletaModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Atleta getByFields failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { usuario } = request.params;
      const atleta = request.body;
      const stillExistFieldsToUpdate = Object.values(atleta).length > 0;
      if (stillExistFieldsToUpdate) {
        await AtletaModel.updateByUsuario(usuario, atleta);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`Atleta update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { usuario } = request.params;
      await AtletaModel.deleteByUsuario(usuario);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Atleta delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

};

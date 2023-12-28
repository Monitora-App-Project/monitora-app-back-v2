const TreinadorModel = require("../models/Treinador");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

module.exports = {
  async create(request, response) {
    try {
      const treinador = request.body;
      treinador.id = uuidv4();

      await TreinadorModel.create(treinador);
      return response.status(201).json({ id: treinador.id });
    } catch (err) {
      console.error(`Treinador creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await TreinadorModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Treinador getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await TreinadorModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Treinador getById failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await TreinadorModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Treinador getByFields failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const treinador = request.body;
      const stillExistFieldsToUpdate = Object.values(treinador).length > 0;
      if (stillExistFieldsToUpdate) {
        await TreinadorModel.updateById(id, treinador);
      }
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Treinador update failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await TreinadorModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Treinador delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

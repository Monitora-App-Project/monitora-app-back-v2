const OcorrenciasModel = require("../models/Ocorrencias");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

module.exports = {
  async create(request, response) {
    try {
      const ocorrencia = request.body;
      ocorrencia.id = uuidv4();

      await OcorrenciasModel.create(ocorrencia);
      return response.status(201).json({ id: ocorrencia.id });
    } catch (err) {
      console.error(`Ocorrencia creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await OcorrenciasModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Ocorrencias getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByResponsavel(request, response) {
    try {
      const { responsavel } = request.params;
      const result = await OcorrenciasModel.getByResponsavel(responsavel);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Ocorrencia getByResponsavel failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await OcorrenciasModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Ocorrencia getById failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await OcorrenciasModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Ocorrencia getByFields failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const ocorrencia = request.body;
      const stillExistFieldsToUpdate = Object.values(ocorrencia).length > 0;
      if (stillExistFieldsToUpdate) {
        await OcorrenciasModel.updateById(id, ocorrencia);
      } else return response.status(200).json("Não há dados para serem alterados");
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Ocorrencia update failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await OcorrenciasModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Ocorrencia delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

const CMJModel = require("../models/CMJ");
const { calcularMedia, calcularDesvioPadrao } = require("../utils/utilities");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

module.exports = {
  async create(request, response) {
    try {
      const cmj = request.body;
      cmj.id = uuidv4();
      const valoresCMJ = [cmj.cmj1, cmj.cmj2, cmj.cmj3];
      cmj.mediaCmj = calcularMedia(valoresCMJ);
      cmj.desvPadCmj = calcularDesvioPadrao(valoresCMJ, cmj.mediaCmj);
      cmj.coefVariacaoCmj = (cmj.desvPadCmj / cmj.mediaCmj) * 100;
      cmj.minCmj = Math.min(...valoresCMJ);
      cmj.maxCmj = Math.max(...valoresCMJ);

      await CMJModel.create(cmj);
      return response.status(201).json({ id: cmj.id });
    } catch (err) {
      console.error(`CMJ creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await CMJModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`CMJ getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByTeste(request, response) {
    try {
      const { idTeste } = request.params;
      const result = await CMJModel.getByTeste(idTeste);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`CMJ getByTeste failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await CMJModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`CMJ getByFields failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByDate(request, response) {
    try {
      const fields = request.body;
      const result = await CMJModel.getByDate(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`CMJ getByDate failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async update(request, response) {
    try {
      const { idTeste } = request.params;
      const cmj = request.body;
      const stillExistFieldsToUpdate = Object.values(cmj).length > 0;
      if (stillExistFieldsToUpdate) {
        await CMJModel.updateByTeste(idTeste, cmj);
      }
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`CMJ update failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async delete(request, response) {
    try {
      const { idTeste } = request.params;
      await CMJModel.deleteByTeste(idTeste);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`CMJ delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

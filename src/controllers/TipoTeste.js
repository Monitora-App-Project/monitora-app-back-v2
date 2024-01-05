const TipoTesteModel = require("../models/TipoTeste");

require("dotenv").config();

module.exports = {
  async create(request, response) {
    try {
      const tipoTeste = request.body;

      const idTeste = await TipoTesteModel.create(tipoTeste);
      return response.status(201).json({
        testeCriado : tipoTeste.nome,
        idTeste : idTeste 
      });
    } catch (err) {
      console.error(`TipoTeste creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await TipoTesteModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`TipoTeste getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await TipoTesteModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`TipoTeste getById failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async updateById(request, response) {
    try {
      const { id } = request.params;
      const tipoTeste = request.body;
      const tipoTesteAntigo = await TipoTesteModel.getById(id)
      const stillExistFieldsToUpdate = Object.values(tipoTeste).length > 0;
      if (stillExistFieldsToUpdate) {
        await TipoTesteModel.updateById(id, tipoTeste);
      } else {
        return response.status(200).json("Não há dados para serem alterados");
      }
      return response.status(200).json({
        nomeAntigo : tipoTesteAntigo[0].nome,
        nomeNovo : tipoTeste.nome
      });
      
    } catch (err) {
      console.error(`TipoTeste updateById failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await TipoTesteModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`TipoTeste delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

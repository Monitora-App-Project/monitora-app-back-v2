const TesteModel = require("../models/Teste");

const { pegaModalidade, calculaIdade } = require("../utils/utilities");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

module.exports = {
  async create(request, response) {
    try {
      const teste = request.body; // Daqui vem matricula do atleta e tipo do teste
      const matriculaAtleta = teste.matriculaAtleta;
      const timestamp = new Date();

      const id = uuidv4();
      teste.id = id;
      teste.horaDaColeta = timestamp;
      teste.idModalidade = await pegaModalidade(matriculaAtleta);
      teste.idade = await calculaIdade(matriculaAtleta);

      await TesteModel.create(teste);
      return response.status(201).json({ horaDaColeta, id });
    } catch (err) {
      console.error(`Teste creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await TesteModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Teste getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await TesteModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Teste getById: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await TesteModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Atleta delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

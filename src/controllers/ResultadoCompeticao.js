const ResultadoCompeticaoModel = require("../models/ResultadoCompeticao");
const LogsModel = require("../models/Logs");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

module.exports = {
  async create(request, response) {
    try {
      const resultadoCompeticao = request.body;
      resultadoCompeticao.id = uuidv4();

      const log = {};
      log.id = uuidv4();
      log.responsavel = resultadoCompeticao.responsavel;
      log.data = new Date();
      log.nomeTabela = "resultadoCompeticao";
      log.tabelaId = resultadoCompeticao.id;
      log.tipoAlteracao = "Create";
      delete resultadoCompeticao.responsavel;

      await ResultadoCompeticaoModel.create(resultadoCompeticao);
      await LogsModel.create(log);
      return response.status(201).json({ id: resultadoCompeticao.id });
    } catch (err) {
      console.error(`ResultadoCompeticao creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await ResultadoCompeticaoModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`ResultadoCompeticao getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByAtleta(request, response) {
    try {
      const { atleta } = request.params;
      const result = await ResultadoCompeticaoModel.getByAtleta(atleta);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`ResultadoCompeticao getByAtleta failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByModalidade(request, response) {
    try {
      const { modalidade } = request.params;
      const result = await ResultadoCompeticaoModel.getByModalidade(modalidade);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`ResultadoCompeticao getByModalidade failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await ResultadoCompeticaoModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`ResultadoCompeticao getById failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await ResultadoCompeticaoModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`ResultadoCompeticao getByFields failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const resultadoCompeticao = request.body;

      const log = {};
      log.id = uuidv4();
      log.nomeTabela = "resultadoCompeticao";
      log.responsavel = resultadoCompeticao.responsavel;
      log.data = new Date();
      log.tabelaId = id;
      log.tipoAlteracao = "Update";
      log.motivo = resultadoCompeticao.motivo;

      delete resultadoCompeticao.responsavel;
      delete resultadoCompeticao.motivo;

      const stillExistFieldsToUpdate = Object.values(resultadoCompeticao).length > 0;
      if (stillExistFieldsToUpdate) {
        const atributos = Object.keys(resultadoCompeticao);
        const valoresNovos = Object.values(resultadoCompeticao);
        log.atributo = atributos.join(",");
        const resultadoAtual = await ResultadoCompeticaoModel.getById(id);
        const valoresAntigos = Object.fromEntries(atributos.map((chave) => [chave, resultadoAtual[chave]]));
        const valoresAntigosValues = Object.values(valoresAntigos);
        log.valorAntigo = valoresAntigosValues.join(",");
        log.novoValor = valoresNovos.join(",");

        await ResultadoCompeticaoModel.update(id, resultadoCompeticao);
        await LogsModel.create(log);
      } else return response.status(200).json("Não há dados para serem alterados");
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`ResultadoCompeticao update failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const logData = request.body;
      await ResultadoCompeticaoModel.delete(id);

      const log = {};
      log.id = uuidv4();
      log.responsavel = logData.responsavel;
      log.data = new Date();
      log.nomeTabela = "resultadoCompeticao";
      log.tabelaId = id;
      log.tipoAlteracao = "Delete";
      log.motivo = logData.motivo;
      await LogsModel.create(log);

      return response.status(200).json("OK");
    } catch (err) {
      console.error(`ResultadoCompeticao delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

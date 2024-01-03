const ModalidadeModel = require("../models/Modalidade");
const LogsModel = require("../models/Logs");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

module.exports = {
  async create(request, response) {
    try {
      const modalidade = request.body;
      modalidade.id = uuidv4();

      const log = {};
      log.id = uuidv4();
      log.responsavel = modalidade.responsavel;
      log.data = new Date();
      log.nomeTabela = "modalidade";
      log.tabelaId = modalidade.id;
      log.tipoAlteracao = "Create";
      delete modalidade.responsavel;

      await ModalidadeModel.create(modalidade);
      await LogsModel.create(log);
      return response.status(201).json({ id: modalidade.id });
    } catch (err) {
      console.error(`Modalidade creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
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
        notification: "Internal server error"
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
        notification: "Internal server error"
      });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const modalidade = request.body;

      const log = {};
      log.id = uuidv4();
      log.nomeTabela = "modalidade";
      log.responsavel = modalidade.responsavel;
      log.data = new Date();
      log.tabelaId = id;
      log.tipoAlteracao = "Update";
      log.motivo = modalidade.motivo;

      delete modalidade.responsavel;
      delete modalidade.motivo;

      const stillExistFieldsToUpdate = Object.values(modalidade).length > 0;
      if (stillExistFieldsToUpdate) {
        const atributos = Object.keys(modalidade);
        const valoresNovos = Object.values(modalidade);
        log.atributo = atributos.join(",");
        const modalidadeAtual = await ModalidadeModel.getById(id);
        const valoresAntigos = Object.fromEntries(atributos.map((chave) => [chave, modalidadeAtual[chave]]));
        const valoresAntigosValues = Object.values(valoresAntigos);
        log.valorAntigo = valoresAntigosValues.join(",");
        log.novoValor = valoresNovos.join(",");

        await ModalidadeModel.updateById(id, modalidade);
        await LogsModel.create(log);
      } else return response.status(200).json("Não há dados para serem alterados");
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Modalidade update failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const logData = request.body;
      await ModalidadeModel.deleteById(id);

      const log = {};
      log.id = uuidv4();
      log.responsavel = logData.responsavel;
      log.data = new Date();
      log.nomeTabela = "modalidade";
      log.tabelaId = id;
      log.tipoAlteracao = "Delete";
      log.motivo = logData.motivo;
      await LogsModel.create(log);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Modalidade delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

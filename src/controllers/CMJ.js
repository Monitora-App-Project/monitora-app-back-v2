const CMJModel = require("../models/CMJ");
const { calcularMedia, calcularDesvioPadrao, pegaModalidade, calculaIdade } = require("../utils/utilities");
const TesteModel = require("../models/Teste");
const LogsModel = require("../models/Logs");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const idTipoTeste = 6;

module.exports = {
  async create(request, response) {
    try {
      const cmj = request.body;
      const valoresCMJ = [cmj.cmj1, cmj.cmj2, cmj.cmj3];
      cmj.mediaCmj = calcularMedia(valoresCMJ);
      cmj.desvPadCmj = calcularDesvioPadrao(valoresCMJ, cmj.mediaCmj);
      cmj.coefVariacaoCmj = (cmj.desvPadCmj / cmj.mediaCmj) * 100;
      cmj.minCmj = Math.min(...valoresCMJ);
      cmj.maxCmj = Math.max(...valoresCMJ);

      const log = {};
      log.id = uuidv4();
      log.responsavel = cmj.responsavel;
      log.data = new Date();
      log.nomeTabela = "cmj";
      log.tipoAlteracao = "Create";
      delete cmj.responsavel;

      const teste = {};
      teste.id = uuidv4();
      teste.horaDaColeta = new Date();
      teste.matriculaAtleta = cmj.matriculaAtleta;
      teste.idTipoTeste = idTipoTeste;
      teste.idModalidade = await pegaModalidade(cmj.matriculaAtleta);
      teste.idade = await calculaIdade(cmj.matriculaAtleta);
      await TesteModel.create(teste);
      cmj.idTeste = teste.id;
      log.tabelaId = teste.id;
      delete cmj.matriculaAtleta;
      delete cmj.idTipoTeste;

      try {
        await CMJModel.create(cmj);
      } catch (err) {
        console.error(`CMJ creation failed: ${err}`);
        await TesteModel.deleteById(teste.id);
        return response.status(500).json({
          notification: "Internal server error"
        });
      }
      await LogsModel.create(log);
      return response.status(201).json({ id: cmj.idTeste });
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

      const log = {};
      log.id = uuidv4();
      log.responsavel = cmj.responsavel;
      log.data = new Date();
      log.nomeTabela = "cmj";
      log.tabelaId = idTeste;
      log.tipoAlteracao = "Update";
      log.motivo = cmj.motivo;

      delete cmj.responsavel;
      delete cmj.motivo;
      const atributos = Object.keys(cmj);
      const valoresNovos = Object.values(cmj);

      const cmjAtual = await CMJModel.getByTeste(idTeste);
      const valoresAntigos = Object.fromEntries(atributos.map((chave) => [chave, cmjAtual[0][chave]]));
      const valoresAntigosValues = Object.values(valoresAntigos);
      const stillExistFieldsToUpdate = Object.values(cmj).length > 0;
      log.atributo = atributos.join(",");
      log.valorAntigo = valoresAntigosValues.join(",");
      log.novoValor = valoresNovos.join(",");

      if (stillExistFieldsToUpdate) {
        await CMJModel.updateByTeste(idTeste, cmj);
        await LogsModel.create(log);
      } else return response.status(200).json("Não há dados a serem atualizados");
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
      const logData = request.body;

      const log = {};
      log.id = uuidv4();
      log.responsavel = logData.responsavel;
      log.data = new Date();
      log.nomeTabela = "cmj";
      log.tabelaId = idTeste;
      log.tipoAlteracao = "Delete";
      log.motivo = logData.motivo;

      await CMJModel.deleteByTeste(idTeste);
      await TesteModel.deleteById(idTeste);
      await LogsModel.create(log);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`CMJ delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

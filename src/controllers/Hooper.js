const HooperModel = require("../models/Hooper");
const TesteModel = require("../models/Teste");
const LogsModel = require("../models/Logs");

const { pegaModalidade, calculaIdade } = require("../utils/utilities");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const idTipoTeste = 2;

// Returns the ISO week of the date.
Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
};

module.exports = {
  async create(request, response) {
    try {
      const hooper = request.body; // Chegam dados do teste geral e do hooper
      const matriculaAtleta = hooper.matriculaAtleta;
      const responsavel = hooper.responsavel;
      delete hooper.matriculaAtleta;
      delete hooper.responsavel;
      const id = uuidv4();
      const timestamp = new Date();

      // Cria teste geral
      const teste = {}; // JSON que guarda os dados do teste geral
      teste.id = id;
      teste.horaDaColeta = timestamp;
      teste.matriculaAtleta = matriculaAtleta;
      teste.idTipoTeste = idTipoTeste;
      teste.idModalidade = await pegaModalidade(matriculaAtleta);
      teste.idade = await calculaIdade(matriculaAtleta);
      await TesteModel.create(teste);

      // Cria hooper
      hooper.idTeste = id;
      hooper.diaDaSemana = timestamp.getDay(); // 0 a 6
      hooper.semanaDoAno = timestamp.getWeek(); // Padrao ISO-
      await HooperModel.create(hooper); // O restante dos dados a esta no objeto hooper

      // Cria log de Create
      const log = {}; // JSON que guarda os dados a serem inseridos no log
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;
      log.nomeTabela = "hooper";
      log.tabelaId = id;
      log.tipoAlteracao = "Create";
      await LogsModel.create(log);

      return response.status(201).json({ id: hooper.idTeste, horaDaColeta: timestamp });
    } catch (err) {
      console.error(`Hooper creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await HooperModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`CMJ getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await HooperModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Hooper getByFields failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByTeste(request, response) {
    try {
      const { idTeste } = request.params;
      const result = await HooperModel.getByTeste(idTeste);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Hooper getByTeste failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByDate(request, response) {
    try {
      const fields = request.body;
      const result = await HooperModel.getByDate(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Hooper getByDate failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async update(request, response) {
    try {
      const { idTeste } = request.params;
      const hooperUpdate = request.body;

      // Seta valores do log
      const responsavel = hooperUpdate.responsavel;
      const motivo = hooperUpdate.motivo;
      delete hooperUpdate.responsavel;
      delete hooperUpdate.motivo;
      const timestamp = new Date();
      const atributos = Object.keys(hooperUpdate);
      const valoresNovos = Object.values(hooperUpdate);

      const hooperAtual = await HooperModel.getByTeste(idTeste);
      const valoresAntigos = Object.fromEntries(atributos.map((chave) => [chave, hooperAtual[0][chave]]));
      const valoresAntigosValues = Object.values(valoresAntigos);

      // Da o Update
      const stillExistFieldsToUpdate = Object.values(hooperUpdate).length > 0;
      if (stillExistFieldsToUpdate) {
        await HooperModel.updateByTeste(idTeste, hooperUpdate);
        // Cria log
        const log = {};
        log.id = uuidv4();
        log.responsavel = responsavel;
        log.data = timestamp;
        log.nomeTabela = "hooper";
        log.tabelaId = idTeste;
        log.tipoAlteracao = "Update";
        log.atributo = atributos.join(",");
        log.valorAntigo = valoresAntigosValues.join(",");
        log.novoValor = valoresNovos.join(",");
        log.motivo = motivo;
        await LogsModel.create(log);
      } else {
        return response.status(200).json("Não há dados para serem alterados");
      }
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Hooper update failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async delete(request, response) {
    try {
      const { idTeste } = request.params;
      const hooperDelete = request.body;
      const responsavel = hooperDelete.responsavel;
      const motivo = hooperDelete.motivo;
      const timestamp = new Date();

      // Cria log
      const log = {};
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;
      log.nomeTabela = "hooper";
      log.tabelaId = idTeste;
      log.tipoAlteracao = "Delete";
      log.motivo = motivo;

      await HooperModel.deleteByTeste(idTeste);
      await TesteModel.deleteById(idTeste);
      await LogsModel.create(log);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Hooper delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

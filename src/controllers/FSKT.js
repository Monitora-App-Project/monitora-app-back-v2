const FSKTModel = require("../models/FSKT");
const TesteModel = require("../models/Teste");
const LogsModel = require("../models/Logs");

const { pegaModalidade, calculaIdade, calcularKDI} = require("../utils/utilities");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const idTipoTeste = 7;

module.exports = {
  async create(request, response) {
    try {
      const fskt = request.body; 
      const matriculaAtleta = fskt.matriculaAtleta;
      const responsavel = fskt.responsavel;
      delete fskt.matriculaAtleta;
      delete fskt.responsavel;
      const id = uuidv4();
      const timestamp = new Date();

      // Cria teste geral
      const teste = {}; 
      teste.id = id;
      teste.horaDaColeta = timestamp;
      teste.matriculaAtleta = matriculaAtleta;
      teste.idTipoTeste = idTipoTeste;
      teste.idModalidade = await pegaModalidade(matriculaAtleta);
      teste.idade = await calculaIdade(matriculaAtleta);
      await TesteModel.create(teste);

      // Cria fskt
      fskt.idTeste = id;
      fskt.fcMaxPredita = 208 - (0.7 * teste.idade);
      
      fskt.fcRel1 = (fskt.fcBpm1/fskt.fcMaxPredita) * 100;
      fskt.fcRel2 = (fskt.fcBpm2/fskt.fcMaxPredita) * 100;
      fskt.fcRel3 = (fskt.fcBpm3/fskt.fcMaxPredita) * 100;
      fskt.fcRel4 = (fskt.fcBpm4/fskt.fcMaxPredita) * 100;
      fskt.fcRel5 = (fskt.fcBpm5/fskt.fcMaxPredita) * 100;
 
      fskt.deltaPasRepouso = fskt.pressaoSisPos - fskt.pressaoSisRepouso;
      fskt.deltaPadRepouso = fskt.pressaoDiasPos - fskt.pressaoDiasRepouso;
      const numChutesArray = [
        fskt.numChutes1, 
        fskt.numChutes2,
        fskt.numChutes3,
        fskt.numChutes4,
        fskt.numChutes5,
      ]; 
      fskt.kdi = calcularKDI(numChutesArray);
      fskt.numChutesTotal = numChutesArray.reduce((total, num) => total + num, 0);
      fskt.classificacaoFsktTotal = calculaClassFSKT(fskt.numChutesTotal);
      //fskt.rec1MinFc: Joi.categoria().number().integer().optional(),
 
      fskt.deltaFcRec1Est5 = fskt.rec1MinFc - fskt.fcBpm5;
      fskt.deltaFcRec5Rec1 = fskt.rec5MinFc - fskt.rec1MinFc;
 
      fskt.deltaPas = fskt.rec5MinPressaoSis - fskt.rec1MinPressaoSis;
      fskt.deltaPad = fskt.rec5MinPressaoDias - fskt.rec1MinPressaoDias;
      
      await FSKTModel.create(fskt); 

      // Cria log de Create
      const log = {};
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;
      log.nomeTabela = "fskt";
      log.tabelaId = id;
      log.tipoAlteracao = "Create";
      await LogsModel.create(log);

      return response.status(201).json({ id: fskt.idTeste, horaDaColeta: timestamp });
    } catch (err) {
      console.error(`FSKT creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await FSKTModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`FSKT getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await FSKTModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`FSKT getByFields failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByTeste(request, response) {
    try {
      const { idTeste } = request.params;
      const result = await FSKTModel.getByTeste(idTeste);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`FSKT getByTeste failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByDate(request, response) {
    try {
      const fields = request.body;
      const result = await FSKTModel.getByDate(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`FSKT getByDate failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async update(request, response) {
    try {
      const { idTeste } = request.params;
      const fsktUpdate = request.body;

      // Seta valores do log
      const responsavel = fsktUpdate.responsavel;
      const motivo = fsktUpdate.motivo;
      delete fsktUpdate.responsavel;
      delete fsktUpdate.motivo;
      const timestamp = new Date();
      const atributos = Object.keys(fsktUpdate);
      const valoresNovos = Object.values(fsktUpdate);

      const fsktAtual = await FSKTModel.getByTeste(idTeste);
      const valoresAntigos = Object.fromEntries(atributos.map((chave) => [chave, fsktAtual[0][chave]]));
      const valoresAntigosValues = Object.values(valoresAntigos);

      // Da o Update
      const stillExistFieldsToUpdate = Object.values(fsktUpdate).length > 0;
      if (stillExistFieldsToUpdate) {
        await FSKTHooperModel.updateByTeste(idTeste, fsktUpdate);
        // Cria log
        const log = {};
        log.id = uuidv4();
        log.responsavel = responsavel;
        log.data = timestamp;
        log.nomeTabela = "fskt";
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
      console.error(`FSKT update failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async delete(request, response) {
    try {
      const { idTeste } = request.params;
      const fsktDelete = request.body;
      const responsavel = fsktDelete.responsavel;
      const motivo = fsktDelete.motivo;
      const timestamp = new Date();

      // Cria log
      const log = {};
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;
      log.nomeTabela = "fskt";
      log.tabelaId = idTeste;
      log.tipoAlteracao = "Delete";
      log.motivo = motivo;

      await FSKTModel.deleteByTeste(idTeste);
      await TesteModel.deleteById(idTeste);
      await LogsModel.create(log);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`FSKT delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

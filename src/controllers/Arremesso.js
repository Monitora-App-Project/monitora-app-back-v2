const ArremessoModel = require("../models/Arremesso");
const TesteModel = require("../models/Teste");
const LogsModel = require("../models/Logs");

const { pegaModalidade, calculaIdade,  calcularMedia, calcularDesvioPadrao} = require("../utils/utilities");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const idTipoTeste = 8;

module.exports = {
  async create(request, response) {
    try {
      const arremesso = request.body; 
      const matriculaAtleta = arremesso.matriculaAtleta;
      const responsavel = arremesso.responsavel;
      delete arremesso.matriculaAtleta;
      delete arremesso.responsavel;
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

      // Cria arremesso
      const valoresArremesso = [arremesso.arremesso1, arremesso.arremesso2, arremesso.arremesso3];
      arremesso.idTeste = id;
      arremesso.mediaArremesso = calcularMedia(valoresArremesso);
      arremesso.maxArremesso = Math.max(...valoresArremesso);
      arremesso.minArremesso = Math.min(...valoresArremesso)
      arremesso.desvPadArremesso = calcularDesvioPadrao(valoresArremesso, arremesso.mediaArremesso);
      arremesso.coefVariacaoArremesso = (arremesso.desvPadArremesso/arremesso.mediaArremesso)*100;
      await ArremessoModel.create(arremesso); 

      // Cria log de Create
      const log = {}; 
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;
      log.nomeTabela = "arremesso";
      log.tabelaId = id;
      log.tipoAlteracao = "Create";
      await LogsModel.create(log);

      return response.status(201).json({ id: arremesso.idTeste, horaDaColeta: timestamp });
    } catch (err) {
      console.error(`Arremesso creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await ArremessoModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Arremesso getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await ArremessoModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Arremesso getByFields failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByTeste(request, response) {
    try {
      const { idTeste } = request.params;
      const result = await ArremessoModel.getByTeste(idTeste);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Arremesso getByTeste failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByDate(request, response) {
    try {
      const fields = request.body;
      const result = await ArremessoModel.getByDate(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Arremesso getByDate failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async update(request, response) {
    try {
      const { idTeste } = request.params;
      const arremessoUpdate = request.body;

      // Seta valores do log
      const responsavel = arremessoUpdate.responsavel;
      const motivo = arremessoUpdate.motivo;
      delete arremessoUpdate.responsavel;
      delete arremessoUpdate.motivo;
      const timestamp = new Date();
      const atributos = Object.keys(arremessoUpdate);
      const valoresNovos = Object.values(arremessoUpdate);

      const arremessoAtual = await ArremessoModel.getByTeste(idTeste);
      const valoresAntigos = Object.fromEntries(atributos.map((chave) => [chave, arremessoAtual[0][chave]]));
      const valoresAntigosValues = Object.values(valoresAntigos);

      // Da o Update
      const stillExistFieldsToUpdate = Object.values(arremessoUpdate).length > 0;
      if (stillExistFieldsToUpdate) {
        await ArremessoModel.updateByTeste(idTeste, arremessoUpdate);
        // Cria log
        const log = {};
        log.id = uuidv4();
        log.responsavel = responsavel;
        log.data = timestamp;
        log.nomeTabela = "arremesso";
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
      console.error(`Arremesso update failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async delete(request, response) {
    try {
      const { idTeste } = request.params;
      const arremessoDelete = request.body;
      const responsavel = arremessoDelete.responsavel;
      const motivo = arremessoDelete.motivo;
      const timestamp = new Date();

      // Cria log
      const log = {};
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;
      log.nomeTabela = "arremesso";
      log.tabelaId = idTeste;
      log.tipoAlteracao = "Delete";
      log.motivo = motivo;

      await ArremessoModel.deleteByTeste(idTeste);
      await TesteModel.deleteById(idTeste);
      await LogsModel.create(log);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Arremesso delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

const CMJModel = require("../models/CMJ");
const TesteModel = require("../models/Teste");
const LogsModel = require("../models/Logs");
const UsuarioModel = require("../models/Usuario");

const { calcularMedia, calcularDesvioPadrao, pegaModalidade, calculaIdade } = require("../utils/utilities");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const idTipoTeste = 6;

module.exports = {
  async create(request, response) {
    try {
      // Salva informacoes gerais
      const cmj = request.body;
      const matriculaAtleta = cmj.matriculaAtleta;
      const responsavel = cmj.responsavel;
      const id = uuidv4();
      const timestamp = cmj.timestamp;
      
      delete cmj.matriculaAtleta;
      delete cmj.responsavel;
      delete cmj.timestamp;
      
      // Testes de existência 
      const alunoExiste = await UsuarioModel.verificaMatriculaExiste(matriculaAtleta);
      const responsavelExiste = await UsuarioModel.verificaMatriculaExiste(responsavel);
      var idExiste = await TesteModel.verificaIdTesteExiste(id);
      if (!alunoExiste) {
        return response.status(400).json({
          notification: "O número de matrícula do atleta não está cadastrado."
        });
      }
      if (!responsavelExiste) {
        return response.status(400).json({
          notification: "O número de matrícula do responsável não está cadastrado."
        });
      }
      while(idExiste){
        id = uuidv4();        // Se o id ja existir, recalcula
        idExiste = await TesteModel.verificaIdTesteExiste(id);
      }

      // Cria teste geral
      const teste = {}; // JSON que guarda os dados do teste geral
      teste.id = id;
      teste.horaDaColeta = timestamp;
      teste.matriculaAtleta = matriculaAtleta;
      teste.idTipoTeste = idTipoTeste;
      teste.idModalidade = await pegaModalidade(matriculaAtleta);
      teste.idade = await calculaIdade(matriculaAtleta);
      await TesteModel.create(teste);

      // Dados do teste especifico
      const valoresCMJ = [cmj.cmj1, cmj.cmj2, cmj.cmj3];
      cmj.idTeste = id;
      cmj.mediaCmj = calcularMedia(valoresCMJ);
      cmj.desvPadCmj = calcularDesvioPadrao(valoresCMJ, cmj.mediaCmj);
      cmj.coefVariacaoCmj = (cmj.desvPadCmj / cmj.mediaCmj) * 100;
      cmj.minCmj = Math.min(...valoresCMJ);
      cmj.maxCmj = Math.max(...valoresCMJ);

      // Cria teste especifico
      try {
        await CMJModel.create(cmj);
      } catch (err) {
        console.error(`CMJ creation failed: ${err}`);
        await TesteModel.deleteById(teste.id);
        return response.status(500).json({
          notification: "Internal server error"
        });
      }

      // Cria log de Create
      const log = {};
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = new Date();
      log.nomeTabela = "cmj";
      log.tabelaId = id;
      log.tipoAlteracao = "Create";
      await LogsModel.create(log);

      return response.status(201).json({ id: cmj.idTeste, horaDaColeta: timestamp  });
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
      const idExiste = await CMJModel.verificaIdTesteExiste(idTeste);
      if(!idExiste){
        return response.status(400).json({
          notification: "Não há testes de CMJ com esse id."
        });
      }
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
      const responsavel = cmjUpdate.responsavel;
      
      const idExiste = await CMJModel.verificaIdTesteExiste(idTeste);
      const responsavelExiste = await UsuarioModel.verificaMatriculaExiste(responsavel);
      if(!idExiste){
        return response.status(400).json({
          notification: "Não há testes de CMJ com esse id."
        });
      }
      if (!responsavelExiste) {
        return response.status(400).json({
          notification: "O número de matrícula do responsável não está cadastrado."
        });
      }

      // Seta valores do log
      const motivo = cmj.motivo
      delete cmj.responsavel;
      delete cmj.motivo;
      const timestamp = new Date();
      const atributos = Object.keys(cmj);
      const valoresNovos = Object.values(cmj);

      const cmjAtual = await CMJModel.getByTeste(idTeste);
      const valoresAntigos = Object.fromEntries(atributos.map((chave) => [chave, cmjAtual[0][chave]]));
      const valoresAntigosValues = Object.values(valoresAntigos);

      // Da o Update
      const stillExistFieldsToUpdate = Object.values(cmj).length > 0;
      if (stillExistFieldsToUpdate) {
        await CMJModel.updateByTeste(idTeste, cmj);
            // Cria log
        const log = {};
        log.id = uuidv4();
        log.responsavel = cmj.responsavel;
        log.data = new Date();
        log.nomeTabela = "cmj";
        log.tabelaId = idTeste;
        log.tipoAlteracao = "Update";
        log.motivo = cmj.motivo;
        log.atributo = atributos.join(",");
        log.valorAntigo = valoresAntigosValues.join(",");
        log.novoValor = valoresNovos.join(",");
        await LogsModel.create(log);
      } else {
        return response.status(200).json("Não há dados a serem atualizados");
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
      const logData = request.body;
      const idExiste = await CMJModel.verificaIdTesteExiste(idTeste);
      const responsavelExiste = await UsuarioModel.verificaMatriculaExiste(logData.responsavel);
      if(!idExiste){
        return response.status(400).json({
          notification: "Não há testes de CMJ com esse id."
        });
      }
      if (!responsavelExiste) {
        return response.status(400).json({
          notification: "O número de matrícula do responsável não está cadastrado."
        });
      }

      // Cria log
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

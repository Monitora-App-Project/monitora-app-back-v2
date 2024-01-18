const ArremessoModel = require("../models/Arremesso");
const TesteModel = require("../models/Teste");
const LogsModel = require("../models/Logs");
const UsuarioModel = require("../models/Usuario");


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
      const id = uuidv4();
      const timestamp = new Date();

      delete arremesso.matriculaAtleta;
      delete arremesso.responsavel;

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
      const teste = {};
      teste.id = id;
      teste.horaDaColeta = timestamp;
      teste.matriculaAtleta = matriculaAtleta;
      teste.idTipoTeste = idTipoTeste;
      teste.idModalidade = await pegaModalidade(matriculaAtleta);
      teste.idade = await calculaIdade(matriculaAtleta);
      await TesteModel.create(teste);

      // Dados do teste especifico
      const valoresArremesso = [arremesso.arremesso1, arremesso.arremesso2, arremesso.arremesso3];
      arremesso.idTeste = id;
      arremesso.mediaArremesso = calcularMedia(valoresArremesso);
      arremesso.maxArremesso = Math.max(...valoresArremesso);
      arremesso.minArremesso = Math.min(...valoresArremesso)
      arremesso.desvPadArremesso = calcularDesvioPadrao(valoresArremesso, arremesso.mediaArremesso);
      arremesso.coefVariacaoArremesso = (arremesso.desvPadArremesso/arremesso.mediaArremesso)*100;
      
      // Cria teste especifico
      try {
        await ArremessoModel.create(arremesso); 
      } catch (err) {
        await TesteModel.deleteById(id)
        console.error(`Arremesso creation failed: ${err}`);
        return response.status(500).json({
          notification: "Internal server error"
        });
      } 

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
      const idExiste = await ArremessoModel.verificaIdTesteExiste(idTeste);
      if(!idExiste){
        return response.status(400).json({
          notification: "Não há testes de Arremesso com esse id."
        });
      }
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
      const responsavel = arremessoUpdate.responsavel;

      const idExiste = await ArremessoModel.verificaIdTesteExiste(idTeste);
      const responsavelExiste = await UsuarioModel.verificaMatriculaExiste(responsavel);
      if(!idExiste){
        return response.status(400).json({
          notification: "Não há testes de Arremesso com esse id."
        });
      }
      if (!responsavelExiste) {
        return response.status(400).json({
          notification: "O número de matrícula do responsável não está cadastrado."
        });
      }

      // Seta valores do log
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
      const idExiste = await ArremessoModel.verificaIdTesteExiste(idTeste);
      const responsavelExiste = await UsuarioModel.verificaMatriculaExiste(responsavel);
      if(!idExiste){
        return response.status(400).json({
          notification: "Não há testes de Arremesso com esse id."
        });
      }
      if (!responsavelExiste) {
        return response.status(400).json({
          notification: "O número de matrícula do responsável não está cadastrado."
        });
      }
      
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

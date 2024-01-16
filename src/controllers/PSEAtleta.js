const PseAtletaModel = require("../models/PSEAtleta");
const TesteModel = require("../models/Teste");
const LogsModel = require("../models/Logs");
const UsuarioModel = require("../models/Usuario");

const { pegaModalidade, calculaIdade } = require("../utils/utilities");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const idTipoTeste = 3;

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
      // Salva informacoes gerais
      const pseAtleta = request.body;
      const matriculaAtleta = pseAtleta.matriculaAtleta;
      const responsavel = pseAtleta.responsavel;
      const id = uuidv4();
      const timestamp = new Date();

      delete pseAtleta.matriculaAtleta;
      delete pseAtleta.responsavel;
      
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

      // Ddos do teste especifico 
      pseAtleta.idTeste = id;
      pseAtleta.diaDaSemana = timestamp.getDay(); // 0 a 6
      pseAtleta.semanaDoAno = timestamp.getWeek(); // Padrao ISO-
      pseAtleta.pseSessao = pseAtleta.pseAtleta * pseAtleta.duracaoTreino;
      
      // Cria teste especifico
      try {
        await PseAtletaModel.create(pseAtleta); 
      } catch (err) {
        await TesteModel.deleteById(id)
        console.error(`PSEAtleta creation failed: ${err}`);
        return response.status(500).json({
          notification: "Internal server error"
        });
      }

      // Cria log de Create
      const log = {}; // JSON que guarda os dados a serem inseridos no log
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;
      log.nomeTabela = "pseAtleta";
      log.tabelaId = id;
      log.tipoAlteracao = "Create";
      await LogsModel.create(log);

      return response.status(201).json({ id: pseAtleta.idTeste, horaDaColeta: timestamp });
    } catch (err) {
      console.error(`PSEAtleta creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await PseAtletaModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`PSEAtleta getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await PseAtletaModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`PSEAtleta getByFields failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByTeste(request, response) {
    try {
      const { idTeste } = request.params;
      const idExiste = await PseAtletaModel.verificaIdTesteExiste(idTeste);
      if(!idExiste){
        return response.status(400).json({
          notification: "Não há testes de PSE Atleta com esse id."
        });
      }
      const result = await PseAtletaModel.getByTeste(idTeste);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`PSEAtleta getByTeste failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByDate(request, response) {
    try {
      const fields = request.body;
      const result = await PseAtletaModel.getByDate(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`PSEAtleta getByDate failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async update(request, response) {
    try {
      const { idTeste } = request.params;
      const pseAtletaUpdate = request.body;
      const responsavel = pseAtletaUpdate.responsavel;
      const idExiste = await PseAtletaModel.verificaIdTesteExiste(idTeste);
      const responsavelExiste = await UsuarioModel.verificaMatriculaExiste(responsavel);
      if(!idExiste){
        return response.status(400).json({
          notification: "Não há testes de PSE Atleta com esse id."
        });
      }
      if (!responsavelExiste) {
        return response.status(400).json({
          notification: "O número de matrícula do responsável não está cadastrado."
        });
      }

      // Seta valores do log
      const motivo = pseAtletaUpdate.motivo;
      delete pseAtletaUpdate.responsavel;
      delete pseAtletaUpdate.motivo;
      const timestamp = new Date();
      const atributos = Object.keys(pseAtletaUpdate);
      const valoresNovos = Object.values(pseAtletaUpdate);

      const pseAtletaAtual = await PseAtletaModel.getByTeste(idTeste);
      const valoresAntigos = Object.fromEntries(atributos.map((chave) => [chave, pseAtletaAtual[0][chave]]));
      const valoresAntigosValues = Object.values(valoresAntigos);

      // Da o Update
      const stillExistFieldsToUpdate = Object.values(pseAtletaUpdate).length > 0;
      if (stillExistFieldsToUpdate) {
        await PseAtletaModel.updateByTeste(idTeste, pseAtletaUpdate);
      } else {
        return response.status(200).json("Não há dados para serem alterados");
      }

      // Cria log
      const log = {};
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;
      log.nomeTabela = "pseAtleta";
      log.tabelaId = idTeste;
      log.tipoAlteracao = "Update";
      log.atributo = atributos.join(",");
      log.valorAntigo = valoresAntigosValues.join(",");
      log.novoValor = valoresNovos.join(",");
      log.motivo = motivo;
      await LogsModel.create(log);

      return response.status(200).json("OK");
    } catch (err) {
      console.error(`PSEAtleta update failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async delete(request, response) {
    try {
      const { idTeste } = request.params;
      const pseAtletaDelete = request.body;
      const responsavel = pseAtletaDelete.responsavel;
      const idExiste = await PseAtletaModel.verificaIdTesteExiste(idTeste);
      const responsavelExiste = await UsuarioModel.verificaMatriculaExiste(responsavel);
      if(!idExiste){
        return response.status(400).json({
          notification: "Não há testes de PSE Atleta com esse id."
        });
      }
      if (!responsavelExiste) {
        return response.status(400).json({
          notification: "O número de matrícula do responsável não está cadastrado."
        });
      }

      const motivo = pseAtletaDelete.motivo;
      const timestamp = new Date();

      // Cria log
      const log = {};
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;
      log.nomeTabela = "pseAtleta";
      log.tabelaId = idTeste;
      log.tipoAlteracao = "Delete";
      log.motivo = motivo;

      await PseAtletaModel.deleteByTeste(idTeste);
      await TesteModel.deleteById(idTeste);
      await LogsModel.create(log);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`PSEAtleta delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

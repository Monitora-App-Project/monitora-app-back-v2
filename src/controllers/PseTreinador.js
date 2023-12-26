const PseTreinadorModel = require('../models/PseTreinador');
const TesteModel = require('../models/Teste');
const LogsModel = require('../models/Logs');

const {pegaModalidade, calculaIdade} = require('../utilities');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

const idTipoTeste = 4;

// Returns the ISO week of the date.
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

module.exports = {
  async create(request, response) {
    try {
      // Salva informacoes gerais
      const pseTreinador = request.body; 
      const matriculaAtleta = pseTreinador.matriculaAtleta;
      const responsavel = pseTreinador.responsavel;
      delete pseTreinador.matriculaAtleta;
      delete pseTreinador.responsavel;
      const id = uuidv4(); 
      const timestamp = new Date();

      // Cria teste geral
      const teste = {};               // JSON que guarda os dados do teste geral
      teste.id = id;
      teste.horaDaColeta = timestamp;
      teste.matriculaAtleta = matriculaAtleta;
      teste.idTipoTeste = idTipoTeste;
      teste.idModalidade = await pegaModalidade(matriculaAtleta);
      teste.idade = await calculaIdade(matriculaAtleta);
      await TesteModel.create(teste);

      // Cria pseTreinador
      pseTreinador.idTeste = id;
      pseTreinador.diaDaSemana = timestamp.getDay();   // 0 a 6 
      pseTreinador.semanaDoAno = timestamp.getWeek();  // Padrao ISO-
      await PseTreinadorModel.create(pseTreinador);     

      // Cria log de Create
      const log = {};                // JSON que guarda os dados a serem inseridos no log
      log.id = uuidv4();
      log.responsavel = responsavel;  
      log.data = timestamp;          
      log.nomeTabela = "pseTreinador";
      log.tabelaId = id;             
      log.tipoAlteracao = "Create";
      await LogsModel.create(log); 

      return response.status(201).json({ id: pseTreinador.idTeste, horaDaColeta : timestamp });
    } catch (err) {
      console.error(`PSETreinador creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await PseTreinadorModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`PSETreinador getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await PseTreinadorModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`PSETreinador getByFields failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByTeste(request, response) {
    try {
      const { idTeste } = request.params;
      const result = await PseTreinadorModel.getByTeste(idTeste);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`PSETreinador getByTeste failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByDate(request, response) {
    try {
      const fields = request.body;
      const result = await PseTreinadorModel.getByDate(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`PSETreinador getByDate failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { idTeste } = request.params;
      const pseTreinadorUpdate = request.body;

      // Seta valores do log
      const responsavel = pseTreinadorUpdate.responsavel;
      const motivo = pseTreinadorUpdate.motivo;
      delete pseTreinadorUpdate.responsavel;
      delete pseTreinadorUpdate.motivo;
      const timestamp = new Date();
      const atributos = Object.keys(pseTreinadorUpdate);
      const valoresNovos = Object.values(pseTreinadorUpdate);

      const pseTreinadorAtual = await PseTreinadorModel.getByTeste(idTeste);
      const valoresAntigos = Object.fromEntries(
        atributos.map(chave => [chave, pseTreinadorAtual[0][chave]])
      );
      const valoresAntigosValues = Object.values(valoresAntigos);

      // Da o Update
      const stillExistFieldsToUpdate = Object.values(pseTreinadorUpdate).length > 0;
      if (stillExistFieldsToUpdate) {
        await PseTreinadorModel.updateByTeste(idTeste, pseTreinadorUpdate);
      }

      // Cria log 
      const log = {};          
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;          
      log.nomeTabela = "pseTreinador";
      log.tabelaId = idTeste;             
      log.tipoAlteracao = "Update";
      log.atributo = atributos.join(',');
      log.valorAntigo = valoresAntigosValues.join(',');
      log.novoValor = valoresNovos.join(',');
      log.motivo = motivo;
      await LogsModel.create(log);
      
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`PSETreinador update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { idTeste } = request.params;
      const pseTreinadorDelete = request.body;
      const responsavel = pseTreinadorDelete.responsavel;
      const motivo = pseTreinadorDelete.motivo;
      const timestamp = new Date();

      // Cria log 
      const log = {};          
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;          
      log.nomeTabela = "pseTreinador";
      log.tabelaId = idTeste;             
      log.tipoAlteracao = "Delete";
      log.motivo = motivo;
     
      await PseTreinadorModel.deleteByTeste(idTeste);
      await TesteModel.deleteById(idTeste);
      await LogsModel.create(log);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`PSETreinador delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

};

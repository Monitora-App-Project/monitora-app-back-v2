const VFCModel = require('../models/VFC');
const TesteModel = require('../models/Teste');
const LogsModel = require('../models/Logs');

const {pegaModalidade, calculaIdade} = require('../utilities');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

const idTipoTeste = 5;

module.exports = {
  async create(request, response) {
    try {
      // Salva informacoes gerais
      const vfc = request.body; 
      const matriculaAtleta = vfc.matriculaAtleta;
      const responsavel = vfc.responsavel;
      delete vfc.matriculaAtleta;
      delete vfc.responsavel;
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

      // Cria vfc
      vfc.idTeste = id;
      await VFCModel.create(vfc);     

      // Cria log de Create
      const log = {};                // JSON que guarda os dados a serem inseridos no log
      log.id = uuidv4();
      log.responsavel = responsavel;  
      log.data = timestamp;          
      log.nomeTabela = "vfc";
      log.tabelaId = id;             
      log.tipoAlteracao = "Create";
      await LogsModel.create(log); 

      return response.status(201).json({ id: vfc.idTeste, horaDaColeta : timestamp });
    } catch (err) {
      console.error(`VFC creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await VFCModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`VFC getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await VFCModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`VFC getByFields failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByTeste(request, response) {
    try {
      const { idTeste } = request.params;
      const result = await VFCModel.getByTeste(idTeste);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`VFC getByTeste failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByDate(request, response) {
    try {
      const fields = request.body;
      const result = await VFCModel.getByDate(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`VFC getByDate failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { idTeste } = request.params;
      const vfcUpdate = request.body;

      // Seta valores do log
      const responsavel = vfcUpdate.responsavel;
      const motivo = vfcUpdate.motivo;
      delete vfcUpdate.responsavel;
      delete vfcUpdate.motivo;
      const timestamp = new Date();
      const atributos = Object.keys(vfcUpdate);
      const valoresNovos = Object.values(vfcUpdate);

      const vfcAtual = await VFCModel.getByTeste(idTeste);
      const valoresAntigos = Object.fromEntries(
        atributos.map(chave => [chave, vfcAtual[0][chave]])
      );
      const valoresAntigosValues = Object.values(valoresAntigos);

      // Da o Update
      const stillExistFieldsToUpdate = Object.values(vfcUpdate).length > 0;
      if (stillExistFieldsToUpdate) {
        await VFCModel.updateByTeste(idTeste, vfcUpdate);
      }

      // Cria log 
      const log = {};          
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;          
      log.nomeTabela = "vfc";
      log.tabelaId = idTeste;             
      log.tipoAlteracao = "Update";
      log.atributo = atributos.join(',');
      log.valorAntigo = valoresAntigosValues.join(',');
      log.novoValor = valoresNovos.join(',');
      log.motivo = motivo;
      await LogsModel.create(log);
      
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`VFC update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { idTeste } = request.params;
      const vfcDelete = request.body;
      const responsavel = vfcDelete.responsavel;
      const motivo = vfcDelete.motivo;
      const timestamp = new Date();

      // Cria log 
      const log = {};          
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;          
      log.nomeTabela = "vfc";
      log.tabelaId = idTeste;             
      log.tipoAlteracao = "Delete";
      log.motivo = motivo;
     
      await VFCModel.deleteByTeste(idTeste);
      await TesteModel.deleteById(idTeste);
      await LogsModel.create(log);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`VFC delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

};

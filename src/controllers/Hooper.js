const HooperModel = require('../models/Hooper');
const TesteModel = require('../models/Teste');
const {pegaModalidade, calculaIdade} = require('../utilities');

const { v4: uuidv4 } = require('uuid');
const idTipoTeste = 2;
require('dotenv').config();

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
      const hooper = request.body;
      const teste = {};    // JSON que guarda os dados do teste geral
      const matriculaAtleta = hooper.matriculaAtleta;

      // Cria teste geral
      teste.matriculaAtleta = matriculaAtleta;
      teste.idTipoTeste = idTipoTeste;
      teste.idModalidade = await pegaModalidade(matriculaAtleta);
      teste.idade = await calculaIdade(matriculaAtleta);

      const dadosTeste = await TesteModel.create(teste);
      const idTeste = dadosTeste[0].id;
      const horaDaColeta = dadosTeste[0].horaDaColeta;
      const data = new Date(horaDaColeta);

      // Cria hooper
      delete hooper.matriculaAtleta;
      hooper.id = uuidv4();
      hooper.idTeste = idTeste; 
      hooper.diaDaSemana = data.getDay();   // 0 a 6 
      hooper.semanaDoAno = data.getWeek();  // Padrao ISO-8601

      await HooperModel.create(hooper);
      return response.status(201).json({ id: hooper.id });
    } catch (err) {
      console.error(`Hooper creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
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
        notification: 'Internal server error',
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
        notification: 'Internal server error',
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
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { idTeste } = request.params;
      const hooper = request.body;
      const stillExistFieldsToUpdate = Object.values(hooper).length > 0;
      if (stillExistFieldsToUpdate) {
        await HooperModel.updateByTeste(idTeste, hooper);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`Hooper update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { idTeste } = request.params;
      await HooperModel.deleteByTeste(idTeste);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Hooper delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

};

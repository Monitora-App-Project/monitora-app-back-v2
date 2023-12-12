const HooperModel = require('../models/Hooper');
const UsuarioModel = require('../models/Usuario');
const TesteModel = require('../models/Teste');

const { v4: uuidv4 } = require('uuid');
const idTipoTeste = 2;
require('dotenv').config();

async function calculaIdade(matriculaAtleta){
  try{
      let dataNascimento = await UsuarioModel.getDataNascimento(matriculaAtleta);
      dataNascimento = dataNascimento[0].dataNascimento; // retorna o JSON dentro de um array
      const dataAtual = new Date();
      const diferencaEmMilissegundos = dataAtual - dataNascimento;
      const milissegundosPorAno = 1000 * 60 * 60 * 24 * 365.25; // Considera anos bissextos
      const diferencaEmAnos = diferencaEmMilissegundos / milissegundosPorAno;
    
      const idade = Math.floor(diferencaEmAnos);
      return(idade);
  }
  catch (err) {
    console.error(`Consulta de data de nascimento falhou: ${err}`);
    return response.status(500).json({
      notification: 'Internal server error',
    });
  }
}

async function pegaModalidade(matriculaAtleta){
  try{
    const idModalidade = await UsuarioModel.getModalidadeAtleta(matriculaAtleta);
    return idModalidade[0].modalidade;        // retorna o JSON dentro de uma array
  }
  catch (err) {
    console.error(`Consulta de modalidade falhou: ${err}`);
    return response.status(500).json({
      notification: 'Internal server error',
    });
  }
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
      let idTeste = await TesteModel.create(teste);
      idTeste = idTeste[0].id; 

      // Cria hooper
      delete hooper.matriculaAtleta;
      hooper.id = uuidv4();
      hooper.idTeste = idTeste; 

      // PROVISORIO: Ainda entra com dia da semana e semana do ano
      console.log(hooper);
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

  // async getByTeste(request, response) {
  //   try {
  //     const { idTeste } = request.params;
  //     const result = await CMJModel.getByTeste(idTeste);
  //     return response.status(200).json(result);
  //   } catch (err) {
  //     console.error(`CMJ getByTeste failed: ${err}`);
  //     return response.status(500).json({
  //       notification: 'Internal server error',
  //     });
  //   }
  // },

  // async getByFields(request, response) {
  //   try {
  //     const fields = request.body;
  //     const result = await CMJModel.getByFields(fields);
  //     return response.status(200).json(result);
  //   } catch (err) {
  //     console.error(`CMJ getByFields failed: ${err}`);
  //     return response.status(500).json({
  //       notification: 'Internal server error',
  //     });
  //   }
  // },

  // async update(request, response) {
  //   try {
  //     const { idTeste } = request.params;
  //     const cmj = request.body;
  //     const stillExistFieldsToUpdate = Object.values(cmj).length > 0;
  //     if (stillExistFieldsToUpdate) {
  //       await CMJModel.updateByTeste(idTeste, cmj);
  //     }
  //     return response.status(200).json('OK');
  //   } catch (err) {
  //     console.error(`CMJ update failed: ${err}`);
  //     return response.status(500).json({
  //       notification: 'Internal server error',
  //     });
  //   }
  // },

  // async delete(request, response) {
  //   try {
  //     const { idTeste } = request.params;
  //     await CMJModel.deleteByTeste(idTeste);
  //     return response.status(200).json("OK");
  //   } catch (err) {
  //     console.error(`CMJ delete failed: ${err}`);
  //     return response.status(500).json({
  //       notification: 'Internal server error',
  //     });
  //   }
  // },

};

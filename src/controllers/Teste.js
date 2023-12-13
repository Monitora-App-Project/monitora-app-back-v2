const TesteModel = require('../models/Teste');
const UsuarioModel = require('../models/Usuario');
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
      const teste = request.body;                         // Daqui vem matricula do atleta e tipo do teste    
      const matriculaAtleta = teste.matriculaAtleta;      

      // id           -> incremental, gerado pelo banco
      // horaDaColeta -> gerado pelo do banco 
      teste.idModalidade = await pegaModalidade(matriculaAtleta);
      teste.idade = await calculaIdade(matriculaAtleta); 

      const idTeste = await TesteModel.create(teste);
      return response.status(201).json({id: idTeste});
    } catch (err) {
      console.error(`Teste creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await TesteModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Teste getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await TesteModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Teste getById: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await TesteModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Atleta delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  }

};

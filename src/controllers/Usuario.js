const UsuarioModel = require('../models/Usuario');
require('dotenv').config();

function gerarMatricula() {
  const anoAtual = new Date().getFullYear();
  const horaAtual = new Date().getTime();
  const numeroAleatorio = Math.floor((horaAtual % 90000) + 10000);
  const matricula = `${anoAtual}${numeroAleatorio}`;
  return matricula;
}

function defineUsuarioSecret(tipo) {
  switch (tipo) {
    case ('admin') :
      return process.env.ADMIN_SECRET;

    case ('coordenador') :
       return process.env.COORDENADOR_SECRET;

    case ('analista') :
      return process.env.ANALISTA_SECRET;

    case ('treinador') :
      return process.env.TREINADOR_SECRET;

    case ('atleta') :
      return process.env.ATLETA_SECRET;

    default :
      break;
  }
}

module.exports = {
  async create(request, response) {
    try {
      const usuario = request.body;
      usuario.matricula = gerarMatricula();
      usuario.tipo = defineUsuarioSecret(usuario.tipo);
      await UsuarioModel.create(usuario);
      return response.status(201).json({ matricula: usuario.matricula });
    } catch (err) {
      console.error(`Usuario creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await UsuarioModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Usuario getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { matricula } = request.params;
      const result = await UsuarioModel.getById(matricula);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Usuario getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { matricula } = request.params;
      const usuario = request.body;
      const stillExistFieldsToUpdate = Object.values(usuario).length > 0;
      if (stillExistFieldsToUpdate) {
        await UsuarioModel.updateById(matricula, usuario);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`Usuario update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { matricula } = request.params;
      await UsuarioModel.deleteById(matricula);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Usuario delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};

const UsuarioModel = require("../models/Usuario");
const { defineUsuarioSecret, encryptData } = require("../utils/utilities");
require("dotenv").config();

function gerarMatricula() {
  const anoAtual = new Date().getFullYear();
  const horaAtual = new Date().getTime();
  const numeroAleatorio = Math.floor((horaAtual % 90000) + 10000);
  const matricula = `${anoAtual}${numeroAleatorio}`;
  return matricula;
}

module.exports = {
  async create(request, response) {
    try {
      const usuario = request.body;
      usuario.senha = encryptData(usuario.senha);
      usuario.matricula = gerarMatricula();
      while (await UsuarioModel.verificaMatriculaExiste(usuario.matricula)) {
        usuario.matricula = gerarMatricula();
      }
      usuario.tipo = defineUsuarioSecret(usuario.tipo);
      await UsuarioModel.create(usuario);
      return { matricula: usuario.matricula };
    } catch (err) {
      console.error(`Usuario creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
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
        notification: "Internal server error"
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
        notification: "Internal server error"
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await UsuarioModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Usuario getByUsuario failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
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
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Usuario update failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
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
        notification: "Internal server error"
      });
    }
  }
};

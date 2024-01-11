const UsuarioModel = require("../models/Usuario");
const RecoverPassModel = require("../models/RecoverPassword");
const LogsModel = require("../models/Logs");
const { defineUsuarioSecret, encryptData } = require("../utils/utilities");
const { v4: uuidv4 } = require("uuid");
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

  async updatePassword(request, response) {
    try {
      const { matricula } = request.params;
      const inputs = request.body;

      const user = await UsuarioModel.getById(matricula);
      const currentPass = encryptData(inputs.senhaAtual);
      if (currentPass === user.senha) {
        const newPass = encryptData(inputs.novaSenha);
        try {
          await UsuarioModel.updateById(matricula, { senha: newPass });
          const log = {};
          log.id = uuidv4();
          log.responsavel = matricula;
          log.data = new Date();
          log.nomeTabela = "usuario";
          log.atributo = "senha";
          log.tabelaId = matricula;
          log.tipoAlteracao = "Update";
          log.motivo = "Alteração de senha";
          await LogsModel.create(log);
          return response.status(200).json("Senha alterada com sucesso!");
        } catch (err) {
          console.error(`Usuario update failed: ${err}`);
          return response.status(500).json({
            notification: "Internal server error"
          });
        }
      } else {
        return response.status(403).json({
          notification: "Senhas não conferem"
        });
      }
    } catch (err) {
      console.error(`GlobalUser update failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async updateExternalPassword(request, response) {
    const { usuario, senha } = request.body;
    const newPass = encryptData(senha);
    try {
      const data = await RecoverPassModel.getById(usuario);
      if (data === undefined) {
        return response.status(540).json({
          notification: "Requisição Expirada"
        });
      } else if (data.verify) {
        await UsuarioModel.updateById(usuario, { senha: newPass });
        await RecoverPassModel.deleteById(usuario);
        const log = {};
        log.id = uuidv4();
        log.responsavel = usuario;
        log.data = new Date();
        log.nomeTabela = "usuario";
        log.tabelaId = usuario;
        log.atributo = "senha";
        log.tipoAlteracao = "Update";
        log.motivo = "Esqueci minha senha";
        await LogsModel.create(log);
        return response.status(200).json("Senha alterada com sucesso!");
      } else return response.status(200).json("Código não validado!");
    } catch (err) {
      console.error(`User update failed: ${err}`);
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

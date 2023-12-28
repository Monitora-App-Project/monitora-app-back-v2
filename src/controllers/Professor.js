const ProfessorModel = require("../models/Professor");
const UsuarioController = require("./Usuario");
const LogsModel = require("../models/Logs");
const UsuarioModel = require("../models/Usuario");
const { atributosProfessor, atributosUsuario } = require("../utils/atributos");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

module.exports = {
  async create(request, response) {
    try {
      const requestData = request.body;

      // Separar os dados do professor e do Usuario usando desestruturação
      const { departamento, matricula_ufmg, nivel, equipe, responsavel, ...dadosUsuario } = requestData;

      const dadosProfessor = {
        departamento,
        matricula_ufmg,
        nivel,
        equipe,
        responsavel
      };

      const responsavelColeta = dadosProfessor.responsavel;
      delete dadosProfessor.responsavel;
      const usuario = await UsuarioController.create({ body: dadosUsuario });

      dadosProfessor.usuario = usuario.matricula;
      await ProfessorModel.create(dadosProfessor);

      const log = {};
      log.id = uuidv4();
      log.responsavel = responsavelColeta;
      log.data = new Date();
      log.nomeTabela = "professor";
      log.tabelaId = dadosProfessor.usuario;
      log.tipoAlteracao = "Create";
      await LogsModel.create(log);

      return response.status(201).json({ matricula: dadosProfessor.usuario });
    } catch (err) {
      console.error(`Professor creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await ProfessorModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Professor getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByUsuario(request, response) {
    try {
      const { usuario } = request.params;
      const result = await ProfessorModel.getByUsuario(usuario);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Professor getByUsuario failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async update(request, response) {
    try {
      const { usuario } = request.params;
      const dataToUpdate = request.body;

      const professorKeys = atributosProfessor;
      const usuarioKeys = atributosUsuario;

      const professorFieldsToUpdate = Object.keys(dataToUpdate).filter((key) => professorKeys.includes(key));
      const usuarioFieldsToUpdate = Object.keys(dataToUpdate).filter((key) => usuarioKeys.includes(key));

      const log = {};
      log.nomeTabela = "professor";
      log.responsavel = dataToUpdate.responsavel;
      log.data = new Date();
      log.tabelaId = usuario;
      log.tipoAlteracao = "Update";
      log.motivo = dataToUpdate.motivo;

      delete dataToUpdate.responsavel;
      delete dataToUpdate.motivo;

      if (professorFieldsToUpdate.length > 0) {
        const professorDataToUpdate = professorFieldsToUpdate.reduce((obj, key) => {
          obj[key] = dataToUpdate[key];
          return obj;
        }, {});
        const atributos = Object.keys(professorDataToUpdate);
        const valoresNovos = Object.values(professorDataToUpdate);
        log.id = uuidv4();
        log.atributo = atributos.join(",");
        const professorAtual = await ProfessorModel.getByUsuario(usuario);
        const valoresAntigos = Object.fromEntries(atributos.map((chave) => [chave, professorAtual[chave]]));
        const valoresAntigosValues = Object.values(valoresAntigos);
        log.valorAntigo = valoresAntigosValues.join(",");
        log.novoValor = valoresNovos.join(",");
        await ProfessorModel.updateByUsuario(usuario, professorDataToUpdate);
        await LogsModel.create(log);
      }

      if (usuarioFieldsToUpdate.length > 0) {
        const usuarioDataToUpdate = usuarioFieldsToUpdate.reduce((obj, key) => {
          obj[key] = dataToUpdate[key];
          return obj;
        }, {});
        const atributos = Object.keys(usuarioDataToUpdate);
        const valoresNovos = Object.values(usuarioDataToUpdate);
        log.id = uuidv4();
        log.atributo = atributos.join(",");
        const usuarioAtual = await UsuarioModel.getById(usuario);
        const valoresAntigos = Object.fromEntries(atributos.map((chave) => [chave, usuarioAtual[chave]]));
        const valoresAntigosValues = Object.values(valoresAntigos);
        log.valorAntigo = valoresAntigosValues.join(",");
        log.novoValor = valoresNovos.join(",");
        await UsuarioModel.updateById(usuario, usuarioDataToUpdate);
        await LogsModel.create(log);
      }

      if (professorFieldsToUpdate.length === 0 && usuarioFieldsToUpdate.length === 0) {
        return response.status(200).json("Não há dados para serem alterados");
      }

      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Update failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async delete(request, response) {
    try {
      const { usuario } = request.params;
      const logData = request.body;
      await ProfessorModel.deleteByUsuario(usuario);
      await UsuarioModel.deleteById(usuario);
      
      const log = {};
      log.id = uuidv4();
      log.responsavel = logData.responsavel;
      log.data = new Date();
      log.nomeTabela = "professor";
      log.tabelaId = usuario;
      log.tipoAlteracao = "Delete";
      log.motivo = logData.motivo;
      await LogsModel.create(log);

      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Professor delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

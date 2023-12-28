const AtletaModel = require("../models/Atleta");
const LogsModel = require("../models/Logs");
const UsuarioModel = require("../models/Usuario");
const { atributosAtleta, atributosUsuario } = require("../utils/atributos");
const UsuarioController = require("./Usuario");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

module.exports = {
  async create(request, response) {
    try {
      const requestData = request.body;

      // Separar os dados do Atleta e do Usuario usando desestruturação
      const {
        nomeResponsavel,
        parentescoResponsavel,
        modalidade,
        treinador,
        clubeOuAssociacao,
        federacao,
        numRegistroFederacao,
        confederacao,
        numRegistroConfederacao,
        federacaoInternacional,
        numRegistroInternacional,
        cadeirante,
        amputado,
        atletaGuia,
        classificacaoFuncional,
        historicoDeficiencia,
        inicioPratica,
        recebeAuxilio,
        financiador,
        responsavel,
        ...dadosUsuario
      } = requestData;

      const dadosAtleta = {
        nomeResponsavel,
        parentescoResponsavel,
        modalidade,
        treinador,
        clubeOuAssociacao,
        federacao,
        numRegistroFederacao,
        confederacao,
        numRegistroConfederacao,
        federacaoInternacional,
        numRegistroInternacional,
        cadeirante,
        amputado,
        atletaGuia,
        classificacaoFuncional,
        historicoDeficiencia,
        inicioPratica,
        recebeAuxilio,
        financiador,
        responsavel
      };

      const responsavelColeta = dadosAtleta.responsavel;
      delete dadosAtleta.responsavel;
      const usuario = await UsuarioController.create({ body: dadosUsuario });

      dadosAtleta.usuario = usuario.matricula;
      await AtletaModel.create(dadosAtleta);

      const log = {};
      log.id = uuidv4();
      log.responsavel = responsavelColeta;
      log.data = new Date();
      log.nomeTabela = "atleta";
      log.tabelaId = dadosAtleta.usuario;
      log.tipoAlteracao = "Create";
      await LogsModel.create(log);

      return response.status(201).json({ matricula: dadosAtleta.usuario });
    } catch (err) {
      console.error(`Atleta creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await AtletaModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Atleta getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByUsuario(request, response) {
    try {
      const { usuario } = request.params;
      const result = await AtletaModel.getByUsuario(usuario);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Atleta getByUsuario failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await AtletaModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Atleta getByFields failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async update(request, response) {
    try {
      const { usuario } = request.params;
      const dataToUpdate = request.body;

      const atletaKeys = atributosAtleta;
      const usuarioKeys = atributosUsuario;

      const atletaFieldsToUpdate = Object.keys(dataToUpdate).filter((key) => atletaKeys.includes(key));
      const usuarioFieldsToUpdate = Object.keys(dataToUpdate).filter((key) => usuarioKeys.includes(key));

      const log = {};
      log.nomeTabela = "atleta";
      log.responsavel = dataToUpdate.responsavel;
      log.data = new Date();
      log.tabelaId = usuario;
      log.tipoAlteracao = "Update";
      log.motivo = dataToUpdate.motivo;

      delete dataToUpdate.responsavel;
      delete dataToUpdate.motivo;

      if (atletaFieldsToUpdate.length > 0) {
        const atletaDataToUpdate = atletaFieldsToUpdate.reduce((obj, key) => {
          obj[key] = dataToUpdate[key];
          return obj;
        }, {});
        const atributos = Object.keys(atletaDataToUpdate);
        const valoresNovos = Object.values(atletaDataToUpdate);
        log.id = uuidv4();
        log.atributo = atributos.join(",");
        const atletaAtual = await AtletaModel.getByUsuario(usuario);
        const valoresAntigos = Object.fromEntries(atributos.map((chave) => [chave, atletaAtual[chave]]));
        const valoresAntigosValues = Object.values(valoresAntigos);
        log.valorAntigo = valoresAntigosValues.join(",");
        log.novoValor = valoresNovos.join(",");
        await AtletaModel.updateByUsuario(usuario, atletaDataToUpdate);
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

      if (atletaFieldsToUpdate.length === 0 && usuarioFieldsToUpdate.length === 0) {
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
      await AtletaModel.deleteByUsuario(usuario);
      await UsuarioModel.deleteById(usuario);

      const log = {};
      log.id = uuidv4();
      log.responsavel = logData.responsavel;
      log.data = new Date();
      log.nomeTabela = "atleta";
      log.tabelaId = usuario;
      log.tipoAlteracao = "Delete";
      log.motivo = logData.motivo;
      await LogsModel.create(log);

      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Atleta delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

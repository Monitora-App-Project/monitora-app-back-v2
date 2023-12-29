const TreinadorModel = require("../models/Treinador");
const UsuarioController = require("./Usuario");
const OcorrenciasModel = require("../models/Ocorrencias");
const LogsModel = require("../models/Logs");
const UsuarioModel = require("../models/Usuario");
const { atributosTreinador, atributosUsuario } = require("../utils/atributos");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

module.exports = {
  async create(request, response) {
    try {
      const requestData = request.body;

      // Separar os dados do treinador e do Usuario usando desestruturação
      const { cref, modalidade, responsavel, ...dadosUsuario } = requestData;

      const dadosTreinador = {
        cref,
        modalidade,
        responsavel
      };

      const responsavelColeta = dadosTreinador.responsavel;
      delete dadosTreinador.responsavel;
      const usuario = await UsuarioController.create({ body: dadosUsuario });

      dadosTreinador.usuario = usuario.matricula;
      await TreinadorModel.create(dadosTreinador);

      const log = {};
      log.id = uuidv4();
      log.responsavel = responsavelColeta;
      log.data = new Date();
      log.nomeTabela = "treinador";
      log.tabelaId = dadosTreinador.usuario;
      log.tipoAlteracao = "Create";
      await LogsModel.create(log);

      return response.status(201).json({ matricula: dadosTreinador.usuario });
    } catch (err) {
      console.error(`Treinador creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await TreinadorModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Treinador getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByUsuario(request, response) {
    try {
      const { usuario } = request.params;
      const result = await TreinadorModel.getByUsuario(usuario);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Treinador getByUsuario failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await TreinadorModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Treinador getByFields failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async update(request, response) {
    try {
      const { usuario } = request.params;
      const dataToUpdate = request.body;

      const treinadorKeys = atributosTreinador;
      const usuarioKeys = atributosUsuario;

      const treinadorFieldsToUpdate = Object.keys(dataToUpdate).filter((key) => treinadorKeys.includes(key));
      const usuarioFieldsToUpdate = Object.keys(dataToUpdate).filter((key) => usuarioKeys.includes(key));

      const log = {};
      log.nomeTabela = "treinador";
      log.responsavel = dataToUpdate.responsavel;
      log.data = new Date();
      log.tabelaId = usuario;
      log.tipoAlteracao = "Update";
      log.motivo = dataToUpdate.motivo;

      const ocorrencia = {};
      ocorrencia.responsavel = dataToUpdate.responsavel;
      ocorrencia.data = new Date();
      ocorrencia.motivo = dataToUpdate.motivo;
      ocorrencia.usuarioModificado = usuario;

      delete dataToUpdate.responsavel;
      delete dataToUpdate.motivo;

      if (treinadorFieldsToUpdate.length > 0) {
        const treinadorDataToUpdate = treinadorFieldsToUpdate.reduce((obj, key) => {
          obj[key] = dataToUpdate[key];
          return obj;
        }, {});
        const atributos = Object.keys(treinadorDataToUpdate);
        const valoresNovos = Object.values(treinadorDataToUpdate);
        log.id = uuidv4();
        log.atributo = atributos.join(",");
        const treinadorAtual = await TreinadorModel.getByUsuario(usuario);
        const valoresAntigos = Object.fromEntries(atributos.map((chave) => [chave, treinadorAtual[chave]]));
        const valoresAntigosValues = Object.values(valoresAntigos);
        log.valorAntigo = valoresAntigosValues.join(",");
        log.novoValor = valoresNovos.join(",");
        await TreinadorModel.updateByUsuario(usuario, treinadorDataToUpdate);
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

        for (const atributo of atributos) {
          if (atributo === "ativo") {
            ocorrencia.id = uuidv4();
            ocorrencia.atributo = atributo;
            ocorrencia.valorAntigo = valoresAntigos.ativo;
            ocorrencia.novoValor = usuarioDataToUpdate.ativo;
            await OcorrenciasModel.create(ocorrencia);
          }
        }
      }

      if (treinadorFieldsToUpdate.length === 0 && usuarioFieldsToUpdate.length === 0) {
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
      await TreinadorModel.deleteByUsuario(usuario);
      await UsuarioModel.deleteById(usuario);
      
      const log = {};
      log.id = uuidv4();
      log.responsavel = logData.responsavel;
      log.data = new Date();
      log.nomeTabela = "treinador";
      log.tabelaId = usuario;
      log.tipoAlteracao = "Delete";
      log.motivo = logData.motivo;
      await LogsModel.create(log);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Treinador delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

const AlunoModel = require("../models/Aluno");
const UsuarioController = require("./Usuario");
const OcorrenciasModel = require("../models/Ocorrencias");
const LogsModel = require("../models/Logs");
const UsuarioModel = require("../models/Usuario");
const { atributosAluno, atributosUsuario } = require("../utils/atributos");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

function defineUsuarioSecret(tipo) {
  switch (tipo) {
    case "admin":
      return process.env.ADMIN_SECRET;

    case "coordenador":
      return process.env.COORDENADOR_SECRET;

    case "analista":
      return process.env.ANALISTA_SECRET;

    case "treinador":
      return process.env.TREINADOR_SECRET;

    case "atleta":
      return process.env.ATLETA_SECRET;

    default:
      break;
  }
}

module.exports = {
  async create(request, response) {
    try {
      const requestData = request.body;

      // Separar os dados do aluno e do Usuario usando desestruturação
      const { curso, matricula_ufmg, nivel, orientador, responsavel, ...dadosUsuario } = requestData;

      const dadosAluno = {
        curso,
        matricula_ufmg,
        nivel,
        orientador,
        responsavel
      };

      const responsavelColeta = dadosAluno.responsavel;
      delete dadosAluno.responsavel;
      const usuario = await UsuarioController.create({ body: dadosUsuario });

      dadosAluno.usuario = usuario.matricula;
      await AlunoModel.create(dadosAluno);

      const log = {};
      log.id = uuidv4();
      log.responsavel = responsavelColeta;
      log.data = new Date();
      log.nomeTabela = "aluno";
      log.tabelaId = dadosAluno.usuario;
      log.tipoAlteracao = "Create";
      await LogsModel.create(log);

      return response.status(201).json({ matricula: dadosAluno.usuario });
    } catch (err) {
      console.error(`Aluno creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await AlunoModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Aluno getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByUsuario(request, response) {
    try {
      const { usuario } = request.params;
      const result = await AlunoModel.getByUsuario(usuario);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Aluno getByUsuario failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async update(request, response) {
    try {
      const { usuario } = request.params;
      const dataToUpdate = request.body;

      const alunoKeys = atributosAluno;
      const usuarioKeys = atributosUsuario;

      const alunoFieldsToUpdate = Object.keys(dataToUpdate).filter((key) => alunoKeys.includes(key));
      const usuarioFieldsToUpdate = Object.keys(dataToUpdate).filter((key) => usuarioKeys.includes(key));

      const log = {};
      log.nomeTabela = "aluno";
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

      if (alunoFieldsToUpdate.length > 0) {
        const alunoDataToUpdate = alunoFieldsToUpdate.reduce((obj, key) => {
          obj[key] = dataToUpdate[key];
          return obj;
        }, {});
        const atributos = Object.keys(alunoDataToUpdate);
        const valoresNovos = Object.values(alunoDataToUpdate);
        log.id = uuidv4();
        log.atributo = atributos.join(",");
        const alunoAtual = await AlunoModel.getByUsuario(usuario);
        const valoresAntigos = Object.fromEntries(atributos.map((chave) => [chave, alunoAtual[chave]]));
        const valoresAntigosValues = Object.values(valoresAntigos);
        log.valorAntigo = valoresAntigosValues.join(",");
        log.novoValor = valoresNovos.join(",");
        await AlunoModel.updateByUsuario(usuario, alunoDataToUpdate);
        await LogsModel.create(log);
      }

      if (usuarioFieldsToUpdate.length > 0) {
        const usuarioDataToUpdate = usuarioFieldsToUpdate.reduce((obj, key) => {
          obj[key] = dataToUpdate[key];
          return obj;
        }, {});

        const atributos = Object.keys(usuarioDataToUpdate);
        for (const atributo of atributos) {
          if (atributo === "tipo") {
            usuarioDataToUpdate.tipo = defineUsuarioSecret(usuarioDataToUpdate.tipo);
          }
        }
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
          if (atributo === "tipo") {
            ocorrencia.id = uuidv4();
            ocorrencia.atributo = atributo;
            ocorrencia.valorAntigo = valoresAntigos.tipo;
            ocorrencia.novoValor = usuarioDataToUpdate.tipo;
            await OcorrenciasModel.create(ocorrencia);
          }
        }
      }

      if (alunoFieldsToUpdate.length === 0 && usuarioFieldsToUpdate.length === 0) {
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
      await AlunoModel.deleteByUsuario(usuario);
      await UsuarioModel.deleteById(usuario);

      const log = {};
      log.id = uuidv4();
      log.responsavel = logData.responsavel;
      log.data = new Date();
      log.nomeTabela = "aluno";
      log.tabelaId = usuario;
      log.tipoAlteracao = "Delete";
      log.motivo = logData.motivo;
      await LogsModel.create(log);

      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Aluno delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

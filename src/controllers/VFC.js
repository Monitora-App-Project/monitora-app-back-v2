const VFCModel = require("../models/VFC");
const TesteModel = require("../models/Teste");
const LogsModel = require("../models/Logs");
const UsuarioModel = require("../models/Usuario");

const { pegaModalidade, calculaIdade } = require("../utils/utilities");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const idTipoTeste = 5;

const converterTimestamp = (timestamp) => {
  const partes = timestamp.split(" ");
  const dataPartes = partes[0].split("-");
  const horaPartes = partes[1].split(":");
  return new Date(
    parseInt(dataPartes[0]),
    parseInt(dataPartes[1]) - 1, // O mês no JavaScript é baseado em zero
    parseInt(dataPartes[2]),
    parseInt(horaPartes[0]),
    parseInt(horaPartes[1]),
    parseInt(horaPartes[2])
  );
}

module.exports = {
  async create(request, response) {
    try {
      // Salva informacoes gerais
      const vfc = request.body;
      const matriculaAtleta = vfc.matriculaAtleta;
      const responsavel = vfc.responsavel;
      const id = uuidv4();
      const timestamp = converterTimestamp(vfc.timestamp);

      delete vfc.matriculaAtleta;
      delete vfc.responsavel;
      delete vfc.timestamp;

      // Testes de existência 
      const alunoExiste = await UsuarioModel.verificaMatriculaExiste(matriculaAtleta);
      const responsavelExiste = await UsuarioModel.verificaMatriculaExiste(responsavel);
      var idExiste = await TesteModel.verificaIdTesteExiste(id);
      if (!alunoExiste) {
        return response.status(400).json({
          notification: "O número de matrícula do atleta não está cadastrado."
        });
      }
      if (!responsavelExiste) {
        return response.status(400).json({
          notification: "O número de matrícula do responsável não está cadastrado."
        });
      }
      while(idExiste){
        id = uuidv4();        // Se o id ja existir, recalcula
        idExiste = await TesteModel.verificaIdTesteExiste(id);
      }

      // Cria teste geral
      const teste = {}; 
      teste.id = id;
      teste.horaDaColeta = timestamp;
      teste.matriculaAtleta = matriculaAtleta;
      teste.idTipoTeste = idTipoTeste;
      teste.idModalidade = await pegaModalidade(matriculaAtleta);
      teste.idade = await calculaIdade(matriculaAtleta);
      await TesteModel.create(teste);

      // Dados do teste especifico
      vfc.idTeste = id;

      // Cria teste especifico
      try {
        await VFCModel.create(vfc); 
      } catch (err) {
        await TesteModel.deleteById(id)
        console.error(`VFC creation failed: ${err}`);
        return response.status(500).json({
          notification: "Internal server error"
        });
      }

      // Cria log de Create
      const log = {}; 
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;
      log.nomeTabela = "vfc";
      log.tabelaId = id;
      log.tipoAlteracao = "Create";
      await LogsModel.create(log);

      return response.status(201).json({ id: vfc.idTeste, horaDaColeta: timestamp });
    } catch (err) {
      console.error(`VFC creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await VFCModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`VFC getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await VFCModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`VFC getByFields failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByTeste(request, response) {
    try {
      const { idTeste } = request.params;
      const idExiste = await VFCModel.verificaIdTesteExiste(idTeste);
      if(!idExiste){
        return response.status(400).json({
          notification: "Não há testes de VFC com esse id."
        });
      }
      const result = await VFCModel.getByTeste(idTeste);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`VFC getByTeste failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByDate(request, response) {
    try {
      const fields = request.body;
      const result = await VFCModel.getByDate(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`VFC getByDate failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async update(request, response) {
    try {
      const { idTeste } = request.params;
      const vfcUpdate = request.body;
      const responsavel = vfcUpdate.responsavel;

      const idExiste = await VFCModel.verificaIdTesteExiste(idTeste);
      const responsavelExiste = await UsuarioModel.verificaMatriculaExiste(responsavel);
      if(!idExiste){
        return response.status(400).json({
          notification: "Não há testes de VFC com esse id."
        });
      }
      if (!responsavelExiste) {
        return response.status(400).json({
          notification: "O número de matrícula do responsável não está cadastrado."
        });
      }

      // Seta valores do log
      const motivo = vfcUpdate.motivo;
      delete vfcUpdate.responsavel;
      delete vfcUpdate.motivo;
      const timestamp = new Date();
      const atributos = Object.keys(vfcUpdate);
      const valoresNovos = Object.values(vfcUpdate);

      const vfcAtual = await VFCModel.getByTeste(idTeste);
      const valoresAntigos = Object.fromEntries(atributos.map((chave) => [chave, vfcAtual[0][chave]]));
      const valoresAntigosValues = Object.values(valoresAntigos);

      // Da o Update
      const stillExistFieldsToUpdate = Object.values(vfcUpdate).length > 0;
      if (stillExistFieldsToUpdate) {
        await VFCModel.updateByTeste(idTeste, vfcUpdate);
        // Cria log
        const log = {};
        log.id = uuidv4();
        log.responsavel = responsavel;
        log.data = timestamp;
        log.nomeTabela = "vfc";
        log.tabelaId = idTeste;
        log.tipoAlteracao = "Update";
        log.atributo = atributos.join(",");
        log.valorAntigo = valoresAntigosValues.join(",");
        log.novoValor = valoresNovos.join(",");
        log.motivo = motivo;
        await LogsModel.create(log);
      } else {
        return response.status(200).json("Não há dados para serem alterados");
      }

      return response.status(200).json("OK");
    } catch (err) {
      console.error(`VFC update failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async delete(request, response) {
    try {
      const { idTeste } = request.params;
      const vfcDelete = request.body;
      const responsavel = vfcDelete.responsavel;
      const idExiste = await VFCModel.verificaIdTesteExiste(idTeste);
      const responsavelExiste = await UsuarioModel.verificaMatriculaExiste(responsavel);
      if(!idExiste){
        return response.status(400).json({
          notification: "Não há testes de VFC com esse id."
        });
      }
      if (!responsavelExiste) {
        return response.status(400).json({
          notification: "O número de matrícula do responsável não está cadastrado."
        });
      }
      
      const motivo = vfcDelete.motivo;
      const timestamp = new Date();

      // Cria log
      const log = {};
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;
      log.nomeTabela = "vfc";
      log.tabelaId = idTeste;
      log.tipoAlteracao = "Delete";
      log.motivo = motivo;

      await VFCModel.deleteByTeste(idTeste);
      await TesteModel.deleteById(idTeste);
      await LogsModel.create(log);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`VFC delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

const ComposicaoCorporalModel = require("../models/ComposicaoCorporal");
const TesteModel = require("../models/Teste");
const LogsModel = require("../models/Logs");

const { pegaModalidade, calculaIdade, calcularMedia, getCadeirante } = require("../utils/utilities");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const idTipoTeste = 1;
// Parametros para 

module.exports = {
  async create(request, response) {
    try {
      // Salva informacoes
      const compCorp = request.body;
      const matriculaAtleta = compCorp.matriculaAtleta;
      const responsavel = compCorp.responsavel;
      delete compCorp.matriculaAtleta;
      delete compCorp.responsavel;
      const id = uuidv4();
      const timestamp = new Date();

      // Informacoes que precisam de media
      const valoresOmbro = [compCorp.circOmbro1, compCorp.circOmbro2, compCorp.circOmbro3];
      const valoresTorax = [compCorp.circTorax1, compCorp.circTorax2, compCorp.circTorax3];
      const valoresBracoDir = [compCorp.circBracoDir1, compCorp.circBracoDir2, compCorp.circBracoDir3];
      const valoresBracoEsq = [compCorp.circBracoEsq1, compCorp.circBracoEsq2, compCorp.circBracoEsq3];
      const valoresAntDir = [compCorp.circAntDir1, compCorp.circAntDir2, compCorp.circAntDir3];
      const valoresAntEsq = [compCorp.circAntEsq1, compCorp.circAntEsq2, compCorp.circAntEsq3];
      const valoresCintura = [compCorp.circCintura1, compCorp.circCintura2, compCorp.circCintura3];
      const valoresAbdomen = [compCorp.circAbdomen1, compCorp.circAbdomen2, compCorp.circAbdomen3];
      const valoresQuadril = [compCorp.circQuadril1, compCorp.circQuadril2, compCorp.circQuadril3];
      const valoresCoxaDir = [compCorp.circCoxaDir1, compCorp.circCoxaDir2, compCorp.circCoxaDir3];
      const valoresCoxaEsq = [compCorp.circCoxaEsq1, compCorp.circCoxaEsq2, compCorp.circCoxaEsq3];
      const valoresPantDir = [compCorp.circPantDir1, compCorp.circPantDir2, compCorp.circPantDir3];
      const valoresPantEsq = [compCorp.circPantEsq1, compCorp.circPantEsq2, compCorp.circPantEsq3];
      const valoresDcPeitoral = [compCorp.dcPeitoral1, compCorp.dcPeitoral2, compCorp.dcPeitoral3];
      const valoresDcAxilar = [compCorp.dcAxilar1, compCorp.dcAxilar2, compCorp.dcAxilar3];
      const valoresDcTriceps = [compCorp.dcTriceps1, compCorp.dcTriceps2, compCorp.dcTriceps3];
      const valoresDcSubescapular = [compCorp.dcSubescapular1, compCorp.dcSubescapular2, compCorp.dcSubescapular3];
      const valoresDcAbdominal = [compCorp.dcAbdominal1, compCorp.dcAbdominal2, compCorp.dcAbdominal3];
      const valoresDcSuprailiaca = [compCorp.dcSuprailiaca1, compCorp.dcSuprailiaca2, compCorp.dcSuprailiaca3];
      const valoresDcCoxa = [compCorp.dcCoxa1, compCorp.dcCoxa2, compCorp.dcCoxa3];
      const valoresDcPant = [compCorp.dcPant1, compCorp.dcPant2, compCorp.dcPant3];

      // Cria teste geral
      const teste = {};
      teste.id = id;
      teste.horaDaColeta = timestamp;
      teste.matriculaAtleta = matriculaAtleta;
      teste.idTipoTeste = idTipoTeste;
      teste.idModalidade = await pegaModalidade(matriculaAtleta);
      teste.idade = await calculaIdade(matriculaAtleta);
      await TesteModel.create(teste);

      // Cria Composicao Corporal
      compCorp.idTeste = id;
      compCorp.mediaCircOmbro = calcularMedia(valoresOmbro);
      compCorp.mediaCircTorax = calcularMedia(valoresTorax);
      compCorp.mediaCircBracoDir = calcularMedia(valoresBracoDir);
      compCorp.mediaCircBracoEsq = calcularMedia(valoresBracoEsq);
      compCorp.mediaCircAntDir = calcularMedia(valoresAntDir);
      compCorp.mediaCircAntEsq = calcularMedia(valoresAntEsq);
      compCorp.mediaCircCintura = calcularMedia(valoresCintura);
      compCorp.mediaCircAbdomen = calcularMedia(valoresAbdomen);
      compCorp.mediaCircQuadril = calcularMedia(valoresQuadril);
      compCorp.mediaCircCoxaDir = calcularMedia(valoresCoxaDir);
      compCorp.mediaCircCoxaEsq = calcularMedia(valoresCoxaEsq);
      compCorp.mediaCircPantDir = calcularMedia(valoresPantDir);
      compCorp.mediaCircPantEsq = calcularMedia(valoresPantEsq);
      compCorp.mediaDcPeitoral = calcularMedia(valoresDcPeitoral);
      compCorp.mediaDcAxilar = calcularMedia(valoresDcAxilar);
      compCorp.mediaDcTriceps = calcularMedia(valoresDcTriceps);
      compCorp.mediaDcSubescapular = calcularMedia(valoresDcSubescapular);
      compCorp.mediaDcAbdominal = calcularMedia(valoresDcAbdominal);
      compCorp.mediaDcSuprailiaca = calcularMedia(valoresDcSuprailiaca);
      compCorp.mediaDcCoxa = calcularMedia(valoresDcCoxa);
      compCorp.mediaDcPant = calcularMedia(valoresDcPant);

      compCorp.somaSeteDobras =
        compCorp.mediaDcPeitoral +
        compCorp.mediaDcAxilar +
        compCorp.mediaDcTriceps +
        compCorp.mediaDcSubescapular +
        compCorp.mediaDcAbdominal +
        compCorp.mediaDcSuprailiaca +
        compCorp.mediaDcCoxa;
      compCorp.quadradoSoma = compCorp.somaSeteDobras**2;
      compCorp.densidade =
        1.112 - 0.00043499 * compCorp.somaSeteDobras + 0.00000055 * compCorp.quadradoSoma - 0.00028826 * 36;
      const isCadeirante = getCadeirante(matriculaAtleta);
      if (isCadeirante){
        compCorp.percentualGordura = 
          -3.04 + (0.41 * compCorp.somaSeteDobras) - (0.001 * compCorp.quadradoSoma) + (0.03 * compCorp.mediaCircPantDir);
      }
      else{
        compCorp.percentualGordura = 
          ((4.95/compCorp.densidade)-4.5)*100
      }

      compCorp.massaGorda = compCorp.massaCorporal*(compCorp.percentualGordura/100);
      compCorp.massaIsentaDeGordura = compCorp.massaCorporal - compCorp.massaGorda;

      await ComposicaoCorporalModel.create(compCorp); 

      // Cria log de Create
      const log = {}; // JSON que guarda os dados a serem inseridos no log
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;
      log.nomeTabela = "composicaoCorporal";
      log.tabelaId = id;
      log.tipoAlteracao = "Create";
      await LogsModel.create(log);

      return response.status(201).json({ id: compCorp.idTeste, horaDaColeta: timestamp });
    } catch (err) {
      console.error(`Composição Corporal creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await ComposicaoCorporalModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Composicao Corporal getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.body;
      const result = await ComposicaoCorporalModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Composicao Corporal getByFields failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByTeste(request, response) {
    try {
      const { idTeste } = request.params;
      const result = await ComposicaoCorporalModel.getByTeste(idTeste);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Composicao Corporal getByTeste failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getByDate(request, response) {
    try {
      const fields = request.body;
      const result = await ComposicaoCorporalModel.getByDate(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Composicao Corporal getByDate failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async update(request, response) {
    try {
      const { idTeste } = request.params;
      const hooperUpdate = request.body;

      // Seta valores do log
      const responsavel = hooperUpdate.responsavel;
      const motivo = hooperUpdate.motivo;
      delete hooperUpdate.responsavel;
      delete hooperUpdate.motivo;
      const timestamp = new Date();
      const atributos = Object.keys(hooperUpdate);
      const valoresNovos = Object.values(hooperUpdate);

      const hooperAtual = await HooperModel.getByTeste(idTeste);
      const valoresAntigos = Object.fromEntries(atributos.map((chave) => [chave, hooperAtual[0][chave]]));
      const valoresAntigosValues = Object.values(valoresAntigos);

      // Da o Update
      const stillExistFieldsToUpdate = Object.values(hooperUpdate).length > 0;
      if (stillExistFieldsToUpdate) {
        await HooperModel.updateByTeste(idTeste, hooperUpdate);
      }

      // Cria log
      const log = {};
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;
      log.nomeTabela = "Hooper";
      log.tabelaId = idTeste;
      log.tipoAlteracao = "Update";
      log.atributo = atributos.join(",");
      log.valorAntigo = valoresAntigosValues.join(",");
      log.novoValor = valoresNovos.join(",");
      log.motivo = motivo;
      await LogsModel.create(log);

      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Hooper update failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async delete(request, response) {
    try {
      const { idTeste } = request.params;
      const hooperDelete = request.body;
      const responsavel = hooperDelete.responsavel;
      const motivo = hooperDelete.motivo;
      const timestamp = new Date();

      // Cria log
      const log = {};
      log.id = uuidv4();
      log.responsavel = responsavel;
      log.data = timestamp;
      log.nomeTabela = "Hooper";
      log.tabelaId = idTeste;
      log.tipoAlteracao = "Delete";
      log.motivo = motivo;

      await HooperModel.deleteByTeste(idTeste);
      await TesteModel.deleteById(idTeste);
      await LogsModel.create(log);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Hooper delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

const express = require("express");

const resultadoCompeticaoRouter = express.Router();

const ResultadoCompeticaoController = require("../../controllers/ResultadoCompeticao");
const ResultadoCompeticaoValidator = require("../../validators/ResultadoCompeticao");
// const auth = require('../../middlewares/authentication');

resultadoCompeticaoRouter.get(
  "/",
  //ResultadoCompeticaoValidator.getAll,
  ResultadoCompeticaoController.getAll
);
resultadoCompeticaoRouter.get(
  "/fields",
  // ResultadoCompeticaoValidator.getAll,
  ResultadoCompeticaoController.getByFields
);
resultadoCompeticaoRouter.get(
  "/atleta/:atleta",
  ResultadoCompeticaoValidator.getByAtleta,
  ResultadoCompeticaoController.getByAtleta
);
resultadoCompeticaoRouter.get(
  "/modalidade/:modalidade",
  ResultadoCompeticaoValidator.getByModalidade,
  ResultadoCompeticaoController.getByModalidade
);
resultadoCompeticaoRouter.get(
  "/:id",
  ResultadoCompeticaoValidator.getById,
  ResultadoCompeticaoController.getById
);
resultadoCompeticaoRouter.post(
  "/",
  ResultadoCompeticaoValidator.create,
  ResultadoCompeticaoController.create
);
resultadoCompeticaoRouter.put(
  "/:id",
  ResultadoCompeticaoValidator.update,
  ResultadoCompeticaoController.update
);
resultadoCompeticaoRouter.delete(
  "/:id",
  ResultadoCompeticaoValidator.delete, 
  ResultadoCompeticaoController.delete
);

module.exports = resultadoCompeticaoRouter;

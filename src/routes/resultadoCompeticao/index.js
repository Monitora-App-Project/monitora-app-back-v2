const express = require("express");

const resultadoCompeticaoRouter = express.Router();

const ResultadoCompeticaoController = require("../../controllers/ResultadoCompeticao");
const ResultadoCompeticaoValidator = require("../../validators/ResultadoCompeticao");
const auth = require('../../middlewares/authentication');

resultadoCompeticaoRouter.get(
  "/",
  ResultadoCompeticaoValidator.getAll,
  auth.authenticateToken,
  ResultadoCompeticaoController.getAll
);
resultadoCompeticaoRouter.get(
  "/fields",
  ResultadoCompeticaoValidator.getAll,
  auth.authenticateToken,
  ResultadoCompeticaoController.getByFields
);
resultadoCompeticaoRouter.get(
  "/atleta/:atleta",
  ResultadoCompeticaoValidator.getByAtleta,
  auth.authenticateToken,
  ResultadoCompeticaoController.getByAtleta
);
resultadoCompeticaoRouter.get(
  "/modalidade/:modalidade",
  ResultadoCompeticaoValidator.getByModalidade,
  auth.authenticateToken,
  ResultadoCompeticaoController.getByModalidade
);
resultadoCompeticaoRouter.get(
  "/:id",
  ResultadoCompeticaoValidator.getById,
  auth.authenticateToken,
  ResultadoCompeticaoController.getById
);
resultadoCompeticaoRouter.post(
  "/",
  ResultadoCompeticaoValidator.create,
  auth.authenticateToken,
  ResultadoCompeticaoController.create
);
resultadoCompeticaoRouter.put(
  "/:id",
  ResultadoCompeticaoValidator.update,
  auth.authenticateToken,
  ResultadoCompeticaoController.update
);
resultadoCompeticaoRouter.delete(
  "/:id",
  ResultadoCompeticaoValidator.delete, 
  auth.authenticateToken,
  ResultadoCompeticaoController.delete
);

module.exports = resultadoCompeticaoRouter;

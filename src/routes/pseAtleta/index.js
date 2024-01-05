const express = require('express');

const pseAtletaRouter = express.Router();

const PseAtletaController = require('../../controllers/PSEAtleta');
const PseAtletaValidator = require('../../validators/PSEAtleta');

const auth = require('../../middlewares/authentication');

pseAtletaRouter.post(
  '/',
  PseAtletaValidator.create,
  auth.authenticateToken,
  PseAtletaController.create
);
pseAtletaRouter.get(
  '/',
  PseAtletaValidator.getAll,
  auth.authenticateToken,
  PseAtletaController.getAll
);
pseAtletaRouter.get(
  '/fields',
  PseAtletaValidator.getAll,
  auth.authenticateToken,
  PseAtletaController.getByFields
);
pseAtletaRouter.get(
  '/date',
  PseAtletaValidator.getByDate,
  auth.authenticateToken,
  PseAtletaController.getByDate
);
pseAtletaRouter.get(
  '/:idTeste',
  PseAtletaValidator.getByTeste,
  auth.authenticateToken,
  PseAtletaController.getByTeste
);
pseAtletaRouter.put(
  '/:idTeste',
  PseAtletaValidator.update,
  auth.authenticateToken,
  PseAtletaController.update
);
pseAtletaRouter.delete(
  '/:idTeste',
  PseAtletaValidator.delete,
  auth.authenticateToken,
  PseAtletaController.delete
);

module.exports = pseAtletaRouter;

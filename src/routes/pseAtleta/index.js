const express = require('express');

const pseAtletaRouter = express.Router();

const PseAtletaController = require('../../controllers/PSEAtleta');
const PseAtletaValidator = require('../../validators/PSEAtleta');
// const auth = require('../../middlewares/authentication');

pseAtletaRouter.post(
  '/',
  PseAtletaValidator.create,
  PseAtletaController.create
);
pseAtletaRouter.get(
  '/',
  PseAtletaController.getAll
);
pseAtletaRouter.get(
  '/fields',
  PseAtletaController.getByFields
);
pseAtletaRouter.get(
  '/date',
  PseAtletaValidator.getByDate,
  PseAtletaController.getByDate
);
pseAtletaRouter.get(
  '/:idTeste',
  PseAtletaValidator.getByTeste,
  PseAtletaController.getByTeste
);
pseAtletaRouter.put(
  '/:idTeste',
  PseAtletaValidator.update,
  PseAtletaController.update
);
pseAtletaRouter.delete(
  '/:idTeste',
  PseAtletaValidator.delete,
  PseAtletaController.delete
);

module.exports = pseAtletaRouter;

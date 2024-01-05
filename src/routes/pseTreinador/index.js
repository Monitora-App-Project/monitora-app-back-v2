const express = require('express');

const pseTreinadorRouter = express.Router();

const PseTreinadorController = require('../../controllers/PseTreinador');
const PseTreinadorValidator = require('../../validators/PseTreinador');

const auth = require('../../middlewares/authentication');

pseTreinadorRouter.post(
  '/',
  PseTreinadorValidator.create,
  auth.authenticateToken,
  PseTreinadorController.create
);
pseTreinadorRouter.get(
  '/',
  PseTreinadorValidator.getAll,
  auth.authenticateToken,
  PseTreinadorController.getAll
);
pseTreinadorRouter.get(
  '/fields',
  PseTreinadorValidator.getAll,
  auth.authenticateToken,
  PseTreinadorController.getByFields
);
pseTreinadorRouter.get(
  '/date',
  PseTreinadorValidator.getByDate,
  auth.authenticateToken,
  PseTreinadorController.getByDate
);
pseTreinadorRouter.get(
  '/:idTeste',
  PseTreinadorValidator.getByTeste,
  auth.authenticateToken,
  PseTreinadorController.getByTeste
);
pseTreinadorRouter.put(
  '/:idTeste',
  PseTreinadorValidator.update,
  auth.authenticateToken,
  PseTreinadorController.update
);
pseTreinadorRouter.delete(
  '/:idTeste',
  PseTreinadorValidator.delete,
  auth.authenticateToken,
  PseTreinadorController.delete
);

module.exports = pseTreinadorRouter;

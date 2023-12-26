const express = require('express');

const pseTreinadorRouter = express.Router();

const PseTreinadorController = require('../../controllers/PseTreinador');
const PseTreinadorValidator = require('../../validators/PseTreinador');

// const auth = require('../../middlewares/authentication');

pseTreinadorRouter.post(
  '/',
  PseTreinadorValidator.create,
  PseTreinadorController.create
);
pseTreinadorRouter.get(
  '/',
  PseTreinadorController.getAll
);
pseTreinadorRouter.get(
  '/fields',
  PseTreinadorController.getByFields
);
pseTreinadorRouter.get(
  '/date',
  PseTreinadorValidator.getByDate,
  PseTreinadorController.getByDate
);
pseTreinadorRouter.get(
  '/:idTeste',
  PseTreinadorValidator.getByTeste,
  PseTreinadorController.getByTeste
);
pseTreinadorRouter.put(
  '/:idTeste',
  PseTreinadorValidator.update,
  PseTreinadorController.update
);
pseTreinadorRouter.delete(
  '/:idTeste',
  PseTreinadorValidator.delete,
  PseTreinadorController.delete
);

module.exports = pseTreinadorRouter;

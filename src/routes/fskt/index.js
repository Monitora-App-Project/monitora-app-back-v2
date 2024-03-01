const express = require('express');

const hooperRouter = express.Router();

const FSKTController = require('../../controllers/FSKT');
const FSKTValidator = require('../../validators/FSKT');
const auth = require('../../middlewares/authentication');

hooperRouter.post(
  '/',
  // FSKTValidator.create,
  // auth.authenticateToken,
  FSKTController.create
);
hooperRouter.get(
  '/',
  FSKTValidator.getAll,
  auth.authenticateToken,
  FSKTController.getAll
);
hooperRouter.get(
  '/fields',
  FSKTValidator.getAll,
  auth.authenticateToken,
  FSKTController.getByFields
);
hooperRouter.get(
  '/date',
  FSKTValidator.getAll,
  auth.authenticateToken,
  FSKTController.getByDate
);
hooperRouter.get(
  '/:idTeste',
  FSKTValidator.getByTeste,
  auth.authenticateToken,
  FSKTController.getByTeste
);
hooperRouter.put(
  '/:idTeste',
  FSKTValidator.update,
  auth.authenticateToken,
  FSKTController.update
);
hooperRouter.delete(
  '/:idTeste',
  FSKTValidator.delete,
  auth.authenticateToken,
  FSKTController.delete
);

module.exports = hooperRouter;

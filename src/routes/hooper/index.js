const express = require('express');

const hooperRouter = express.Router();

const HooperController = require('../../controllers/Hooper');
const HooperValidator = require('../../validators/Hooper');
const auth = require('../../middlewares/authentication');

hooperRouter.post(
  '/',
  HooperValidator.create,
  auth.authenticateToken,
  HooperController.create
);
hooperRouter.get(
  '/',
  HooperValidator.getAll,
  auth.authenticateToken,
  HooperController.getAll
);
hooperRouter.get(
  '/fields',
  HooperValidator.getAll,
  auth.authenticateToken,
  HooperController.getByFields
);
hooperRouter.get(
  '/date',
  HooperValidator.getByDate,
  auth.authenticateToken,
  HooperController.getByDate
);
hooperRouter.get(
  '/:idTeste',
  HooperValidator.getByTeste,
  auth.authenticateToken,
  HooperController.getByTeste
);
hooperRouter.put(
  '/:idTeste',
  HooperValidator.update,
  auth.authenticateToken,
  HooperController.update
);
hooperRouter.delete(
  '/:idTeste',
  HooperValidator.delete,
  auth.authenticateToken,
  HooperController.delete
);

module.exports = hooperRouter;

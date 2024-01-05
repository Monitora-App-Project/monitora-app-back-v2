const express = require('express');

const hooperRouter = express.Router();

const FSKTController = require('../../controllers/FSKT');
const FSKTValidator = require('../../validators/FSKT');
// const auth = require('../../middlewares/authentication');

hooperRouter.post(
  '/',
  FSKTValidator.create,
  FSKTController.create
);
hooperRouter.get(
  '/',
  FSKTController.getAll
);
hooperRouter.get(
  '/fields',
  FSKTController.getByFields
);
hooperRouter.get(
  '/date',
  FSKTController.getByDate
);
hooperRouter.get(
  '/:idTeste',
  FSKTValidator.getByTeste,
  FSKTController.getByTeste
);
hooperRouter.put(
  '/:idTeste',
  FSKTValidator.update,
  FSKTController.update
);
hooperRouter.delete(
  '/:idTeste',
  FSKTValidator.delete,
  FSKTController.delete
);

module.exports = hooperRouter;

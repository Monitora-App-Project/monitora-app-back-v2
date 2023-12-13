const express = require('express');

const hooperRouter = express.Router();

const HooperController = require('../../controllers/Hooper');
const HooperValidator = require('../../validators/Hooper');
// const auth = require('../../middlewares/authentication');

hooperRouter.post(
  '/',
  HooperValidator.create,
  HooperController.create
);
hooperRouter.get(
  '/',
  HooperController.getAll
);
hooperRouter.get(
  '/fields',
  HooperController.getByFields
);
hooperRouter.get(
  '/:idTeste',
  HooperValidator.getByTeste,
  HooperController.getByTeste
);
hooperRouter.put(
  '/:idTeste',
  HooperValidator.update,
  HooperController.update
);
hooperRouter.delete(
  '/:idTeste',
  HooperValidator.delete,
  HooperController.delete
);

module.exports = hooperRouter;

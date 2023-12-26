const express = require('express');

const vfcRouter = express.Router();

const vfcController = require('../../controllers/VFC');
const vfcValidator = require('../../validators/VFC');

// const auth = require('../../middlewares/authentication');

vfcRouter.post(
  '/',
  vfcValidator.create,
  vfcController.create
);
vfcRouter.get(
  '/',
  vfcController.getAll
);
vfcRouter.get(
  '/fields',
  vfcController.getByFields
);
vfcRouter.get(
  '/date',
  vfcValidator.getByDate,
  vfcController.getByDate
);
vfcRouter.get(
  '/:idTeste',
  vfcValidator.getByTeste,
  vfcController.getByTeste
);
vfcRouter.put(
  '/:idTeste',
  vfcValidator.update,
  vfcController.update
);
vfcRouter.delete(
  '/:idTeste',
  vfcValidator.delete,
  vfcController.delete
);

module.exports = vfcRouter;

const express = require('express');

const vfcRouter = express.Router();

const vfcController = require('../../controllers/VFC');
const vfcValidator = require('../../validators/VFC');

const auth = require('../../middlewares/authentication');

vfcRouter.post(
  '/',
  vfcValidator.create,
  auth.authenticateToken,
  vfcController.create
);
vfcRouter.get(
  '/',
  vfcValidator.getAll,
  auth.authenticateToken,
  vfcController.getAll
);
vfcRouter.get(
  '/fields',
  vfcValidator.getAll,
  auth.authenticateToken,
  vfcController.getByFields
);
vfcRouter.get(
  '/date',
  vfcValidator.getByDate,
  auth.authenticateToken,
  vfcController.getByDate
);
vfcRouter.get(
  '/:idTeste',
  vfcValidator.getByTeste,
  auth.authenticateToken,
  vfcController.getByTeste
);
vfcRouter.put(
  '/:idTeste',
  vfcValidator.update,
  auth.authenticateToken,
  vfcController.update
);
vfcRouter.delete(
  '/:idTeste',
  vfcValidator.delete,
  auth.authenticateToken,
  vfcController.delete
);

module.exports = vfcRouter;

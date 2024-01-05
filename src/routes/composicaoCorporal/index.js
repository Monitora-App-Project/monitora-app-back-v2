const express = require('express');

const compCorpRouter = express.Router();

const compCorpController = require('../../controllers/ComposicaoCorporal');
const compCorpValidator = require('../../validators/ComposicaoCorporal');

const auth = require('../../middlewares/authentication');

compCorpRouter.post(
  '/',
  compCorpValidator.create,
  auth.authenticateToken,
  compCorpController.create
);
compCorpRouter.get(
  '/',
  compCorpValidator.getAll,
  auth.authenticateToken,
  compCorpController.getAll
);
compCorpRouter.get(
  '/fields',
  compCorpValidator.getAll,
  auth.authenticateToken,
  compCorpController.getByFields
);
compCorpRouter.get(
  '/date',
  compCorpValidator.getAll,
  auth.authenticateToken,
  compCorpController.getByDate
);
compCorpRouter.get(
  '/:idTeste',
  compCorpValidator.getByTeste,
  auth.authenticateToken,
  compCorpController.getByTeste
);
compCorpRouter.put(
  '/:idTeste',
  compCorpValidator.update,
  auth.authenticateToken,
  compCorpController.update
);
compCorpRouter.delete(
  '/:idTeste',
  compCorpValidator.delete,
  auth.authenticateToken,
  compCorpController.delete
);

module.exports = compCorpRouter;

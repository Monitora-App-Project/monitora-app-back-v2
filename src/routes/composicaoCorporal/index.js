const express = require('express');

const compCorpRouter = express.Router();

const compCorpController = require('../../controllers/ComposicaoCorporal');
const compCorpValidator = require('../../validators/ComposicaoCorporal');

// const auth = require('../../middlewares/authentication');

compCorpRouter.post(
  '/',
  compCorpValidator.create,
  compCorpController.create
);
compCorpRouter.get(
  '/',
  compCorpController.getAll
);
compCorpRouter.get(
  '/fields',
  compCorpController.getByFields
);
compCorpRouter.get(
  '/date',
  compCorpController.getByDate
);
compCorpRouter.get(
  '/:idTeste',
  compCorpValidator.getByTeste,
  compCorpController.getByTeste
);
compCorpRouter.put(
  '/:idTeste',
  compCorpValidator.update,
  compCorpController.update
);
compCorpRouter.delete(
  '/:idTeste',
  compCorpValidator.delete,
  compCorpController.delete
);

module.exports = compCorpRouter;

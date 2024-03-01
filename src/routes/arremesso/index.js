const express = require('express');

const arremessoRouter = express.Router();

const ArremessoController = require('../../controllers/Arremesso');
const ArremessoValidator = require('../../validators/Arremesso');
const auth = require('../../middlewares/authentication');

arremessoRouter.post(
  '/',
  // ArremessoValidator.create,
  // auth.authenticateToken,
  ArremessoController.create
);
arremessoRouter.get(
  '/',
  ArremessoValidator.getAll,
  auth.authenticateToken,
  ArremessoController.getAll
);
arremessoRouter.get(
  '/fields',
  ArremessoValidator.getAll,
  auth.authenticateToken,
  ArremessoController.getByFields
);
arremessoRouter.get(
  '/date',
  ArremessoValidator.getAll,
  auth.authenticateToken,
  ArremessoController.getByDate
);
arremessoRouter.get(
  '/:idTeste',
  ArremessoValidator.getByTeste,
  auth.authenticateToken,
  ArremessoController.getByTeste
);
arremessoRouter.put(
  '/:idTeste',
  ArremessoValidator.update,
  auth.authenticateToken,
  ArremessoController.update
);
arremessoRouter.delete(
  '/:idTeste',
  ArremessoValidator.delete,
  auth.authenticateToken,
  ArremessoController.delete
);

module.exports = arremessoRouter;

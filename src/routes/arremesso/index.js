const express = require('express');

const arremessoRouter = express.Router();

const ArremessoController = require('../../controllers/Arremesso');
const ArremessoValidator = require('../../validators/Arremesso');
// const auth = require('../../middlewares/authentication');

arremessoRouter.post(
  '/',
  ArremessoValidator.create,
  ArremessoController.create
);
arremessoRouter.get(
  '/',
  ArremessoController.getAll
);
arremessoRouter.get(
  '/fields',
  ArremessoController.getByFields
);
arremessoRouter.get(
  '/date',
  ArremessoController.getByDate
);
arremessoRouter.get(
  '/:idTeste',
  ArremessoValidator.getByTeste,
  ArremessoController.getByTeste
);
arremessoRouter.put(
  '/:idTeste',
  ArremessoValidator.update,
  ArremessoController.update
);
arremessoRouter.delete(
  '/:idTeste',
  ArremessoValidator.delete,
  ArremessoController.delete
);

module.exports = arremessoRouter;

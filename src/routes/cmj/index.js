const express = require('express');

const cmjRouter = express.Router();

const CMJController = require('../../controllers/CMJ');
const CMJValidator = require('../../validators/CMJ');
const auth = require('../../middlewares/authentication');

cmjRouter.get('/',
  CMJValidator.getAll,
  auth.authenticateToken,
  CMJController.getAll
);
cmjRouter.get(
  '/fields',
  CMJValidator.getAll,
  auth.authenticateToken,
  CMJController.getByFields
);
cmjRouter.get(
  '/date',
  CMJValidator.getAll,
  auth.authenticateToken,
  CMJController.getByDate
);
cmjRouter.get(
  '/:idTeste',
  CMJValidator.getByTeste,
  auth.authenticateToken,
  CMJController.getByTeste
);
cmjRouter.post(
  '/',
  CMJValidator.create,
  auth.authenticateToken,
  CMJController.create
);
cmjRouter.put(
  '/:idTeste',
  CMJValidator.update,
  auth.authenticateToken,
  CMJController.update
);
cmjRouter.delete(
  '/:idTeste',
  CMJValidator.delete,
  auth.authenticateToken,
  CMJController.delete
);

module.exports = cmjRouter;

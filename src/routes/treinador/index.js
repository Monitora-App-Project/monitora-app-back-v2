const express = require('express');

const treinadorRouter = express.Router();

const TreinadorController = require('../../controllers/Treinador');
const TreinadorValidator = require('../../validators/Treinador');
const auth = require('../../middlewares/authentication');

treinadorRouter.get('/',
  TreinadorValidator.getAll,
  auth.authenticateToken,
  TreinadorController.getAll
);
treinadorRouter.get(
  '/fields',
  TreinadorValidator.getAll,
  auth.authenticateToken,
  TreinadorController.getByFields
);
treinadorRouter.get(
  '/:id',
  TreinadorValidator.getByUsuario,
  auth.authenticateToken,
  TreinadorController.getByUsuario
);
treinadorRouter.post(
  '/',
  TreinadorValidator.create,
  auth.authenticateToken,
  TreinadorController.create
);
treinadorRouter.put(
  '/:usuario',
  TreinadorValidator.update,
  auth.authenticateToken,
  TreinadorController.update
);
treinadorRouter.delete(
  '/:usuario',
  TreinadorValidator.delete,
  auth.authenticateToken,
  TreinadorController.delete
);

module.exports = treinadorRouter;

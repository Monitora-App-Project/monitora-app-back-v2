const express = require('express');

const treinadorRouter = express.Router();

const TreinadorController = require('../../controllers/Treinador');
const TreinadorValidator = require('../../validators/Treinador');
// const auth = require('../../middlewares/authentication');

treinadorRouter.get('/',
  //TreinadorValidator.getAll,
  TreinadorController.getAll
);
treinadorRouter.get(
  '/fields',
  // TreinadorValidator.getById,
  TreinadorController.getByFields
);
treinadorRouter.get(
  '/:id',
  TreinadorValidator.getById,
  TreinadorController.getById
);
treinadorRouter.post(
  '/',
  TreinadorValidator.create,
  TreinadorController.create
);
treinadorRouter.put(
  '/:id',
  TreinadorValidator.update,
  TreinadorController.update
);
treinadorRouter.delete(
  '/:id',
  TreinadorValidator.delete,
  TreinadorController.delete
);

module.exports = treinadorRouter;

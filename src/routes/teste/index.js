const express = require('express');

const testeRouter = express.Router();

const TesteController = require('../../controllers/Teste');
const TesteValidator = require('../../validators/Teste');
const auth = require('../../middlewares/authentication');

testeRouter.post(
  '/',
  TesteValidator.create,
  auth.authenticateToken,
  TesteController.create
);

testeRouter.get('/',
  TesteValidator.getAll,
  auth.authenticateToken,
  TesteController.getAll
);

testeRouter.get('/:id',
  TesteValidator.getById,
  auth.authenticateToken,
  TesteController.getById
);

testeRouter.delete('/:id',
  TesteValidator.delete,
  auth.authenticateToken,
  TesteController.delete
);

module.exports = testeRouter;
const express = require('express');

const testeRouter = express.Router();

const TesteController = require('../../controllers/Teste');
const TesteValidator = require('../../validators/Teste');
// const auth = require('../../middlewares/authentication');

testeRouter.post(
  '/',
  TesteValidator.create,
  TesteController.create
);

testeRouter.get('/',
  TesteController.getAll
);

testeRouter.get('/:id',
  TesteValidator.getById,
  TesteController.getById
);

testeRouter.delete('/:id',
  TesteValidator.delete,
  TesteController.delete
);

module.exports = testeRouter;
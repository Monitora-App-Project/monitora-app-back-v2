const express = require('express');

const alunoRouter = express.Router();

const AlunoController = require('../../controllers/Aluno');
const AlunoValidator = require('../../validators/Aluno');
const auth = require('../../middlewares/authentication');

alunoRouter.get('/',
  AlunoValidator.getAll,
  auth.authenticateToken,
  AlunoController.getAll
);
alunoRouter.get(
  '/fields',
  AlunoValidator.getAll,
  auth.authenticateToken,
  AlunoController.getByFields
);
alunoRouter.get(
  '/:usuario',
  AlunoValidator.getByUsuario,
  auth.authenticateToken,
  AlunoController.getByUsuario
);
alunoRouter.post(
  '/',
  // AlunoValidator.create,
  // auth.authenticateToken,
  AlunoController.create
);
alunoRouter.put(
  '/:usuario',
  AlunoValidator.update,
  auth.authenticateToken,
  AlunoController.update
);
alunoRouter.delete(
  '/:usuario',
  AlunoValidator.delete,
  auth.authenticateToken,
  AlunoController.delete
);

module.exports = alunoRouter;

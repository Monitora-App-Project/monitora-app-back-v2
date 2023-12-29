const express = require('express');

const alunoRouter = express.Router();

const AlunoController = require('../../controllers/Aluno');
const AlunoValidator = require('../../validators/Aluno');
// const auth = require('../../middlewares/authentication');

alunoRouter.get('/',
  //AlunoValidator.getAll,
  AlunoController.getAll
);
alunoRouter.get(
  '/:usuario',
  AlunoValidator.getByUsuario,
  AlunoController.getByUsuario
);
alunoRouter.post(
  '/',
  AlunoValidator.create,
  AlunoController.create
);
alunoRouter.put(
  '/:usuario',
  AlunoValidator.update,
  AlunoController.update
);
alunoRouter.delete(
  '/:usuario',
  AlunoValidator.delete,
  AlunoController.delete
);

module.exports = alunoRouter;

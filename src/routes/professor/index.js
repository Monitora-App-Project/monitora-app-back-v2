const express = require('express');

const professorRouter = express.Router();

const ProfessorController = require('../../controllers/Professor');
const ProfessorValidator = require('../../validators/Professor');
// const auth = require('../../middlewares/authentication');

professorRouter.get('/',
  //ProfessorValidator.getAll,
  ProfessorController.getAll
);
professorRouter.get(
  '/fields',
  // ProfessorValidator.getAll,
  ProfessorController.getByFields
);
professorRouter.get(
  '/:usuario',
  ProfessorValidator.getByUsuario,
  ProfessorController.getByUsuario
);
professorRouter.post(
  '/',
  ProfessorValidator.create,
  ProfessorController.create
);
professorRouter.post(
  '/createFromAluno/:usuario',
  ProfessorValidator.createFromAluno,
  ProfessorController.createFromAluno
);
professorRouter.put(
  '/:usuario',
  ProfessorValidator.update,
  ProfessorController.update
);
professorRouter.delete(
  '/:usuario',
  ProfessorValidator.delete,
  ProfessorController.delete
);

module.exports = professorRouter;

const express = require('express');

const professorRouter = express.Router();

const ProfessorController = require('../../controllers/Professor');
const ProfessorValidator = require('../../validators/Professor');
const auth = require('../../middlewares/authentication');

professorRouter.get('/',
  ProfessorValidator.getAll,
  auth.authenticateToken,
  ProfessorController.getAll
);
professorRouter.get(
  '/fields',
  ProfessorValidator.getAll,
  auth.authenticateToken,
  ProfessorController.getByFields
);
professorRouter.get(
  '/:usuario',
  ProfessorValidator.getByUsuario,
  auth.authenticateToken,
  ProfessorController.getByUsuario
);
professorRouter.post(
  '/',
  ProfessorValidator.create,
  auth.authenticateToken,
  ProfessorController.create
);
professorRouter.post(
  '/createFromAluno/:usuario',
  ProfessorValidator.createFromAluno,
  auth.authenticateToken,
  ProfessorController.createFromAluno
);
professorRouter.put(
  '/:usuario',
  ProfessorValidator.update,
  auth.authenticateToken,
  ProfessorController.update
);
professorRouter.delete(
  '/:usuario',
  ProfessorValidator.delete,
  auth.authenticateToken,
  ProfessorController.delete
);

module.exports = professorRouter;

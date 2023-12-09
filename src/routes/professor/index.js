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
  '/:usuario',
  ProfessorValidator.getByUsuario,
  ProfessorController.getByUsuario
);
professorRouter.post(
  '/',
  ProfessorValidator.create,
  ProfessorController.create
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

const express = require('express');

const usuarioRouter = express.Router();

const UsuarioController = require('../../controllers/Usuario');
const UsuarioValidator = require('../../validators/Usuario');
// const auth = require('../../middlewares/authentication');

usuarioRouter.get('/',
  //UsuarioValidator.getAll,
  UsuarioController.getAll
);
usuarioRouter.get(
  '/:matricula',
  UsuarioValidator.getById,
  UsuarioController.getById
);
usuarioRouter.post(
  '/',
  UsuarioValidator.create,
  UsuarioController.create
);
usuarioRouter.put(
  '/:matricula',
  UsuarioValidator.update,
  UsuarioController.update
);
usuarioRouter.delete(
  '/:matricula',
  UsuarioValidator.delete,
  UsuarioController.delete
);

module.exports = usuarioRouter;

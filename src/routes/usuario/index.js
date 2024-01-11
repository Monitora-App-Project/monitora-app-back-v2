const express = require('express');

const usuarioRouter = express.Router();

const UsuarioController = require('../../controllers/Usuario');
const UsuarioValidator = require('../../validators/Usuario');
const auth = require('../../middlewares/authentication');

usuarioRouter.get('/',
  UsuarioValidator.getAll,
  auth.authenticateToken,
  UsuarioController.getAll
);
usuarioRouter.get(
  '/fields',
  UsuarioValidator.getById,
  auth.authenticateToken,
  UsuarioController.getByFields
);
usuarioRouter.get(
  '/:matricula',
  UsuarioValidator.getById,
  auth.authenticateToken,
  UsuarioController.getById
);
usuarioRouter.post(
  '/',
  UsuarioValidator.create,
  auth.authenticateToken,
  UsuarioController.create
);
usuarioRouter.put(
  '/:matricula',
  UsuarioValidator.update,
  auth.authenticateToken,
  UsuarioController.update
);
usuarioRouter.put(
  '/alterarSenha/:matricula',
  UsuarioValidator.updatePassword,
  auth.authenticateToken,
  UsuarioController.updatePassword
);
usuarioRouter.put(
  '/externo/alterarSenha',
  UsuarioValidator.updateExternalPassword,
  UsuarioController.updateExternalPassword
);
usuarioRouter.delete(
  '/:matricula',
  UsuarioValidator.delete,
  auth.authenticateToken,
  UsuarioController.delete
);

module.exports = usuarioRouter;

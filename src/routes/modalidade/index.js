const express = require('express');

const modalidadeRouter = express.Router();

const ModalidadeController = require('../../controllers/Modalidade');
const ModalidadeValidator = require('../../validators/Modalidade');
const auth = require('../../middlewares/authentication');

modalidadeRouter.get('/',
  ModalidadeValidator.getAll,
  auth.authenticateToken,
  ModalidadeController.getAll
);
modalidadeRouter.get(
  '/:id',
  ModalidadeValidator.getById,
  auth.authenticateToken,
  ModalidadeController.getById
);
modalidadeRouter.post(
  '/',
  ModalidadeValidator.create,
  auth.authenticateToken,
  ModalidadeController.create
);
modalidadeRouter.put(
  '/:id',
  ModalidadeValidator.update,
  auth.authenticateToken,
  ModalidadeController.update
);
modalidadeRouter.delete(
  '/:id',
  ModalidadeValidator.delete,
  auth.authenticateToken,
  ModalidadeController.delete
);

module.exports = modalidadeRouter;

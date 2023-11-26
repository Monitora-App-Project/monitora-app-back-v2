const express = require('express');

const modalidadeRouter = express.Router();

const ModalidadeController = require('../../controllers/Modalidade');
const ModalidadeValidator = require('../../validators/Modalidade');
// const auth = require('../../middlewares/authentication');

modalidadeRouter.get('/',
  //ModalidadeValidator.getAll,
  ModalidadeController.getAll
);
modalidadeRouter.get(
  '/:id',
  ModalidadeValidator.getById,
  ModalidadeController.getById
);
modalidadeRouter.post(
  '/',
  ModalidadeValidator.create,
  ModalidadeController.create
);
modalidadeRouter.put(
  '/:id',
  ModalidadeValidator.update,
  ModalidadeController.update
);
modalidadeRouter.delete(
  '/:id',
  ModalidadeValidator.delete,
  ModalidadeController.delete
);

module.exports = modalidadeRouter;

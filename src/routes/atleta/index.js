const express = require('express');

const atletaRouter = express.Router();

const AtletaController = require('../../controllers/Atleta');
const AtletaValidator = require('../../validators/Atleta');
// const auth = require('../../middlewares/authentication');

atletaRouter.get('/',
  //AtletaValidator.getAll,
  AtletaController.getAll
);
atletaRouter.get(
  '/:usuario',
  AtletaValidator.getByUsuario,
  AtletaController.getByUsuario
);
atletaRouter.post(
  '/',
  AtletaValidator.create,
  AtletaController.create
);
atletaRouter.put(
  '/:usuario',
  AtletaValidator.update,
  AtletaController.update
);
atletaRouter.delete(
  '/:usuario',
  AtletaValidator.delete,
  AtletaController.delete
);

module.exports = atletaRouter;

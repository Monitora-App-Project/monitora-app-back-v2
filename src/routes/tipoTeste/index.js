const express = require('express');

const tipoTesteRouter = express.Router();

const TipoTesteController = require('../../controllers/TipoTeste');
const TipoTesteValidator = require('../../validators/TipoTeste');
// const auth = require('../../middlewares/authentication');

tipoTesteRouter.post(
  '/',
  TipoTesteValidator.create,
  TipoTesteController.create
);

tipoTesteRouter.get('/',
  TipoTesteController.getAll
);

tipoTesteRouter.get('/:id',
  TipoTesteValidator.getById,
  TipoTesteController.getById
);

tipoTesteRouter.put(
  '/:id',
  TipoTesteValidator.updateById,
  TipoTesteController.updateById
);

tipoTesteRouter.delete('/:id',
  TipoTesteValidator.delete,
  TipoTesteController.delete
);

module.exports = tipoTesteRouter;
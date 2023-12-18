const express = require('express');

const cmjRouter = express.Router();

const CMJController = require('../../controllers/CMJ');
const CMJValidator = require('../../validators/CMJ');
// const auth = require('../../middlewares/authentication');

cmjRouter.get('/',
  //CMJValidator.getAll,
  CMJController.getAll
);
cmjRouter.get(
  '/fields',
  // AteltaValidator.getById,
  CMJController.getByFields
);
cmjRouter.get(
  '/date',
  // AteltaValidator.getById,
  CMJController.getByDate
);
cmjRouter.get(
  '/:idTeste',
  CMJValidator.getByTeste,
  CMJController.getByTeste
);
cmjRouter.post(
  '/',
  CMJValidator.create,
  CMJController.create
);
cmjRouter.put(
  '/:idTeste',
  CMJValidator.update,
  CMJController.update
);
cmjRouter.delete(
  '/:idTeste',
  CMJValidator.delete,
  CMJController.delete
);

module.exports = cmjRouter;

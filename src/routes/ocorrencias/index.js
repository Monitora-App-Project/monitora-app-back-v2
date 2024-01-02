const express = require('express');

const ocorrenciasRouter = express.Router();

const OcorrenciasController = require('../../controllers/Ocorrencias');

ocorrenciasRouter.get('/',
  OcorrenciasController.getAll
);
ocorrenciasRouter.get(
  '/fields',
  OcorrenciasController.getByFields
);
ocorrenciasRouter.get(
  '/:id',
  OcorrenciasController.getById
);
ocorrenciasRouter.get(
  '/responsavel/:responsavel',
  OcorrenciasController.getByResponsavel
);
ocorrenciasRouter.post(
  '/',
  OcorrenciasController.create
);
ocorrenciasRouter.put(
  '/:id',
  OcorrenciasController.update
);
ocorrenciasRouter.delete(
  '/:id',
  OcorrenciasController.delete
);

module.exports = ocorrenciasRouter;

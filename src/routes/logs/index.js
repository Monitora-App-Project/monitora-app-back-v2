const express = require('express');

const logsRouter = express.Router();

const LogsController = require('../../controllers/Logs');

logsRouter.get('/',
  LogsController.getAll
);
logsRouter.get(
  '/fields',
  LogsController.getByFields
);
logsRouter.get(
  '/:id',
  LogsController.getById
);
logsRouter.get(
  '/responsavel/:responsavel',
  LogsController.getByResponsavel
);
logsRouter.post(
  '/',
  LogsController.create
);
logsRouter.put(
  '/:id',
  LogsController.update
);
logsRouter.delete(
  '/:id',
  LogsController.delete
);

module.exports = logsRouter;

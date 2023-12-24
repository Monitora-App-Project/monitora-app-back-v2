const express = require('express');

const logsRouter = express.Router();

const LogsController = require('../../controllers/Logs');

logsRouter.get('/',
  LogsController.getAll
);

module.exports = logsRouter;

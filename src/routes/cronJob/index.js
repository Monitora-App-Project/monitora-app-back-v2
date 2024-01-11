const express = require('express');

const cronJobRouter = express.Router();

const CronJobController = require('../../controllers/CronJob');

cronJobRouter.get('/',
  CronJobController.getAll
);
cronJobRouter.get(
  '/fields',
  CronJobController.getByFields
);
cronJobRouter.post(
  '/',
  CronJobController.create
);
cronJobRouter.delete(
  '/:id',
  CronJobController.delete
);

module.exports = cronJobRouter;

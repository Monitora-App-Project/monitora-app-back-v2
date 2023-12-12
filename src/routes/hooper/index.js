const express = require('express');

const hooperRouter = express.Router();

const HooperController = require('../../controllers/Hooper');
const HooperValidator = require('../../validators/Hooper');
// const auth = require('../../middlewares/authentication');

hooperRouter.post(
  '/',
  HooperValidator.create,
  HooperController.create
);

hooperRouter.get(
  '/',
  HooperController.getAll
)

module.exports = hooperRouter;

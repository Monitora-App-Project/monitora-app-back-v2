const express = require('express');

const testeRouter = express.Router();

const TesteController = require('../../controllers/Teste');
const TesteValidator = require('../../validators/Teste');
// const auth = require('../../middlewares/authentication');

testeRouter.post(
  '/',
  TesteValidator.create,
  TesteController.create
);

module.exports = testeRouter;
const express = require('express');

const sessionRouter = express.Router();

const SessionController = require('../../controllers/Session');
const SessionValidator = require('../../validators/Session');

sessionRouter.post('/', SessionController.signIn, SessionValidator.signIn);

module.exports = sessionRouter;
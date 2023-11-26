const express = require('express');

const usuario = require('./usuario');

const routes = express.Router();

routes.use('/usuario', usuario);

module.exports = routes;

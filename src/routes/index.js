const express = require('express');

const usuarioRoutes = require('./usuario');
const treinadorRoutes = require('./treinador');
const modalidadeRoutes = require('./modalidade');

const routes = express.Router();

routes.use('/usuario', usuarioRoutes);
routes.use('/treinador', treinadorRoutes);
routes.use('/modalidade', modalidadeRoutes);

module.exports = routes;

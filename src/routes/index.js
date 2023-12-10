const express = require('express');

const usuarioRoutes = require('./usuario');
const treinadorRoutes = require('./treinador');
const modalidadeRoutes = require('./modalidade');
const atletaRoutes = require('./atleta');
const testeRoutes = require('./teste')

const routes = express.Router();

routes.use('/usuario', usuarioRoutes);
routes.use('/treinador', treinadorRoutes);
routes.use('/modalidade', modalidadeRoutes);
routes.use('/atleta', atletaRoutes);
routes.use('/teste', testeRoutes);

module.exports = routes;

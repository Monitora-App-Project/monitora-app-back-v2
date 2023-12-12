const express = require('express');

const usuarioRoutes = require('./usuario');
const treinadorRoutes = require('./treinador');
const modalidadeRoutes = require('./modalidade');
const atletaRoutes = require('./atleta');
const professorRoutes = require('./professor');
const testeRoutes = require('./teste');
const cmjRoutes = require('./cmj');

const routes = express.Router();

routes.use('/usuario', usuarioRoutes);
routes.use('/treinador', treinadorRoutes);
routes.use('/modalidade', modalidadeRoutes);
routes.use('/atleta', atletaRoutes);
routes.use('/professor', professorRoutes);
routes.use('/teste', testeRoutes);
routes.use('/cmj', cmjRoutes);

module.exports = routes;

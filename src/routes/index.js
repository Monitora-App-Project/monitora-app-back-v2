const express = require('express');

const usuarioRoutes = require('./usuario');
const treinadorRoutes = require('./treinador');
const modalidadeRoutes = require('./modalidade');
const atletaRoutes = require('./atleta');
const professorRoutes = require('./professor');
const alunoRoutes = require('./aluno');
const testeRoutes = require('./teste');
const logsRoutes = require('./logs');
const ocorrenciasRoutes = require('./ocorrencias');
const cmjRoutes = require('./cmj');
const hooperRoutes = require('./hooper');
const pseAtletaRoutes = require('./pseAtleta');
const pseTreinadorRoutes = require('./pseTreinador');
const vfcRoutes = require('./vfc');

const routes = express.Router();

routes.use('/usuario', usuarioRoutes);
routes.use('/treinador', treinadorRoutes);
routes.use('/modalidade', modalidadeRoutes);
routes.use('/atleta', atletaRoutes);
routes.use('/professor', professorRoutes);
routes.use('/aluno', alunoRoutes);
routes.use('/teste', testeRoutes);
routes.use('/logs', logsRoutes);
routes.use('/ocorrencias', ocorrenciasRoutes);
routes.use('/cmj', cmjRoutes);
routes.use('/hooper', hooperRoutes);
routes.use('/pseatleta', pseAtletaRoutes);
routes.use('/psetreinador', pseTreinadorRoutes);
routes.use('/vfc', vfcRoutes);

module.exports = routes;

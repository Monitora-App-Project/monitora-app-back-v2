const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      matriculaAtleta: Joi.number().integer().required(), // Para criar o teste geral
      
      nivelSono: Joi.number().integer().required(),
      nivelStress: Joi.number().integer().required(),
      nivelFadiga: Joi.number().integer().required(),
      nivelDorMuscular: Joi.number().integer().required(),
      nivelPsr: Joi.number().integer().required(),
      horasSonoNoite: Joi.number().required(),
      diaDaSemana: Joi.number().integer().required(),   // Provisorio
      semanaDoAno: Joi.number().integer().required(),   // Provisorio
    }),
  }),

  // getByTeste: celebrate({
  //   [Segments.PARAMS]: Joi.object().keys({
  //     idTeste: Joi.number().required(),
  //   }),
  // }),

  // update: celebrate({
  //   [Segments.PARAMS]: Joi.object().keys({
  //     idTeste: Joi.number().required(),
  //   }),
  //   [Segments.BODY]: Joi.object().keys({
  //     idTeste: Joi.number().optional(),
  //     cmj1: Joi.number().optional(),
  //     cmj2: Joi.number().optional(),
  //     cmj3: Joi.number().optional(),
  //     obsCmj: Joi.string().optional(),
  //   }),
  // }),

  // delete: celebrate({
  //   [Segments.PARAMS]: Joi.object().keys({
  //     idTeste: Joi.number().required(),
  //   }),
  // }),
};

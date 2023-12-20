const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      matriculaAtleta: Joi.number().integer().required(),
      
      nivelSono: Joi.number().integer().required(),
      nivelStress: Joi.number().integer().required(),
      nivelFadiga: Joi.number().integer().required(),
      nivelDorMuscular: Joi.number().integer().required(),
      nivelPsr: Joi.number().integer().required(),
      horasSonoNoite: Joi.number().required(),
    }),
  }),

  getByTeste: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      idTeste: Joi.string().guid({version: 'uuidv4'}).required(),
    }),
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      idTeste: Joi.string().guid({version: 'uuidv4'}).required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      nivelSono: Joi.number().integer().optional(),
      nivelStress: Joi.number().integer().optional(),
      nivelFadiga: Joi.number().integer().optional(),
      nivelDorMuscular: Joi.number().integer().optional(),
      nivelPsr: Joi.number().integer().optional(),
      horasSonoNoite: Joi.number().optional(),
    }),
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      idTeste: Joi.string().guid({version: 'uuidv4'}).required(),
    }),
  }),
};

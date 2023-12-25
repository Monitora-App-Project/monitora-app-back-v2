const { celebrate, Segments, Joi} = require('celebrate');
// const Joi = require('joi').extend(require('@joi/date'));

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      matriculaAtleta: Joi.number().integer().required(),
      responsavel: Joi.number().integer().required(),
    
      pseAtleta: Joi.number().integer().required(),
      pseSessao: Joi.number().integer().required(),
      duracaoTreino: Joi.number().required()
    }),
  }),

  getByDate: celebrate({
    [Segments.BODY]: Joi.object().keys({
      dataColetaMin: Joi.string().required(),
      dataColetaMax: Joi.string().required()
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
      responsavel: Joi.number().integer().required(),
      motivo : Joi.string().required(),

      pseAtleta: Joi.number().integer().optional(),
      pseSessao: Joi.number().integer().optional(),
      duracaoTreino: Joi.number().optional()
    }),
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      idTeste: Joi.string().guid({version: 'uuidv4'}).required(),
    }),

    [Segments.BODY]: Joi.object().keys({
      responsavel: Joi.number().integer().required(),
      motivo : Joi.string().required()
    }),
  }),
};

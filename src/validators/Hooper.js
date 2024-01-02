const { celebrate, Segments, Joi } = require("celebrate");
// const Joi = require('joi').extend(require('@joi/date'));

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      matriculaAtleta: Joi.number().integer().required(),
      responsavel: Joi.number().integer().required(),

      nivelSono: Joi.number().integer().required(),
      nivelStress: Joi.number().integer().required(),
      nivelFadiga: Joi.number().integer().required(),
      nivelDorMuscular: Joi.number().integer().required(),
      nivelPsr: Joi.number().integer().required(),
      horasSonoNoite: Joi.number().required()
    })
  }),

  getByDate: celebrate({
    [Segments.BODY]: Joi.object().keys({
      dataColetaMin: Joi.string().required(),
      dataColetaMax: Joi.string().required()
    })
  }),

  getByTeste: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      idTeste: Joi.string().guid({ version: "uuidv4" }).required()
    })
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      idTeste: Joi.string().guid({ version: "uuidv4" }).required()
    }),
    [Segments.BODY]: Joi.object().keys({
      responsavel: Joi.number().integer().required(),
      motivo: Joi.string().required(),

      nivelSono: Joi.number().integer().optional(),
      nivelStress: Joi.number().integer().optional(),
      nivelFadiga: Joi.number().integer().optional(),
      nivelDorMuscular: Joi.number().integer().optional(),
      nivelPsr: Joi.number().integer().optional(),
      horasSonoNoite: Joi.number().optional()
    })
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      idTeste: Joi.string().guid({ version: "uuidv4" }).required()
    }),

    [Segments.BODY]: Joi.object().keys({
      responsavel: Joi.number().integer().required(),
      motivo: Joi.string().required()
    })
  })
};

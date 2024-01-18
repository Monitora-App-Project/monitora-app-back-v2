const { celebrate, Segments, Joi } = require("celebrate");
// const Joi = require('joi').extend(require('@joi/date'));

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object()
    .keys({
      authorization: Joi.string().required()
    })
    .unknown(),
    [Segments.BODY]: Joi.object().keys({
      matriculaAtleta: Joi.number().integer().required(),
      responsavel: Joi.number().integer().required(),

      pseAtleta: Joi.number().integer().required(),
      duracaoTreino: Joi.number().integer().required()
    })
  }),

  getByDate: celebrate({
    [Segments.HEADERS]: Joi.object()
    .keys({
      authorization: Joi.string().required()
    })
    .unknown(),
    [Segments.BODY]: Joi.object().keys({
      dataColetaMin: Joi.string().required(),
      dataColetaMax: Joi.string().required()
    })
  }),

  getAll: celebrate({
    [Segments.HEADERS]: Joi.object()
    .keys({
      authorization: Joi.string().required()
    })
    .unknown(),
  }),

  getByTeste: celebrate({
    [Segments.HEADERS]: Joi.object()
    .keys({
      authorization: Joi.string().required()
    })
    .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      idTeste: Joi.string().guid({ version: "uuidv4" }).required()
    })
  }),

  update: celebrate({
    [Segments.HEADERS]: Joi.object()
    .keys({
      authorization: Joi.string().required()
    })
    .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      idTeste: Joi.string().guid({ version: "uuidv4" }).required()
    }),
    [Segments.BODY]: Joi.object().keys({
      responsavel: Joi.number().integer().required(),
      motivo: Joi.string().required(),

      pseAtleta: Joi.number().integer().optional(),
      pseSessao: Joi.number().integer().optional(),
      duracaoTreino: Joi.number().optional()
    })
  }),

  delete: celebrate({
    [Segments.HEADERS]: Joi.object()
    .keys({
      authorization: Joi.string().required()
    })
    .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      idTeste: Joi.string().guid({ version: "uuidv4" }).required()
    }),

    [Segments.BODY]: Joi.object().keys({
      responsavel: Joi.number().integer().required(),
      motivo: Joi.string().required()
    })
  })
};

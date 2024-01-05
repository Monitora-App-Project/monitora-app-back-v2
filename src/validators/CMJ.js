const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required()
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      matriculaAtleta: Joi.number().required(),
      cmj1: Joi.number().required(),
      cmj2: Joi.number().required(),
      cmj3: Joi.number().required(),
      obsCmj: Joi.string().optional(),
      responsavel: Joi.number().required()
    })
  }),

  getAll: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required()
      })
      .unknown()
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
      cmj1: Joi.number().optional(),
      cmj2: Joi.number().optional(),
      cmj3: Joi.number().optional(),
      obsCmj: Joi.string().optional(),
      responsavel: Joi.number().required(),
      motivo: Joi.string().allow("").required()
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
      responsavel: Joi.number().required(),
      motivo: Joi.string().allow("").required()
    })
  })
};

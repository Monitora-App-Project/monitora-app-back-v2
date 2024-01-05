const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required()
      })
      .unknown(),
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required()
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      tipo: Joi.string().valid("Olimpico", "Paralimpico").required(),
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

  getById: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required()
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required()
    })
  }),

  update: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required()
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required()
    }),
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().optional(),
      tipo: Joi.string().valid("Olimpico", "Paralimpico").optional(),
      responsavel: Joi.number().required(),
      motivo: Joi.string().required()
    })
  }),

  delete: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required()
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required()
    }),
    [Segments.BODY]: Joi.object().keys({
      responsavel: Joi.number().required(),
      motivo: Joi.string().required()
    })
  })
};

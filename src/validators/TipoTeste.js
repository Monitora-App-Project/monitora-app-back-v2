const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
    })
  }),

  getById: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().required()
    })
  }),

  updateById: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().required()
    }),

    [Segments.BODY]: Joi.object().keys({
      id : Joi.number().integer().optional(),
      nome: Joi.string().required()
    })
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().required()
    })
  })
};

const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      idTeste: Joi.number().required(),
      cmj1: Joi.number().required(),
      cmj2: Joi.number().required(),
      cmj3: Joi.number().required(),
      obsCmj: Joi.string().optional(),
    }),
  }),

  getByTeste: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      idTeste: Joi.number().required(),
    }),
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      idTeste: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      idTeste: Joi.number().optional(),
      cmj1: Joi.number().optional(),
      cmj2: Joi.number().optional(),
      cmj3: Joi.number().optional(),
      obsCmj: Joi.string().optional(),
    }),
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      idTeste: Joi.number().required(),
    }),
  }),
};

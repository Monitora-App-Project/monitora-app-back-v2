const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      matriculaAtleta: Joi.number().required(),
      cmj1: Joi.number().required(),
      cmj2: Joi.number().required(),
      cmj3: Joi.number().required(),
      obsCmj: Joi.string().optional(),
      responsavel: Joi.number().required()
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
      cmj1: Joi.number().optional(),
      cmj2: Joi.number().optional(),
      cmj3: Joi.number().optional(),
      obsCmj: Joi.string().optional(),
      responsavel: Joi.number().required(),
      motivo: Joi.string().allow("").required()
    })
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      idTeste: Joi.string().guid({ version: "uuidv4" }).required()
    }),
    [Segments.BODY]: Joi.object().keys({
      responsavel: Joi.number().required(),
      motivo: Joi.string().allow("").required()
    })
  })
};

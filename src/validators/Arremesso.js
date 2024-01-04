const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      matriculaAtleta: Joi.number().integer().required(),
      responsavel: Joi.number().integer().required(),

      arremesso1: Joi.number().required(),
      arremesso2: Joi.number().required(),
      arremesso3: Joi.number().required(),
      obsArremesso: Joi.string().optional()
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

      arremesso1: Joi.number().optional(),
      arremesso2: Joi.number().optional(),
      arremesso3: Joi.number().optional(),
      mediaArremesso: Joi.number().optional(), 
      maxArremesso: Joi.number().optional(), 
      minArremesso: Joi.number().optional(), 
      desvPadArremesso: Joi.number().optional(), 
      coefVariacaoArremesso: Joi.number().optional(), 
      obsArremesso: Joi.string().optional()
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

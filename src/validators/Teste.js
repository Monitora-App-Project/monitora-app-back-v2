const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      matriculaAtleta: Joi.number().integer().required(),
      idTipoTeste: Joi.number().integer().required()
    })
  }),

  getById: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required()
    })
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required()
    })
  })
};

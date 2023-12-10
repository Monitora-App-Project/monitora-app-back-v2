const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    // [Segments.HEADERS]: Joi.object()
    //   .keys({
    //     authorization: Joi.string().required(),
    //   })
    //   .unknown(),
    [Segments.BODY]: Joi.object().keys({
      matriculaAtleta: Joi.number().integer().required(),
      idTipoTeste: Joi.number().integer().required()
    })
  }),
  
  getById: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().required(),
    }),
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().required(),
    }),
  })
};
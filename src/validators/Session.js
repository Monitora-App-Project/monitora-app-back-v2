const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  signIn: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      senha: Joi.string().required(),
    }),
  })
};
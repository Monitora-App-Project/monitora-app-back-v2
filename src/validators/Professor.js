const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      usuario: Joi.number().integer().required(),
      departamento: Joi.string().required(),
      matricula_ufmg: Joi.number().required(),
      nivel: Joi.valid("Graduação", "Mestrado", "Doutorado", "Pós-Doc").required(),
      equipe: Joi.string().required()
    })
  }),

  getByUsuario: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      usuario: Joi.number().required()
    })
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      usuario: Joi.number().required()
    }),
    [Segments.BODY]: Joi.object().keys({
      departamento: Joi.string().optional(),
      matricula_ufmg: Joi.number().optional(),
      nivel: Joi.valid("Graduação", "Mestrado", "Doutorado", "Pós-Doc").optional(),
      equipe: Joi.string().optional()
    })
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      usuario: Joi.number().required()
    })
  })
};

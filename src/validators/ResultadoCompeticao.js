const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      modalidade: Joi.string().guid({ version: "uuidv4" }).required(),
      atleta: Joi.number().integer().required(),
      nome: Joi.string().required(),
      abrangencia: Joi.string().valid("Municipal", "Estadual", "Regional", "Nacional", "Internacional").required(),
      data: Joi.date().iso().required(),
      clube: Joi.string().required(),
      prova: Joi.string().required(),
      categoria: Joi.string(),
      pesoImplemento: Joi.string(),
      classeFuncional: Joi.string(),
      marca: Joi.string(),
      classificacao: Joi.string().required(),
      n_lutas: Joi.string(),
      n_vitorias: Joi.string(),
      m_derrotas: Joi.string(),
      responsavel: Joi.number().required()
    })
  }),

  getById: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required()
    })
  }),

  getByAtleta: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      atleta: Joi.number().integer().required()
    })
  }),

  getByModalidade: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      modalidade: Joi.string().guid({ version: "uuidv4" }).required()
    })
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required()
    }),
    [Segments.BODY]: Joi.object().keys({
      modalidade: Joi.string().guid({ version: "uuidv4" }).optional(),
      atleta: Joi.number().integer().optional(),
      nome: Joi.string().optional(),
      abrangencia: Joi.string().valid("Municipal", "Estadual", "Regional", "Nacional", "Internacional").optional(),
      data: Joi.date().iso().optional(),
      clube: Joi.string().optional(),
      prova: Joi.string().optional(),
      categoria: Joi.string().optional(),
      pesoImplemento: Joi.string().optional(),
      classeFuncional: Joi.string().optional(),
      marca: Joi.string().optional(),
      classificacao: Joi.string().optional(),
      n_lutas: Joi.string().optional(),
      n_vitorias: Joi.string().optional(),
      m_derrotas: Joi.string().optional(),
      responsavel: Joi.number().required(),
      motivo: Joi.string().required()
    })
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required()
    }),
    [Segments.BODY]: Joi.object().keys({
      responsavel: Joi.number().required(),
      motivo: Joi.string().required()
    })
  })
};

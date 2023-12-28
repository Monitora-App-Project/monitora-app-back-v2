const { celebrate, Segments, Joi } = require("celebrate");
// const Joi = require('joi').extend(require('@joi/date'));

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      matriculaAtleta: Joi.number().integer().required(),
      responsavel: Joi.number().integer().required(),

      pseTreinador: Joi.number().integer().required(),
      tipoTreino: Joi.string().valid("Especifico", "Força", "Competição").required(),
      faseTreinamento: Joi.string().required(),
      obsBemEstar: Joi.string().optional(),
      obsBemEstar: Joi.string().optional()
    })
  }),

  getByDate: celebrate({
    [Segments.BODY]: Joi.object().keys({
      dataColetaMin: Joi.string().required(),
      dataColetaMax: Joi.string().required()
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
      pseTreinador: Joi.number().integer().optional(),
      tipoTreino: Joi.string().valid("Específico", "Força", "Competição").optional(),
      faseTreinamento: Joi.string().optional(),
      obsBemEstar: Joi.string().optional(),
      obsBemEstar: Joi.string().optional()
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

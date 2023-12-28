const { celebrate, Segments, Joi } = require("celebrate");
// const Joi = require('joi').extend(require('@joi/date'));

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      matriculaAtleta: Joi.number().integer().required(),
      responsavel: Joi.number().integer().required(),

      rmssd: Joi.number().required(),
      sdnn: Joi.number().required(),
      lnRmssd: Joi.number().required(),
      pnn50: Joi.number().required(),
      meanRrInterval: Joi.number().required(),
      totalPower: Joi.number().required(),
      lfHfRatio: Joi.number().required(),
      lfPower: Joi.number().required(),
      hfPower: Joi.number().required(),
      lfPeak: Joi.number().required(),
      hfPeak: Joi.number().required(),
      hr: Joi.number().required(),
      obsVfc: Joi.string().optional()
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

      rmssd: Joi.number().optional(),
      sdnn: Joi.number().optional(),
      lnRmssd: Joi.number().optional(),
      pnn50: Joi.number().optional(),
      meanRrInterval: Joi.number().optional(),
      totalPower: Joi.number().optional(),
      lfHfRatio: Joi.number().optional(),
      lfPower: Joi.number().optional(),
      hfPower: Joi.number().optional(),
      lfPeak: Joi.number().optional(),
      hfPeak: Joi.number().optional(),
      hr: Joi.number().optional(),
      obsVfc: Joi.string().optional()
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

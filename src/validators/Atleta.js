const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      usuario: Joi.number().integer().required(),
      nomeResponsavel: Joi.string().allow('').optional(),
      parentescoResponsavel: Joi.string().allow('').optional(),
      modalidade: Joi.string().uuid().required(),
      treinador: Joi.string().uuid().required(),
      clubeOuAssociacao: Joi.string().allow('').optional(),
      federacao: Joi.string().allow('').optional(),
      numRegistroFederacao: Joi.number().integer().allow(null).optional(),
      confederacao: Joi.string().allow('').optional(),
      numRegistroConfederacao: Joi.number().integer().allow(null).optional(),
      federacaoInternacional: Joi.string().allow('').optional(),
      numRegistroInternacional: Joi.number().integer().allow(null).optional(),
      cadeirante: Joi.boolean().required(),
      amputado: Joi.string().valid('MIE', 'MID', 'MSE', 'MSD', 'MMII', 'MMSS', 'Não').required(),
      atletaGuia: Joi.string().allow('').optional(),
      classificacaoFuncional: Joi.string().allow('').optional(),
      historicoDeficiencia: Joi.string().allow('').optional(),
      inicioPratica: Joi.date().required(),
      recebeAuxilio: Joi.boolean().required(),
      financiador: Joi.string().allow('').optional(),
    }),
  }),

  getByUsuario: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      usuario: Joi.number().required(),
    }),
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      usuario: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      usuario: Joi.number().integer().optional(),
      nomeResponsavel: Joi.string().allow('').optional(),
      parentescoResponsavel: Joi.string().allow('').optional(),
      modalidade: Joi.string().uuid().optional(),
      treinador: Joi.string().uuid().optional(),
      clubeOuAssociacao: Joi.string().allow('').optional(),
      federacao: Joi.string().allow('').optional(),
      numRegistroFederacao: Joi.number().integer().allow(null).optional(),
      confederacao: Joi.string().allow('').optional(),
      numRegistroConfederacao: Joi.number().integer().allow(null).optional(),
      federacaoInternacional: Joi.string().allow('').optional(),
      numRegistroInternacional: Joi.number().integer().allow(null).optional(),
      cadeirante: Joi.boolean().optional(),
      amputado: Joi.string().valid('MIE', 'MID', 'MSE', 'MSD', 'MMII', 'MMSS', 'Não').optional(),
      atletaGuia: Joi.string().allow('').optional(),
      classificacaoFuncional: Joi.string().allow('').optional(),
      historicoDeficiencia: Joi.string().allow('').optional(),
      inicioPratica: Joi.date().optional(),
      recebeAuxilio: Joi.boolean().optional(),
      financiador: Joi.string().allow('').optional(),
    }),
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      usuario: Joi.number().required(),
    }),
  }),
};

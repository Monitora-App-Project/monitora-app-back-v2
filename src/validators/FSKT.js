const { celebrate, Segments, Joi } = require("celebrate");
// const Joi = require('joi').extend(require('@joi/date'));

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      matriculaAtleta: Joi.number().integer().required(),
      responsavel: Joi.number().integer().required(),

      local: Joi.string().required(),
      categoria: Joi.number().integer().required(),
      faixa: Joi.string().required(),
      estatura: Joi.number().required(),
      massaCorporal: Joi.number().required(),
      pressaoSisRepouso: Joi.number().required(),
      pressaoDiasRepouso: Joi.number().required(),
      fcRepousoPre: Joi.number().optional(),
      psePre: Joi.number().required(),
      
      fcBpm1: Joi.number().integer().optional(),
      fcBpm2: Joi.number().integer().optional(),
      fcBpm3: Joi.number().integer().optional(),
      fcBpm4: Joi.number().integer().optional(),
      fcBpm5: Joi.number().integer().optional(),
      
      pse1: Joi.number().required(),
      pse2: Joi.number().required(),
      pse3: Joi.number().required(),
      pse4: Joi.number().required(),
      pse5: Joi.number().required(),

      numChutes1: Joi.number().integer().required(),
      numChutes2: Joi.number().integer().required(),
      numChutes3: Joi.number().integer().required(),
      numChutes4: Joi.number().integer().required(),
      numChutes5: Joi.number().integer().required(),
      
      pressaoSisPos: Joi.number().required(),
      pressaoDiasPos: Joi.number().required(),

      rec1MinPressaoSis: Joi.number().required(),
      rec1MinPressaoDias: Joi.number().required(),
      
      rec1MinFc: Joi.number().integer().optional(),
      rec2MinFc: Joi.number().integer().optional(),
      rec3MinFc: Joi.number().integer().optional(),
      rec4MinFc: Joi.number().integer().optional(),
      rec5MinFc: Joi.number().integer().optional(),

      rec5MinPressaoSis: Joi.number().required(),
      rec5MinPressaoDias: Joi.number().required(),
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

      local: Joi.string().optional(),
      categoria: Joi.number().integer().optional(),
      faixa: Joi.string().optional(),
      estatura: Joi.number().optional(),
      massaCorporal: Joi.number().optional(),
      pressaoSisRepouso: Joi.number().optional(),
      pressaoDiasRepouso: Joi.number().optional(),
      fcRepousoPre: Joi.number().optional(),
      psePre: Joi.number().optional(),
      
      fcBpm1: Joi.number().integer().optional(),
      fcBpm2: Joi.number().integer().optional(),
      fcBpm3: Joi.number().integer().optional(),
      fcBpm4: Joi.number().integer().optional(),
      fcBpm5: Joi.number().integer().optional(),
      
      pse1: Joi.number().optional(),
      pse2: Joi.number().optional(),
      pse3: Joi.number().optional(),
      pse4: Joi.number().optional(),
      pse5: Joi.number().optional(),

      numChutes1: Joi.number().integer().optional(),
      numChutes2: Joi.number().integer().optional(),
      numChutes3: Joi.number().integer().optional(),
      numChutes4: Joi.number().integer().optional(),
      numChutes5: Joi.number().integer().optional(),
      
      pressaoSisPos: Joi.number().optional(),
      pressaoDiasPos: Joi.number().optional(),

      rec1MinPressaoSis: Joi.number().optional(),
      rec1MinPressaoDias: Joi.number().optional(),

      rec1MinFc: Joi.number().integer().optional(),
      rec2MinFc: Joi.number().integer().optional(),
      rec3MinFc: Joi.number().integer().optional(),
      rec4MinFc: Joi.number().integer().optional(),
      rec5MinFc: Joi.number().integer().optional(),

      rec5MinPressaoSis: Joi.number().optional(),
      rec5MinPressaoDias: Joi.number().optional(),
      
      // Valores calculados automaticamente, que sao opcionais no create
      fcRel1: Joi.number().optional(),
      fcRel2: Joi.number().optional(),
      fcRel3: Joi.number().optional(),
      fcRel4: Joi.number().optional(),
      fcRel5: Joi.number().optional(),

      deltaPasRepouso: Joi.number().optional(),
      deltaPadRepouso: Joi.number().optional(),
      kdi: Joi.number().integer().optional(),
      numChutesTotal: Joi.number().integer().optional(),
      classificacaoFsktTotal: Joi.number().integer().optional(),
     

      deltaFcRec1Est5: Joi.number().optional(),
      deltaFcRec5Rec1: Joi.number().optional(),

      deltaPas: Joi.number().integer().optional(),
      deltaPad: Joi.number().integer().optional(),
      fcMaxPredita: Joi.number().integer().optional(),
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

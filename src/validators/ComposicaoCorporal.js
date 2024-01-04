const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      matriculaAtleta: Joi.number().integer().required(),
      responsavel: Joi.number().integer().required(),

      estatura: Joi.number().required(),
      massaCorporal: Joi.number().required(),
      envergadura: Joi.number().required(),
      semiEnvergadura: Joi.number().required(),
      
      circOmbro1: Joi.number().required(),
      circOmbro2: Joi.number().required(),
      circOmbro3: Joi.number().required(),

      circTorax1: Joi.number().required(),
      circTorax2: Joi.number().required(),
      circTorax3: Joi.number().required(),

      circBracoDir1: Joi.number().optional(),
      circBracoDir2: Joi.number().optional(),
      circBracoDir3: Joi.number().optional(),

      circBracoEsq1: Joi.number().optional(),
      circBracoEsq2: Joi.number().optional(),
      circBracoEsq3: Joi.number().optional(),

      circAntDir1: Joi.number().optional(),
      circAntDir2: Joi.number().optional(),
      circAntDir3: Joi.number().optional(),
      
      circAntEsq1: Joi.number().optional(),
      circAntEsq2: Joi.number().optional(),
      circAntEsq3: Joi.number().optional(),

      circCintura1: Joi.number().required(),
      circCintura2: Joi.number().required(),
      circCintura3: Joi.number().required(),

      circAbdomen1: Joi.number().required(),
      circAbdomen2: Joi.number().required(),
      circAbdomen3: Joi.number().required(),

      circQuadril1: Joi.number().optional(),
      circQuadril2: Joi.number().optional(),
      circQuadril3: Joi.number().optional(),

      circCoxaDir1: Joi.number().optional(),
      circCoxaDir2: Joi.number().optional(),
      circCoxaDir3: Joi.number().optional(),

      circCoxaEsq1: Joi.number().optional(),
      circCoxaEsq2: Joi.number().optional(),
      circCoxaEsq3: Joi.number().optional(),

      circPantDir1: Joi.number().optional(),
      circPantDir2: Joi.number().optional(),
      circPantDir3: Joi.number().optional(),
      
      circPantEsq1: Joi.number().optional(),
      circPantEsq2: Joi.number().optional(),
      circPantEsq3: Joi.number().optional(),

      dcPeitoral1: Joi.number().required(),
      dcPeitoral2: Joi.number().required(),
      dcPeitoral3: Joi.number().required(),

      dcAxilar1: Joi.number().required(),
      dcAxilar2: Joi.number().required(),
      dcAxilar3: Joi.number().required(),

      dcTriceps1: Joi.number().optional(),
      dcTriceps2: Joi.number().optional(),
      dcTriceps3: Joi.number().optional(),

      dcSubescapular1: Joi.number().required(),
      dcSubescapular2: Joi.number().required(),
      dcSubescapular3: Joi.number().required(),

      dcAbdominal1: Joi.number().required(),
      dcAbdominal2: Joi.number().required(),
      dcAbdominal3: Joi.number().required(),

      dcSuprailiaca1: Joi.number().required(),
      dcSuprailiaca2: Joi.number().required(),
      dcSuprailiaca3: Joi.number().required(),

      dcCoxa1: Joi.number().optional(),
      dcCoxa2: Joi.number().optional(),
      dcCoxa3: Joi.number().optional(),

      dcPant1: Joi.number().optional(),
      dcPant2: Joi.number().optional(),
      dcPant3: Joi.number().optional(),

      observacao: Joi.string().optional()
    })
  }),

  getByTeste: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      idTeste: Joi.string().guid({ version: "uuidv4" }).required()
    })
  }),

  // update: celebrate({
  //   [Segments.PARAMS]: Joi.object().keys({
  //     idTeste: Joi.string().guid({ version: "uuidv4" }).required()
  //   }),
  //   [Segments.BODY]: Joi.object().keys({
  //     responsavel: Joi.number().integer().required(),
  //     motivo: Joi.string().required(),

  //     nivelSono: Joi.number().integer().optional(),
  //     nivelStress: Joi.number().integer().optional(),
  //     nivelFadiga: Joi.number().integer().optional(),
  //     nivelDorMuscular: Joi.number().integer().optional(),
  //     nivelPsr: Joi.number().integer().optional(),
  //     horasSonoNoite: Joi.number().optional()
  //   })
  // }),

  // delete: celebrate({
  //   [Segments.PARAMS]: Joi.object().keys({
  //     idTeste: Joi.string().guid({ version: "uuidv4" }).required()
  //   }),

  //   [Segments.BODY]: Joi.object().keys({
  //     responsavel: Joi.number().integer().required(),
  //     motivo: Joi.string().required()
  //   })
  // })
};

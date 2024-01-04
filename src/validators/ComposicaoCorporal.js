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

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      idTeste: Joi.string().guid({ version: "uuidv4" }).required()
    }),
    [Segments.BODY]: Joi.object().keys({
      responsavel: Joi.number().integer().required(),
      motivo: Joi.string().required(),

      estatura: Joi.number().optional(),
      massaCorporal: Joi.number().optional(),
      envergadura: Joi.number().optional(),
      semiEnvergadura: Joi.number().optional(),
      
      circOmbro1: Joi.number().optional(),
      circOmbro2: Joi.number().optional(),
      circOmbro3: Joi.number().optional(),
      mediaCircOmbro: Joi.number().optional(),

      circTorax1: Joi.number().optional(),
      circTorax2: Joi.number().optional(),
      circTorax3: Joi.number().optional(),
      mediaCircTorax: Joi.number().optional(),

      circBracoDir1: Joi.number().optional(),
      circBracoDir2: Joi.number().optional(),
      circBracoDir3: Joi.number().optional(),
      mediaCircBracoDir: Joi.number().optional(),

      circBracoEsq1: Joi.number().optional(),
      circBracoEsq2: Joi.number().optional(),
      circBracoEsq3: Joi.number().optional(),
      mediaCircBracoEsq: Joi.number().optional(),

      circAntDir1: Joi.number().optional(),
      circAntDir2: Joi.number().optional(),
      circAntDir3: Joi.number().optional(),
      mediaCircAntDir: Joi.number().optional(),
      
      circAntEsq1: Joi.number().optional(),
      circAntEsq2: Joi.number().optional(),
      circAntEsq3: Joi.number().optional(),
      mediaCircAntEsq: Joi.number().optional(),

      circCintura1: Joi.number().optional(),
      circCintura2: Joi.number().optional(),
      circCintura3: Joi.number().optional(),
      mediaCircCintura: Joi.number().optional(),

      circAbdomen1: Joi.number().optional(),
      circAbdomen2: Joi.number().optional(),
      circAbdomen3: Joi.number().optional(),
      mediaCircAbdomen: Joi.number().optional(),

      circQuadril1: Joi.number().optional(),
      circQuadril2: Joi.number().optional(),
      circQuadril3: Joi.number().optional(),
      mediaCircQuadril: Joi.number().optional(),

      circCoxaDir1: Joi.number().optional(),
      circCoxaDir2: Joi.number().optional(),
      circCoxaDir3: Joi.number().optional(),
      mediaCircCoxaDir: Joi.number().optional(),

      circCoxaEsq1: Joi.number().optional(),
      circCoxaEsq2: Joi.number().optional(),
      circCoxaEsq3: Joi.number().optional(),
      mediaCircCoxaEsq: Joi.number().optional(),

      circPantDir1: Joi.number().optional(),
      circPantDir2: Joi.number().optional(),
      circPantDir3: Joi.number().optional(),
      mediaCircPantDir: Joi.number().optional(),
      
      circPantEsq1: Joi.number().optional(),
      circPantEsq2: Joi.number().optional(),
      circPantEsq3: Joi.number().optional(),
      mediaCircPantEsq: Joi.number().optional(),

      dcPeitoral1: Joi.number().optional(),
      dcPeitoral2: Joi.number().optional(),
      dcPeitoral3: Joi.number().optional(),
      mediaDcPeitoral: Joi.number().optional(),

      dcAxilar1: Joi.number().optional(),
      dcAxilar2: Joi.number().optional(),
      dcAxilar3: Joi.number().optional(),
      mediaDcAxilar: Joi.number().optional(),

      dcTriceps1: Joi.number().optional(),
      dcTriceps2: Joi.number().optional(),
      dcTriceps3: Joi.number().optional(),
      mediaDcTriceps: Joi.number().optional(),

      dcSubescapular1: Joi.number().optional(),
      dcSubescapular2: Joi.number().optional(),
      dcSubescapular3: Joi.number().optional(),
      mediaDcSubescapular: Joi.number().optional(),

      dcAbdominal1: Joi.number().optional(),
      dcAbdominal2: Joi.number().optional(),
      dcAbdominal3: Joi.number().optional(),
      mediaDcAbdominal: Joi.number().optional(),

      dcSuprailiaca1: Joi.number().optional(),
      dcSuprailiaca2: Joi.number().optional(),
      dcSuprailiaca3: Joi.number().optional(),
      mediaDcSuprailiaca: Joi.number().optional(),

      dcCoxa1: Joi.number().optional(),
      dcCoxa2: Joi.number().optional(),
      dcCoxa3: Joi.number().optional(),
      mediaDcCoxa: Joi.number().optional(),

      dcPant1: Joi.number().optional(),
      dcPant2: Joi.number().optional(),
      dcPant3: Joi.number().optional(),
      mediaDcPant: Joi.number().optional(),

      somaSeteDobras : Joi.number().optional(),    
      quadradoSoma : Joi.number().optional(), 
      densidade : Joi.number().optional(),
      percentualGordura : Joi.number().optional(),
      massaGorda : Joi.number().optional(), 
      massaIsentaDeGordura : Joi.number().optional(), 

      observacao: Joi.string().optional()
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

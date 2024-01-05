const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required()
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      tipo: Joi.string().valid("admin", "coordenador", "analista", "treinador", "atleta").required(),
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      ativo: Joi.boolean().required(),
      biometria: Joi.string(),
      nomeCompleto: Joi.string().required(),
      dataNascimento: Joi.date().required(),
      rg: Joi.number().integer().required(),
      dataEmissaoRg: Joi.date().required(),
      orgaoExpedidorRg: Joi.string().required(),
      cpf: Joi.number().integer().required(),
      sexo: Joi.string().valid("Feminino", "Masculino").required(),
      estadoCivil: Joi.string().valid("Solteiro", "Casado", "Separado", "Divorciado", "Viuvo").required(),
      logadouro: Joi.string().required(),
      numeroEndereco: Joi.number().integer().required(),
      complemento: Joi.string().required(),
      bairro: Joi.string().required(),
      cep: Joi.number().integer().required(),
      cidade: Joi.string().required(),
      estado: Joi.string().required(),
      telefoneResidencial: Joi.string().required(),
      celular: Joi.string().required(),
      temAlergia: Joi.boolean().required(),
      tipoAlergia: Joi.string().max(255),
      usaMedicamento: Joi.boolean().required(),
      tipoMedicamento: Joi.string().max(255),
      tipoSanguineo: Joi.string().valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-").required(),
      contatoEmg: Joi.string().required(),
      nomeContatoEmg: Joi.string().required(),
      temConvenio: Joi.boolean().required(),
      tipoConvenio: Joi.string().max(255),
      numeroConvenio: Joi.number().integer(),
      tempoPratica: Joi.string().required(),
      fimAtendimentoCTE: Joi.date().required(),
      possuiDeficiencia: Joi.boolean().required(),
      tipoDeficiencia: Joi.string().max(255),
      meioTransporte: Joi.string().valid("Onibus", "Carro", "Moto", "Bicicleta", "Ape").required(),
      placaOuLinha: Joi.string().max(50),
      dataCadastro: Joi.date().required(),
      nomeResponsavel: Joi.string().allow("").optional(),
      parentescoResponsavel: Joi.string().allow("").optional(),
      modalidade: Joi.string().uuid().required(),
      treinador: Joi.number().required(),
      clubeOuAssociacao: Joi.string().allow("").optional(),
      federacao: Joi.string().allow("").optional(),
      numRegistroFederacao: Joi.number().integer().allow(null).optional(),
      confederacao: Joi.string().allow("").optional(),
      numRegistroConfederacao: Joi.number().integer().allow(null).optional(),
      federacaoInternacional: Joi.string().allow("").optional(),
      numRegistroInternacional: Joi.number().integer().allow(null).optional(),
      cadeirante: Joi.boolean().required(),
      amputado: Joi.string().valid("MIE", "MID", "MSE", "MSD", "MMII", "MMSS", "Não").required(),
      atletaGuia: Joi.string().allow("").optional(),
      classificacaoFuncional: Joi.string().allow("").optional(),
      historicoDeficiencia: Joi.string().allow("").optional(),
      inicioPratica: Joi.date().required(),
      recebeAuxilio: Joi.boolean().required(),
      financiador: Joi.string().allow("").optional(),
      responsavel: Joi.number().required()
    })
  }),

  getAll: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required()
      })
      .unknown()
  }),

  getByUsuario: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required()
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      usuario: Joi.number().required()
    })
  }),

  update: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required()
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      usuario: Joi.number().required()
    }),
    [Segments.BODY]: Joi.object().keys({
      matricula: Joi.number().integer().optional(),
      tipo: Joi.string().valid("admin", "coordenador", "analista", "treinador", "atleta").optional(),
      email: Joi.string().email().optional(),
      senha: Joi.string().optional(),
      ativo: Joi.boolean().optional(),
      biometria: Joi.string().optional(),
      nomeCompleto: Joi.string().optional(),
      dataNascimento: Joi.date().optional(),
      rg: Joi.number().integer().optional(),
      dataEmissaoRg: Joi.date().optional(),
      orgaoExpedidorRg: Joi.string().optional(),
      cpf: Joi.number().integer().optional(),
      sexo: Joi.string().valid("Feminino", "Masculino").optional(),
      estadoCivil: Joi.string().valid("Solteiro", "Casado", "Separado", "Divorciado", "Viuvo").optional(),
      logadouro: Joi.string().optional(),
      numeroEndereco: Joi.number().integer().optional(),
      complemento: Joi.string().optional(),
      bairro: Joi.string().optional(),
      cep: Joi.number().integer().optional(),
      cidade: Joi.string().optional(),
      estado: Joi.string().optional(),
      telefoneResidencial: Joi.string().optional(),
      celular: Joi.string().optional(),
      temAlergia: Joi.boolean().optional(),
      tipoAlergia: Joi.string().max(255).optional(),
      usaMedicamento: Joi.boolean().optional(),
      tipoMedicamento: Joi.string().max(255).optional(),
      tipoSanguineo: Joi.string().valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-").optional(),
      contatoEmg: Joi.string().optional(),
      nomeContatoEmg: Joi.string().optional(),
      temConvenio: Joi.boolean().optional(),
      tipoConvenio: Joi.string().max(255).optional(),
      numeroConvenio: Joi.number().integer().optional(),
      tempoPratica: Joi.string().optional(),
      fimAtendimentoCTE: Joi.date().optional(),
      possuiDeficiencia: Joi.boolean().optional(),
      tipoDeficiencia: Joi.string().max(255).optional(),
      meioTransporte: Joi.string().valid("Onibus", "Carro", "Moto", "Bicicleta", "Ape").optional(),
      placaOuLinha: Joi.string().max(50).optional(),
      dataCadastro: Joi.date().optional(),
      usuario: Joi.number().integer().optional(),
      nomeResponsavel: Joi.string().allow("").optional(),
      parentescoResponsavel: Joi.string().allow("").optional(),
      modalidade: Joi.string().uuid().optional(),
      treinador: Joi.number().optional(),
      clubeOuAssociacao: Joi.string().allow("").optional(),
      federacao: Joi.string().allow("").optional(),
      numRegistroFederacao: Joi.number().integer().allow(null).optional(),
      confederacao: Joi.string().allow("").optional(),
      numRegistroConfederacao: Joi.number().integer().allow(null).optional(),
      federacaoInternacional: Joi.string().allow("").optional(),
      numRegistroInternacional: Joi.number().integer().allow(null).optional(),
      cadeirante: Joi.boolean().optional(),
      amputado: Joi.string().valid("MIE", "MID", "MSE", "MSD", "MMII", "MMSS", "Não").optional(),
      atletaGuia: Joi.string().allow("").optional(),
      classificacaoFuncional: Joi.string().allow("").optional(),
      historicoDeficiencia: Joi.string().allow("").optional(),
      inicioPratica: Joi.date().optional(),
      recebeAuxilio: Joi.boolean().optional(),
      financiador: Joi.string().allow("").optional(),
      responsavel: Joi.number().required(),
      motivo: Joi.string().allow("").required()
    })
  }),

  delete: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required()
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      usuario: Joi.number().required()
    }),
    [Segments.BODY]: Joi.object().keys({
      responsavel: Joi.number().required(),
      motivo: Joi.string().allow("").required()
    })
  })
};

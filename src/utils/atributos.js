const atributosUsuario = [
  "matricula",
  "tipo",
  "email",
  "senha",
  "ativo",
  "biometria",
  "nomeCompleto",
  "dataNascimento",
  "rg",
  "dataEmissaoRg",
  "orgaoExpedidorRg",
  "cpf",
  "sexo",
  "estadoCivil",
  "logadouro",
  "numeroEndereco",
  "complemento",
  "bairro",
  "cep",
  "cidade",
  "estado",
  "telefoneResidencial",
  "celular",
  "temAlergia",
  "tipoAlergia",
  "usaMedicamento",
  "tipoMedicamento",
  "tipoSanguineo",
  "contatoEmg",
  "nomeContatoEmg",
  "temConvenio",
  "tipoConvenio",
  "numeroConvenio",
  "tempoPratica",
  "fimAtendimentoCTE",
  "possuiDeficiencia",
  "tipoDeficiencia",
  "meioTransporte",
  "placaOuLinha",
  "dataCadastro"
];

const atributosAtleta = [
  "nomeResponsavel",
  "parentescoResponsavel",
  "modalidade",
  "treinador",
  "clubeOuAssociacao",
  "federacao",
  "numRegistroFederacao",
  "confederacao",
  "numRegistroConfederacao",
  "federacaoInternacional",
  "numRegistroInternacional",
  "cadeirante",
  "amputado",
  "atletaGuia",
  "classificacaoFuncional",
  "historicoDeficiencia",
  "inicioPratica",
  "recebeAuxilio",
  "financiador"
];

const atributosProfessor = ["departamento", "matricula_ufmg", "nivel", "equipe"];

const atributosTreinador = ["cref", "modalidade"];

const atributosAluno = ["curso", "matricula_ufmg", "nivel", "orientador"];

module.exports = { atributosUsuario, atributosAtleta, atributosProfessor, atributosTreinador, atributosAluno };

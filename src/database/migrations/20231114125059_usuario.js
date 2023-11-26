require('dotenv').config();

exports.up = function(knex) {
  return knex.schema.createTable("usuario", (table) => {
    table.integer("matricula").primary().unique().notNullable();
    table.enum("tipo", [
      process.env.ADMIN_SECRET,
      process.env.COORDENADOR_SECRET,
      process.env.ANALISTA_SECRET,
      process.env.TREINADOR_SECRET,
      process.env.ATLETA_SECRET
    ]).notNullable();
    table.string("email").unique().notNullable();
    table.string("senha").notNullable();
    table.boolean("ativo").notNullable();
    table.string("biometria");
    table.string("nomeCompleto").notNullable();
    table.date("dataNascimento").notNullable();
    table.integer("rg").notNullable();
    table.date("dataEmissaoRg").notNullable();
    table.string("orgaoExpedidorRg").notNullable();
    table.bigint("cpf").unique().notNullable();
    table.enum("sexo", ['Feminino', 'Masculino']).notNullable();
    table.enum("estadoCivil", ['Solteiro', 'Casado', 'Separado', 'Divorciado', 'Viuvo']).notNullable();
    table.string("logadouro").notNullable();
    table.integer("numeroEndereco").notNullable();
    table.string("complemento").notNullable();
    table.string("bairro").notNullable();
    table.integer("cep").notNullable();
    table.string("cidade").notNullable();
    table.string("estado").notNullable();
    table.string("telefoneResidencial").notNullable();
    table.string("celular").notNullable();
    table.boolean("temAlergia").notNullable();
    table.string("tipoAlergia", 255);
    table.boolean("usaMedicamento").notNullable();
    table.string("tipoMedicamento", 255);
    table.enum("tipoSanguineo", ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).notNullable();
    table.string("contatoEmg").notNullable();
    table.string("nomeContatoEmg").notNullable();
    table.boolean("temConvenio").notNullable();
    table.string("tipoConvenio", 255);
    table.integer("numeroConvenio");
    table.string("tempoPratica").notNullable();
    table.date("fimAtendimentoCTE").notNullable();
    table.boolean("possuiDeficiencia").notNullable();
    table.string("tipoDeficiencia", 255);
    table.enum("meioTransporte", ['Onibus', 'Carro', 'Moto', 'Bicicleta', 'Ape']).notNullable();
    table.string("placaOuLinha", 50);
    table.date("dataCadastro").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("usuario");
};

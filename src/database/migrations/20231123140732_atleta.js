exports.up = function(knex) {
  return knex.schema.createTable("atleta", (table) => {
    table.integer("usuario").notNullable();
    table.string("nomeResponsavel");
    table.string("parentescoResponsavel");
    table.uuid("modalidade").notNullable();
    table.string("tempoPratica").notNullable();
    table.integer("treinador").notNullable();
    table.string("clubeOuAssociacao");
    table.string("federacao");
    table.integer("numRegistroFederacao");
    table.string("confederacao");
    table.integer("numRegistroConfederacao");
    table.string("federacaoInternacional");
    table.integer("numRegistroInternacional");
    table.bool("cadeirante").notNullable();
    table.enum("amputado", ["MIE", "MID", "MSE", "MSD", "MMII", "MMSS", "Não"]).notNullable();
    table.string("atletaGuia");
    table.string("classificacaoFuncional");
    table.string("historicoDeficiencia");
    table.date("inicioPratica").notNullable();
    table.bool("recebeAuxilio").notNullable();
    table.string("financiador");

    table
    .foreign("usuario")
    .references("matricula")
    .inTable("usuario")
    .onDelete("cascade");

    table
    .foreign("treinador")
    .references("matricula")
    .inTable("usuario")
    .onDelete("cascade");

    table
    .foreign("modalidade")
    .references("id")
    .inTable("modalidade")
    .onDelete("cascade");

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("atleta");
};

exports.up = function(knex) {
  return knex.schema.createTable("atleta", (table) => {
    table.uuid("id").primary().unique().notNullable();
    table.integer("usuario").notNullable();
    table.string("nomeResponsavel").notNullable();
    table.string("parentescoResponsavel").notNullable();
    table.uuid("modalidade").notNullable();
    table.uuid("treinador").notNullable();
    table.string("clubeOuAssociacao");
    table.string("federacao");
    table.integer("numRegistroFederacao");
    table.string("confederacao");
    table.integer("numRegistroConfederacao");
    table.string("federacaoInternacional");
    table.integer("numRegistroInternacional");
    table.string("horariosTreinamento").notNullable();
    table.bool("cadeirante").notNullable();
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
    .references("id")
    .inTable("treinador")
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

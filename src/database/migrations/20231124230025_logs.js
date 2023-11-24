exports.up = function(knex) {
  return knex.schema.createTable("logs", (table) => {
    table.uuid("id").primary().unique().notNullable();
    table.integer("responsavel").notNullable();
    table.date("data").notNullable();
    table.string("nomeTabela").notNullable();
    table.uuid("tabelaId").notNullable();
    table.enum("tipoAlteracao", ["Create", "Delete", "Update"]).notNullable();
    table.string("atributo");
    table.string("valorAntigo");
    table.string("novoValor");
    table.string("motivo").notNullable();

    table
    .foreign("responsavel")
    .references("matricula")
    .inTable("usuario")
    .onDelete("cascade");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("logs");
};

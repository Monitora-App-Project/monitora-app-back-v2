exports.up = function(knex) {
  return knex.schema.createTable("logs", (table) => {
    table.uuid("id").primary().unique().notNullable();
    table.integer("responsavel").notNullable();
    table.timestamp("data", { useTz: false }, { precision: 0 }).notNullable();
    table.string("nomeTabela").notNullable();
    table.string("tabelaId").notNullable();
    table.enum("tipoAlteracao", ["Create", "Delete", "Update"]).notNullable();
    table.string("atributo");
    table.string("valorAntigo");
    table.string("novoValor");
    table.string("motivo");

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

exports.up = function(knex) {
  return knex.schema.createTable("ocorrencias", (table) => {
    table.uuid("id").primary().unique().notNullable();
    table.integer("responsavel").notNullable();
    table.timestamp("data", { useTz: false }, { precision: 0 }).notNullable();
    table.integer("usuarioModificado").notNullable();
    table.string("atributo").notNullable();
    table.string("valorAntigo").notNullable();
    table.string("novoValor").notNullable();
    table.string("motivo").notNullable();

    table
    .foreign("responsavel")
    .references("matricula")
    .inTable("usuario")
    .onDelete("cascade");

    table
    .foreign("usuarioModificado")
    .references("matricula")
    .inTable("usuario")
    .onDelete("cascade");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("ocorrencias");
};

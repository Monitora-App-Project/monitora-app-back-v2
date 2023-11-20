exports.up = function(knex) {
  return knex.schema.createTable("tipoTeste", (table) => {
    table.increments("id").primary().unique().notNullable();
    table.string("nome").unique().notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("tipoTeste");
};
exports.up = function(knex) {
  return knex.schema.createTable("treinador", (table) => {
    table.uuid("id").primary().unique().notNullable();
    table.integer("usuario").notNullable();
    table.integer("cref").notNullable();
    table.uuid("modalidade").notNullable();

    table
    .foreign("usuario")
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
  return knex.schema.dropTable("treinador");
};

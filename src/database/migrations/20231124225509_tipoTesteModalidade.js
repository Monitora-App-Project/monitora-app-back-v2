exports.up = function(knex) {
  return knex.schema.createTable("tipoTesteModalidade", (table) => {
    table.uuid("modalidade").notNullable();
    table.increments("teste").notNullable();

    table
    .foreign("modalidade")
    .references("id")
    .inTable("modalidade")
    .onDelete("cascade");

    table
    .foreign("teste")
    .references("id")
    .inTable("tipoTeste")
    .onDelete("cascade");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("tipoTesteModalidade");
};

exports.up = function(knex) {
  return knex.schema.createTable("modalidade", (table) => {
    table.string("id").primary().unique().notNullable();
    table.string("nome").notNullable();
    table.enum("tipo", ['Olimpico', 'Paralimpico']).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("modalidade");
};

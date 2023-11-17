exports.up = function(knex) {
  return knex.schema.createTable("professor", (table) => {
    table.uuid("id").primary().unique().notNullable();
    table.integer("usuario").notNullable();
    table.string("departamento").notNullable();
    table.integer("matricula_ufmg").notNullable();
    table.enum("nivel", ["Graduação", "Mestrado", "Doutorado", "Pós-Doc"])
    table.string("equipe").notNullable();

    table
    .foreign("usuario")
    .references("matricula")
    .inTable("usuario")
    .onDelete("cascade");

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("professor");
};

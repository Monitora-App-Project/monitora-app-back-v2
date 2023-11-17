exports.up = function(knex) {
  return knex.schema.createTable("aluno", (table) => {
    table.uuid("id").primary().unique().notNullable();
    table.integer("usuario").notNullable();
    table.string("curso").notNullable();
    table.integer("matricula_ufmg").notNullable();
    table.enum("nivel", ["Graduação", "Mestrado", "Doutorado", "Pós-Doc"])
    table.uuid("orientador").notNullable();

    table
    .foreign("usuario")
    .references("matricula")
    .inTable("usuario")
    .onDelete("cascade");

    table
    .foreign("orientador")
    .references("id")
    .inTable("professor")
    .onDelete("cascade");

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("aluno");
};

exports.up = function(knex) {
  return knex.schema.createTable("recoverPassword", (table) => {
    table.integer("usuario").notNullable();
    table.string("code").notNullable();
    table.bool("verify").defaultTo(false).notNullable();
    table.date("createIn").notNullable();

    table
    .foreign("usuario")
    .references("matricula")
    .inTable("usuario")
    .onDelete("cascade");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("recoverPassword");
};
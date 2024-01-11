exports.up = function(knex) {
  return knex.schema.createTable("cronJob", (table) => {
    table.uuid("id").primary().unique().notNullable();
    table.string("cronExpression").notNullable();
    table.string("type").notNullable();
    table.string("additionalData");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("cronJob");
};
exports.up = function(knex) {
  return knex.schema.createTable("arremesso", (table) => {
    table.uuid("id")      
      .primary()
      .unique()
      .notNullable();
    table.integer("idTeste").notNullable();
    
    table.float("arremesso1").notNullable();
    table.float("arremesso2").notNullable();
    table.float("arremesso3").notNullable();
    table.float("mediaArremesso").notNullable();
    table.float("maxArremesso").notNullable();
    table.float("minArremesso").notNullable();
    table.float("desvPadArremesso").notNullable();
    table.float("coefVariacaoArremesso").notNullable();

    table.text("obsArremesso");
    
    table.foreign("idTeste")
      .references("id")
      .inTable("teste")
      .onDelete("cascade");
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("arremesso");
};

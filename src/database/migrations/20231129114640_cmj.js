exports.up = function(knex) {
  return knex.schema.createTable("cmj", (table) => {
    table.uuid("id")      // checar se cria automaticamente mesmo ou se precisa de uma funcao especial
      .primary()
      .unique()
      .notNullable();
    table.integer("idTeste").notNullable();
    
    table.float("cmj1").notNullable();
    table.float("cmj2").notNullable();
    table.float("cmj3").notNullable();
    table.float("mediaCmj").notNullable();
    table.float("maxCmj").notNullable();
    table.float("minCmj").notNullable();
    table.float("desvPadCmj").notNullable();
    table.float("coefVariacaoCmj").notNullable();

    table.text("obsCmj");
    
    table.foreign("idTeste")
      .references("id")
      .inTable("teste")
      .onDelete("cascade");
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("cmj");
};

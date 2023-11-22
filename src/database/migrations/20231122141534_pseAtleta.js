exports.up = function(knex) {
  return knex.schema.createTable("pseAtleta", (table) => {
    table.uuid("id")      // checar se cria automaticamente mesmo ou se precisa de uma funcao especial
      .primary()
      .unique()
      .notNullable();
    table.integer("idTeste").notNullable();
    
    table.tinyint("pseAtleta").notNullable();         // Fiz como tiny int pois esse tipo aceita de 0 a 255 (e eh suficiente para esses dados)
    table.integer("pseSessao").notNullable();

    table.time("duracaoTreino").notNullable();

    table.integer("diaDaSemana").notNullable();     // Calculados a partir de teste.dataDaColeta
    table.integer("semanaDoAno").notNullable();
    
    table.foreign("idTeste")
      .references("id")
      .inTable("teste")
      .onDelete("cascade");
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("pseAtleta");
};

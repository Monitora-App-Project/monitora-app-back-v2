exports.up = function(knex) {
  return knex.schema.createTable("pseAtleta", (table) => {
    table.uuid("idTeste")      
      .primary()
      .unique()
      .notNullable();
    
    table.tinyint("pseAtleta").notNullable();        
    table.integer("pseSessao").notNullable();

    table.integer("duracaoTreino").notNullable();

    table.integer("diaDaSemana").notNullable();     
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

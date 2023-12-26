exports.up = function(knex) {
  return knex.schema.createTable("hooper", (table) => {
    table.uuid("idTeste")      
      .primary()
      .unique()
      .notNullable();
    
    table.tinyint("nivelSono").notNullable();         // Fiz como tiny int pois esse tipo aceita de 0 a 255 (e eh suficiente para esses dados)
    table.tinyint("nivelStress").notNullable();
    table.tinyint("nivelFadiga").notNullable();
    table.tinyint("nivelDorMuscular").notNullable();
    table.tinyint("nivelPsr").notNullable();
    
    table.float("horasSonoNoite").notNullable();

    table.integer("diaDaSemana").notNullable();     // Calculados a partir de teste.dataDaColeta
    table.integer("semanaDoAno").notNullable();
    
    table.foreign("idTeste")
      .references("id")
      .inTable("teste")
      .onDelete("cascade");
    
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("hooper");
};

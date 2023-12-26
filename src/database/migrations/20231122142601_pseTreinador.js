exports.up = function(knex) {
  return knex.schema.createTable("pseTreinador", (table) => {
    table.uuid("idTeste")     
      .primary()
      .unique()
      .notNullable();
    
    table.tinyint("pseTreinador").notNullable();         // Vira int2
    table.enu("tipoTreino", 
        ['Específico', 
        'Força',
        'Competição'])
      .notNullable();
    
    table.string("faseTreinamento").notNullable();
    table.text("obsBemEstar");
    table.text("obsPse");

    table.integer("diaDaSemana").notNullable();     // Calculados a partir de teste.dataDaColeta
    table.integer("semanaDoAno").notNullable();
    
    table.foreign("idTeste")
      .references("id")
      .inTable("teste")
      .onDelete("cascade");
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("pseTreinador");
};

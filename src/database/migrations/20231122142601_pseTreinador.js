exports.up = function(knex) {
  return knex.schema.createTable("pseTreinador", (table) => {
    table.uuid("id")      // checar se cria automaticamente mesmo ou se precisa de uma funcao especial
      .primary()
      .unique()
      .notNullable();
    table.integer("idTeste").notNullable();
    
    table.tinyint("pseTreinador").notNullable();         // Vira int2
    table.enu("tipoTreino", 
        ['Específico', 
        'Força',
        'Competição'])
      .notNullable();
    //Falta 'faseTreinamento', vai estar em outra migration
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

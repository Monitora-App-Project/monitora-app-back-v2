exports.up = function(knex) {
  return knex.schema.createTable("teste", (table) => {
    table.uuid("id")
      .primary()
      .unique()         
      .notNullable();   
    
    table.timestamp("horaDaColeta", { useTz: false }, { precision: 0 }).notNullable();

    table.integer("matriculaAtleta").notNullable();
    table.uuid("idModalidade").notNullable();
    table.integer("idTipoTeste").notNullable();
    
    table.foreign("matriculaAtleta")
      .references("matricula")
      .inTable("usuario")
      .onDelete("cascade");
    
    table.foreign("idModalidade")
      .references("id")
      .inTable("modalidade")
      .onDelete("cascade");

    table.foreign("idTipoTeste")
      .references("id")
      .inTable("tipoTeste")
      .onDelete("cascade");
    
    table.integer("idade")        // O calculo eh feito antes de inserir o dado na tabela (horaDaColeta - nascimento)
      .notNullable();            
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("teste");
};

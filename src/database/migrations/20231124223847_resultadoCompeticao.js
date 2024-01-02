exports.up = function(knex) {
  return knex.schema.createTable("resultadoCompeticao", (table) => {
    table.uuid("id").primary().unique().notNullable();
    table.uuid("modalidade").notNullable();
    table.integer("atleta").notNullable();
    table.string("nome").notNullable();
    table.enum("abrangencia", 
      ["Municipal", "Estadual", "Regional", "Nacional", "Internacional"]).notNullable();
    table.date("data").notNullable();
    table.string("clube").notNullable();
    table.string("prova").notNullable();
    table.string("categoria");
    table.string("pesoImplemento");
    table.string("classeFuncional");
    table.string("marca");
    table.string("classificacao").notNullable();
    table.string("n_lutas");
    table.string("n_vitorias");
    table.string("m_derrotas");

    table
    .foreign("atleta")
    .references("matricula")
    .inTable("usuario")
    .onDelete("cascade");

    table
    .foreign("modalidade")
    .references("id")
    .inTable("modalidade")
    .onDelete("cascade");

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("resultadoCompeticao");
};

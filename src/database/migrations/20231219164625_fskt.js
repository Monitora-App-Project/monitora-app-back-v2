exports.up = function(knex) {
  return knex.schema.createTable("fskt", (table) => {
    table.uuid("idTeste")      
      .primary()
      .unique()
      .notNullable();
    
    table.string("local").notNullable();
    table.integer("categoria").notNullable();
    table.string("faixa").notNullable();
    table.float("estatura").notNullable();
    table.float("massaCorporal").notNullable();
    table.float("pressaoSisRepouso").notNullable();
    table.float("pressaoDiasRepouso").notNullable();
    table.float("fcRepousoPre");
    table.float("psePre").notNullable();

    table.integer("fcBpm1");
    table.integer("fcBpm2");
    table.integer("fcBpm3");
    table.integer("fcBpm4");
    table.integer("fcBpm5");

    table.float("fcRel1");
    table.float("fcRel2");
    table.float("fcRel3");
    table.float("fcRel4");
    table.float("fcRel5");

    table.float("pse1").notNullable();
    table.float("pse2").notNullable();
    table.float("pse3").notNullable();
    table.float("pse4").notNullable();
    table.float("pse5").notNullable();

    table.integer("numChutes1").notNullable();
    table.integer("numChutes2").notNullable();
    table.integer("numChutes3").notNullable();
    table.integer("numChutes4").notNullable();
    table.integer("numChutes5").notNullable();

    table.float("pressaoSisPos").notNullable();
    table.float("pressaoDiasPos").notNullable();
    
    table.float("deltaPasRepouso").notNullable();
    table.float("deltaPadRepouso").notNullable();

    table.float("kdi").notNullable();
    table.integer("numChutesTotal").notNullable();
    table.integer("classificacaoFsktTotal").notNullable();

    table.float("rec1MinPressaoSis").notNullable();
    table.float("rec1MinPressaoDias").notNullable();
    
    table.integer("rec1MinFc");
    table.integer("rec2MinFc");
    table.integer("rec3MinFc");
    table.integer("rec4MinFc");
    table.integer("rec5MinFc");

    table.integer("deltaFcRec1Est5");
    table.integer("deltaFcRec5Rec1");

    table.float("rec5MinPressaoSis").notNullable();
    table.float("rec5MinPressaoDias").notNullable();

    table.integer("deltaPas");
    table.integer("deltaPad");
    table.integer("fcMaxPredita");

    table.foreign("idTeste")
      .references("id")
      .inTable("teste")
      .onDelete("cascade");
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("fskt");
};


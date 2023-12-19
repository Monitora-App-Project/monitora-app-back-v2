exports.up = function(knex) {
  return knex.schema.createTable("vfc", (table) => {
    table.uuid("id")      
      .primary()
      .unique()
      .notNullable();
    table.integer("idTeste").notNullable();
    
    table.float("rmssd").notNullable();
    table.float("sdnn").notNullable();
    table.float("lnRmssd").notNullable();
    table.float("pnn50").notNullable();
    table.float("meanRrInterval").notNullable();
    table.float("totalPower").notNullable();
    table.float("lfHfRatio").notNullable();
    table.float("lfPower").notNullable();
    table.float("hfPower").notNullable();
    table.float("lfPeak").notNullable();
    table.float("hfPeak").notNullable();
    table.float("hr").notNullable();

    table.text("obsVfc");
    
    table.foreign("idTeste")
      .references("id")
      .inTable("teste")
      .onDelete("cascade");
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("vfc");
};

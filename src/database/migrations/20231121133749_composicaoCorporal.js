exports.up = function(knex) {
  return knex.schema.createTable("composicaoCorporal", (table) => {
    table.uuid("id")      // checar se cria automaticamente mesmo ou se precisa de uma funcao especial
      .primary()
      .unique()
      .notNullable();
    table.integer("idTeste").notNullable();

    table.float("estatura").notNullable();
    table.float("massaCorporal").notNullable();
    table.float("envergadura").notNullable();
    table.float("semiEnvergadura").notNullable();

    table.float("circOmbro1").notNullable();
    table.float("circOmbro2").notNullable();
    table.float("circOmbro3").notNullable();
    table.float("mediaCircOmbro").notNullable();

    table.float("circTorax1").notNullable();
    table.float("circTorax2").notNullable();
    table.float("circTorax3").notNullable();
    table.float("mediaCircTorax").notNullable();

    table.float("circBracoDir1");         // Sao nullable
    table.float("circBracoDir2");
    table.float("circBracoDir3");
    table.float("mediaCircBracoDir");

    table.float("circBracoEsq1");
    table.float("circBracoEsq2");
    table.float("circBracoEsq3");
    table.float("mediaCircBracoEsq");

    table.float("circAntDir1");         
    table.float("circAntDir2");
    table.float("circAntDir3");
    table.float("mediaCircAntDir");

    table.float("circAntEsq1");         
    table.float("circAntEsq2");
    table.float("circAntEsq3");
    table.float("mediaCircAntEsq");

    table.float("circCintura1").notNullable();
    table.float("circCintura2").notNullable();
    table.float("circCintura3").notNullable();
    table.float("mediaCircCintura").notNullable();

    table.float("circAbdomen1").notNullable();
    table.float("circAbdomen2").notNullable();
    table.float("circAbdomen3").notNullable();
    table.float("mediaCircAbdomen").notNullable();

    table.float("circQuadril1");         
    table.float("circQuadril2");
    table.float("circQuadril3");
    table.float("mediaCircQuadril");

    table.float("circCoxaDir1");         
    table.float("circCoxaDir2");
    table.float("circCoxaDir3");
    table.float("mediaCircCoxaDir");

    table.float("circCoxaEsq1");         
    table.float("circCoxaEsq2");
    table.float("circCoxaEsq3");
    table.float("mediaCircCoxaEsq");

    table.float("circPantDir1");         
    table.float("circPantDir2");
    table.float("circPantDir3");
    table.float("mediaCircPantDir");

    table.float("circPantEsq1");         
    table.float("circPantEsq2");
    table.float("circPantEsq3");
    table.float("mediaCircPantEsq");

    table.float("dcPeitoral1").notNullable();
    table.float("dcPeitoral2").notNullable();
    table.float("dcPeitoral3").notNullable();
    table.float("mediaDcPeitoral").notNullable();
    
    table.float("dcAxilar1").notNullable();
    table.float("dcAxilar2").notNullable();
    table.float("dcAxilar3").notNullable();
    table.float("mediaDcAxilar").notNullable();

    table.float("dcTriceps1");
    table.float("dcTriceps2");
    table.float("dcTriceps3");
    table.float("mediaDcTriceps");

    table.float("dcSubescapular1").notNullable();
    table.float("dcSubescapular2").notNullable();
    table.float("dcSubescapular3").notNullable();
    table.float("mediaDcSubescapular").notNullable();

    table.float("dcAbdominal1").notNullable();
    table.float("dcAbdominal2").notNullable();
    table.float("dcAbdominal3").notNullable();
    table.float("mediaDcAbdominal").notNullable();

    table.float("dcSuprailiaca1").notNullable();
    table.float("dcSuprailiaca2").notNullable();
    table.float("dcSuprailiaca3").notNullable();
    table.float("mediaDcSuprailiaca").notNullable();

    table.float("dcCoxa1");
    table.float("dcCoxa2");
    table.float("dcCoxa3");
    table.float("mediaDcCoxa");

    table.float("dcPant1");
    table.float("dcPant2");
    table.float("dcPant3");
    table.float("mediaDcPant");
    
    table.float("somaSeteDobras").notNullable();
    table.float("quadradoSoma").notNullable();
    table.float("densidade").notNullable();

    table.enum("deficienciaFisica", 
      ['Cadeirante', 
        'Ambulante',
        'Amputado MI'])
      .notNullable();

    table.float("percentualGordura").notNullable();
    table.float("massaGorda").notNullable();
    table.float("massaIsentaDeGordura").notNullable();
  
    table.foreign("idTeste")
      .references("id")
      .inTable("teste")
      .onDelete("cascade");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("composicaoCorporal");
};

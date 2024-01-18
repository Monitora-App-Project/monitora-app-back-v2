const connection = require("../database/connection");

module.exports = {
  async create(pseAtleta) {
    const result = await connection("pseAtleta").insert(pseAtleta);
    return result;
  },

  async getAll() {
    const result = await connection("pseAtleta")
      .select(
        "pseAtleta.*",
        "teste.horaDaColeta",
        "teste.matriculaAtleta",
        "teste.idModalidade",
        "teste.idTipoTeste",
        "teste.idade"
      )
      .innerJoin("teste", "pseAtleta.idTeste", "teste.id");
    return result;
  },

  async getByTeste(idTeste) {
    const result = await connection("pseAtleta")
      .select(
        "pseAtleta.*",
        "teste.horaDaColeta",
        "teste.matriculaAtleta",
        "teste.idModalidade",
        "teste.idTipoTeste",
        "teste.idade"
      )
      .innerJoin("teste", "pseAtleta.idTeste", "teste.id")
      .where({ idTeste });
    return result;
  },

  async getByFields(fields) {
    const result = await connection("pseAtleta")
      .select("pseAtleta.*", "teste.*")
      .innerJoin("teste", "pseAtleta.idTeste", "teste.id")
      .where(fields);
    return result;
  },

  async getByDate(fields) {
    const result = await connection("pseAtleta")
      .select("pseAtleta.*", "teste.*")
      .innerJoin("teste", "pseAtleta.idTeste", "teste.id")
      .where((builder) => {
        if (fields.dataColetaMin && fields.dataColetaMax) {
          builder.whereBetween("horaDaColeta", [fields.dataColetaMin, fields.dataColetaMax]);
        }
      });

    return result;
  },

  async updateByTeste(idTeste, pseAtleta) {
    const result = await connection("pseAtleta").where({ idTeste }).update(pseAtleta);
    return result;
  },

  async deleteByTeste(idTeste) {
    const result = await connection("pseAtleta").where({ idTeste }).delete();
    return result;
  },
  
  async verificaIdTesteExiste(idTeste){
    const result = await connection("pseAtleta").where({ idTeste }).select("*").first();
    if (result) return true;
    else return false;
  }
};

const connection = require("../database/connection");

module.exports = {
  async create(vfc) {
    const result = await connection("vfc").insert(vfc);
    return result;
  },

  async getAll() {
    const result = await connection("vfc")
      .select(
        "vfc.*",
        "teste.horaDaColeta",
        "teste.matriculaAtleta",
        "teste.idModalidade",
        "teste.idTipoTeste",
        "teste.idade"
      )
      .innerJoin("teste", "vfc.idTeste", "teste.id");
    return result;
  },

  async getByTeste(idTeste) {
    const result = await connection("vfc")
      .select(
        "vfc.*",
        "teste.horaDaColeta",
        "teste.matriculaAtleta",
        "teste.idModalidade",
        "teste.idTipoTeste",
        "teste.idade"
      )
      .innerJoin("teste", "vfc.idTeste", "teste.id")
      .where({ idTeste });
    return result;
  },

  async getByFields(fields) {
    const result = await connection("vfc")
      .select("vfc.*", "teste.*")
      .innerJoin("teste", "vfc.idTeste", "teste.id")
      .where(fields);
    return result;
  },

  async getByDate(fields) {
    const result = await connection("vfc")
      .select("vfc.*", "teste.*")
      .innerJoin("teste", "vfc.idTeste", "teste.id")
      .where((builder) => {
        if (fields.dataColetaMin && fields.dataColetaMax) {
          builder.whereBetween("horaDaColeta", [fields.dataColetaMin, fields.dataColetaMax]);
        }
      });

    return result;
  },

  async updateByTeste(idTeste, vfc) {
    const result = await connection("vfc").where({ idTeste }).update(vfc);
    return result;
  },

  async deleteByTeste(idTeste) {
    const result = await connection("vfc").where({ idTeste }).delete();
    return result;
  },

  async verificaIdTesteExiste(idTeste){
    const result = await connection("vfc").where({ idTeste }).select("*").first();
    if (result) return true;
    else return false;
  }
};

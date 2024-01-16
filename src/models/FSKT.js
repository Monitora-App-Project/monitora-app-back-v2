const connection = require("../database/connection");

module.exports = {
  async create(fskt) {
    const result = await connection("fskt").insert(fskt);
    return result;
  },

  async getAll() {
    const result = await connection("fskt")
      .select(
        "fskt.*",
        "teste.horaDaColeta",
        "teste.matriculaAtleta",
        "teste.idModalidade",
        "teste.idTipoTeste",
        "teste.idade"
      )
      .innerJoin("teste", "fskt.idTeste", "teste.id");
    return result;
  },

  async getByTeste(idTeste) {
    const result = await connection("fskt")
      .select(
        "fskt.*",
        "teste.horaDaColeta",
        "teste.matriculaAtleta",
        "teste.idModalidade",
        "teste.idTipoTeste",
        "teste.idade"
      )
      .innerJoin("teste", "fskt.idTeste", "teste.id")
      .where({ idTeste });
    return result;
  },

  async getByFields(fields) {
    const result = await connection("fskt")
      .select("fskt.*", "teste.*")
      .innerJoin("teste", "fskt.idTeste", "teste.id")
      .where(fields);
    return result;
  },

  async getByDate(fields) {
    const result = await connection("fskt")
      .select("fskt.*", "teste.*")
      .innerJoin("teste", "fskt.idTeste", "teste.id")
      .where((builder) => {
        if (fields.dataColetaMin && fields.dataColetaMax) {
          builder.whereBetween("horaDaColeta", [fields.dataColetaMin, fields.dataColetaMax]);
        }
      });

    return result;
  },

  async updateByTeste(idTeste, fskt) {
    const result = await connection("fskt").where({ idTeste }).update(fskt);
    return result;
  },

  async deleteByTeste(idTeste) {
    const result = await connection("fskt").where({ idTeste }).delete();
    return result;
  },

  async verificaIdTesteExiste(idTeste){
    const result = await connection("fskt").where({ idTeste }).select("*").first();
    if (result) return true;
    else return false;
  }
};

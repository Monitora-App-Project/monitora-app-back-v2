const connection = require("../database/connection");

module.exports = {
  async create(cmj) {
    const result = await connection("cmj").insert(cmj);
    return result;
  },

  async getAll() {
    const result = await connection("cmj")
      .select(
        "cmj.*",
        "teste.horaDaColeta",
        "teste.matriculaAtleta",
        "teste.idModalidade",
        "teste.idTipoTeste",
        "teste.idade"
      )
      .innerJoin("teste", "cmj.idTeste", "teste.id");
    return result;
  },

  async getByTeste(idTeste) {
    const result = await connection("cmj")
      .select(
        "cmj.*",
        "teste.horaDaColeta",
        "teste.matriculaAtleta",
        "teste.idModalidade",
        "teste.idTipoTeste",
        "teste.idade"
      )
      .innerJoin("teste", "cmj.idTeste", "teste.id")
      .where({ idTeste });
    return result;
  },

  async updateByTeste(idTeste, cmj) {
    const result = await connection("cmj").where({ idTeste }).update(cmj);
    return result;
  },

  async deleteByTeste(idTeste) {
    const result = await connection("cmj").where({ idTeste }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection("cmj")
      .select("cmj.*", "teste.*")
      .innerJoin("teste", "cmj.idTeste", "teste.id")
      .where(fields);
    return result;
  },

  async getByDate(fields) {
    const result = await connection("cmj")
      .select("cmj.*", "teste.*")
      .innerJoin("teste", "cmj.idTeste", "teste.id")
      .where((builder) => {
        if (fields.dataColetaMin && fields.dataColetaMax) {
          builder.whereBetween("horaDaColeta", [fields.dataColetaMin, fields.dataColetaMax]);
        }
      });

    return result;
  },

  async verificaIdTesteExiste(idTeste){
    const result = await connection("cmj").where({ idTeste }).select("*").first();
    if (result) return true;
    else return false;
  }
};

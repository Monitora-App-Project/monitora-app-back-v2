const connection = require("../database/connection");

module.exports = {
  async create(arremesso) {
    const result = await connection("arremesso").insert(arremesso);
    return result;
  },

  async getAll() {
    const result = await connection("arremesso")
      .select(
        "arremesso.*",
        "teste.horaDaColeta",
        "teste.matriculaAtleta",
        "teste.idModalidade",
        "teste.idTipoTeste",
        "teste.idade"
      )
      .innerJoin("teste", "arremesso.idTeste", "teste.id");
    return result;
  },

  async getByTeste(idTeste) {
    const result = await connection("arremesso")
      .select(
        "arremesso.*",
        "teste.horaDaColeta",
        "teste.matriculaAtleta",
        "teste.idModalidade",
        "teste.idTipoTeste",
        "teste.idade"
      )
      .innerJoin("teste", "arremesso.idTeste", "teste.id")
      .where({ idTeste });
    return result;
  },

  async getByFields(fields) {
    const result = await connection("arremesso")
      .select("arremesso.*", "teste.*")
      .innerJoin("teste", "arremesso.idTeste", "teste.id")
      .where(fields);
    return result;
  },

  async getByDate(fields) {
    const result = await connection("arremesso")
      .select("arremesso.*", "teste.*")
      .innerJoin("teste", "arremesso.idTeste", "teste.id")
      .where((builder) => {
        if (fields.dataColetaMin && fields.dataColetaMax) {
          builder.whereBetween("horaDaColeta", [fields.dataColetaMin, fields.dataColetaMax]);
        }
      });

    return result;
  },

  async updateByTeste(idTeste, arremesso) {
    const result = await connection("arremesso").where({ idTeste }).update(arremesso);
    return result;
  },

  async deleteByTeste(idTeste) {
    const result = await connection("arremesso").where({ idTeste }).delete();
    return result;
  },

  async verificaIdTesteExiste(idTeste){
    const result = await connection("arremesso").where({ idTeste }).select("*").first();
    if (result) return true;
    else return false;
  }
};

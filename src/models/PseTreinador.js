const connection = require("../database/connection");

module.exports = {
  async create(pseTreinador) {
    const result = await connection("pseTreinador").insert(pseTreinador);
    return result;
  },

  async getAll() {
    const result = await connection("pseTreinador")
      .select(
        "pseTreinador.*",
        "teste.horaDaColeta",
        "teste.matriculaAtleta",
        "teste.idModalidade",
        "teste.idTipoTeste",
        "teste.idade"
      )
      .innerJoin("teste", "pseTreinador.idTeste", "teste.id");
    return result;
  },

  async getByTeste(idTeste) {
    const result = await connection("pseTreinador")
      .select(
        "pseTreinador.*",
        "teste.horaDaColeta",
        "teste.matriculaAtleta",
        "teste.idModalidade",
        "teste.idTipoTeste",
        "teste.idade"
      )
      .innerJoin("teste", "pseTreinador.idTeste", "teste.id")
      .where({ idTeste });
    return result;
  },

  async getByFields(fields) {
    const result = await connection("pseTreinador")
      .select("pseTreinador.*", "teste.*")
      .innerJoin("teste", "pseTreinador.idTeste", "teste.id")
      .where(fields);
    return result;
  },

  async getByDate(fields) {
    const result = await connection("pseTreinador")
      .select("pseTreinador.*", "teste.*")
      .innerJoin("teste", "pseTreinador.idTeste", "teste.id")
      .where((builder) => {
        if (fields.dataColetaMin && fields.dataColetaMax) {
          builder.whereBetween("horaDaColeta", [fields.dataColetaMin, fields.dataColetaMax]);
        }
      });

    return result;
  },

  async updateByTeste(idTeste, pseTreinador) {
    const result = await connection("pseTreinador").where({ idTeste }).update(pseTreinador);
    return result;
  },

  async deleteByTeste(idTeste) {
    const result = await connection("pseTreinador").where({ idTeste }).delete();
    return result;
  }
};

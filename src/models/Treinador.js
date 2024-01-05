const connection = require("../database/connection");

module.exports = {
  async create(treinador) {
    const result = await connection("treinador").insert(treinador);
    return result;
  },

  async getAll() {
    const result = await connection("treinador")
      .select("treinador.*", "usuario.*")
      .innerJoin("usuario", "treinador.usuario", "usuario.matricula");
    return result;
  },

  async getByUsuario(usuario) {
    const result = await connection("treinador")
      .where({ usuario })
      .select("treinador.*", "usuario.*")
      .innerJoin("usuario", "treinador.usuario", "usuario.matricula")
      .first();
    return result;
  },

  async updateByUsuario(usuario, treinador) {
    const result = await connection("treinador").where({ usuario }).update(treinador);
    return result;
  },

  async deleteByUsuario(usuario) {
    const result = await connection("treinador").where({ usuario }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection("treinador")
      .select("treinador.*", "usuario.*")
      .innerJoin("usuario", "treinador.usuario", "usuario.matricula")
      .where(fields);
    return result;
  }
};

const connection = require("../database/connection");

module.exports = {
  async create(aluno) {
    const result = await connection("aluno").insert(aluno);
    return result;
  },

  async getAll() {
    const result = await connection("aluno")
      .select("aluno.*", "usuario.*")
      .innerJoin("usuario", "aluno.usuario", "usuario.matricula");
    return result;
  },

  async getByUsuario(usuario) {
    const result = await connection("aluno")
      .where({ usuario })
      .select("aluno.*", "usuario.*")
      .innerJoin("usuario", "aluno.usuario", "usuario.matricula")
      .first();
    return result;
  },

  async getAtributoByUsuario(usuario, atributo) {
    const result = await connection("aluno")
      .where({ usuario })
      .innerJoin("usuario", "aluno.usuario", "usuario.matricula")
      .select(`${atributo} as atributo`)
      .first();
    return result;
  },

  async updateByUsuario(usuario, aluno) {
    const result = await connection("aluno").where({ usuario }).update(aluno);
    return result;
  },

  async deleteByUsuario(usuario) {
    const result = await connection("aluno").where({ usuario }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection("aluno")
      .where(fields)
      .select("aluno.*", "usuario.*")
      .innerJoin("usuario", "aluno.usuario", "usuario.matricula");
    return result;
  }
};

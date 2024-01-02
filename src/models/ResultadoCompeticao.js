const connection = require("../database/connection");

module.exports = {
  async create(resultadoCompeticao) {
    const result = await connection("resultadoCompeticao").insert(resultadoCompeticao);
    return result;
  },

  async getAll() {
    const result = await connection("resultadoCompeticao").select("*");
    return result;
  },

  async getById(id) {
    const result = await connection("resultadoCompeticao").where({ id }).select("*").first();
    return result;
  },

  async getByAtleta(atleta) {
    const result = await connection("resultadoCompeticao").where({ atleta }).select("*");
    return result;
  },

  async getByModalidade(modalidade) {
    const result = await connection("resultadoCompeticao").where({ modalidade }).select("*");
    return result;
  },

  async update(id, resultadoCompeticao) {
    const result = await connection("resultadoCompeticao").where({ id }).update(resultadoCompeticao);
    return result;
  },

  async delete(id) {
    const result = await connection("resultadoCompeticao").where({ id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection("resultadoCompeticao").where(fields).select("*");
    return result;
  }
};

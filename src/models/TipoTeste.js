const connection = require("../database/connection");

module.exports = {
  async create(tipoTeste) {
    const result = await connection("tipoTeste").insert(tipoTeste).returning('id');
    return result;
  },

  async getAll() {
    const result = await connection("tipoTeste").select("*");
    return result;
  },

  async getById(id) {
    const result = await connection("tipoTeste").where({ id }).select("*");
    return result;
  },

  async updateById(id, tipoTeste) {
    const result = await connection("tipoTeste").where({ id }).update(tipoTeste);
    return result;
  },

  async deleteById(id) {
    const result = await connection("tipoTeste").where({ id }).delete();
    return result;
  }
};

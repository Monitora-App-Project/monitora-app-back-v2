const connection = require("../database/connection");

module.exports = {
  async create(modalidade) {
    const result = await connection("modalidade").insert(modalidade);
    return result;
  },

  async getAll() {
    const result = await connection("modalidade").select("*");
    return result;
  },

  async getById(id) {
    const result = await connection("modalidade").where({ id }).select("*").first();
    return result;
  },

  async updateById(id, modalidade) {
    const result = await connection("modalidade").where({ id }).update(modalidade);
    return result;
  },

  async deleteById(id) {
    const result = await connection("modalidade").where({ id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection("modalidade").where(fields).select("*").first();
    return result;
  }
};

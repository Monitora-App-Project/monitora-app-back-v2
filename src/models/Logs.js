const connection = require("../database/connection");

module.exports = {
  async create(log) {
    const result = await connection("logs").insert(log);
    return result;
  },

  async getAll() {
    const result = await connection("logs").select("*");
    return result;
  },

  async getByResponsavel(responsavel) {
    const result = await connection("logs").where({ responsavel }).select("*");
    return result;
  },

  async getById(id) {
    const result = await connection("logs").where({ id }).select("*");
    return result;
  },

  async updateById(id, logs) {
    const result = await connection("logs").where({ id }).update(logs);
    return result;
  },

  async deleteById(id) {
    const result = await connection("logs").where({ id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection("logs").select("*").where(fields);
    return result;
  }
};

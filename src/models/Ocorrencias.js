const connection = require("../database/connection");

module.exports = {
  async create(ocorrencia) {
    const result = await connection("ocorrencias").insert(ocorrencia);
    return result;
  },

  async getAll() {
    const result = await connection("ocorrencias").select("*");
    return result;
  },

  async getByResponsavel(responsavel) {
    const result = await connection("ocorrencias").where({ responsavel }).select("*");
    return result;
  },

  async getById(id) {
    const result = await connection("ocorrencias").where({ id }).select("*");
    return result;
  },

  async updateById(id, ocorrencias) {
    const result = await connection("ocorrencias").where({ id }).update(ocorrencias);
    return result;
  },

  async deleteById(id) {
    const result = await connection("ocorrencias").where({ id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection("ocorrencias").select("*").where(fields);
    return result;
  }
};

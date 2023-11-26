const connection = require('../database/connection');

module.exports = {
  async create(treinador) {
    const result = await connection('treinador').insert(treinador);
    return result;
  },

  async getAll() {
    const result = await connection('treinador').select('*');
    return result;
  },

  async getById(usuario) {
    const result = await connection('treinador')
      .where({ usuario })
      .select('*')
      .first();
    return result;
  },

  async updateById(usuario, treinador) {
    const result = await connection('treinador')
      .where({ usuario })
      .update(treinador);
    return result;
  },

  async deleteById(usuario) {
    const result = await connection('treinador').where({ usuario }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('treinador')
      .where(fields)
      .select('*')
      .first();
    return result;
  },
};

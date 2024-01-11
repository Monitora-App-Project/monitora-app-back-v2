const connection = require('../database/connection');

module.exports = {
  async create(recoverPassword) {
    const result = await connection('recoverPassword').insert(recoverPassword);
    return result;
  },

  async getAll() {
    const result = await connection('recoverPassword').select('*');
    return result;
  },

  async getById(usuario) {
    const result = await connection('recoverPassword')
      .where({ usuario })
      .select('*')
      .first();
    return result;
  },

  async updateById(usuario, recoverPassword) {
    const result = await connection('recoverPassword')
      .where({ usuario })
      .update(recoverPassword);
    return result;
  },

  async deleteById(usuario) {
    const result = await connection('recoverPassword').where({ usuario }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('recoverPassword')
      .where(fields)
      .select('*')
      .first();
    return result;
  },
};
const connection = require('../database/connection');

module.exports = {
  async create(teste) {
    const result = await connection('teste')
      .insert(teste);
    return result;
  },

  async getAll() {
    const result = await connection('teste').select('*');
    return result;
  },

  async getById(id) {
    const result = await connection('teste')
      .where({ id })
      .select('*');
    return result;
  },

  async deleteById(id) {
    const result = await connection('teste').where({ id }).delete();
    return result;
  },
};

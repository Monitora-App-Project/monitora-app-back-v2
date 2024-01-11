const connection = require('../database/connection');

module.exports = {
  async create(cronJob) {
    const result = await connection('cronJob').insert(cronJob);
    return result;
  },

  async getAll() {
    const result = await connection('cronJob').select('*');
    return result;
  },

  async deleteById(id) {
    const result = await connection('cronJob').where({ id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('cronJob')
      .where(fields)
      .select('*')
      .first();
    return result;
  },
};
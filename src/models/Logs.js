const connection = require('../database/connection');

module.exports = {
  async create(log) {
    const result = await connection('logs').insert(log);
    return result;
  },

  async getAll() {
    const result = await connection('logs')
    .select('*')
    return result;
  },
}
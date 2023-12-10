const connection = require('../database/connection');

module.exports = {
  async create(teste) {
    const result = await connection('teste')
      .returning('id')
      .insert(teste);
    return result;
  }
};

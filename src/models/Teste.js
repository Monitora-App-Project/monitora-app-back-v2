const connection = require('../database/connection');

module.exports = {
  async create(teste) {
    const result = await connection('teste').insert(teste);
    return result;
  }
};

const connection = require('../database/connection');

module.exports = {
  async create(usuario) {
    const result = await connection('usuario').insert(usuario);
    return result;
  },

  async getAll() {
    const result = await connection('usuario').select('*');
    return result;
  },

  async getById(matricula) {
    const result = await connection('usuario')
      .where({ matricula })
      .select('*')
      .first();
    return result;
  },

  async updateById(matricula, usuario) {
    const result = await connection('usuario')
      .where({ matricula })
      .update(usuario);
    return result;
  },

  async deleteById(matricula) {
    const result = await connection('usuario').where({ matricula }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('usuario')
      .where(fields)
      .select('*')
      .first();
    return result;
  },
};

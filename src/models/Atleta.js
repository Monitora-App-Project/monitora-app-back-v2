const connection = require('../database/connection');

module.exports = {
  async create(atleta) {
    const result = await connection('atleta').insert(atleta);
    return result;
  },

  async getAll() {
    const result = await connection('atleta').select('*');
    return result;
  },

  async getByUsuario(usuario) {
    const result = await connection('atleta')
      .where({ usuario })
      .select('*');
    return result;
  },

  async updateByUsuario(usuario, atleta) {
    const result = await connection('atleta')
      .where({ usuario })
      .update(atleta);
    return result;
  },

  async deleteByUsuario(usuario) {
    const result = await connection('atleta').where({ usuario }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('atleta')
      .where(fields)
      .select('*')
      .first();
    return result;
  },
};

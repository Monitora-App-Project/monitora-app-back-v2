const connection = require('../database/connection');

module.exports = {
  async create(professor) {
    const result = await connection('professor').insert(professor);
    return result;
  },

  async getAll() {
    const result = await connection('professor')
    .select('professor.*', 'usuario.*')
    .innerJoin('usuario', 'professor.usuario', 'usuario.matricula');
    return result;
  },

  async getByUsuario(usuario) {
    const result = await connection('professor')
      .where({ usuario })
      .select('professor.*', 'usuario.*')
      .innerJoin('usuario', 'professor.usuario', 'usuario.matricula');
    return result;
  },

  async updateByUsuario(usuario, professor) {
    const result = await connection('professor')
      .where({ usuario })
      .update(professor);
    return result;
  },

  async deleteByUsuario(usuario) {
    const result = await connection('professor').where({ usuario }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('professor')
      .where(fields)
      .select('professor.*', 'usuario.*')
      .innerJoin('usuario', 'professor.usuario', 'usuario.matricula');
    return result;
  },
};

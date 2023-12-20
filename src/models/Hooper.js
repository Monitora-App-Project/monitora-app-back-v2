const connection = require('../database/connection');

module.exports = {
  async create(hooper) {
    const result = await connection('hooper').insert(hooper);
    return result;
  },

  async getAll() {
    const result = await connection('hooper')
    .select(
      'hooper.*',
      'teste.horaDaColeta',
      'teste.matriculaAtleta',
      'teste.idModalidade',
      'teste.idTipoTeste',
      'teste.idade',
    )
    .innerJoin('teste', 'hooper.idTeste', 'teste.id');
    return result;
  },

  async getByTeste(idTeste) {
    const result = await connection('hooper')
      .select(
        'hooper.*',
        'teste.horaDaColeta',
        'teste.matriculaAtleta',
        'teste.idModalidade',
        'teste.idTipoTeste',
        'teste.idade',
      )
      .innerJoin('teste', 'hooper.idTeste', 'teste.id')
      .where({ idTeste });
    return result;
  },
  
  async getByFields(fields) {
    const result = await connection('hooper')
    .select('hooper.*', 'teste.*')
    .innerJoin('teste', 'hooper.idTeste', 'teste.id')
    .where(fields);
    return result;
  },

  async getByDate(fields) {
    const result = await connection('hooper')
    .select('hooper.*', 'teste.*')
    .innerJoin('teste', 'hooper.idTeste', 'teste.id')
    .where(builder => {
      if (fields.dataColetaMin && fields.dataColetaMax) {
        builder.whereBetween('horaDaColeta', [fields.dataColetaMin, fields.dataColetaMax]);
      }
    });
  
    return result;
  },

  async updateByTeste(idTeste, hooper) {
    const result = await connection('hooper')
      .where({ idTeste })
      .update(hooper);
    return result;
  },

  async deleteByTeste(idTeste) {
    const result = await connection('hooper').where({ idTeste }).delete();
    return result;
  },  
};

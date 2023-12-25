const connection = require('../database/connection');

module.exports = {
  async create(composicaoCorporal) {
    const result = await connection('composicaoCorporal').insert(composicaoCorporal);
    return result;
  },

  async getAll() {
    const result = await connection('composicaoCorporal')
    .select(
      'composicaoCorporal.*',
      'teste.horaDaColeta',
      'teste.matriculaAtleta',
      'teste.idModalidade',
      'teste.idTipoTeste',
      'teste.idade',
    )
    .innerJoin('teste', 'composicaoCorporal.idTeste', 'teste.id');
    return result;
  },

  async getByTeste(idTeste) {
    const result = await connection('composicaoCorporal')
      .select(
        'composicaoCorporal.*',
        'teste.horaDaColeta',
        'teste.matriculaAtleta',
        'teste.idModalidade',
        'teste.idTipoTeste',
        'teste.idade',
      )
      .innerJoin('teste', 'composicaoCorporal.idTeste', 'teste.id')
      .where({ idTeste });
    return result;
  },
  
  async getByFields(fields) {
    const result = await connection('composicaoCorporal')
    .select('composicaoCorporal.*', 'teste.*')
    .innerJoin('teste', 'composicaoCorporal.idTeste', 'teste.id')
    .where(fields);
    return result;
  },

  async getByDate(fields) {
    const result = await connection('composicaoCorporal')
    .select('composicaoCorporal.*', 'teste.*')
    .innerJoin('teste', 'composicaoCorporal.idTeste', 'teste.id')
    .where(builder => {
      if (fields.dataColetaMin && fields.dataColetaMax) {
        builder.whereBetween('horaDaColeta', [fields.dataColetaMin, fields.dataColetaMax]);
      }
    });
  
    return result;
  },

  async updateByTeste(idTeste, composicaoCorporal) {
    const result = await connection('composicaoCorporal')
      .where({ idTeste })
      .update(composicaoCorporal);
    return result;
  },

  async deleteByTeste(idTeste) {
    const result = await connection('composicaoCorporal').where({ idTeste }).delete();
    return result;
  },  
};

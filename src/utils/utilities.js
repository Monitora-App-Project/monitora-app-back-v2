const UsuarioModel = require("../models/Usuario");
const AtletaModel = require("../models/Atleta");

module.exports = {
  // Função para calcular a média (recebe um array com os valores)
  calcularMedia: (arr) => {
    return arr.reduce((acc, val) => acc + val, 0) / arr.length;
  },

  // Função para calcular o desvio padrão (recebe um array com os valores)
  calcularDesvioPadrao: (arr) => {
    const mean = this.calcularMedia(arr);
    const squaredDiffs = arr.map((num) => Math.pow(num - mean, 2));
    const meanOfSquaredDiffs = calcularMedia(squaredDiffs);
    return Math.sqrt(meanOfSquaredDiffs);
  },

  async calculaIdade(matriculaAtleta) {
    try {
      let dataNascimento = await UsuarioModel.getDataNascimento(matriculaAtleta);
      dataNascimento = dataNascimento[0].dataNascimento; // retorna o JSON dentro de um array
      const dataAtual = new Date();
      const diferencaEmMilissegundos = dataAtual - dataNascimento;
      const milissegundosPorAno = 1000 * 60 * 60 * 24 * 365.25; // Considera anos bissextos
      const diferencaEmAnos = diferencaEmMilissegundos / milissegundosPorAno;

      const idade = Math.floor(diferencaEmAnos);
      return idade;
    } catch (err) {
      console.error(`Consulta de data de nascimento falhou: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async pegaModalidade(matriculaAtleta) {
    try {
      const idModalidade = await AtletaModel.getModalidadeAtleta(matriculaAtleta);
      return idModalidade[0].modalidade; // retorna o JSON dentro de uma array
    } catch (err) {
      console.error(`Consulta de modalidade falhou: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getCadeirante(matriculaAtleta) {
    try{
      const isCadeirante = await UsuarioModel.getCadeirante(matriculaAtleta);
      console.log(isCadeirante);
      return isCadeirante[0].cadeirante;
    } catch (err) {
      console.error(`Consulta de modalidade falhou: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },
};

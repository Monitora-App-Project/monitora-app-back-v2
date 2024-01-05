const UsuarioModel = require("../models/Usuario");
const AtletaModel = require("../models/Atleta");

module.exports = {
  // Função para calcular a média (recebe um array com os valores)
  calcularMedia: (arr) => {
    return arr.reduce((acc, val) => acc + val, 0) / arr.length;
  },

  // Função para calcular o desvio padrão (recebe um array com os valores)
  calcularDesvioPadrao: (arr, mean) => {
    const squaredDiffs = arr.map((num) => Math.pow(num - mean, 2));
    const meanOfSquaredDiffs = squaredDiffs.reduce((acc, val) => acc + val, 0) / squaredDiffs.length;
    return Math.sqrt(meanOfSquaredDiffs);
  },

  calcularKDI: (arr) => {
    const soma = arr.reduce((total, num) => total + num, 0);
    const max = Math.max(...arr);

    return (1 - (soma/(max*5)))*100;
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
      return isCadeirante[0].cadeirante;
    } catch (err) {
      console.error(`Consulta de isCadeirante falhou: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async calculaClassFSKT(matriculaAtleta, numChutes) {
    try{
      const sexo = (await UsuarioModel.getSexo(matriculaAtleta))[0].sexo;
      var classificacao = 0;
      if(sexo == "Masculino"){
        if(numChutes >= 100)      {classificacao = 10;}
        else if(numChutes >= 99)  {classificacao = 9;}
        else if(numChutes >= 97)  {classificacao = 8;}
        else if(numChutes >= 94)  {classificacao = 7;}
        else if(numChutes >= 91)  {classificacao = 6;}
        else if(numChutes >= 87)  {classificacao = 5;}
        else if(numChutes >= 82)  {classificacao = 4;}
        else if(numChutes >= 76)  {classificacao = 3;}
        else if(numChutes >= 73)  {classificacao = 2;}
        else if(numChutes >= 70)  {classificacao = 1;}
        else                      {classificacao = 0;}
      }
      else{
        if(numChutes >= 95)      {classificacao = 10;}
        else if(numChutes >= 94)  {classificacao = 9;}
        else if(numChutes >= 91)  {classificacao = 8;}
        else if(numChutes >= 87)  {classificacao = 7;}
        else if(numChutes >= 84)  {classificacao = 6;}
        else if(numChutes >= 80)  {classificacao = 5;}
        else if(numChutes >= 76)  {classificacao = 4;}
        else if(numChutes >= 72)  {classificacao = 3;}
        else if(numChutes >= 68)  {classificacao = 2;}
        else if(numChutes >= 65)  {classificacao = 1;}
        else                      {classificacao = 0;}
      }
      return classificacao;
    } catch (err) {
      console.error(`CalculaClassFSKT falhou: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

};

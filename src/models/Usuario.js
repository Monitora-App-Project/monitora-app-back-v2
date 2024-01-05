const connection = require("../database/connection");
require("dotenv").config();
const { getByUsuario } = require("./Atleta");

module.exports = {
  async create(usuario) {
    const result = await connection("usuario").insert(usuario);
    return result;
  },

  async getAll() {
    const result = await connection("usuario").select("*");
    const usuarios = [];

    for (const user of result) {
      if (user.tipo === process.env.ATLETA_SECRET) {
        const atletas = await connection("atleta").select("*");
        const atleta = atletas.filter((element) => element.usuario === user.matricula);
        user.info = atleta;
      }
      if (user.tipo === process.env.TREINADOR_SECRET) {
        const treinadores = await connection("treinador").select("*");
        const treinador = treinadores.filter((element) => element.usuario === user.matricula);
        user.info = treinador;
      }
      if (user.tipo === process.env.ADMIN_SECRET) {
        const admins = await connection("professor").select("*");
        const admin = admins.filter((element) => element.usuario === user.matricula);
        user.info = admin;
      }
      usuarios.push(user);
    }

    return usuarios;
    //else if (result.type === 'professor') {
    //   usuario = new Professor(result.matricula, result.type, result.disciplina);
    // } else {
    //   usuario = new Usuario(result.matricula, result.type);
    // }
    //return result;
  },

  async getById(matricula) {
    const result = await connection("usuario").where({ matricula }).select("*").first();
    return result;
  },

  async verificaMatriculaExiste(matricula) {
    const result = await connection("usuario").where({ matricula }).select("*").first();
    if (result) return true;
    else return false;
  },

  async updateById(matricula, usuario) {
    const result = await connection("usuario").where({ matricula }).update(usuario);
    return result;
  },

  async deleteById(matricula) {
    const result = await connection("usuario").where({ matricula }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection("usuario").where(fields).select("*").first();
    return result;
  },

  async getDataNascimento(matricula) {
    const result = await connection("usuario").where({ matricula }).select("dataNascimento");
    return result;
  },

  async getCadeirante(matricula){
    const result = await connection("usuario")
    .leftJoin("atleta", "usuario.matricula", "atleta.usuario")
    .select("atleta.cadeirante")
    .where({ matricula });
  return result; 
  },

  async getSexo(matricula){
    const result = await connection("usuario").where({ matricula }).select("sexo");
    return result;
  }
};

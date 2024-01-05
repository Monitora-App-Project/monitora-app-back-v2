const UsuarioModel = require("../models/Usuario");
const AtletaModel = require("../models/Atleta");
const ProfessorModel = require("../models/Professor");
const AlunoModel = require("../models/Aluno");
const TreinadorModel = require("../models/Treinador");
const jwt = require("jsonwebtoken");
const { encryptData } = require("../utils/utilities");
require("dotenv").config();

async function getUsuario(usuario, tipo) {
  switch (tipo) {
    case process.env.ATLETA_SECRET:
      try {
        return await AtletaModel.getByUsuario(usuario);
      } catch (err) {
        console.log(err);
        return;
      }
    case process.env.TREINADOR_SECRET:
      try {
        return await TreinadorModel.getByUsuario(usuario);
      } catch (err) {
        console.log(err);
        return;
      }
    default:
      try {
        const professor = await ProfessorModel.getByUsuario(usuario);
        if (professor !== undefined) return professor;
        else {
          return await AlunoModel.getByUsuario(usuario);
        }
      } catch (err) {
        console.log(err);
        return;
      }
  }
}

module.exports = {
  async signIn(request, response) {
    try {
      const { email, senha } = request.body;

      const user = await UsuarioModel.getByFields({ email: email });
      if (user.ativo === false) {
        return response.status(500).json({ notification: "Access Denied" });
      }
      const usuario = await getUsuario(user.matricula, user.tipo);
      const hash = encryptData(senha);

      if (usuario.senha === hash) {
        const accessToken = jwt.sign({ usuario }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "30d"
        });

        return response.status(200).json({ usuario, accessToken });
      } else {
        return response.status(500).json({ notification: "Invalid Credentials" });
      }
    } catch (error) {
      if (error.code?.includes("auth")) {
        return response.status(403).json({ notification: "Invalid credentials" });
      }
      return response.status(500).json({ notification: "Error while trying to validate credentials" });
    }
  }
};

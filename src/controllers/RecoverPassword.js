/* eslint-disable prettier/prettier */
const RecoverPassModel = require("../models/RecoverPassword");
const UsuarioModel = require("../models/Usuario");
const Mail = require("../mail/mail");
const { encryptData } = require("../utils/utilities");
const { createHmac } = require("crypto");
const cron = require("node-cron");
require("dotenv").config();

function generateRandomFiveDigits() {
  const min = 10000;
  const max = 99999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  async create(request, response) {
    try {
      const recoverPass = request.body;
      const user = await UsuarioModel.getByFields({ email: recoverPass.email });
      if (user === undefined) {
        return response.status(403).json({
          notification: "Não há usuário cadastrado com o e-mail fornecido."
        });
      }
      const verify = await RecoverPassModel.getByFields({ usuario: user.matricula });
      if (verify) await RecoverPassModel.deleteById(user.matricula);
      const randomCode = generateRandomFiveDigits();
      delete recoverPass.email;
      recoverPass.usuario = user.matricula;
      recoverPass.code = encryptData(randomCode.toString());
      recoverPass.createIn = new Date();
      await RecoverPassModel.create(recoverPass);

      Mail.RecoverPassword(user.email, user.nomeCompleto, randomCode);

      // Expiração do código
      let date = new Date();
      date.setMinutes(date.getMinutes() + 10);
      const day = date.getDate().toString();
      const month = (date.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
      const minutes = date.getMinutes();
      const hour = date.getHours();
      const cronExpression = `${minutes} ${hour} ${day} ${month} *`;

      const task = cron.schedule(cronExpression, async () => {
        await RecoverPassModel.deleteById(recoverPass.usuario);
        task.stop();
      });

      return response.status(201).json({ notification: "Solicitação criada", matricula: user.matricula });
    } catch (err) {
      console.error(`recoverPass creation failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await RecoverPassModel.getAll();

      return response.status(200).json(result);
    } catch (err) {
      console.error(`recoverPass getAll failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async getVerify(request, response) {
    try {
      const { usuario, code } = request.params;
      const data = await RecoverPassModel.getById(usuario);
      if (data === undefined)
        return response.status(540).json({
          notification: "Código Expirado"
        });
      const result = JSON.parse(JSON.stringify(data));

      const hash = createHmac(process.env.ALGORITHM, process.env.SECRET).update(code).digest(process.env.OUTPUT);

      if (result.code === hash) {
        await RecoverPassModel.updateById(usuario, { verify: true });
        return response.status(200).json(true);
      } else return response.status(200).json(false);
    } catch (err) {
      console.error(`recoverPass getByVerify failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  },

  async delete(request, response) {
    try {
      const { usuario } = request.params;
      await RecoverPassModel.deleteById(usuario);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`recoverPass delete failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};

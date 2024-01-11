/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
class Email {
  static sendEmail(request) {
    const config = {
      from: `"Monitora" <${process.env.EMAIL_LOGIN}>`,
      ...request,
    };
    try {
      transporter.sendMail(config);
    } catch (error) {
      return console.error(error);
    }
  }
}

module.exports = {
  RecoverPassword(to, name, code) {
    const fontSizePadrao = '15px';
    const fontSize = '20px';
    const content = `Olá, ${name}. Aqui está o código exigido para alterar as suas credenciais no app Monitora:
    ${code}
    Caso não esteja tentando alterar as suas credenciais, ignore este e-mail. 
    É possível que outro usuário tenha inserido as suas credenciais por engano.
    Atenciosamente, Administração do sistema Monitora.`;
    const body = `<div style="font-size: ${fontSizePadrao};"><p>Olá, <b>${name}</b>.</p>
    <p>Aqui está o código exigido para alterar as suas credenciais no Monitora:</p>
    <b style="font-size: ${fontSize};">${code}</b>
    <p>Caso não esteja tentando alterar as suas credenciais, ignore este e-mail.<br/>
    É possível que outro usuário tenha inserido as suas credenciais por engano.</p>
    
    <p>Atenciosamente,<br/> 
    Administração do sistema Monitora.</p><br/>
    <p>Esta mensagem foi gerada automaticamente. Não responda a este e-mail.</p></div>`;
    const subject = 'Recuperação da senha';
    const emailContent = {
      to,
      subject,
      text: content,
      html: body
    };
    return Email.sendEmail(emailContent);
  },

};
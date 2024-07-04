const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const config = require('./Config');
const logger = require('./logger');

const oAuth2Client = new google.auth.OAuth2(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  config.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: config.REFRESH_TOKEN });

async function enviarCorreo(email, password) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: config.correo,
        clientId: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        refreshToken: config.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
      tls: {
        rejectUnauthorized: false, // Ignorar certificados autofirmados
      },
    });

    const mailOptions = {
      from: config.correo,
      to: email,
      subject: 'Registro de Usuario',
      text: `Tu usuario es: ${email}\nTu contraseña es: ${password}`
    };

    console.log('Enviando correo desde:', mailOptions.from);
    console.log('Enviando correo a:', email);

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar correo:', error);
  }
}

module.exports = {
  enviarCorreo
};

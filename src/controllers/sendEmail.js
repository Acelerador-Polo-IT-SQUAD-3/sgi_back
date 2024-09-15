import emailModule from '../email.js';
import dotenv from 'dotenv';
dotenv.config();
const { transporter, templateRegister, templateEnrollment } = emailModule;

export async function sendEmail(toRecipient, emailSubject, templateName, templateData) {
  try {
    let emailBody = '';
    switch (templateName) {
      case 'register':
        emailBody = templateRegister();
        break;
      case 'enrollment':
        emailBody = templateEnrollment(templateData.fullname);
        break;
      default:
        throw new Error('Plantilla no encontrada');
    }

    const mailOptions = {
      from: process.env.MAIL_ADMIN,
      to: toRecipient,
      subject: emailSubject,
      html: emailBody,
    };
    console.log('Antes del transportesr')
    await transporter.sendMail(mailOptions);
    console.log('Despues del transportesr')
  } catch (error) {
    throw new Error(`Error al enviar el correo: ${error.message}`);
  }
}

export default { sendEmail };

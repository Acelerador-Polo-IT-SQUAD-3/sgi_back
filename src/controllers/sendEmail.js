import emailModule from '../email.js';
import dotenv from 'dotenv';
dotenv.config();

const { transporter, templateRegister, templatePersonalized, templateEnrollment } = emailModule;

export async function sendEmail(toRecipient, emailSubject, templateName, templateData, fromReception = process.env.MAIL_ADMIN) {
  try {
    let emailBody = '';
    switch (templateName) {
      case 'register':
        emailBody = templateRegister();
        break;
      case 'personalized':
        emailBody = templatePersonalized(templateData);
        break;
      case 'enrollment':
        emailBody = templateEnrollment();
        break;
      default:
        throw new Error('Plantilla no encontrada');
    }

    const mailOptions = {
      from: templateName === 'personalized' ? fromReception : process.env.MAIL_ADMIN ,
      to: templateName === 'personalized' ? toRecipient.join(', ') : toRecipient,
      subject: emailSubject,
      html: emailBody,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Error al enviar el correo: ${error.message}`);
  }
}

export default { sendEmail };

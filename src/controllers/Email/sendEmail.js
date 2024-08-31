import {transporter} from '../../email'

export async function sendEmail (res, toRecipient, emailSubject, emailBody) {
  try {

    const mailOptions = {
      from: process.env.EMAIL_USER,//Aqui cambiar esto por el email, del suer con la sesion activa
      to: toRecipient,
      subject: emailSubject,
      html: emailBody,
    };

    await transporter.sendMail(mailOptions);
    return
    
  } catch (error) {
    return res.status(400).json({ message: error.message, error: "Email error" });
  }
}

export default {sendEmail};

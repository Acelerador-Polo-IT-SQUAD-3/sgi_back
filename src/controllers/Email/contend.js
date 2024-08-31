import {sendEmail} from './sendEmail'

export async function SendingMessagePersonalized (req, res) {
  try {

    const { emailSubject, emailBody } = req.body
    const email = "Hola" //Aqui debe ir el user con la sesionn activa
    
    return sendEmail(res, email, emailSubject, emailBody, 'Email notification for password reset sent')

  } catch (error) {
    return res.status(400).json({ message: error.message, error: "Fallo el envío" });
  }
};

export default {
  SendingMessagePersonalized
};

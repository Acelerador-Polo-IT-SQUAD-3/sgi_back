import {nodemailer} from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

    const templateRegister =(fullname)=>`<h1>Hola ${fullname},</h1>
      <h2>Gracias por registrarte en nuestra plataforma. ¡Estamos emocionados de tenerte como médico!</h2>
      
      Atentamente,
      PoloIT`;

    const templateEnrollment =(fullname)=>`<h1>Hola ${fullname},</h1>
      <h2>Gracias por registrarte en nuestra plataforma. ¡Estamos emocionados de tenerte como médico!</h2>
      
      Atentamente,
      PoloIT`;//Este es para aprticipar

export default { transporter, templateRegister, templateEnrollment }
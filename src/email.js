import {nodemailer} from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: "mail.gmx.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
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
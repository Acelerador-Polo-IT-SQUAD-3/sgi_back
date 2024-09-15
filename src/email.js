import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }, 
 /* 
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  secure: false,
  auth: {
    user: '589d986def82d1',
    pass: 'df5d1a70bdce6d',
  },
*/  
});
console.log('Me voy de email...')
    const templateRegister =()=>`<td class="esd-structure es-p40t es-p15b es-p20r es-p20l" align="left">
    <table cellpadding="0" cellspacing="0" width="100%">
        <tbody>
            <tr>
                <td width="281" class="esd-container-frame" align="center" valign="top">
                    <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                            <tr>
                                <td align="left" class="esd-block-text">
                                    <h1 style="text-align: center;"><b>¡Bienvenid@ a PoloIT!</b></h1>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" class="esd-block-text es-m-txt-c es-p15t">
                                    <p>¡Gracias por tu interés en PoloIt! Tu registro se ha recibido con éxito. Mantente atento/a a tu bandeja de entrada, pronto recibirás detalles adicionales de nuestros eventos. Te invitamos a seguirnos en nuestras redes sociales.</p>
                                    <p><br></p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" class="esd-block-social" style="font-size:0">
                                    <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" dir="ltr">
                                        <tbody>
                                            <tr>
                                                <td align="center" valign="top" class="es-p10r"><a target="_blank" href><img src="https://stripo.email/static/assets/img/social-icons/circle-colored/x-circle-colored.png" alt="X" title="X" width="32" height="32"></a></td>
                                                <td align="center" valign="top" class="es-p10r"><a target="_blank" href><img src="https://stripo.email/static/assets/img/social-icons/circle-colored/facebook-circle-colored.png" alt="Fb" title="Facebook" width="32" height="32"></a></td>
                                                <td align="center" valign="top" class="es-p10r"><a target="_blank" href><img src="https://stripo.email/static/assets/img/social-icons/circle-colored/youtube-circle-colored.png" alt="Yt" title="YouTube" width="32" height="32"></a></td>
                                                <td align="center" valign="top"><a target="_blank" href><img src="https://stripo.email/static/assets/img/social-icons/circle-colored/vk-circle-colored.png" alt="VK" title="Vkontakte" width="32" height="32"></a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="left" class="esd-block-text">
                                    <p><br></p>
                                    <p>¡Esperamos verte pronto!</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</td>`;

    const templateEnrollment =(fullname)=>`<h1>Hola ${fullname},</h1>
      <h2>Gracias por registrarte en nuestra plataforma. ¡Estamos emocionados de tenerte como médico!</h2>
      
      Atentamente,
      PoloIT`;//Este es para aprticipar

export default { transporter, templateRegister, templateEnrollment }
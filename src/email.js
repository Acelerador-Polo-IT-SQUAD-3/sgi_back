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
});
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

    const templateApply =()=>`<td width="281" class="esd-container-frame" align="center" valign="top">
    <table cellpadding="0" cellspacing="0" width="100%">
        <tbody>
            <tr>
                <td align="left" class="esd-block-text">
                    <h1 style="text-align: center;"><b></b>¡Desde el Polo tenemos noticias!<b></b></h1>
                </td>
            </tr>
            <tr style>
                <td align="center" class="esd-block-text es-m-txt-c es-p15t">
                    <p><br></p>
                    <p>Planeamos comenzar un nuevo acelerador, y ¡estas invitad@ a participar de esta gran oportunidad! Si estás interesada en participar, entonces solo debes presionar el siguiente botón. No olvides actualizar tu perfil técnico, para tener mayores chances de ser seleccionado/a...<br></p>
                    <p><br></p>
                </td>
            </tr>
            <tr style>
                <td align="center" class="esd-block-button">
                    <span class="es-button-border">
                        <a href="https://www.poloitbuenosaires.org.ar" class="es-button" target="_blank">Postularme</a>
                    </span>
                </td>
            </tr>
            <tr style>
                <td align="left" class="esd-block-text">
                    <p><br></p>
                    <p>¡Gracias por tu interés en PoloIt!&nbsp;&nbsp;Te invitamos a seguirnos en nuestras redes sociales.</p>
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
        </tbody>
    </table>
</td>`;

const templatePersonalized =(templateData)=>`<td class="esd-structure es-p40t es-p15b es-p20r es-p20l" align="left">
    <table cellpadding="0" cellspacing="0" width="100%">
        <tbody>
            <tr>
                <td width="281" class="esd-container-frame" align="center" valign="top">
                    <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                            <tr>
                                <td align="left" class="esd-block-text">
                                    <h1 style="text-align: center;"><b>¡Tienes un mensaje desarrollado en PoloIT!</b></h1>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" class="esd-block-text es-m-txt-c es-p15t">
                                    <p>${templateData}</p>
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

export default { transporter, templateRegister, templateApply, templatePersonalized }
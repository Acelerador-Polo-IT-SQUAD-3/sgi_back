import {pool} from '../database.js'
import {encrypt, compare} from '../helpers/handleBcrypt.js'
import {sendEmail} from './sendEmail.js'

export const createItem = async(req, res) => {
    try {
        console.log('Datos recibidos en req.body:', req.body);
        const { name, surname, dni, description, email, password, organization_id, technologies_ids } = req.body;
        const orgId = organization_id || 1;

        const encryptedPassword = await encrypt(password);
        const fecha = new Date();
        const role_id = req.body.role_id || 1; // Puedes quitar esto si ya no es necesario
        
        // 1. Inserción en la tabla 'users'
        const [userResult] = await pool.query(
            'INSERT INTO users (name, surname, dni, description, email, password, role_id, created_at, updated_at, state_id, organization_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [name, surname, dni, description, email, encryptedPassword, role_id, fecha, fecha, 1, orgId]
        );
        
        const userId = userResult.insertId;
        
        // 2. Insertar las tecnologías relacionadas en 'managed_technologies'
        await pool.query('INSERT INTO managed_technologies (user_id, technology_id) VALUES(?, ?)', [userId, technologies_ids]);
  
         await sendEmail(email, 'Bienvenido a Nuestro Sitio', 'register','');
        
        // 3. Responder con los datos correctos
        res.json({ id: userId, name, email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};



export const login = async (req, res) => {
    // Lógica para comparar un elemento
     //requiere email y contraseña datos que se envian por el bodi
    try {
        const { email, password } = req.body;
        const [result] = await pool.query('SELECT u.id, u.name, u.surname, u.dni, u.description, u.email, u.role_id, r.name as role_name FROM users u, roles r WHERE email = ? and u.role_id = r.id', [email]);

        if (result.length === 0) {
            console.log("Usuario no encontrado");
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        let resultCompare = false;

        if (result.length > 0) {
            const [hashResult] = await pool.query('SELECT password FROM users WHERE email = ?', [email]);
            resultCompare = await compare(password, hashResult[0].password);
        }

        if (resultCompare) {
            console.log("Usuario y contraseña correctos");
            return res.json({ message: 'Usuario y contraseña correctos', user: result[0] });
        } else {
            console.log("Contraseña incorrecta");
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};


export default {createItem,login};

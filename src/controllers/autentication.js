import {pool} from '../database.js'
import {encrypt, compare} from '../helpers/handleBcrypt.js'


export const createItem = async(req, res) => {
    // Lógica para crear un nuevo elemento
    //requiere nombre, apellido, dni, descripcion, email, id de rol y contraseña datos que se envian por el bodi

    try {
        console.log('Datos recibidos en req.body:', req.body);
        const { name, surname, dni, description, email, password, role_id } = req.body;
        const encryptedPassword = await encrypt(password);
        const fecha = new Date();
        const [result] = await pool.query('INSERT INTO users (name, surname, dni, description, email, password,role_id, created_at, updated_at,state_id ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, 1)', [name, surname, dni, description, email, encryptedPassword, role_id, fecha, fecha]);
        res.json({ id: result.insertId, name, email });
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
        const [result] = await pool.query('SELECT id,name,surname,dni,description,email,role_id FROM users WHERE email = ?', [email]);

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
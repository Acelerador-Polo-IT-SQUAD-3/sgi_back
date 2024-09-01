import {pool} from '../database.js'

export const createItem = async(req, res) => {
    // Lógica para crear un nuevo elemento

    try {
        console.log('Datos recibidos en req.body:', req.body);
        const { name, surname, dni, description, email, password, role_id } = req.body;
        const encryptedPassword = await encrypt(password);
        console.log('password:', encryptedPassword);
        const [result] = await pool.query('INSERT INTO users (name, surname, dni, description, email, password,role_id) VALUES(?, ?, ?, ?, ?, ?, ?)', [name, surname, dni, description, email, encryptedPassword, role_id]);
        res.json({ id: result.insertId, name, email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

export const getItem = async (req, res) => {
    // Lógica para obtener un elemento
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT id,name,surname,dni,description,email,role_id FROM users WHERE id = ?', [id]);

        if (result.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};


export const getItems = async (req, res) => {
    // Lógica para obtener todos los elementos
    try {
        const [result] = await pool.query('SELECT id,name,surname,dni,description,email,role_id FROM users');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

export const updateItem = async(req, res) => {
    // Lógica para actualizar un elemento por id

    try {
        console.log('Datos recibidos en req.body:', req.body);
        const { name, surname, dni, description, email, password } = req.body;
        const encryptedPassword = await encrypt(password);
        const { id } = req.params;
        const [result] = await pool.query('UPDATE users SET name=?, surname=?, dni=?, description=?, email=?, password=? WHERE id=?', [name, surname, dni, description, email, encryptedPassword, id]);
        res.json({ id: result.insertId , id, name, email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }

};

export const deleteItem = async (req, res) => {
    // Lógica para eliminar un elemento por id
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

export default { createItem, getItems, getItem, updateItem, deleteItem };
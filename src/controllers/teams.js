import {pool} from '../database.js'

export const createItem = async(req, res) => {
    // Lógica para crear un nuevo elemento
    // requiere nombre y descripcion que se envian por el bodi

    try {
        console.log('Datos recibidos en req.body:', req.body);
        const { name, description} = req.body;
        const encryptedPassword = await encrypt(password);
        console.log('password:', encryptedPassword);
        const [result] = await pool.query('INSERT INTO users (name, description) VALUES(?, ?)', [name, description]);
        res.json({ id: result.insertId, name, email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

export const getItem = async (req, res) => {
    // Lógica para obtener un elemento
    // requiere id esto se envia por url
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT id,name, description FROM teams WHERE id = ?', [id]);

        if (result.length === 0) {
            return res.status(401).json({ message: 'Equipo no encontrado' });
        }

        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el equipo' });
    }
};


export const getItems = async (req, res) => {
    // Lógica para obtener todos los elementos
    try {
        const [result] = await pool.query('SELECT id,name, description FROM teams');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};



export default { createItem, getItems, getItem };
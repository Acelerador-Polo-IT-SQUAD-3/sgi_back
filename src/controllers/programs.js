import {pool} from '../database.js'


export const getItems = async (req, res) => {
    // Lógica para obtener todos los elementos
    //devuelve todos los programas
    try {
        const [result] = await pool.query('SELECT id,name,description,state_id,start_date,end_date FROM programs');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los programas' });
    }
};

export const getItem = async (req, res) => {
    // Lógica para obtener un elemento
    //requiere id del programa esto se envia por url
    //devuelve un programa
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT id,name,description,state_id,start_date,end_date FROM programs WHERE id = ?', [id]);

        if (result.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

export default { getItems, getItem };
import {pool} from '../database.js'


export const getItems = async (req, res) => {
    // Lógica para obtener todos los elementos
    //devuelve todas las organizaciones
    try {
        const [result] = await pool.query('select id, name, website from organizations');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las organizaciones' });
    }
};

export default { getItems };
import {pool} from '../database.js'


export const getItems = async (req, res) => {
    // Lógica para obtener todos los elementos
    // Requiere el rol del menu
    try {
        const {role_id} = req.body;

        const [result] = await pool.query('SELECT menus.id, menus.name, menus.path FROM menus INNER JOIN menus_roles ON menu_id = menus.id where role_id = ?', [role_id]);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los menus' });
    }
};

export default {getItems};
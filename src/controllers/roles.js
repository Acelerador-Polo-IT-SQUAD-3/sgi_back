import {pool} from '../database.js'


export const getItems = async (req, res) => {
    // Lógica para obtener todos los elementos
    //devuelve todos los roles
    try {
        const [result] = await pool.query('SELECT id,name FROM roles');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los roles' });
    }
};

export const getItem = async (req, res) => {
    // Lógica para obtener un elemento
    //requiere id del rol esto se envia por url
    //devuelve un rol
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT id,name FROM roles WHERE id = ?', [id]);

        if (result.length === 0) {
            return res.status(401).json({ message: 'rol no encontrado' });
        }

        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el rol' });
    }
};

export default { getItems, getItem };
import {pool} from '../database.js'


export const getItems = async (req, res) => {
    // Lógica para obtener todos los elementos
    //devuelve todas las tecnologias
    try {
        const [result] = await pool.query('SELECT id,name FROM technologies');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las tecnologias' });
    }
};

export const getItem = async (req, res) => {
    // Lógica para obtener un elemento
    //requiere id de la tecnologia esto se envia por url
    //devuelve una tecnologia
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT id,name FROM technologies WHERE id = ?', [id]);

        if (result.length === 0) {
            return res.status(401).json({ message: 'tecnologia no encontrada' });
        }

        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la technologia' });
    }
};

export default { getItems, getItem };
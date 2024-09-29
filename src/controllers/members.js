import {pool} from '../database.js'

export const createItem = async(req, res) => {
    // Lógica para crear un nuevo elemento
    //requiere id del equipo e id del usuario datos que se envian por el bodi

    try {
        console.log('Datos recibidos en req.body:', req.body);
        const { team_id, user_id} = req.body;
        const [result2] = await pool.query('SELECT id, name, description FROM teams WHERE id = ?', [team_id]);
        if (result2.length === 0) {
            return res.status(401).json({ message: 'Equipo no encontrado' });
        }
        else{
            const fecha = new Date();
            const [result] = await pool.query('INSERT INTO members (team_id, user_id, created_at, updated_at) VALUES(?, ?, ?, ?)', [team_id, user_id, fecha, fecha]);
            res.json(result[0]);
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al ingresar al equipo' });
    }
};

export const getItem = async (req, res) => {
    // Lógica para obtener un elemento
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT id, team_id, user_id FROM members WHERE id = ?', [id]);

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
        const [result] = await pool.query('SELECT id, team_id, user_id FROM members');
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
        const { team_id} = req.body;
        const { id } = req.params;
        const fecha = new Date();
        const [result] = await pool.query('UPDATE members SET team_id=?, updated_at=? WHERE id=?', [team_id, fecha, id]);
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }

};

export const deleteItem = async (req, res) => {
    // Lógica para eliminar un elemento por id
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM members WHERE id = ?', [id]);

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

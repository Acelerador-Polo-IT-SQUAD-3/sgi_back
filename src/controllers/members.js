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

export const createMentor = async (team_id, user_id) => {
    try {
        const [result2] = await pool.query('SELECT id, name, description FROM teams WHERE id = ?', [team_id]);
        if (result2.length === 0) {
            return { status: 401, message: 'Equipo no encontrado' }; // Devuelve un estado y un mensaje
        } else {
            const fecha = new Date();
            const [result] = await pool.query('INSERT INTO members (team_id, user_id, created_at, updated_at) VALUES(?, ?, ?, ?)', [team_id, user_id, fecha, fecha]);
            console.log("ESTE ES EL MENTOR DESDE LA FUNCION" + result.insertId)
            console.log("ESTE ES EL MENTOR DESDE LA FUNCION" + result[0])
            return { status: 200, resultM: result.insertId }; // Devuelve un estado y el resultado
        }
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Error al ingresar al equipo' }; // Devuelve un estado y un mensaje de error
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


export const massCreateItem = async (userId, teamId) => {
    try {
        // Verificar si el equipo existe
        const [result2] = await pool.query('SELECT id, name, description FROM teams WHERE id = ?', [teamId]);
        if (result2.length === 0) {
            throw new Error('Equipo no encontrado'); // Lanzar un error si el equipo no se encuentra
        }
        
        // Insertar el nuevo miembro
        const fecha = new Date();
        const [result] = await pool.query('INSERT INTO members (team_id, user_id, created_at, updated_at) VALUES (?, ?, ?, ?)', [teamId, userId, fecha, fecha]);
        
        console.log('Nuevo miembro creado:', result);
        return result; // Retornar el resultado de la inserción

    } catch (error) {
        console.error('Error al crear el miembro:', error);
        throw error; // Lanzar el error para que sea manejado por el controlador
    }
};


export default { createItem, getItems, getItem, updateItem, deleteItem, massCreateItem, createMentor };
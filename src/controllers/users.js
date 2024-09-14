import {pool} from '../database.js'
import {encrypt, compare} from '../helpers/handleBcrypt.js'


export const getItems = async (req, res) => {
    try {
        // usa role_id, program_id y technology_id para filtrar si se envian nulos se selecciona todo
        const { role_id, program_id, technology_id } = req.body;

        if (role_id == null && program_id == null && technology_id == null) {
            // Sin filtros
            const [result] = await pool.query('SELECT id, name, surname, dni, description, email, role_id FROM users');
            res.json(result);
        }
        else if (role_id != null && program_id == null && technology_id == null) {
            // Un filtro: rol
            const [result] = await pool.query('SELECT id, name, surname, dni, description, email, role_id FROM users WHERE role_id = ?', [role_id]);
            res.json(result);
        }
        else if (role_id == null && program_id != null && technology_id == null) {
            // Un filtro: programa
            const [result] = await pool.query('SELECT users.id, users.name, users.surname, users.dni, users.description, users.email, users.role_id FROM users INNER JOIN members ON users.id = members.user_id INNER JOIN teams ON members.team_id = teams.id INNER JOIN programs ON teams.program_id = programs.id WHERE programs.id = ?', [program_id]);
            res.json(result);
        }
        else if (role_id == null && program_id == null && technology_id != null) {
            // Un filtro: tecnología
            const [result] = await pool.query('SELECT users.id, users.name, users.surname, users.dni, users.description, users.email, users.role_id FROM users INNER JOIN managed_technologies ON users.id = managed_technologies.user_id INNER JOIN technologies ON managed_technologies.technology_id = technologies.id WHERE technologies.id = ?', [technology_id]);
            res.json(result);
        }
        else if (role_id != null && program_id != null && technology_id == null) {
            // Dos filtros: rol y programa
            const [result] = await pool.query('SELECT users.id, users.name, users.surname, users.dni, users.description, users.email, users.role_id FROM users INNER JOIN members ON users.id = members.user_id INNER JOIN teams ON members.team_id = teams.id INNER JOIN programs ON teams.program_id = programs.id WHERE programs.id = ? AND users.role_id = ?', [program_id, role_id]);
            res.json(result);
        }
        else if (role_id != null && program_id == null && technology_id != null) {
            // Dos filtros: rol y tecnología
            const [result] = await pool.query('SELECT users.id, users.name, users.surname, users.dni, users.description, users.email, users.role_id FROM users INNER JOIN managed_technologies ON users.id = managed_technologies.user_id INNER JOIN technologies ON managed_technologies.technology_id = technologies.id WHERE technologies.id = ? AND users.role_id = ?', [technology_id, role_id]);
            res.json(result);
        }
        else if (role_id == null && program_id != null && technology_id != null) {
            // Dos filtros: programa y tecnología
            const [result] = await pool.query('SELECT DISTINCT users.id, users.name, users.surname, users.dni, users.description, users.email, users.role_id FROM users INNER JOIN members ON users.id = members.user_id INNER JOIN teams ON members.team_id = teams.id INNER JOIN programs ON teams.program_id = programs.id INNER JOIN managed_technologies ON users.id = managed_technologies.user_id INNER JOIN technologies ON managed_technologies.technology_id = technologies.id WHERE programs.id = ? AND technologies.id = ?', [program_id, technology_id]);
            res.json(result);
        }
        else if (role_id != null && program_id != null && technology_id != null) {
            // Tres filtros: rol, programa y tecnología
            const [result] = await pool.query('SELECT DISTINCT users.id, users.name, users.surname, users.dni, users.description, users.email, users.role_id FROM users INNER JOIN members ON users.id = members.user_id INNER JOIN teams ON members.team_id = teams.id INNER JOIN programs ON teams.program_id = programs.id INNER JOIN managed_technologies ON users.id = managed_technologies.user_id INNER JOIN technologies ON managed_technologies.technology_id = technologies.id WHERE programs.id = ? AND users.role_id = ? AND technologies.id = ?', [program_id, role_id, technology_id]);
            res.json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
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

export const updateItem = async(req, res) => {
    // Lógica para actualizar un elemento por id

    try {
        console.log('Datos recibidos en req.body:', req.body);
        const { name, surname, dni, description, email } = req.body;

        const { id } = req.params;
        const fecha = new Date();
        const [result] = await pool.query('UPDATE users SET name=?, surname=?, dni=?, description=?, email=?,  updated_at=? WHERE id=?', [name, surname, dni, description, email, fecha, id]);
        res.json({ id: result.insertId , id, name, email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
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

export default { getItems, getItem, updateItem, deleteItem };

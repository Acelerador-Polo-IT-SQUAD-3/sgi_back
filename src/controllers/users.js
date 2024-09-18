import {pool} from '../database.js'
import {encrypt, compare} from '../helpers/handleBcrypt.js'


export const getItems = async (req, res) => {
    try {
        // usa role_id, program_id y technology_id para filtrar si se envian nulos se selecciona todo
        //datos que se envian por el bodi
        const { role_id, program_id, technology_id } = req.query;

        if (role_id == null && program_id == null && technology_id == null) {
            // Sin filtros
            const [result] = await pool.query('SELECT id, name, surname, dni, description, email, role_id FROM users WHERE users.state_id = 1');
            res.json(result);
        }
        else if (role_id != null && program_id == null && technology_id == null) {
            // Un filtro: rol
            const [result] = await pool.query('SELECT id, name, surname, dni, description, email, role_id FROM users WHERE role_id = ? and users.state_id = 1', [role_id]);
            res.json(result);
        }
        else if (role_id == null && program_id != null && technology_id == null) {
            // Un filtro: programa
            const [result] = await pool.query('SELECT users.id, users.name, users.surname, users.dni, users.description, users.email, users.role_id FROM users INNER JOIN members ON users.id = members.user_id INNER JOIN teams ON members.team_id = teams.id INNER JOIN programs ON teams.program_id = programs.id WHERE programs.id = ? and users.state_id = 1', [program_id]);
            res.json(result);
        }
        else if (role_id == null && program_id == null && technology_id != null) {
            // Un filtro: tecnología
            const [result] = await pool.query('SELECT users.id, users.name, users.surname, users.dni, users.description, users.email, users.role_id FROM users INNER JOIN managed_technologies ON users.id = managed_technologies.user_id INNER JOIN technologies ON managed_technologies.technology_id = technologies.id WHERE technologies.id = ? and users.state_id = 1', [technology_id]);
            res.json(result);
        }
        else if (role_id != null && program_id != null && technology_id == null) {
            // Dos filtros: rol y programa
            const [result] = await pool.query('SELECT users.id, users.name, users.surname, users.dni, users.description, users.email, users.role_id FROM users INNER JOIN members ON users.id = members.user_id INNER JOIN teams ON members.team_id = teams.id INNER JOIN programs ON teams.program_id = programs.id WHERE programs.id = ? AND users.role_id = ? and users.state_id = 1', [program_id, role_id]);
            res.json(result);
        }
        else if (role_id != null && program_id == null && technology_id != null) {
            // Dos filtros: rol y tecnología
            const [result] = await pool.query('SELECT users.id, users.name, users.surname, users.dni, users.description, users.email, users.role_id FROM users INNER JOIN managed_technologies ON users.id = managed_technologies.user_id INNER JOIN technologies ON managed_technologies.technology_id = technologies.id WHERE technologies.id = ? AND users.role_id = ? and users.state_id = 1', [technology_id, role_id]);
            res.json(result);
        }
        else if (role_id == null && program_id != null && technology_id != null) {
            // Dos filtros: programa y tecnología
            const [result] = await pool.query('SELECT DISTINCT users.id, users.name, users.surname, users.dni, users.description, users.email, users.role_id FROM users INNER JOIN members ON users.id = members.user_id INNER JOIN teams ON members.team_id = teams.id INNER JOIN programs ON teams.program_id = programs.id INNER JOIN managed_technologies ON users.id = managed_technologies.user_id INNER JOIN technologies ON managed_technologies.technology_id = technologies.id WHERE programs.id = ? AND technologies.id = ? and users.state_id = 1', [program_id, technology_id]);
            res.json(result);
        }
        else if (role_id != null && program_id != null && technology_id != null) {
            // Tres filtros: rol, programa y tecnología
            const [result] = await pool.query('SELECT DISTINCT users.id, users.name, users.surname, users.dni, users.description, users.email, users.role_id FROM users INNER JOIN members ON users.id = members.user_id INNER JOIN teams ON members.team_id = teams.id INNER JOIN programs ON teams.program_id = programs.id INNER JOIN managed_technologies ON users.id = managed_technologies.user_id INNER JOIN technologies ON managed_technologies.technology_id = technologies.id WHERE programs.id = ? AND users.role_id = ? AND technologies.id = ? and users.state_id = 1', [program_id, role_id, technology_id]);
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
        const [result] = await pool.query('SELECT id,name,surname,dni,description,email,role_id FROM users WHERE id = ? and state_id = 1', [id]);

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
    // Lógica para actualizar un elemento por id esto se envia por url
    //requiere nombre, apellido, dni, descripcion, email datos que se envian por el bodi

    try {
        console.log('Datos recibidos en req.body:', req.body);
        const { name, surname, dni, description, email } = req.body;

        const { id } = req.params;
        const fecha = new Date();
        const [result] = await pool.query('UPDATE users SET name=?, surname=?, dni=?, description=?, email=?,  updated_at=? WHERE id=? and state_id = 1', [name, surname, dni, description, email, fecha, id]);
        res.json({ id: result.insertId , id, name, email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }

};


export const deleteItem = async (req, res) => {
    // Lógica para eliminar un elemento por id esto se envia por url
    try {
        const { id } = req.params;
        const fecha = new Date();
        const [result] = await pool.query('UPDATE users SET state_id=2,updated_at=? WHERE id = ? and state_id = 1', [fecha,id]);

        if (result.affectedRows === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};


export const getUsersByTechnology = async (req, res) => {
    try {
        const { technologyIds } = req.body;

        // Verificar que technologyIds sea un array no vacío
        if (!Array.isArray(technologyIds) || technologyIds.length === 0) {
            return res.status(400).json({ message: 'Debe proporcionar una lista de tecnologías válida.' });
        }

        // Convertir los IDs de tecnologías a una cadena separada por comas
        const techList = technologyIds.join(',');

        // Consulta SQL con filtro de tecnologías
        const sql = `
            SELECT DISTINCT u.id, u.name, mt.technology_id
            FROM users u
            JOIN managed_technologies mt ON u.id = mt.user_id
            WHERE u.id NOT IN (
                SELECT DISTINCT m.user_id
                FROM members m
                JOIN teams t ON m.team_id = t.id
                WHERE t.state_id = 1 AND t.program_id = 4
            )
            AND mt.technology_id IN (${techList})
        `;

        // Ejecutar la consulta
        const [rowsRaw] = await pool.execute(sql);

        const processResults = (results) => {
            // Crear un objeto para almacenar usuarios únicos por su ID
            const uniqueUsers = {};
        
            // Recorrer los resultados y almacenar en el objeto solo usuarios únicos
            results.forEach(row => {
                if (!uniqueUsers[row.id]) {
                    uniqueUsers[row.id] = row;
                }
            });
        
            // Convertir el objeto de usuarios únicos a un array
            return Object.values(uniqueUsers);
        };
        const rows = processResults(rowsRaw);
        console.log(rows);

        // Filtrar usuarios únicos por ID
        const uniqueUsers = new Map();
        rows.forEach(row => {
            if (!uniqueUsers.has(row.id)) {
                uniqueUsers.set(row.id, { id: row.id, name: row.name, technologies: [] });
            }
            uniqueUsers.get(row.id).technologies.push(row.technology_id);
        });

        // Separar usuarios en arrays según las tecnologías
        const result = {};
        technologyIds.forEach(techId => {
            result[techId] = [];
        });

        uniqueUsers.forEach(user => {
            user.technologies.forEach(techId => {
                if (result[techId]) {
                    result[techId].push(user);
                }
            });
        });

        // Enviar la respuesta con el resultado
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Error al obtener usuarios por tecnología:', error);
        res.status(500).json({ message: 'Error al obtener usuarios por tecnología' });
    }
};





export default { getItems, getItem, updateItem, deleteItem, getUsersByTechnology };

import {pool} from '../database.js'
import {encrypt, compare} from '../helpers/handleBcrypt.js'
import {createItem} from './teams.js'
import {massCreateItem, createMentor} from'../controllers/members.js';

export const getItems = async (req, res) => {
    try {
        const { role_id, program_id, technology_id, team_id } = req.query;

        // Construir la consulta base
        let query = 'SELECT DISTINCT users.id, users.name, users.surname, users.dni, users.description, users.email, users.role_id FROM users ';
        let conditions = ['users.state_id = 1'];
        let params = [];

        // Añadir joins y condiciones según los filtros proporcionados
        if (program_id) {
            query += 'INNER JOIN members ON users.id = members.user_id INNER JOIN teams ON members.team_id = teams.id INNER JOIN programs ON teams.program_id = programs.id ';
            conditions.push('programs.id = ?');
            params.push(program_id);
            if (team_id) {
                conditions.push('teams.id = ?');
                params.push(team_id);
            }
        }
        
        if (technology_id) {
            query += 'INNER JOIN managed_technologies ON users.id = managed_technologies.user_id INNER JOIN technologies ON managed_technologies.technology_id = technologies.id ';
            conditions.push('technologies.id = ?');
            params.push(technology_id);
        }

        if (!program_id&&team_id) {
            query += 'INNER JOIN members ON users.id = members.user_id INNER JOIN teams ON members.team_id = teams.id ';
            conditions.push('teams.id = ?');
            params.push(team_id);
        }

        if (role_id) {
            conditions.push('users.role_id = ?');
            params.push(role_id);
        }

        // Combinar todas las condiciones con "AND"
        if (conditions.length > 0) {
            query += 'WHERE ' + conditions.join(' AND ');
        }

        // Ejecutar la consulta
        const [result] = await pool.query(query, params);
        res.json(result);
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


export const asignacionEquipo = async (id, cant_max_equipos, conocimientos_por_equipo, conocimientos_por_mentor) => {
    try {
        const idsTecnologias = conocimientos_por_equipo.ids_tecnologias;
        const cantidadRequerida = conocimientos_por_equipo.cantidad_requerida;

        // Verificaciones iniciales
        if (cantidadRequerida.length !== idsTecnologias.length) {
            return { success: false, message: 'Los arrays de tecnologías y cantidades no coinciden en tamaño.' };
        }

        const checkProgramSql = 'SELECT COUNT(*) as count FROM programs WHERE id = ?';
        const [programCheck] = await pool.execute(checkProgramSql, [id]);

        if (programCheck[0].count === 0) {
            return { success: false, message: `El programa con id ${id} no existe.` };
        }

        if (!Array.isArray(idsTecnologias) || idsTecnologias.length === 0) {
            return { success: false, message: 'Debe proporcionar una lista de tecnologías válida para graduado.' };
        }

        if (!Array.isArray(conocimientos_por_mentor) || conocimientos_por_mentor.length === 0) {
            return { success: false, message: 'Debe proporcionar una lista de tecnologías válida para mentor.' };
        }

        const techList = idsTecnologias.join(',');
        const techListM = conocimientos_por_mentor.join(',');
        const state =1;
        // Consultas SQL
        const sqlG = `
            SELECT DISTINCT u.id, u.name, mt.technology_id
            FROM users u
            JOIN managed_technologies mt ON u.id = mt.user_id
            WHERE role_id=1 AND u.id NOT IN (
                SELECT DISTINCT m.user_id
                FROM members m
                JOIN teams t ON m.team_id = t.id
                WHERE t.state_id = (${state}) AND t.program_id = ?
            )
            AND mt.technology_id IN (${techList})
        `;

        const sqlm = `
            SELECT DISTINCT u.id, u.name, mt.technology_id
            FROM users u
            JOIN managed_technologies mt ON u.id = mt.user_id
            WHERE role_id=2 AND u.id NOT IN (
                SELECT DISTINCT m.user_id
                FROM members m
                JOIN teams t ON m.team_id = t.id
                WHERE t.state_id = ${state} AND t.program_id = ?
            )
            AND mt.technology_id IN (${techListM})
            LIMIT 1
        `;

        const [rowsRaw] = await pool.execute(sqlG, [id]);
        const [Mentor] = await pool.execute(sqlm, [id]);

        // Verificar si se encontró el mentor
        if (!Mentor || Mentor.length === 0) {
            return { success: false, message: 'Mentor no encontrado' };
        }

        console.log("ID del mentor:", Mentor[0].id);

        const processResults = (results) => {
            const uniqueUsers = {};
            results.forEach(row => {
                if (!uniqueUsers[row.id]) {
                    uniqueUsers[row.id] = row;
                }
            });
            return Object.values(uniqueUsers);
        };

        const rows = processResults(rowsRaw);
        const uniqueUsers = new Map();

        rows.forEach(row => {
            if (!uniqueUsers.has(row.id)) {
                uniqueUsers.set(row.id, { id: row.id, name: row.name, technologies: [] });
            }
            uniqueUsers.get(row.id).technologies.push(row.technology_id);
        });

        const result = {};
        idsTecnologias.forEach(techId => {
            result[techId] = [];
        });

        uniqueUsers.forEach(user => {
            user.technologies.forEach(techId => {
                if (result[techId] && result[techId].length < cantidadRequerida[idsTecnologias.indexOf(techId)]) {
                    result[techId].push(user);
                }
            });
        });

        const notEnoughUsers = idsTecnologias.some((techId, index) => result[techId].length < cantidadRequerida[index]);

        if (notEnoughUsers) {
            return { success: false, message: 'No se cumplen los requisitos de cantidad de usuarios para una o más tecnologías.' };
        }

        const userIds = [];
        Object.values(result).forEach(usersArray => {
            usersArray.forEach(user => {
                userIds.push(user.id);
            });
        });

        // Crear el equipo y obtener el ID
        const [nuevoEquipoID,nuevoEquipoNombre] = await createItem(id);
        console.log('Nuevo equipo creado:', nuevoEquipoID);

        // Crear una lista de promesas para añadir los usuarios al equipo
        const promises = userIds.map(userId => {
            return massCreateItem(userId, nuevoEquipoID)
                .then(nuevoMiembro => {
                    console.log('Nuevo miembro creado:', nuevoMiembro);
                    return nuevoMiembro;
                })
                .catch(error => {
                    console.error('Error al crear el miembro:', error);
                    throw error;
                });
        });

        // Asignar el mentor al equipo
        const { status: mentorStatus, resultM } = await createMentor(nuevoEquipoID, Mentor[0].id);
        if (mentorStatus === 401||mentorStatus === 500) {
            return { success: false, message: resultM };
        }
        


        const sqlSM = 
            `SELECT id,name,surname,dni,description,email,role_id FROM users WHERE id = ${id} and state_id = 1`;

        const [rowsSM] = await pool.execute(sqlSM, [id]);
        const mentorCreado = Mentor[0];
        console.log("MENTOR CREADO:", JSON.stringify(mentorCreado, null, 2));
        await Promise.all(promises);

        return { success: true, nuevoEquipoID, result,mentorCreado,nuevoEquipoNombre };

    } catch (error) {
        console.error('Error al obtener usuarios por tecnología:', error);
        return { success: false, message: 'Error al obtener usuarios por tecnología' };
    }
};


export const asignacionEquipos = async (req, res) => {
    const { id, cant_max_equipos, conocimientos_por_equipo, conocimientos_por_mentor } = req.body;
    let i = 0;
    const equiposCreados = [];
    
    try {
        while (i < cant_max_equipos) {
            const { success, nuevoEquipoID, result, mentorCreado, message , nuevoEquipoNombre} = await asignacionEquipo(id, cant_max_equipos, conocimientos_por_equipo, conocimientos_por_mentor);
            
            if (!success) {
                // Si ocurre un error, detenemos el ciclo y enviamos la respuesta.
                console.error('Error al crear un equipo:', message);
                if (!res.headersSent) {
                    return res.status(400).json({ message: 'Error durante la asignación de equipos: ' + message, equiposCreados });
                }
            }
            
            equiposCreados.push({ equipo: nuevoEquipoNombre, ID: nuevoEquipoID, usuarios_asignados: result, mentor_asignado: mentorCreado });
            console.log('Nuevo equipo creado:', nuevoEquipoID);
            i++;
        }

        // Solo se envía una respuesta si no se ha enviado otra antes.
        if (!res.headersSent) {
            return res.json({ 
                success: true, 
                program: id,
                equipos_creados: equiposCreados 
            });
        }

    } catch (error) {
        console.error('Error en el proceso de asignación de equipos:', error);
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Error en el proceso de asignación de equipos.' });
        }
    }
};








export default { getItems, getItem, updateItem, deleteItem, asignacionEquipos };

import {pool} from '../database.js'
import { ToWords } from 'to-words';
import {sendEmail} from './sendEmail.js'

export const createItem = async (program_id) => {
    try {
        const fecha = new Date();
        const toWords = new ToWords();
        // Contar los equipos del programa
        const [result] = await pool.query('SELECT COUNT(*) as teamCount FROM teams WHERE program_id = ?;', [program_id]);
        const teamCount = result[0].teamCount;
        const [resultNameProgram] = await pool.query('SELECT name FROM programs WHERE id = ? ;', [program_id]);
        
        // Determinar el nuevo equipo
        let nuevoEquipo = toWords.convert(teamCount + 1);
        const programaName = resultNameProgram.length > 0 ? resultNameProgram[0].name : 'Unknown';
        const prefijo = '-team ';
        const nombreEquipo = programaName + prefijo + nuevoEquipo;
        const descripcion = nombreEquipo + "-programa:" + programaName

        // Insertar el nuevo equipo en la base de datos
        const [insertResult] = await pool.query(
            'INSERT INTO teams (name, program_id, state_id,created_at, updated_at, description) VALUES (?, ?, ?, ?, ?, ?)', 
            [nombreEquipo, program_id, 1, fecha, fecha, descripcion]
        );
        
        // Obtener el ID del nuevo equipo
        const newTeamId = insertResult.insertId;
        const newTeamName = nombreEquipo;
        console.log('ID del nuevo equipo:', newTeamId);
        
        // Retornar el ID del nuevo equipo
        return [newTeamId, newTeamName];

    } catch (error) {
        console.error('Error al crear el equipo:', error);
        throw new Error('Error al crear el equipo');
    }
};


export const getItem = async (req, res) => {
    // Lógica para obtener un elemento
    // requiere id esto se envia por url
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT id,name, description FROM teams WHERE id = ?', [id]);

        if (result.length === 0) {
            return res.status(401).json({ message: 'Equipo no encontrado' });
        }

        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el equipo' });
    }
};


export const getItems = async (req, res) => {
    // Lógica para obtener todos los elementos
    try {
        const [result] = await pool.query('SELECT id,name, description FROM teams');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

export const getUserItems = async (req, res) => {
    try {
        const { id } = req.params;

        const [userRole] = await pool.query(`
            SELECT role_id FROM users WHERE id = ?
        `, [id]);

        if (userRole.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const roleId = userRole[0].role_id;

        let query;
        if (roleId === 1) {
            query = `
                SELECT 
                    u.id AS user_id, 
                    CONCAT(u.name, ' ', u.surname) AS user_name, 
                    u.email AS user_email, 
                    GROUP_CONCAT(t.name SEPARATOR ', ') AS team_names
                FROM 
                    members m
                JOIN 
                    users u ON m.user_id = u.id
                JOIN 
                    teams t ON t.id = m.team_id
                WHERE 
                    m.team_id IN (
                        SELECT m.team_id FROM members m WHERE m.user_id = ?
                    ) 
                    AND u.role_id = 1
                GROUP BY 
                    u.id, u.name, u.surname, u.email
            `;
        } else if (roleId === 2) {
            query = `
                SELECT 
                    u.id AS user_id, 
                    CONCAT(u.name, ' ', u.surname) AS user_name, 
                    u.email AS user_email, 
                    GROUP_CONCAT(t.name SEPARATOR ', ') AS team_names
                FROM 
                    members m
                JOIN 
                    users u ON m.user_id = u.id
                JOIN 
                    teams t ON t.id = m.team_id
                WHERE 
                    m.team_id IN (
                        SELECT m.team_id FROM members m WHERE m.user_id = ?
                    ) 
                    AND (u.role_id = 1 OR u.role_id = 2)
                GROUP BY 
                    u.id, u.name, u.surname, u.email
            `;
        }

        const [userItems] = await pool.query(query, [id]);

        if (userItems.length === 0) {
            return res.json([]);
        }

        res.json(userItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los grupos del usuario' });
    }
};



export const sendEmailForUsers = async (req, res) => {
    try {
        const { affair, message, selectedOptions, fromReception } = req.body;

        if (!affair || !message || !selectedOptions) {
            return res.status(400).json({ enviado: false, error: 'Faltan datos requeridos' });
        }

        const toRecipient = Array.isArray(selectedOptions) ? selectedOptions.join(', ') : selectedOptions;

        await sendEmail(toRecipient, affair, 'personalized', message, fromReception);
        
        res.json({ enviado: true, mensaje: 'Email enviado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ enviado: false, error: 'Error al enviar el email' });
    }
};

export default { createItem, getItems, getItem, getUserItems, sendEmailForUsers };
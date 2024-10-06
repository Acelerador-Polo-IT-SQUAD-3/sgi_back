import {pool} from '../database.js'
import { ToWords } from 'to-words';


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
    // Lógica para obtener todos los elementos de un usuario
    try {
        const { id } = req.params;

        const [members] = await pool.query('SELECT team_id FROM members WHERE user_id = ?', [id]);

        if (members.length === 0) {
            return res.json([]);
        }

        const teamIds = members.map(member => member.team_id);

        const [participants] = await pool.query(
            'SELECT user_id FROM members WHERE team_id IN (?) AND user_id != ?', 
            [teamIds, id]
        );

        const userIds = participants.map(participant => participant.user_id);
        const [userDetails] = await pool.query('SELECT id, name, surname, email, rol_id FROM users WHERE id IN (?)', [userIds]);

        const participantsByProject = {};

        teams.forEach(team => {
            const teamParticipants = participants.filter(participant => participant.team_id === team.team_id);
            const userIds = teamParticipants.map(participant => participant.user_id);
            participantsByProject[team.project_id] = userIds;
        });

        res.json(participantsByProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los grupos del usuario' });
    }
};

export default { createItem, getItems, getItem, getUserItems };
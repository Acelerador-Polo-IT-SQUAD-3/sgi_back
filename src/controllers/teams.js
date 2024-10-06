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
        const state =1;
        const [result] = await pool.query(`SELECT id,name, description FROM teams WHERE teams.state_id = (${state})`);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};



export default { createItem, getItems, getItem };
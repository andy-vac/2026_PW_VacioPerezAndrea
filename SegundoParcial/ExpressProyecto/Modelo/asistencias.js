const pool = require('../db-local');
const { randomUUID } = require('crypto');

const CAMPOS = 'id, taller_id, nombre_alumno, boleta, fecha_registro';

async function listar() {
    const [filas] = await pool.query(`SELECT ${CAMPOS} FROM asistencias ORDER BY fecha_registro DESC`);
    return filas;
}

async function obtenerPorId(id) {
    const [filas] = await pool.query(`SELECT ${CAMPOS} FROM asistencias WHERE id = ?`, [id]);
    return filas[0];
}

// lista de asistencia de un taller
async function listarPorTaller(tallerId) {
    const [filas] = await pool.query(
        `SELECT ${CAMPOS} FROM asistencias WHERE taller_id = ? ORDER BY fecha_registro`,
        [tallerId]
    );
    return filas;
}

// una boleta no puede registrarse dos veces el mismo día en el mismo taller
async function yaRegistrado(tallerId, boleta) {
    const [filas] = await pool.query(
        'SELECT id FROM asistencias WHERE taller_id = ? AND boleta = ? AND DATE(fecha_registro) = CURDATE()',
        [tallerId, boleta]
    );
    return filas.length > 0;
}

async function registrar({ taller_id, nombre_alumno, boleta }) {
    const id = randomUUID();
    await pool.query(
        'INSERT INTO asistencias (id, taller_id, nombre_alumno, boleta) VALUES (?, ?, ?, ?)',
        [id, taller_id, nombre_alumno, boleta]
    );
    return obtenerPorId(id);
}

async function eliminar(id) {
    const [resultado] = await pool.query('DELETE FROM asistencias WHERE id = ?', [id]);
    return resultado.affectedRows > 0;
}

module.exports = { listar, obtenerPorId, listarPorTaller, yaRegistrado, registrar, eliminar };

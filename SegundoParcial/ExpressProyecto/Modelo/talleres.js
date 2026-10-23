const pool = require('../db-local');
const { randomUUID } = require('crypto');

const CAMPOS = 'id, nombre, instructor, fecha, cupo, created_at';

async function listar() {
    const [filas] = await pool.query(`SELECT ${CAMPOS} FROM talleres ORDER BY fecha`);
    return filas;
}

async function obtenerPorId(id) {
    const [filas] = await pool.query(`SELECT ${CAMPOS} FROM talleres WHERE id = ?`, [id]);
    return filas[0];
}

// el id es un UUID generado aquí para poder regresar el taller recién creado
async function crear({ nombre, instructor, fecha, cupo }) {
    const id = randomUUID();
    await pool.query(
        'INSERT INTO talleres (id, nombre, instructor, fecha, cupo) VALUES (?, ?, ?, ?, ?)',
        [id, nombre, instructor || null, fecha, cupo || 30]
    );
    return obtenerPorId(id);
}

async function actualizar(id, datos) {
    const campos = ['nombre', 'instructor', 'fecha', 'cupo'].filter((c) => datos[c] !== undefined);
    if (campos.length === 0) return obtenerPorId(id);

    const set = campos.map((c) => `${c} = ?`).join(', ');
    const valores = campos.map((c) => datos[c]);
    const [resultado] = await pool.query(`UPDATE talleres SET ${set} WHERE id = ?`, [...valores, id]);
    if (resultado.affectedRows === 0) return undefined;
    return obtenerPorId(id);
}

// por el ON DELETE CASCADE también se borran sus asistencias
async function eliminar(id) {
    const [resultado] = await pool.query('DELETE FROM talleres WHERE id = ?', [id]);
    return resultado.affectedRows > 0;
}

// cuántos lugares ya están ocupados
async function contarCupoOcupado(tallerId) {
    const [filas] = await pool.query(
        'SELECT COUNT(*) AS total FROM asistencias WHERE taller_id = ?',
        [tallerId]
    );
    return filas[0].total;
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar, contarCupoOcupado };

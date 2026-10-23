const pool = require('../db-local');

// nunca se devuelve el hash de la contraseña
const CAMPOS = 'id, nombre, correo, boleta, rol';

async function listar() {
    const [filas] = await pool.query(`SELECT ${CAMPOS} FROM usuarios ORDER BY id`);
    return filas;
}

async function obtenerPorId(id) {
    const [filas] = await pool.query(`SELECT ${CAMPOS} FROM usuarios WHERE id = ?`, [id]);
    return filas[0];
}

async function crear({ nombre, correo, contrasenaHash, boleta, rol }) {
    const [resultado] = await pool.query(
        'INSERT INTO usuarios (nombre, correo, contrasena_hash, boleta, rol) VALUES (?, ?, ?, ?, ?)',
        [nombre, correo, contrasenaHash, boleta, rol || 'alumno']
    );
    return obtenerPorId(resultado.insertId);
}

// solo actualiza los campos que llegaron
async function actualizar(id, datos) {
    const campos = ['nombre', 'correo', 'rol'].filter((c) => datos[c] !== undefined);
    if (campos.length === 0) return obtenerPorId(id);

    const set = campos.map((c) => `${c} = ?`).join(', ');
    const valores = campos.map((c) => datos[c]);
    const [resultado] = await pool.query(`UPDATE usuarios SET ${set} WHERE id = ?`, [...valores, id]);
    if (resultado.affectedRows === 0) return undefined;
    return obtenerPorId(id);
}

async function eliminar(id) {
    const [resultado] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    return resultado.affectedRows > 0;
}

// para un futuro login (aquí sí se incluye el hash)
async function buscarPorCorreoConHash(correo) {
    const [filas] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    return filas[0];
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar, buscarPorCorreoConHash };

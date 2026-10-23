const talleresModel = require('../Modelo/talleres');
const asistenciasModel = require('../Modelo/asistencias');

// el cupo, si viene, debe ser un número mayor a 0
function cupoInvalido(cupo) {
    return cupo !== undefined && (isNaN(cupo) || Number(cupo) <= 0);
}

async function listarTalleres(req, res) {
    try {
        res.json(await talleresModel.listar());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obtenerTaller(req, res) {
    try {
        const taller = await talleresModel.obtenerPorId(req.params.id);
        if (!taller) return res.status(404).json({ error: 'Taller no encontrado' });
        res.json(taller);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function crearTaller(req, res) {
    const { nombre, instructor, fecha, cupo } = req.body;

    if (!nombre || !fecha) {
        return res.status(400).json({ error: 'nombre y fecha son obligatorios' });
    }
    if (cupoInvalido(cupo)) {
        return res.status(400).json({ error: 'El cupo debe ser un número mayor a 0' });
    }

    try {
        const taller = await talleresModel.crear({ nombre, instructor, fecha, cupo });
        res.status(201).json(taller);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function actualizarTaller(req, res) {
    const { nombre, instructor, fecha, cupo } = req.body;

    if (nombre === undefined && instructor === undefined && fecha === undefined && cupo === undefined) {
        return res.status(400).json({ error: 'Envía al menos un dato para actualizar: nombre, instructor, fecha o cupo' });
    }
    if (cupoInvalido(cupo)) {
        return res.status(400).json({ error: 'El cupo debe ser un número mayor a 0' });
    }

    try {
        const taller = await talleresModel.actualizar(req.params.id, { nombre, instructor, fecha, cupo });
        if (!taller) return res.status(404).json({ error: 'Taller no encontrado' });
        res.json(taller);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function eliminarTaller(req, res) {
    try {
        const eliminado = await talleresModel.eliminar(req.params.id);
        if (!eliminado) return res.status(404).json({ error: 'Taller no encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET /talleres/:id/asistencias -> alumnos que asistieron a ese taller
async function listarAsistentesDeTaller(req, res) {
    try {
        const taller = await talleresModel.obtenerPorId(req.params.id);
        if (!taller) return res.status(404).json({ error: 'Taller no encontrado' });
        res.json(await asistenciasModel.listarPorTaller(req.params.id));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    listarTalleres,
    obtenerTaller,
    crearTaller,
    actualizarTaller,
    eliminarTaller,
    listarAsistentesDeTaller,
};

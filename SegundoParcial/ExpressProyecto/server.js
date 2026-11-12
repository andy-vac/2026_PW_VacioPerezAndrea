require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

const usuarios = require('./Controlador/usuarios_controlador');
const talleres = require('./Controlador/talleres_controlador');
const asistencias = require('./Controlador/asistencias_controlador');

// prueba de vida
app.get('/', (req, res) => {
    res.json({ mensaje: 'API de Registro de Asistencia - CECyT 9 funcionando correctamente' });
});

const api = express.Router();

// Usuarios
api.get('/usuarios', usuarios.listarUsuarios);
api.get('/usuarios/:id', usuarios.obtenerUsuario);
api.post('/usuarios', usuarios.crearUsuario);
api.put('/usuarios/:id', usuarios.actualizarUsuario);
api.delete('/usuarios/:id', usuarios.eliminarUsuario);

// Talleres
api.get('/talleres', talleres.listarTalleres);
api.get('/talleres/:id', talleres.obtenerTaller);
api.get('/talleres/:id/asistencias', talleres.listarAsistentesDeTaller);
api.post('/talleres', talleres.crearTaller);
api.put('/talleres/:id', talleres.actualizarTaller);
api.delete('/talleres/:id', talleres.eliminarTaller);

// Asistencias
api.get('/asistencias', asistencias.listarAsistencias);
api.get('/asistencias/:id', asistencias.obtenerAsistencia);
api.post('/asistencias', asistencias.registrarAsistencia);
api.delete('/asistencias/:id', asistencias.eliminarAsistencia);

app.use('/api', api);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
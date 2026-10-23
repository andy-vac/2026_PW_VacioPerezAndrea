const express = require('express');

const app = express();
app.use(express.json());

const PORT = 4000;

// controladores
const usuarios = require('./Controlador/usuarios_controlador');
const talleres = require('./Controlador/talleres_controlador');
const asistencias = require('./Controlador/asistencias_controlador');

// rutas de prueba
app.get('/saludo', (req, res) => {
    res.json({ mensaje: 'Hola, el servidor Express está funcionando' });
});

app.post('/eco', (req, res) => {
    const { texto } = req.body;
    if (!texto) {
        return res.status(400).json({ error: 'El texto es obligatorio' });
    }
    res.status(201).json({ eco: texto });
});

// Usuarios
app.get('/usuarios', usuarios.listarUsuarios);
app.get('/usuarios/:id', usuarios.obtenerUsuario);
app.post('/usuarios', usuarios.crearUsuario);
app.put('/usuarios/:id', usuarios.actualizarUsuario);
app.delete('/usuarios/:id', usuarios.eliminarUsuario);

// Talleres
app.get('/talleres', talleres.listarTalleres);
app.get('/talleres/:id', talleres.obtenerTaller);
app.get('/talleres/:id/asistencias', talleres.listarAsistentesDeTaller);
app.post('/talleres', talleres.crearTaller);
app.put('/talleres/:id', talleres.actualizarTaller);
app.delete('/talleres/:id', talleres.eliminarTaller);

// Asistencias
app.get('/asistencias', asistencias.listarAsistencias);
app.get('/asistencias/:id', asistencias.obtenerAsistencia);
app.post('/asistencias', asistencias.registrarAsistencia);
app.delete('/asistencias/:id', asistencias.eliminarAsistencia);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

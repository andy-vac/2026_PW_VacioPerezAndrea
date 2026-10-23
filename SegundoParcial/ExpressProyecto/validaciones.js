// Funciones para validar correo, boleta y contraseña

// correo con formato usuario@dominio.algo
function validarCorreo(correo) {
    return typeof correo === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

// la boleta del IPN tiene 10 dígitos
function validarBoleta(boleta) {
    return typeof boleta === 'string' && /^\d{10}$/.test(boleta);
}

// contraseña de mínimo 8 caracteres
function validarContrasena(contrasena) {
    return typeof contrasena === 'string' && contrasena.length >= 8;
}

// MySQL avisa con este código cuando se repite un valor UNIQUE
function esDuplicado(error) {
    return error.code === 'ER_DUP_ENTRY';
}

module.exports = { validarCorreo, validarBoleta, validarContrasena, esDuplicado };

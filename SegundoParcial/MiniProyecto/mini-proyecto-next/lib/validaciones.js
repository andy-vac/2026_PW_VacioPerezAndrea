export function validarBoleta(boleta) {
  return /^\d{10}$/.test(String(boleta).trim());
}

// Solo letras (con acentos y ñ), espacios, punto, apóstrofo y guion. Entre 3 y 60 caracteres. Sin números.
export function validarNombre(nombre) {
  const n = String(nombre).trim();
  return n.length >= 3 && n.length <= 60 && /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ .'-]*$/.test(n);
}

// usuario@dominio.ext, con extensión de al menos 2 letras (.mx, .com, .edu...).
export function validarCorreo(correo) {
  const c = String(correo).trim();
  return c.length <= 100 && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(c);
}

// Entre 8 y 64 caracteres, con al menos una letra y un número.
export function validarContrasena(contrasena) {
  const p = String(contrasena);
  return p.length >= 8 && p.length <= 64 && /[A-Za-z]/.test(p) && /\d/.test(p);
}


// ---- Validaciones extra del front (más estrictas; las de arriba no se tocan) ----

// Deja solo dígitos y corta a 10: se usa en el onChange de las cajas de boleta.
export function soloDigitos(texto) {
  return String(texto).replace(/\D/g, '').slice(0, 10);
}

// Solo letras (con acentos y ñ), espacios, punto, apóstrofo y guion. Entre 3 y 60 caracteres. Sin números.
export function validarNombre(nombre) {
  const n = String(nombre).trim();
  return n.length >= 3 && n.length <= 60 && /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ .'-]*$/.test(n);
}

// usuario@dominio.ext, con extensión de al menos 2 letras (.mx, .com, .edu...).
export function validarCorreoEstricto(correo) {
  const c = String(correo).trim();
  return c.length <= 100 && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(c);
}

// Entre 8 y 64 caracteres, con al menos una letra y un número.
export function validarContrasenaSegura(contrasena) {
  const p = String(contrasena);
  return p.length >= 8 && p.length <= 64 && /[A-Za-z]/.test(p) && /\d/.test(p);
}

// Nombre de un taller: entre 3 y 80 caracteres y con al menos una letra o número.
export function validarTitulo(texto) {
  const t = String(texto).trim();
  return t.length >= 3 && t.length <= 80 && /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]/.test(t);
}

// Fecha en formato AAAA-MM-DD y que exista de verdad (no 2026-02-31).
export function validarFecha(texto) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) return false;
  const [a, m, d] = texto.split('-').map(Number);
  const f = new Date(Date.UTC(a, m - 1, d));
  return f.getUTCFullYear() === a && f.getUTCMonth() === m - 1 && f.getUTCDate() === d;
}

// Cupo: número entero entre 1 y 500.
export function validarCupo(valor) {
  const n = Number(valor);
  return Number.isInteger(n) && n >= 1 && n <= 500;
}
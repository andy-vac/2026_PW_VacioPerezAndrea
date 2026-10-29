import { useEffect, useState } from 'react';
import { pedirJSON } from '../lib/api';
import { ocultarBoleta } from '../lib/formato';
import { validarBoleta, validarNombre, validarCorreo, validarContrasena } from '../lib/validaciones';
import estilos from '../styles/Talleres.module.css';

// /usuarios — lista (GET /api/usuarios) y registro (POST /api/usuarios).
export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [boleta, setBoleta] = useState('');
  const [contrasena, setContrasena] = useState('');
    const [confirmar, setConfirmar] = useState('');
  const [errorForm, setErrorForm] = useState('');
  const [exito, setExito] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    try {
      setUsuarios(await pedirJSON('/usuarios'));
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  async function registrar(e) {
    e.preventDefault();
    setErrorForm('');
    setExito('');

    // Mismas reglas que valida el backend, para avisar antes de enviar.
    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim();
    const boletaLimpia = boleta.trim();
    if (!nombreLimpio) return setErrorForm('Escribe el nombre.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) return setErrorForm('El correo no tiene un formato válido.');
    if (!validarBoleta(boletaLimpia)) return setErrorForm('La boleta debe tener 10 dígitos.');
    if (contrasena.length < 8) return setErrorForm('La contraseña debe tener al menos 8 caracteres.');
    if (usuarios.some((u) => u.boleta === boletaLimpia)) return setErrorForm('Ya existe un usuario con esa boleta.');
    if (usuarios.some((u) => u.correo === correoLimpio)) return setErrorForm('Ya existe un usuario con ese correo.');

    setEnviando(true);
    try {
      await pedirJSON('/usuarios', {
        method: 'POST',
        body: JSON.stringify({
          nombre: nombreLimpio,
          correo: correoLimpio,
          boleta: boletaLimpia,
          contrasena,
        }),
      });
      setExito(`¡Listo! ${nombreLimpio} quedó registrado(a).`);
      setNombre('');
      setCorreo('');
      setBoleta('');
      setContrasena('');
      await cargar();
    } catch (err) {
      setErrorForm(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main>
      <h1>Usuarios</h1>

      <section className={estilos.panel}>
        <h2>Registrar usuario</h2>
        <form onSubmit={registrar} className={estilos.formUsuario}>
          <input placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          <input placeholder="Boleta (10 dígitos)" value={boleta} onChange={(e) => setBoleta(e.target.value)} />
          <input
            type="password"
            placeholder="Contraseña (mínimo 8 caracteres)"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <button type="submit" disabled={enviando}>
            {enviando ? 'Registrando…' : 'Registrar'}
          </button>
        </form>
        {errorForm && <p className="error">{errorForm}</p>}
        {exito && <p className={estilos.exito}>{exito}</p>}
      </section>

      <h2>Usuarios registrados ({usuarios.length})</h2>
      {cargando && <p>Cargando usuarios…</p>}
      {error && <p className="error">{error}</p>}
      {!cargando && !error && usuarios.length === 0 && <p>No hay usuarios registrados.</p>}

      {usuarios.length > 0 && (
        <table className={estilos.tabla}>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Boleta</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u, i) => (
              <tr key={u.id}>
                <td>{i + 1}</td>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>{ocultarBoleta(u.boleta)}</td>
                <td>{u.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
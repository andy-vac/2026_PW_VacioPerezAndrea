import { useEffect, useState } from 'react';
import { pedirJSON } from '../lib/api';
import { ocultarBoleta } from '../lib/formato';
import estilos from '../styles/Talleres.module.css';

// /asistencias — todas las inscripciones, juntando las de cada taller.
export default function Asistencias() {
  const [filas, setFilas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    try {
      const talleres = await pedirJSON('/talleres');
      const listas = await Promise.all(talleres.map((t) => pedirJSON(`/talleres/${t.id}/asistencias`)));
      const todas = talleres.flatMap((t, i) =>
        listas[i].map((a) => ({ ...a, taller: t.nombre }))
      );
      setFilas(todas);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <main>
      <h1>Asistencias</h1>
      {cargando && <p>Cargando asistencias…</p>}
      {error && <p className="error">{error}</p>}
      {!cargando && !error && filas.length === 0 && <p>Todavía no hay inscripciones.</p>}

      {filas.length > 0 && (
        <table className={estilos.tabla}>
          <thead>
            <tr>
              <th>#</th>
              <th>Alumno</th>
              <th>Boleta</th>
              <th>Taller</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((a, i) => (
              <tr key={a.id}>
                <td>{i + 1}</td>
                <td>{a.nombre_alumno}</td>
                <td>{ocultarBoleta(a.boleta)}</td>
                <td>{a.taller}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
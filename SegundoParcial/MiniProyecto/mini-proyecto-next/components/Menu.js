import Link from 'next/link';
import { useRouter } from 'next/router';
import estilos from './Menu.module.css';

const enlaces = [
  { href: '/', ruta: '/', texto: 'Inicio' },
  { href: '/practica/1', ruta: '/practica', texto: 'Práctica /1' },
  { href: '/talleres', ruta: '/talleres', texto: 'Talleres' },
  { href: '/usuarios', ruta: '/usuarios', texto: 'Usuarios' },
  { href: '/asistencias', ruta: '/asistencias', texto: 'Asistencias' },
  { href: '/perfil', ruta: '/perfil', texto: 'Mi perfil' },
];

export default function Menu() {
  const router = useRouter();

  function activo(ruta) {
    return ruta === '/' ? router.pathname === '/' : router.pathname.startsWith(ruta);
  }

  return (
    <nav className={estilos.menu}>
      <span className={estilos.marca}>Mini proyecto</span>
      <div className={estilos.enlaces}>
        {enlaces.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className={activo(e.ruta) ? `${estilos.enlace} ${estilos.activo}` : estilos.enlace}
          >
            {e.texto}
          </Link>
        ))}
      </div>
    </nav>
  );
}
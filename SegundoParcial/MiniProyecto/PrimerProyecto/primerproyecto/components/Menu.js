import Link from 'next/link';

export default function Menu() {
  return (
    <nav>
      <Link href="/">Inicio</Link>
      <Link href="/mini-servidor">Mini servidor</Link>
      <Link href="/practica/1">Ruta dinámica</Link>
    </nav>
  );
}

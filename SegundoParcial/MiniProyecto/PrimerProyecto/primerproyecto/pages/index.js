import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Página principal con Next.js</h1>
      <p>Ejemplo de navegación, rutas dinámicas y consumo de un servidor Express.</p>
      <p>
        <Link href="/practica/1">Ir a la práctica 1</Link>
      </p>
    </main>
  );
}

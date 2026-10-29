import Head from "next/head";
import Link from "next/link";
import estilos from "../styles/Inicio.module.css";

const secciones = [
  { href: "/talleres", titulo: "Talleres", texto: "Consulta los talleres e inscríbete." },
  { href: "/usuarios", titulo: "Usuarios", texto: "Registra y consulta usuarios." },
  { href: "/asistencias", titulo: "Asistencias", texto: "Mira las inscripciones de todos los talleres." },
  { href: "/perfil", titulo: "Mi perfil", texto: "Busca tu boleta y revisa tus talleres." },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Mini proyecto Next</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={estilos.inicio}>
        <h1 className={estilos.titulo}>Mini proyecto con Next.js</h1>
        <p className={estilos.subtitulo}>Elige una sección para empezar.</p>

        <div className={estilos.rejilla}>
          {secciones.map((s) => (
            <Link key={s.href} href={s.href} className={estilos.tarjeta}>
              <h2 className={estilos.nombre}>{s.titulo}</h2>
              <p className={estilos.texto}>{s.texto}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
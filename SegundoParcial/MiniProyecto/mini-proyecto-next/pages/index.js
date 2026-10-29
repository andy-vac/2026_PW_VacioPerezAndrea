import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mini proyecto Next</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>Mini proyecto con Next.js</h1>
        <p>Primera página creada con el router de <code>pages/</code>.</p>
        <p>Edita <code>pages/index.js</code> y guarda para ver los cambios al instante.</p>
        <ul>
          <li><Link href="/talleres">Ver talleres</Link></li>
          <li><Link href="/perfil">Mi perfil</Link></li>
        </ul>
      </main>
    </>
  );
}
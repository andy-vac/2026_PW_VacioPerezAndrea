// El backend Express (ExpressProyecto/server.js) corre en el puerto 4000.
// Los rewrites hacen de proxy para que el navegador llame a /mini/... y /api/...
// sin problemas de CORS.
const BACKEND_URL = 'http://localhost:4000';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/mini/:path*', destination: `${BACKEND_URL}/:path*` },
      { source: '/api/:path*', destination: `${BACKEND_URL}/api/:path*` },
    ];
  },
};

export default nextConfig;

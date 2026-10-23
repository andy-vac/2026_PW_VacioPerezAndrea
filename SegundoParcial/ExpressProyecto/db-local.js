const mysql = require('mysql2/promise');

// La conexión se puede cambiar con variables de entorno; si no existen se usan valores locales
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cecyt9_local',
    dateStrings: true,
});

module.exports = pool;

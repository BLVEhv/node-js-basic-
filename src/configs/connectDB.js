import mysql from 'mysql2/promise';

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejsbasic',
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0
});


export default pool;
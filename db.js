const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "betmovie",
    password: "80809312",
    port: 5432,
});

module.exports = pool;
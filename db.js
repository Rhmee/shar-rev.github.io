const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "betmovie",
    password: "99238700",
    port: 5432,
});

module.exports = pool;
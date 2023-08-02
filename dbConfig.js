const { Pool } = require('pg');

const pool = new Pool({
  user: 'assi',
  host: 'localhost',
  port: 5432,
  database: 'sistema_de_buses',
});

module.exports = pool;
const express = require('express');
const { Pool } = require('pg');
const app = express();

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

///const port = 3000;

///app.listen(port, () => {
///  console.log(`La aplicación está corriendo en http://localhost:${port}`);
///});

const pool = new Pool({
    user: 'assi',
    host: 'localhost',
    database: 'sistema_de_buses',
    
    port: 5432
});

app.get('/itinerarios', (req, res) => {
    pool.query('SELECT * FROM itinerarios', (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener los itinerarios.' });
      }
      res.json(result.rows);
    });
});

pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.error('Error al conectarse a la base de datos:', err);
    } else {
      console.log('Conexión exitosa a la base de datos:', result.rows[0].now);
    }
  });
const express = require('express');
//const createPool = require('./dbConfig');
const itineraryRoutes = require('./routes/itineraryRoutes');

const app = express();
//const pool = createPool();

const port = 3000;

app.listen(port, () => {
  console.log(`La aplicación está corriendo en http://localhost:${port}`);
});

app.use('/api', itineraryRoutes);


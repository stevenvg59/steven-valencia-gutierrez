const express = require('express');
const itineraryRoutes = require('./routes/itineraryRoutes');
const bodyParser = require('body-parser');
const { configureWebSocket } = require('./websocket');


const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`La aplicación está corriendo en http://localhost:${port}`);
});

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', itineraryRoutes);


configureWebSocket(app);
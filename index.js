const express = require('express');
const usersRoutes = require('./routes/userRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const bodyParser = require('body-parser');
const { configureWebSocket } = require('./websocket');


const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`La aplicación está corriendo en http://localhost:${port}`);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));



app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', itineraryRoutes);
app.use('/users', usersRoutes);


configureWebSocket(app);